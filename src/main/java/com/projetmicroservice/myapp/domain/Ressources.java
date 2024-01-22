package com.projetmicroservice.myapp.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Ressources.
 */
@Entity
@Table(name = "ressources")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Ressources implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "type")
    private String type;

    @Column(name = "disponibilite")
    private Boolean disponibilite;

    @ManyToOne(fetch = FetchType.LAZY)
    private SalleOperation salleOperation;

    @ManyToOne(fetch = FetchType.LAZY)
    private Medecin personnel;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Ressources id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return this.type;
    }

    public Ressources type(String type) {
        this.setType(type);
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Boolean getDisponibilite() {
        return this.disponibilite;
    }

    public Ressources disponibilite(Boolean disponibilite) {
        this.setDisponibilite(disponibilite);
        return this;
    }

    public void setDisponibilite(Boolean disponibilite) {
        this.disponibilite = disponibilite;
    }

    public SalleOperation getSalleOperation() {
        return this.salleOperation;
    }

    public void setSalleOperation(SalleOperation salleOperation) {
        this.salleOperation = salleOperation;
    }

    public Ressources salleOperation(SalleOperation salleOperation) {
        this.setSalleOperation(salleOperation);
        return this;
    }

    public Medecin getPersonnel() {
        return this.personnel;
    }

    public void setPersonnel(Medecin medecin) {
        this.personnel = medecin;
    }

    public Ressources personnel(Medecin medecin) {
        this.setPersonnel(medecin);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ressources)) {
            return false;
        }
        return getId() != null && getId().equals(((Ressources) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ressources{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", disponibilite='" + getDisponibilite() + "'" +
            "}";
    }
}
