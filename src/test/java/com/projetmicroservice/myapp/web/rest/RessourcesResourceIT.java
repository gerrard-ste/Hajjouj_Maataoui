package com.projetmicroservice.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.projetmicroservice.myapp.IntegrationTest;
import com.projetmicroservice.myapp.domain.Ressources;
import com.projetmicroservice.myapp.repository.RessourcesRepository;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link RessourcesResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class RessourcesResourceIT {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_DISPONIBILITE = false;
    private static final Boolean UPDATED_DISPONIBILITE = true;

    private static final String ENTITY_API_URL = "/api/ressources";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private RessourcesRepository ressourcesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRessourcesMockMvc;

    private Ressources ressources;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ressources createEntity(EntityManager em) {
        Ressources ressources = new Ressources().type(DEFAULT_TYPE).disponibilite(DEFAULT_DISPONIBILITE);
        return ressources;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ressources createUpdatedEntity(EntityManager em) {
        Ressources ressources = new Ressources().type(UPDATED_TYPE).disponibilite(UPDATED_DISPONIBILITE);
        return ressources;
    }

    @BeforeEach
    public void initTest() {
        ressources = createEntity(em);
    }

    @Test
    @Transactional
    void createRessources() throws Exception {
        int databaseSizeBeforeCreate = ressourcesRepository.findAll().size();
        // Create the Ressources
        restRessourcesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ressources)))
            .andExpect(status().isCreated());

        // Validate the Ressources in the database
        List<Ressources> ressourcesList = ressourcesRepository.findAll();
        assertThat(ressourcesList).hasSize(databaseSizeBeforeCreate + 1);
        Ressources testRessources = ressourcesList.get(ressourcesList.size() - 1);
        assertThat(testRessources.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testRessources.getDisponibilite()).isEqualTo(DEFAULT_DISPONIBILITE);
    }

    @Test
    @Transactional
    void createRessourcesWithExistingId() throws Exception {
        // Create the Ressources with an existing ID
        ressources.setId(1L);

        int databaseSizeBeforeCreate = ressourcesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restRessourcesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ressources)))
            .andExpect(status().isBadRequest());

        // Validate the Ressources in the database
        List<Ressources> ressourcesList = ressourcesRepository.findAll();
        assertThat(ressourcesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllRessources() throws Exception {
        // Initialize the database
        ressourcesRepository.saveAndFlush(ressources);

        // Get all the ressourcesList
        restRessourcesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ressources.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].disponibilite").value(hasItem(DEFAULT_DISPONIBILITE.booleanValue())));
    }

    @Test
    @Transactional
    void getRessources() throws Exception {
        // Initialize the database
        ressourcesRepository.saveAndFlush(ressources);

        // Get the ressources
        restRessourcesMockMvc
            .perform(get(ENTITY_API_URL_ID, ressources.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ressources.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.disponibilite").value(DEFAULT_DISPONIBILITE.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingRessources() throws Exception {
        // Get the ressources
        restRessourcesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingRessources() throws Exception {
        // Initialize the database
        ressourcesRepository.saveAndFlush(ressources);

        int databaseSizeBeforeUpdate = ressourcesRepository.findAll().size();

        // Update the ressources
        Ressources updatedRessources = ressourcesRepository.findById(ressources.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedRessources are not directly saved in db
        em.detach(updatedRessources);
        updatedRessources.type(UPDATED_TYPE).disponibilite(UPDATED_DISPONIBILITE);

        restRessourcesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedRessources.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedRessources))
            )
            .andExpect(status().isOk());

        // Validate the Ressources in the database
        List<Ressources> ressourcesList = ressourcesRepository.findAll();
        assertThat(ressourcesList).hasSize(databaseSizeBeforeUpdate);
        Ressources testRessources = ressourcesList.get(ressourcesList.size() - 1);
        assertThat(testRessources.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testRessources.getDisponibilite()).isEqualTo(UPDATED_DISPONIBILITE);
    }

    @Test
    @Transactional
    void putNonExistingRessources() throws Exception {
        int databaseSizeBeforeUpdate = ressourcesRepository.findAll().size();
        ressources.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRessourcesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ressources.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ressources))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ressources in the database
        List<Ressources> ressourcesList = ressourcesRepository.findAll();
        assertThat(ressourcesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchRessources() throws Exception {
        int databaseSizeBeforeUpdate = ressourcesRepository.findAll().size();
        ressources.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRessourcesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ressources))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ressources in the database
        List<Ressources> ressourcesList = ressourcesRepository.findAll();
        assertThat(ressourcesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamRessources() throws Exception {
        int databaseSizeBeforeUpdate = ressourcesRepository.findAll().size();
        ressources.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRessourcesMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ressources)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ressources in the database
        List<Ressources> ressourcesList = ressourcesRepository.findAll();
        assertThat(ressourcesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateRessourcesWithPatch() throws Exception {
        // Initialize the database
        ressourcesRepository.saveAndFlush(ressources);

        int databaseSizeBeforeUpdate = ressourcesRepository.findAll().size();

        // Update the ressources using partial update
        Ressources partialUpdatedRessources = new Ressources();
        partialUpdatedRessources.setId(ressources.getId());

        partialUpdatedRessources.type(UPDATED_TYPE);

        restRessourcesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRessources.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRessources))
            )
            .andExpect(status().isOk());

        // Validate the Ressources in the database
        List<Ressources> ressourcesList = ressourcesRepository.findAll();
        assertThat(ressourcesList).hasSize(databaseSizeBeforeUpdate);
        Ressources testRessources = ressourcesList.get(ressourcesList.size() - 1);
        assertThat(testRessources.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testRessources.getDisponibilite()).isEqualTo(DEFAULT_DISPONIBILITE);
    }

    @Test
    @Transactional
    void fullUpdateRessourcesWithPatch() throws Exception {
        // Initialize the database
        ressourcesRepository.saveAndFlush(ressources);

        int databaseSizeBeforeUpdate = ressourcesRepository.findAll().size();

        // Update the ressources using partial update
        Ressources partialUpdatedRessources = new Ressources();
        partialUpdatedRessources.setId(ressources.getId());

        partialUpdatedRessources.type(UPDATED_TYPE).disponibilite(UPDATED_DISPONIBILITE);

        restRessourcesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRessources.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRessources))
            )
            .andExpect(status().isOk());

        // Validate the Ressources in the database
        List<Ressources> ressourcesList = ressourcesRepository.findAll();
        assertThat(ressourcesList).hasSize(databaseSizeBeforeUpdate);
        Ressources testRessources = ressourcesList.get(ressourcesList.size() - 1);
        assertThat(testRessources.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testRessources.getDisponibilite()).isEqualTo(UPDATED_DISPONIBILITE);
    }

    @Test
    @Transactional
    void patchNonExistingRessources() throws Exception {
        int databaseSizeBeforeUpdate = ressourcesRepository.findAll().size();
        ressources.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRessourcesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ressources.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ressources))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ressources in the database
        List<Ressources> ressourcesList = ressourcesRepository.findAll();
        assertThat(ressourcesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchRessources() throws Exception {
        int databaseSizeBeforeUpdate = ressourcesRepository.findAll().size();
        ressources.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRessourcesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ressources))
            )
            .andExpect(status().isBadRequest());

        // Validate the Ressources in the database
        List<Ressources> ressourcesList = ressourcesRepository.findAll();
        assertThat(ressourcesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamRessources() throws Exception {
        int databaseSizeBeforeUpdate = ressourcesRepository.findAll().size();
        ressources.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRessourcesMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(ressources))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Ressources in the database
        List<Ressources> ressourcesList = ressourcesRepository.findAll();
        assertThat(ressourcesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteRessources() throws Exception {
        // Initialize the database
        ressourcesRepository.saveAndFlush(ressources);

        int databaseSizeBeforeDelete = ressourcesRepository.findAll().size();

        // Delete the ressources
        restRessourcesMockMvc
            .perform(delete(ENTITY_API_URL_ID, ressources.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ressources> ressourcesList = ressourcesRepository.findAll();
        assertThat(ressourcesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
