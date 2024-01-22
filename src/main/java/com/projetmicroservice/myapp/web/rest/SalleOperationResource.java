package com.projetmicroservice.myapp.web.rest;

import com.projetmicroservice.myapp.domain.SalleOperation;
import com.projetmicroservice.myapp.repository.SalleOperationRepository;
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
 * REST controller for managing {@link com.projetmicroservice.myapp.domain.SalleOperation}.
 */
@RestController
@RequestMapping("/api/salle-operations")
@Transactional
public class SalleOperationResource {

    private final Logger log = LoggerFactory.getLogger(SalleOperationResource.class);

    private static final String ENTITY_NAME = "projetmicroserviceSalleOperation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SalleOperationRepository salleOperationRepository;

    public SalleOperationResource(SalleOperationRepository salleOperationRepository) {
        this.salleOperationRepository = salleOperationRepository;
    }

    /**
     * {@code POST  /salle-operations} : Create a new salleOperation.
     *
     * @param salleOperation the salleOperation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new salleOperation, or with status {@code 400 (Bad Request)} if the salleOperation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<SalleOperation> createSalleOperation(@RequestBody SalleOperation salleOperation) throws URISyntaxException {
        log.debug("REST request to save SalleOperation : {}", salleOperation);
        if (salleOperation.getId() != null) {
            throw new BadRequestAlertException("A new salleOperation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SalleOperation result = salleOperationRepository.save(salleOperation);
        return ResponseEntity
            .created(new URI("/api/salle-operations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /salle-operations/:id} : Updates an existing salleOperation.
     *
     * @param id the id of the salleOperation to save.
     * @param salleOperation the salleOperation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated salleOperation,
     * or with status {@code 400 (Bad Request)} if the salleOperation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the salleOperation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<SalleOperation> updateSalleOperation(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SalleOperation salleOperation
    ) throws URISyntaxException {
        log.debug("REST request to update SalleOperation : {}, {}", id, salleOperation);
        if (salleOperation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, salleOperation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!salleOperationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        SalleOperation result = salleOperationRepository.save(salleOperation);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, salleOperation.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /salle-operations/:id} : Partial updates given fields of an existing salleOperation, field will ignore if it is null
     *
     * @param id the id of the salleOperation to save.
     * @param salleOperation the salleOperation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated salleOperation,
     * or with status {@code 400 (Bad Request)} if the salleOperation is not valid,
     * or with status {@code 404 (Not Found)} if the salleOperation is not found,
     * or with status {@code 500 (Internal Server Error)} if the salleOperation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SalleOperation> partialUpdateSalleOperation(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SalleOperation salleOperation
    ) throws URISyntaxException {
        log.debug("REST request to partial update SalleOperation partially : {}, {}", id, salleOperation);
        if (salleOperation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, salleOperation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!salleOperationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SalleOperation> result = salleOperationRepository
            .findById(salleOperation.getId())
            .map(existingSalleOperation -> {
                if (salleOperation.getEquipementsDisponibles() != null) {
                    existingSalleOperation.setEquipementsDisponibles(salleOperation.getEquipementsDisponibles());
                }
                if (salleOperation.getDisponibilite() != null) {
                    existingSalleOperation.setDisponibilite(salleOperation.getDisponibilite());
                }

                return existingSalleOperation;
            })
            .map(salleOperationRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, salleOperation.getId().toString())
        );
    }

    /**
     * {@code GET  /salle-operations} : get all the salleOperations.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of salleOperations in body.
     */
    @GetMapping("")
    public List<SalleOperation> getAllSalleOperations() {
        log.debug("REST request to get all SalleOperations");
        return salleOperationRepository.findAll();
    }

    /**
     * {@code GET  /salle-operations/:id} : get the "id" salleOperation.
     *
     * @param id the id of the salleOperation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the salleOperation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<SalleOperation> getSalleOperation(@PathVariable("id") Long id) {
        log.debug("REST request to get SalleOperation : {}", id);
        Optional<SalleOperation> salleOperation = salleOperationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(salleOperation);
    }

    /**
     * {@code DELETE  /salle-operations/:id} : delete the "id" salleOperation.
     *
     * @param id the id of the salleOperation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSalleOperation(@PathVariable("id") Long id) {
        log.debug("REST request to delete SalleOperation : {}", id);
        salleOperationRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
