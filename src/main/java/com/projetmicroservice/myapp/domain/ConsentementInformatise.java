package com.projetmicroservice.myapp.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ConsentementInformatise.
 */
@Entity
@Table(name = "consentement_informatise")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ConsentementInformatise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "informations_patient")
    private String informationsPatient;

    @Column(name = "consentement_obtenu")
    private Boolean consentementObtenu;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ConsentementInformatise id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInformationsPatient() {
        return this.informationsPatient;
    }

    public ConsentementInformatise informationsPatient(String informationsPatient) {
        this.setInformationsPatient(informationsPatient);
        return this;
    }

    public void setInformationsPatient(String informationsPatient) {
        this.informationsPatient = informationsPatient;
    }

    public Boolean getConsentementObtenu() {
        return this.consentementObtenu;
    }

    public ConsentementInformatise consentementObtenu(Boolean consentementObtenu) {
        this.setConsentementObtenu(consentementObtenu);
        return this;
    }

    public void setConsentementObtenu(Boolean consentementObtenu) {
        this.consentementObtenu = consentementObtenu;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ConsentementInformatise)) {
            return false;
        }
        return getId() != null && getId().equals(((ConsentementInformatise) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ConsentementInformatise{" +
            "id=" + getId() +
            ", informationsPatient='" + getInformationsPatient() + "'" +
            ", consentementObtenu='" + getConsentementObtenu() + "'" +
            "}";
    }
}
