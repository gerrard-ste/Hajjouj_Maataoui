package com.projetmicroservice.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.projetmicroservice.myapp.IntegrationTest;
import com.projetmicroservice.myapp.domain.DossierPatient;
import com.projetmicroservice.myapp.repository.DossierPatientRepository;
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
 * Integration tests for the {@link DossierPatientResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DossierPatientResourceIT {

    private static final String DEFAULT_INFORMATIONS_PATIENT = "AAAAAAAAAA";
    private static final String UPDATED_INFORMATIONS_PATIENT = "BBBBBBBBBB";

    private static final String DEFAULT_OPERATIONS_PREVUES = "AAAAAAAAAA";
    private static final String UPDATED_OPERATIONS_PREVUES = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/dossier-patients";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DossierPatientRepository dossierPatientRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDossierPatientMockMvc;

    private DossierPatient dossierPatient;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DossierPatient createEntity(EntityManager em) {
        DossierPatient dossierPatient = new DossierPatient()
            .informationsPatient(DEFAULT_INFORMATIONS_PATIENT)
            .operationsPrevues(DEFAULT_OPERATIONS_PREVUES);
        return dossierPatient;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DossierPatient createUpdatedEntity(EntityManager em) {
        DossierPatient dossierPatient = new DossierPatient()
            .informationsPatient(UPDATED_INFORMATIONS_PATIENT)
            .operationsPrevues(UPDATED_OPERATIONS_PREVUES);
        return dossierPatient;
    }

    @BeforeEach
    public void initTest() {
        dossierPatient = createEntity(em);
    }

    @Test
    @Transactional
    void createDossierPatient() throws Exception {
        int databaseSizeBeforeCreate = dossierPatientRepository.findAll().size();
        // Create the DossierPatient
        restDossierPatientMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(dossierPatient))
            )
            .andExpect(status().isCreated());

        // Validate the DossierPatient in the database
        List<DossierPatient> dossierPatientList = dossierPatientRepository.findAll();
        assertThat(dossierPatientList).hasSize(databaseSizeBeforeCreate + 1);
        DossierPatient testDossierPatient = dossierPatientList.get(dossierPatientList.size() - 1);
        assertThat(testDossierPatient.getInformationsPatient()).isEqualTo(DEFAULT_INFORMATIONS_PATIENT);
        assertThat(testDossierPatient.getOperationsPrevues()).isEqualTo(DEFAULT_OPERATIONS_PREVUES);
    }

    @Test
    @Transactional
    void createDossierPatientWithExistingId() throws Exception {
        // Create the DossierPatient with an existing ID
        dossierPatient.setId(1L);

        int databaseSizeBeforeCreate = dossierPatientRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDossierPatientMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(dossierPatient))
            )
            .andExpect(status().isBadRequest());

        // Validate the DossierPatient in the database
        List<DossierPatient> dossierPatientList = dossierPatientRepository.findAll();
        assertThat(dossierPatientList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDossierPatients() throws Exception {
        // Initialize the database
        dossierPatientRepository.saveAndFlush(dossierPatient);

        // Get all the dossierPatientList
        restDossierPatientMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dossierPatient.getId().intValue())))
            .andExpect(jsonPath("$.[*].informationsPatient").value(hasItem(DEFAULT_INFORMATIONS_PATIENT)))
            .andExpect(jsonPath("$.[*].operationsPrevues").value(hasItem(DEFAULT_OPERATIONS_PREVUES)));
    }

    @Test
    @Transactional
    void getDossierPatient() throws Exception {
        // Initialize the database
        dossierPatientRepository.saveAndFlush(dossierPatient);

        // Get the dossierPatient
        restDossierPatientMockMvc
            .perform(get(ENTITY_API_URL_ID, dossierPatient.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(dossierPatient.getId().intValue()))
            .andExpect(jsonPath("$.informationsPatient").value(DEFAULT_INFORMATIONS_PATIENT))
            .andExpect(jsonPath("$.operationsPrevues").value(DEFAULT_OPERATIONS_PREVUES));
    }

    @Test
    @Transactional
    void getNonExistingDossierPatient() throws Exception {
        // Get the dossierPatient
        restDossierPatientMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingDossierPatient() throws Exception {
        // Initialize the database
        dossierPatientRepository.saveAndFlush(dossierPatient);

        int databaseSizeBeforeUpdate = dossierPatientRepository.findAll().size();

        // Update the dossierPatient
        DossierPatient updatedDossierPatient = dossierPatientRepository.findById(dossierPatient.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedDossierPatient are not directly saved in db
        em.detach(updatedDossierPatient);
        updatedDossierPatient.informationsPatient(UPDATED_INFORMATIONS_PATIENT).operationsPrevues(UPDATED_OPERATIONS_PREVUES);

        restDossierPatientMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDossierPatient.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDossierPatient))
            )
            .andExpect(status().isOk());

        // Validate the DossierPatient in the database
        List<DossierPatient> dossierPatientList = dossierPatientRepository.findAll();
        assertThat(dossierPatientList).hasSize(databaseSizeBeforeUpdate);
        DossierPatient testDossierPatient = dossierPatientList.get(dossierPatientList.size() - 1);
        assertThat(testDossierPatient.getInformationsPatient()).isEqualTo(UPDATED_INFORMATIONS_PATIENT);
        assertThat(testDossierPatient.getOperationsPrevues()).isEqualTo(UPDATED_OPERATIONS_PREVUES);
    }

    @Test
    @Transactional
    void putNonExistingDossierPatient() throws Exception {
        int databaseSizeBeforeUpdate = dossierPatientRepository.findAll().size();
        dossierPatient.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDossierPatientMockMvc
            .perform(
                put(ENTITY_API_URL_ID, dossierPatient.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(dossierPatient))
            )
            .andExpect(status().isBadRequest());

        // Validate the DossierPatient in the database
        List<DossierPatient> dossierPatientList = dossierPatientRepository.findAll();
        assertThat(dossierPatientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDossierPatient() throws Exception {
        int databaseSizeBeforeUpdate = dossierPatientRepository.findAll().size();
        dossierPatient.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDossierPatientMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(dossierPatient))
            )
            .andExpect(status().isBadRequest());

        // Validate the DossierPatient in the database
        List<DossierPatient> dossierPatientList = dossierPatientRepository.findAll();
        assertThat(dossierPatientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDossierPatient() throws Exception {
        int databaseSizeBeforeUpdate = dossierPatientRepository.findAll().size();
        dossierPatient.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDossierPatientMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(dossierPatient)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the DossierPatient in the database
        List<DossierPatient> dossierPatientList = dossierPatientRepository.findAll();
        assertThat(dossierPatientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDossierPatientWithPatch() throws Exception {
        // Initialize the database
        dossierPatientRepository.saveAndFlush(dossierPatient);

        int databaseSizeBeforeUpdate = dossierPatientRepository.findAll().size();

        // Update the dossierPatient using partial update
        DossierPatient partialUpdatedDossierPatient = new DossierPatient();
        partialUpdatedDossierPatient.setId(dossierPatient.getId());

        partialUpdatedDossierPatient.operationsPrevues(UPDATED_OPERATIONS_PREVUES);

        restDossierPatientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDossierPatient.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDossierPatient))
            )
            .andExpect(status().isOk());

        // Validate the DossierPatient in the database
        List<DossierPatient> dossierPatientList = dossierPatientRepository.findAll();
        assertThat(dossierPatientList).hasSize(databaseSizeBeforeUpdate);
        DossierPatient testDossierPatient = dossierPatientList.get(dossierPatientList.size() - 1);
        assertThat(testDossierPatient.getInformationsPatient()).isEqualTo(DEFAULT_INFORMATIONS_PATIENT);
        assertThat(testDossierPatient.getOperationsPrevues()).isEqualTo(UPDATED_OPERATIONS_PREVUES);
    }

    @Test
    @Transactional
    void fullUpdateDossierPatientWithPatch() throws Exception {
        // Initialize the database
        dossierPatientRepository.saveAndFlush(dossierPatient);

        int databaseSizeBeforeUpdate = dossierPatientRepository.findAll().size();

        // Update the dossierPatient using partial update
        DossierPatient partialUpdatedDossierPatient = new DossierPatient();
        partialUpdatedDossierPatient.setId(dossierPatient.getId());

        partialUpdatedDossierPatient.informationsPatient(UPDATED_INFORMATIONS_PATIENT).operationsPrevues(UPDATED_OPERATIONS_PREVUES);

        restDossierPatientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDossierPatient.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDossierPatient))
            )
            .andExpect(status().isOk());

        // Validate the DossierPatient in the database
        List<DossierPatient> dossierPatientList = dossierPatientRepository.findAll();
        assertThat(dossierPatientList).hasSize(databaseSizeBeforeUpdate);
        DossierPatient testDossierPatient = dossierPatientList.get(dossierPatientList.size() - 1);
        assertThat(testDossierPatient.getInformationsPatient()).isEqualTo(UPDATED_INFORMATIONS_PATIENT);
        assertThat(testDossierPatient.getOperationsPrevues()).isEqualTo(UPDATED_OPERATIONS_PREVUES);
    }

    @Test
    @Transactional
    void patchNonExistingDossierPatient() throws Exception {
        int databaseSizeBeforeUpdate = dossierPatientRepository.findAll().size();
        dossierPatient.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDossierPatientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, dossierPatient.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(dossierPatient))
            )
            .andExpect(status().isBadRequest());

        // Validate the DossierPatient in the database
        List<DossierPatient> dossierPatientList = dossierPatientRepository.findAll();
        assertThat(dossierPatientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDossierPatient() throws Exception {
        int databaseSizeBeforeUpdate = dossierPatientRepository.findAll().size();
        dossierPatient.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDossierPatientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(dossierPatient))
            )
            .andExpect(status().isBadRequest());

        // Validate the DossierPatient in the database
        List<DossierPatient> dossierPatientList = dossierPatientRepository.findAll();
        assertThat(dossierPatientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDossierPatient() throws Exception {
        int databaseSizeBeforeUpdate = dossierPatientRepository.findAll().size();
        dossierPatient.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDossierPatientMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(dossierPatient))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DossierPatient in the database
        List<DossierPatient> dossierPatientList = dossierPatientRepository.findAll();
        assertThat(dossierPatientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDossierPatient() throws Exception {
        // Initialize the database
        dossierPatientRepository.saveAndFlush(dossierPatient);

        int databaseSizeBeforeDelete = dossierPatientRepository.findAll().size();

        // Delete the dossierPatient
        restDossierPatientMockMvc
            .perform(delete(ENTITY_API_URL_ID, dossierPatient.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DossierPatient> dossierPatientList = dossierPatientRepository.findAll();
        assertThat(dossierPatientList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
