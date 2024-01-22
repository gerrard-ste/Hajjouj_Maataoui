package com.projetmicroservice.myapp.web.rest;

import com.projetmicroservice.myapp.domain.DossierPatient;
import com.projetmicroservice.myapp.repository.DossierPatientRepository;
import com.projetmicroservice.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.projetmicroservice.myapp.domain.DossierPatient}.
 */
@RestController
@RequestMapping("/api/dossier-patients")
@Transactional
public class DossierPatientResource {

    private final Logger log = LoggerFactory.getLogger(DossierPatientResource.class);

    private static final String ENTITY_NAME = "projetmicroserviceDossierPatient";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DossierPatientRepository dossierPatientRepository;

    public DossierPatientResource(DossierPatientRepository dossierPatientRepository) {
        this.dossierPatientRepository = dossierPatientRepository;
    }

    /**
     * {@code POST  /dossier-patients} : Create a new dossierPatient.
     *
     * @param dossierPatient the dossierPatient to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dossierPatient, or with status {@code 400 (Bad Request)} if the dossierPatient has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<DossierPatient> createDossierPatient(@RequestBody DossierPatient dossierPatient) throws URISyntaxException {
        log.debug("REST request to save DossierPatient : {}", dossierPatient);
        if (dossierPatient.getId() != null) {
            throw new BadRequestAlertException("A new dossierPatient cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DossierPatient result = dossierPatientRepository.save(dossierPatient);
        return ResponseEntity
            .created(new URI("/api/dossier-patients/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /dossier-patients/:id} : Updates an existing dossierPatient.
     *
     * @param id the id of the dossierPatient to save.
     * @param dossierPatient the dossierPatient to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dossierPatient,
     * or with status {@code 400 (Bad Request)} if the dossierPatient is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dossierPatient couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<DossierPatient> updateDossierPatient(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody DossierPatient dossierPatient
    ) throws URISyntaxException {
        log.debug("REST request to update DossierPatient : {}, {}", id, dossierPatient);
        if (dossierPatient.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dossierPatient.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dossierPatientRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DossierPatient result = dossierPatientRepository.save(dossierPatient);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, dossierPatient.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /dossier-patients/:id} : Partial updates given fields of an existing dossierPatient, field will ignore if it is null
     *
     * @param id the id of the dossierPatient to save.
     * @param dossierPatient the dossierPatient to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dossierPatient,
     * or with status {@code 400 (Bad Request)} if the dossierPatient is not valid,
     * or with status {@code 404 (Not Found)} if the dossierPatient is not found,
     * or with status {@code 500 (Internal Server Error)} if the dossierPatient couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<DossierPatient> partialUpdateDossierPatient(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody DossierPatient dossierPatient
    ) throws URISyntaxException {
        log.debug("REST request to partial update DossierPatient partially : {}, {}", id, dossierPatient);
        if (dossierPatient.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dossierPatient.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dossierPatientRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DossierPatient> result = dossierPatientRepository
            .findById(dossierPatient.getId())
            .map(existingDossierPatient -> {
                if (dossierPatient.getInformationsPatient() != null) {
                    existingDossierPatient.setInformationsPatient(dossierPatient.getInformationsPatient());
                }
                if (dossierPatient.getOperationsPrevues() != null) {
                    existingDossierPatient.setOperationsPrevues(dossierPatient.getOperationsPrevues());
                }

                return existingDossierPatient;
            })
            .map(dossierPatientRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, dossierPatient.getId().toString())
        );
    }

    /**
     * {@code GET  /dossier-patients} : get all the dossierPatients.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dossierPatients in body.
     */
    @GetMapping("")
    public List<DossierPatient> getAllDossierPatients() {
        log.debug("REST request to get all DossierPatients");
        return dossierPatientRepository.findAll();
    }

    /**
     * {@code GET  /dossier-patients/:id} : get the "id" dossierPatient.
     *
     * @param id the id of the dossierPatient to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dossierPatient, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<DossierPatient> getDossierPatient(@PathVariable("id") Long id) {
        log.debug("REST request to get DossierPatient : {}", id);
        Optional<DossierPatient> dossierPatient = dossierPatientRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dossierPatient);
    }

    /**
     * {@code DELETE  /dossier-patients/:id} : delete the "id" dossierPatient.
     *
     * @param id the id of the dossierPatient to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDossierPatient(@PathVariable("id") Long id) {
        log.debug("REST request to delete DossierPatient : {}", id);
        dossierPatientRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
