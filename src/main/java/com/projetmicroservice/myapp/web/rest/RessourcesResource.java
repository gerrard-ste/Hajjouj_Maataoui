package com.projetmicroservice.myapp.web.rest;

import com.projetmicroservice.myapp.domain.Ressources;
import com.projetmicroservice.myapp.repository.RessourcesRepository;
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
 * REST controller for managing {@link com.projetmicroservice.myapp.domain.Ressources}.
 */
@RestController
@RequestMapping("/api/ressources")
@Transactional
public class RessourcesResource {

    private final Logger log = LoggerFactory.getLogger(RessourcesResource.class);

    private static final String ENTITY_NAME = "projetmicroserviceRessources";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RessourcesRepository ressourcesRepository;

    public RessourcesResource(RessourcesRepository ressourcesRepository) {
        this.ressourcesRepository = ressourcesRepository;
    }

    /**
     * {@code POST  /ressources} : Create a new ressources.
     *
     * @param ressources the ressources to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ressources, or with status {@code 400 (Bad Request)} if the ressources has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Ressources> createRessources(@RequestBody Ressources ressources) throws URISyntaxException {
        log.debug("REST request to save Ressources : {}", ressources);
        if (ressources.getId() != null) {
            throw new BadRequestAlertException("A new ressources cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ressources result = ressourcesRepository.save(ressources);
        return ResponseEntity
            .created(new URI("/api/ressources/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ressources/:id} : Updates an existing ressources.
     *
     * @param id the id of the ressources to save.
     * @param ressources the ressources to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ressources,
     * or with status {@code 400 (Bad Request)} if the ressources is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ressources couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Ressources> updateRessources(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Ressources ressources
    ) throws URISyntaxException {
        log.debug("REST request to update Ressources : {}, {}", id, ressources);
        if (ressources.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ressources.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ressourcesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Ressources result = ressourcesRepository.save(ressources);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ressources.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /ressources/:id} : Partial updates given fields of an existing ressources, field will ignore if it is null
     *
     * @param id the id of the ressources to save.
     * @param ressources the ressources to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ressources,
     * or with status {@code 400 (Bad Request)} if the ressources is not valid,
     * or with status {@code 404 (Not Found)} if the ressources is not found,
     * or with status {@code 500 (Internal Server Error)} if the ressources couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Ressources> partialUpdateRessources(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Ressources ressources
    ) throws URISyntaxException {
        log.debug("REST request to partial update Ressources partially : {}, {}", id, ressources);
        if (ressources.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, ressources.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ressourcesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Ressources> result = ressourcesRepository
            .findById(ressources.getId())
            .map(existingRessources -> {
                if (ressources.getType() != null) {
                    existingRessources.setType(ressources.getType());
                }
                if (ressources.getDisponibilite() != null) {
                    existingRessources.setDisponibilite(ressources.getDisponibilite());
                }

                return existingRessources;
            })
            .map(ressourcesRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ressources.getId().toString())
        );
    }

    /**
     * {@code GET  /ressources} : get all the ressources.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ressources in body.
     */
    @GetMapping("")
    public List<Ressources> getAllRessources() {
        log.debug("REST request to get all Ressources");
        return ressourcesRepository.findAll();
    }

    /**
     * {@code GET  /ressources/:id} : get the "id" ressources.
     *
     * @param id the id of the ressources to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ressources, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Ressources> getRessources(@PathVariable("id") Long id) {
        log.debug("REST request to get Ressources : {}", id);
        Optional<Ressources> ressources = ressourcesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ressources);
    }

    /**
     * {@code DELETE  /ressources/:id} : delete the "id" ressources.
     *
     * @param id the id of the ressources to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRessources(@PathVariable("id") Long id) {
        log.debug("REST request to delete Ressources : {}", id);
        ressourcesRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
