package com.projetmicroservice.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Operation.
 */
@Entity
@Table(name = "operation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Operation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "heure")
    private Instant heure;

    @Column(name = "urgence")
    private Boolean urgence;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "salleOperation", "personnel" }, allowSetters = true)
    private Ressources ressources;

    @ManyToOne(fetch = FetchType.LAZY)
    private SalleOperation salleOperation;

    @ManyToOne(fetch = FetchType.LAZY)
    private Medecin personnel;

    @ManyToOne(fetch = FetchType.LAZY)
    private DossierPatient dossierPatient;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Operation id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public Operation date(LocalDate date) {
        this.setDate(date);
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Instant getHeure() {
        return this.heure;
    }

    public Operation heure(Instant heure) {
        this.setHeure(heure);
        return this;
    }

    public void setHeure(Instant heure) {
        this.heure = heure;
    }

    public Boolean getUrgence() {
        return this.urgence;
    }

    public Operation urgence(Boolean urgence) {
        this.setUrgence(urgence);
        return this;
    }

    public void setUrgence(Boolean urgence) {
        this.urgence = urgence;
    }

    public Ressources getRessources() {
        return this.ressources;
    }

    public void setRessources(Ressources ressources) {
        this.ressources = ressources;
    }

    public Operation ressources(Ressources ressources) {
        this.setRessources(ressources);
        return this;
    }

    public SalleOperation getSalleOperation() {
        return this.salleOperation;
    }

    public void setSalleOperation(SalleOperation salleOperation) {
        this.salleOperation = salleOperation;
    }

    public Operation salleOperation(SalleOperation salleOperation) {
        this.setSalleOperation(salleOperation);
        return this;
    }

    public Medecin getPersonnel() {
        return this.personnel;
    }

    public void setPersonnel(Medecin medecin) {
        this.personnel = medecin;
    }

    public Operation personnel(Medecin medecin) {
        this.setPersonnel(medecin);
        return this;
    }

    public DossierPatient getDossierPatient() {
        return this.dossierPatient;
    }

    public void setDossierPatient(DossierPatient dossierPatient) {
        this.dossierPatient = dossierPatient;
    }

    public Operation dossierPatient(DossierPatient dossierPatient) {
        this.setDossierPatient(dossierPatient);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Operation)) {
            return false;
        }
        return getId() != null && getId().equals(((Operation) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Operation{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", heure='" + getHeure() + "'" +
            ", urgence='" + getUrgence() + "'" +
            "}";
    }
}
