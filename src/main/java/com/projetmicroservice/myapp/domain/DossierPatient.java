package com.projetmicroservice.myapp.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A DossierPatient.
 */
@Entity
@Table(name = "dossier_patient")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DossierPatient implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "informations_patient")
    private String informationsPatient;

    @Column(name = "operations_prevues")
    private String operationsPrevues;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public DossierPatient id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInformationsPatient() {
        return this.informationsPatient;
    }

    public DossierPatient informationsPatient(String informationsPatient) {
        this.setInformationsPatient(informationsPatient);
        return this;
    }

    public void setInformationsPatient(String informationsPatient) {
        this.informationsPatient = informationsPatient;
    }

    public String getOperationsPrevues() {
        return this.operationsPrevues;
    }

    public DossierPatient operationsPrevues(String operationsPrevues) {
        this.setOperationsPrevues(operationsPrevues);
        return this;
    }

    public void setOperationsPrevues(String operationsPrevues) {
        this.operationsPrevues = operationsPrevues;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DossierPatient)) {
            return false;
        }
        return getId() != null && getId().equals(((DossierPatient) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DossierPatient{" +
            "id=" + getId() +
            ", informationsPatient='" + getInformationsPatient() + "'" +
            ", operationsPrevues='" + getOperationsPrevues() + "'" +
            "}";
    }
}
