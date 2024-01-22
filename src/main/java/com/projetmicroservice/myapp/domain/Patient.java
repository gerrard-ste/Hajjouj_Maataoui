package com.projetmicroservice.myapp.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Patient.
 */
@Entity
@Table(name = "patient")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Patient implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "historique_medical")
    private String historiqueMedical;

    @ManyToOne(fetch = FetchType.LAZY)
    private DossierPatient dossierPatient;

    @ManyToOne(fetch = FetchType.LAZY)
    private ConsentementInformatise consentementInformatise;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Patient id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return this.nom;
    }

    public Patient nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return this.prenom;
    }

    public Patient prenom(String prenom) {
        this.setPrenom(prenom);
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getHistoriqueMedical() {
        return this.historiqueMedical;
    }

    public Patient historiqueMedical(String historiqueMedical) {
        this.setHistoriqueMedical(historiqueMedical);
        return this;
    }

    public void setHistoriqueMedical(String historiqueMedical) {
        this.historiqueMedical = historiqueMedical;
    }

    public DossierPatient getDossierPatient() {
        return this.dossierPatient;
    }

    public void setDossierPatient(DossierPatient dossierPatient) {
        this.dossierPatient = dossierPatient;
    }

    public Patient dossierPatient(DossierPatient dossierPatient) {
        this.setDossierPatient(dossierPatient);
        return this;
    }

    public ConsentementInformatise getConsentementInformatise() {
        return this.consentementInformatise;
    }

    public void setConsentementInformatise(ConsentementInformatise consentementInformatise) {
        this.consentementInformatise = consentementInformatise;
    }

    public Patient consentementInformatise(ConsentementInformatise consentementInformatise) {
        this.setConsentementInformatise(consentementInformatise);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Patient)) {
            return false;
        }
        return getId() != null && getId().equals(((Patient) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Patient{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", historiqueMedical='" + getHistoriqueMedical() + "'" +
            "}";
    }
}
