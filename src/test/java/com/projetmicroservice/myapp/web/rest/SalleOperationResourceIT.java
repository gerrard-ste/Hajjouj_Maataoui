package com.projetmicroservice.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.projetmicroservice.myapp.IntegrationTest;
import com.projetmicroservice.myapp.domain.SalleOperation;
import com.projetmicroservice.myapp.repository.SalleOperationRepository;
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
 * Integration tests for the {@link SalleOperationResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SalleOperationResourceIT {

    private static final String DEFAULT_EQUIPEMENTS_DISPONIBLES = "AAAAAAAAAA";
    private static final String UPDATED_EQUIPEMENTS_DISPONIBLES = "BBBBBBBBBB";

    private static final Boolean DEFAULT_DISPONIBILITE = false;
    private static final Boolean UPDATED_DISPONIBILITE = true;

    private static final String ENTITY_API_URL = "/api/salle-operations";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SalleOperationRepository salleOperationRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSalleOperationMockMvc;

    private SalleOperation salleOperation;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SalleOperation createEntity(EntityManager em) {
        SalleOperation salleOperation = new SalleOperation()
            .equipementsDisponibles(DEFAULT_EQUIPEMENTS_DISPONIBLES)
            .disponibilite(DEFAULT_DISPONIBILITE);
        return salleOperation;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SalleOperation createUpdatedEntity(EntityManager em) {
        SalleOperation salleOperation = new SalleOperation()
            .equipementsDisponibles(UPDATED_EQUIPEMENTS_DISPONIBLES)
            .disponibilite(UPDATED_DISPONIBILITE);
        return salleOperation;
    }

    @BeforeEach
    public void initTest() {
        salleOperation = createEntity(em);
    }

    @Test
    @Transactional
    void createSalleOperation() throws Exception {
        int databaseSizeBeforeCreate = salleOperationRepository.findAll().size();
        // Create the SalleOperation
        restSalleOperationMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(salleOperation))
            )
            .andExpect(status().isCreated());

        // Validate the SalleOperation in the database
        List<SalleOperation> salleOperationList = salleOperationRepository.findAll();
        assertThat(salleOperationList).hasSize(databaseSizeBeforeCreate + 1);
        SalleOperation testSalleOperation = salleOperationList.get(salleOperationList.size() - 1);
        assertThat(testSalleOperation.getEquipementsDisponibles()).isEqualTo(DEFAULT_EQUIPEMENTS_DISPONIBLES);
        assertThat(testSalleOperation.getDisponibilite()).isEqualTo(DEFAULT_DISPONIBILITE);
    }

    @Test
    @Transactional
    void createSalleOperationWithExistingId() throws Exception {
        // Create the SalleOperation with an existing ID
        salleOperation.setId(1L);

        int databaseSizeBeforeCreate = salleOperationRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSalleOperationMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(salleOperation))
            )
            .andExpect(status().isBadRequest());

        // Validate the SalleOperation in the database
        List<SalleOperation> salleOperationList = salleOperationRepository.findAll();
        assertThat(salleOperationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSalleOperations() throws Exception {
        // Initialize the database
        salleOperationRepository.saveAndFlush(salleOperation);

        // Get all the salleOperationList
        restSalleOperationMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(salleOperation.getId().intValue())))
            .andExpect(jsonPath("$.[*].equipementsDisponibles").value(hasItem(DEFAULT_EQUIPEMENTS_DISPONIBLES)))
            .andExpect(jsonPath("$.[*].disponibilite").value(hasItem(DEFAULT_DISPONIBILITE.booleanValue())));
    }

    @Test
    @Transactional
    void getSalleOperation() throws Exception {
        // Initialize the database
        salleOperationRepository.saveAndFlush(salleOperation);

        // Get the salleOperation
        restSalleOperationMockMvc
            .perform(get(ENTITY_API_URL_ID, salleOperation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(salleOperation.getId().intValue()))
            .andExpect(jsonPath("$.equipementsDisponibles").value(DEFAULT_EQUIPEMENTS_DISPONIBLES))
            .andExpect(jsonPath("$.disponibilite").value(DEFAULT_DISPONIBILITE.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingSalleOperation() throws Exception {
        // Get the salleOperation
        restSalleOperationMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingSalleOperation() throws Exception {
        // Initialize the database
        salleOperationRepository.saveAndFlush(salleOperation);

        int databaseSizeBeforeUpdate = salleOperationRepository.findAll().size();

        // Update the salleOperation
        SalleOperation updatedSalleOperation = salleOperationRepository.findById(salleOperation.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedSalleOperation are not directly saved in db
        em.detach(updatedSalleOperation);
        updatedSalleOperation.equipementsDisponibles(UPDATED_EQUIPEMENTS_DISPONIBLES).disponibilite(UPDATED_DISPONIBILITE);

        restSalleOperationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSalleOperation.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSalleOperation))
            )
            .andExpect(status().isOk());

        // Validate the SalleOperation in the database
        List<SalleOperation> salleOperationList = salleOperationRepository.findAll();
        assertThat(salleOperationList).hasSize(databaseSizeBeforeUpdate);
        SalleOperation testSalleOperation = salleOperationList.get(salleOperationList.size() - 1);
        assertThat(testSalleOperation.getEquipementsDisponibles()).isEqualTo(UPDATED_EQUIPEMENTS_DISPONIBLES);
        assertThat(testSalleOperation.getDisponibilite()).isEqualTo(UPDATED_DISPONIBILITE);
    }

    @Test
    @Transactional
    void putNonExistingSalleOperation() throws Exception {
        int databaseSizeBeforeUpdate = salleOperationRepository.findAll().size();
        salleOperation.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSalleOperationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, salleOperation.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(salleOperation))
            )
            .andExpect(status().isBadRequest());

        // Validate the SalleOperation in the database
        List<SalleOperation> salleOperationList = salleOperationRepository.findAll();
        assertThat(salleOperationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSalleOperation() throws Exception {
        int databaseSizeBeforeUpdate = salleOperationRepository.findAll().size();
        salleOperation.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSalleOperationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(salleOperation))
            )
            .andExpect(status().isBadRequest());

        // Validate the SalleOperation in the database
        List<SalleOperation> salleOperationList = salleOperationRepository.findAll();
        assertThat(salleOperationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSalleOperation() throws Exception {
        int databaseSizeBeforeUpdate = salleOperationRepository.findAll().size();
        salleOperation.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSalleOperationMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(salleOperation)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the SalleOperation in the database
        List<SalleOperation> salleOperationList = salleOperationRepository.findAll();
        assertThat(salleOperationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSalleOperationWithPatch() throws Exception {
        // Initialize the database
        salleOperationRepository.saveAndFlush(salleOperation);

        int databaseSizeBeforeUpdate = salleOperationRepository.findAll().size();

        // Update the salleOperation using partial update
        SalleOperation partialUpdatedSalleOperation = new SalleOperation();
        partialUpdatedSalleOperation.setId(salleOperation.getId());

        partialUpdatedSalleOperation.equipementsDisponibles(UPDATED_EQUIPEMENTS_DISPONIBLES).disponibilite(UPDATED_DISPONIBILITE);

        restSalleOperationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSalleOperation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSalleOperation))
            )
            .andExpect(status().isOk());

        // Validate the SalleOperation in the database
        List<SalleOperation> salleOperationList = salleOperationRepository.findAll();
        assertThat(salleOperationList).hasSize(databaseSizeBeforeUpdate);
        SalleOperation testSalleOperation = salleOperationList.get(salleOperationList.size() - 1);
        assertThat(testSalleOperation.getEquipementsDisponibles()).isEqualTo(UPDATED_EQUIPEMENTS_DISPONIBLES);
        assertThat(testSalleOperation.getDisponibilite()).isEqualTo(UPDATED_DISPONIBILITE);
    }

    @Test
    @Transactional
    void fullUpdateSalleOperationWithPatch() throws Exception {
        // Initialize the database
        salleOperationRepository.saveAndFlush(salleOperation);

        int databaseSizeBeforeUpdate = salleOperationRepository.findAll().size();

        // Update the salleOperation using partial update
        SalleOperation partialUpdatedSalleOperation = new SalleOperation();
        partialUpdatedSalleOperation.setId(salleOperation.getId());

        partialUpdatedSalleOperation.equipementsDisponibles(UPDATED_EQUIPEMENTS_DISPONIBLES).disponibilite(UPDATED_DISPONIBILITE);

        restSalleOperationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSalleOperation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSalleOperation))
            )
            .andExpect(status().isOk());

        // Validate the SalleOperation in the database
        List<SalleOperation> salleOperationList = salleOperationRepository.findAll();
        assertThat(salleOperationList).hasSize(databaseSizeBeforeUpdate);
        SalleOperation testSalleOperation = salleOperationList.get(salleOperationList.size() - 1);
        assertThat(testSalleOperation.getEquipementsDisponibles()).isEqualTo(UPDATED_EQUIPEMENTS_DISPONIBLES);
        assertThat(testSalleOperation.getDisponibilite()).isEqualTo(UPDATED_DISPONIBILITE);
    }

    @Test
    @Transactional
    void patchNonExistingSalleOperation() throws Exception {
        int databaseSizeBeforeUpdate = salleOperationRepository.findAll().size();
        salleOperation.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSalleOperationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, salleOperation.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(salleOperation))
            )
            .andExpect(status().isBadRequest());

        // Validate the SalleOperation in the database
        List<SalleOperation> salleOperationList = salleOperationRepository.findAll();
        assertThat(salleOperationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSalleOperation() throws Exception {
        int databaseSizeBeforeUpdate = salleOperationRepository.findAll().size();
        salleOperation.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSalleOperationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(salleOperation))
            )
            .andExpect(status().isBadRequest());

        // Validate the SalleOperation in the database
        List<SalleOperation> salleOperationList = salleOperationRepository.findAll();
        assertThat(salleOperationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSalleOperation() throws Exception {
        int databaseSizeBeforeUpdate = salleOperationRepository.findAll().size();
        salleOperation.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSalleOperationMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(salleOperation))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the SalleOperation in the database
        List<SalleOperation> salleOperationList = salleOperationRepository.findAll();
        assertThat(salleOperationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSalleOperation() throws Exception {
        // Initialize the database
        salleOperationRepository.saveAndFlush(salleOperation);

        int databaseSizeBeforeDelete = salleOperationRepository.findAll().size();

        // Delete the salleOperation
        restSalleOperationMockMvc
            .perform(delete(ENTITY_API_URL_ID, salleOperation.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SalleOperation> salleOperationList = salleOperationRepository.findAll();
        assertThat(salleOperationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
