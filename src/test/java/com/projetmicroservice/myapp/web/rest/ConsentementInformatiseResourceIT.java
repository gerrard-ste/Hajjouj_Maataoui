package com.projetmicroservice.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.projetmicroservice.myapp.IntegrationTest;
import com.projetmicroservice.myapp.domain.ConsentementInformatise;
import com.projetmicroservice.myapp.repository.ConsentementInformatiseRepository;
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
 * Integration tests for the {@link ConsentementInformatiseResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ConsentementInformatiseResourceIT {

    private static final String DEFAULT_INFORMATIONS_PATIENT = "AAAAAAAAAA";
    private static final String UPDATED_INFORMATIONS_PATIENT = "BBBBBBBBBB";

    private static final Boolean DEFAULT_CONSENTEMENT_OBTENU = false;
    private static final Boolean UPDATED_CONSENTEMENT_OBTENU = true;

    private static final String ENTITY_API_URL = "/api/consentement-informatises";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ConsentementInformatiseRepository consentementInformatiseRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restConsentementInformatiseMockMvc;

    private ConsentementInformatise consentementInformatise;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConsentementInformatise createEntity(EntityManager em) {
        ConsentementInformatise consentementInformatise = new ConsentementInformatise()
            .informationsPatient(DEFAULT_INFORMATIONS_PATIENT)
            .consentementObtenu(DEFAULT_CONSENTEMENT_OBTENU);
        return consentementInformatise;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConsentementInformatise createUpdatedEntity(EntityManager em) {
        ConsentementInformatise consentementInformatise = new ConsentementInformatise()
            .informationsPatient(UPDATED_INFORMATIONS_PATIENT)
            .consentementObtenu(UPDATED_CONSENTEMENT_OBTENU);
        return consentementInformatise;
    }

    @BeforeEach
    public void initTest() {
        consentementInformatise = createEntity(em);
    }

    @Test
    @Transactional
    void createConsentementInformatise() throws Exception {
        int databaseSizeBeforeCreate = consentementInformatiseRepository.findAll().size();
        // Create the ConsentementInformatise
        restConsentementInformatiseMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(consentementInformatise))
            )
            .andExpect(status().isCreated());

        // Validate the ConsentementInformatise in the database
        List<ConsentementInformatise> consentementInformatiseList = consentementInformatiseRepository.findAll();
        assertThat(consentementInformatiseList).hasSize(databaseSizeBeforeCreate + 1);
        ConsentementInformatise testConsentementInformatise = consentementInformatiseList.get(consentementInformatiseList.size() - 1);
        assertThat(testConsentementInformatise.getInformationsPatient()).isEqualTo(DEFAULT_INFORMATIONS_PATIENT);
        assertThat(testConsentementInformatise.getConsentementObtenu()).isEqualTo(DEFAULT_CONSENTEMENT_OBTENU);
    }

    @Test
    @Transactional
    void createConsentementInformatiseWithExistingId() throws Exception {
        // Create the ConsentementInformatise with an existing ID
        consentementInformatise.setId(1L);

        int databaseSizeBeforeCreate = consentementInformatiseRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsentementInformatiseMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(consentementInformatise))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsentementInformatise in the database
        List<ConsentementInformatise> consentementInformatiseList = consentementInformatiseRepository.findAll();
        assertThat(consentementInformatiseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllConsentementInformatises() throws Exception {
        // Initialize the database
        consentementInformatiseRepository.saveAndFlush(consentementInformatise);

        // Get all the consentementInformatiseList
        restConsentementInformatiseMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(consentementInformatise.getId().intValue())))
            .andExpect(jsonPath("$.[*].informationsPatient").value(hasItem(DEFAULT_INFORMATIONS_PATIENT)))
            .andExpect(jsonPath("$.[*].consentementObtenu").value(hasItem(DEFAULT_CONSENTEMENT_OBTENU.booleanValue())));
    }

    @Test
    @Transactional
    void getConsentementInformatise() throws Exception {
        // Initialize the database
        consentementInformatiseRepository.saveAndFlush(consentementInformatise);

        // Get the consentementInformatise
        restConsentementInformatiseMockMvc
            .perform(get(ENTITY_API_URL_ID, consentementInformatise.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(consentementInformatise.getId().intValue()))
            .andExpect(jsonPath("$.informationsPatient").value(DEFAULT_INFORMATIONS_PATIENT))
            .andExpect(jsonPath("$.consentementObtenu").value(DEFAULT_CONSENTEMENT_OBTENU.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingConsentementInformatise() throws Exception {
        // Get the consentementInformatise
        restConsentementInformatiseMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingConsentementInformatise() throws Exception {
        // Initialize the database
        consentementInformatiseRepository.saveAndFlush(consentementInformatise);

        int databaseSizeBeforeUpdate = consentementInformatiseRepository.findAll().size();

        // Update the consentementInformatise
        ConsentementInformatise updatedConsentementInformatise = consentementInformatiseRepository
            .findById(consentementInformatise.getId())
            .orElseThrow();
        // Disconnect from session so that the updates on updatedConsentementInformatise are not directly saved in db
        em.detach(updatedConsentementInformatise);
        updatedConsentementInformatise.informationsPatient(UPDATED_INFORMATIONS_PATIENT).consentementObtenu(UPDATED_CONSENTEMENT_OBTENU);

        restConsentementInformatiseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedConsentementInformatise.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedConsentementInformatise))
            )
            .andExpect(status().isOk());

        // Validate the ConsentementInformatise in the database
        List<ConsentementInformatise> consentementInformatiseList = consentementInformatiseRepository.findAll();
        assertThat(consentementInformatiseList).hasSize(databaseSizeBeforeUpdate);
        ConsentementInformatise testConsentementInformatise = consentementInformatiseList.get(consentementInformatiseList.size() - 1);
        assertThat(testConsentementInformatise.getInformationsPatient()).isEqualTo(UPDATED_INFORMATIONS_PATIENT);
        assertThat(testConsentementInformatise.getConsentementObtenu()).isEqualTo(UPDATED_CONSENTEMENT_OBTENU);
    }

    @Test
    @Transactional
    void putNonExistingConsentementInformatise() throws Exception {
        int databaseSizeBeforeUpdate = consentementInformatiseRepository.findAll().size();
        consentementInformatise.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsentementInformatiseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, consentementInformatise.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(consentementInformatise))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsentementInformatise in the database
        List<ConsentementInformatise> consentementInformatiseList = consentementInformatiseRepository.findAll();
        assertThat(consentementInformatiseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchConsentementInformatise() throws Exception {
        int databaseSizeBeforeUpdate = consentementInformatiseRepository.findAll().size();
        consentementInformatise.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConsentementInformatiseMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(consentementInformatise))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsentementInformatise in the database
        List<ConsentementInformatise> consentementInformatiseList = consentementInformatiseRepository.findAll();
        assertThat(consentementInformatiseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamConsentementInformatise() throws Exception {
        int databaseSizeBeforeUpdate = consentementInformatiseRepository.findAll().size();
        consentementInformatise.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConsentementInformatiseMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(consentementInformatise))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ConsentementInformatise in the database
        List<ConsentementInformatise> consentementInformatiseList = consentementInformatiseRepository.findAll();
        assertThat(consentementInformatiseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateConsentementInformatiseWithPatch() throws Exception {
        // Initialize the database
        consentementInformatiseRepository.saveAndFlush(consentementInformatise);

        int databaseSizeBeforeUpdate = consentementInformatiseRepository.findAll().size();

        // Update the consentementInformatise using partial update
        ConsentementInformatise partialUpdatedConsentementInformatise = new ConsentementInformatise();
        partialUpdatedConsentementInformatise.setId(consentementInformatise.getId());

        partialUpdatedConsentementInformatise.informationsPatient(UPDATED_INFORMATIONS_PATIENT);

        restConsentementInformatiseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedConsentementInformatise.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedConsentementInformatise))
            )
            .andExpect(status().isOk());

        // Validate the ConsentementInformatise in the database
        List<ConsentementInformatise> consentementInformatiseList = consentementInformatiseRepository.findAll();
        assertThat(consentementInformatiseList).hasSize(databaseSizeBeforeUpdate);
        ConsentementInformatise testConsentementInformatise = consentementInformatiseList.get(consentementInformatiseList.size() - 1);
        assertThat(testConsentementInformatise.getInformationsPatient()).isEqualTo(UPDATED_INFORMATIONS_PATIENT);
        assertThat(testConsentementInformatise.getConsentementObtenu()).isEqualTo(DEFAULT_CONSENTEMENT_OBTENU);
    }

    @Test
    @Transactional
    void fullUpdateConsentementInformatiseWithPatch() throws Exception {
        // Initialize the database
        consentementInformatiseRepository.saveAndFlush(consentementInformatise);

        int databaseSizeBeforeUpdate = consentementInformatiseRepository.findAll().size();

        // Update the consentementInformatise using partial update
        ConsentementInformatise partialUpdatedConsentementInformatise = new ConsentementInformatise();
        partialUpdatedConsentementInformatise.setId(consentementInformatise.getId());

        partialUpdatedConsentementInformatise
            .informationsPatient(UPDATED_INFORMATIONS_PATIENT)
            .consentementObtenu(UPDATED_CONSENTEMENT_OBTENU);

        restConsentementInformatiseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedConsentementInformatise.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedConsentementInformatise))
            )
            .andExpect(status().isOk());

        // Validate the ConsentementInformatise in the database
        List<ConsentementInformatise> consentementInformatiseList = consentementInformatiseRepository.findAll();
        assertThat(consentementInformatiseList).hasSize(databaseSizeBeforeUpdate);
        ConsentementInformatise testConsentementInformatise = consentementInformatiseList.get(consentementInformatiseList.size() - 1);
        assertThat(testConsentementInformatise.getInformationsPatient()).isEqualTo(UPDATED_INFORMATIONS_PATIENT);
        assertThat(testConsentementInformatise.getConsentementObtenu()).isEqualTo(UPDATED_CONSENTEMENT_OBTENU);
    }

    @Test
    @Transactional
    void patchNonExistingConsentementInformatise() throws Exception {
        int databaseSizeBeforeUpdate = consentementInformatiseRepository.findAll().size();
        consentementInformatise.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsentementInformatiseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, consentementInformatise.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(consentementInformatise))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsentementInformatise in the database
        List<ConsentementInformatise> consentementInformatiseList = consentementInformatiseRepository.findAll();
        assertThat(consentementInformatiseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchConsentementInformatise() throws Exception {
        int databaseSizeBeforeUpdate = consentementInformatiseRepository.findAll().size();
        consentementInformatise.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConsentementInformatiseMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(consentementInformatise))
            )
            .andExpect(status().isBadRequest());

        // Validate the ConsentementInformatise in the database
        List<ConsentementInformatise> consentementInformatiseList = consentementInformatiseRepository.findAll();
        assertThat(consentementInformatiseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamConsentementInformatise() throws Exception {
        int databaseSizeBeforeUpdate = consentementInformatiseRepository.findAll().size();
        consentementInformatise.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConsentementInformatiseMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(consentementInformatise))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ConsentementInformatise in the database
        List<ConsentementInformatise> consentementInformatiseList = consentementInformatiseRepository.findAll();
        assertThat(consentementInformatiseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteConsentementInformatise() throws Exception {
        // Initialize the database
        consentementInformatiseRepository.saveAndFlush(consentementInformatise);

        int databaseSizeBeforeDelete = consentementInformatiseRepository.findAll().size();

        // Delete the consentementInformatise
        restConsentementInformatiseMockMvc
            .perform(delete(ENTITY_API_URL_ID, consentementInformatise.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ConsentementInformatise> consentementInformatiseList = consentementInformatiseRepository.findAll();
        assertThat(consentementInformatiseList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
