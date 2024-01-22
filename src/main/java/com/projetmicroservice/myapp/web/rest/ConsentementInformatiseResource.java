package com.projetmicroservice.myapp.web.rest;

import com.projetmicroservice.myapp.domain.ConsentementInformatise;
import com.projetmicroservice.myapp.repository.ConsentementInformatiseRepository;
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
 * REST controller for managing {@link com.projetmicroservice.myapp.domain.ConsentementInformatise}.
 */
@RestController
@RequestMapping("/api/consentement-informatises")
@Transactional
public class ConsentementInformatiseResource {

    private final Logger log = LoggerFactory.getLogger(ConsentementInformatiseResource.class);

    private static final String ENTITY_NAME = "projetmicroserviceConsentementInformatise";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConsentementInformatiseRepository consentementInformatiseRepository;

    public ConsentementInformatiseResource(ConsentementInformatiseRepository consentementInformatiseRepository) {
        this.consentementInformatiseRepository = consentementInformatiseRepository;
    }

    /**
     * {@code POST  /consentement-informatises} : Create a new consentementInformatise.
     *
     * @param consentementInformatise the consentementInformatise to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new consentementInformatise, or with status {@code 400 (Bad Request)} if the consentementInformatise has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<ConsentementInformatise> createConsentementInformatise(
        @RequestBody ConsentementInformatise consentementInformatise
    ) throws URISyntaxException {
        log.debug("REST request to save ConsentementInformatise : {}", consentementInformatise);
        if (consentementInformatise.getId() != null) {
            throw new BadRequestAlertException("A new consentementInformatise cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ConsentementInformatise result = consentementInformatiseRepository.save(consentementInformatise);
        return ResponseEntity
            .created(new URI("/api/consentement-informatises/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /consentement-informatises/:id} : Updates an existing consentementInformatise.
     *
     * @param id the id of the consentementInformatise to save.
     * @param consentementInformatise the consentementInformatise to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated consentementInformatise,
     * or with status {@code 400 (Bad Request)} if the consentementInformatise is not valid,
     * or with status {@code 500 (Internal Server Error)} if the consentementInformatise couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ConsentementInformatise> updateConsentementInformatise(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ConsentementInformatise consentementInformatise
    ) throws URISyntaxException {
        log.debug("REST request to update ConsentementInformatise : {}, {}", id, consentementInformatise);
        if (consentementInformatise.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, consentementInformatise.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!consentementInformatiseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ConsentementInformatise result = consentementInformatiseRepository.save(consentementInformatise);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, consentementInformatise.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /consentement-informatises/:id} : Partial updates given fields of an existing consentementInformatise, field will ignore if it is null
     *
     * @param id the id of the consentementInformatise to save.
     * @param consentementInformatise the consentementInformatise to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated consentementInformatise,
     * or with status {@code 400 (Bad Request)} if the consentementInformatise is not valid,
     * or with status {@code 404 (Not Found)} if the consentementInformatise is not found,
     * or with status {@code 500 (Internal Server Error)} if the consentementInformatise couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ConsentementInformatise> partialUpdateConsentementInformatise(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ConsentementInformatise consentementInformatise
    ) throws URISyntaxException {
        log.debug("REST request to partial update ConsentementInformatise partially : {}, {}", id, consentementInformatise);
        if (consentementInformatise.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, consentementInformatise.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!consentementInformatiseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ConsentementInformatise> result = consentementInformatiseRepository
            .findById(consentementInformatise.getId())
            .map(existingConsentementInformatise -> {
                if (consentementInformatise.getInformationsPatient() != null) {
                    existingConsentementInformatise.setInformationsPatient(consentementInformatise.getInformationsPatient());
                }
                if (consentementInformatise.getConsentementObtenu() != null) {
                    existingConsentementInformatise.setConsentementObtenu(consentementInformatise.getConsentementObtenu());
                }

                return existingConsentementInformatise;
            })
            .map(consentementInformatiseRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, consentementInformatise.getId().toString())
        );
    }

    /**
     * {@code GET  /consentement-informatises} : get all the consentementInformatises.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of consentementInformatises in body.
     */
    @GetMapping("")
    public List<ConsentementInformatise> getAllConsentementInformatises() {
        log.debug("REST request to get all ConsentementInformatises");
        return consentementInformatiseRepository.findAll();
    }

    /**
     * {@code GET  /consentement-informatises/:id} : get the "id" consentementInformatise.
     *
     * @param id the id of the consentementInformatise to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the consentementInformatise, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ConsentementInformatise> getConsentementInformatise(@PathVariable("id") Long id) {
        log.debug("REST request to get ConsentementInformatise : {}", id);
        Optional<ConsentementInformatise> consentementInformatise = consentementInformatiseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(consentementInformatise);
    }

    /**
     * {@code DELETE  /consentement-informatises/:id} : delete the "id" consentementInformatise.
     *
     * @param id the id of the consentementInformatise to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConsentementInformatise(@PathVariable("id") Long id) {
        log.debug("REST request to delete ConsentementInformatise : {}", id);
        consentementInformatiseRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
