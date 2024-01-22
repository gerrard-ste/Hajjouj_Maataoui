package com.projetmicroservice.myapp.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A SalleOperation.
 */
@Entity
@Table(name = "salle_operation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SalleOperation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "equipements_disponibles")
    private String equipementsDisponibles;

    @Column(name = "disponibilite")
    private Boolean disponibilite;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public SalleOperation id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEquipementsDisponibles() {
        return this.equipementsDisponibles;
    }

    public SalleOperation equipementsDisponibles(String equipementsDisponibles) {
        this.setEquipementsDisponibles(equipementsDisponibles);
        return this;
    }

    public void setEquipementsDisponibles(String equipementsDisponibles) {
        this.equipementsDisponibles = equipementsDisponibles;
    }

    public Boolean getDisponibilite() {
        return this.disponibilite;
    }

    public SalleOperation disponibilite(Boolean disponibilite) {
        this.setDisponibilite(disponibilite);
        return this;
    }

    public void setDisponibilite(Boolean disponibilite) {
        this.disponibilite = disponibilite;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SalleOperation)) {
            return false;
        }
        return getId() != null && getId().equals(((SalleOperation) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SalleOperation{" +
            "id=" + getId() +
            ", equipementsDisponibles='" + getEquipementsDisponibles() + "'" +
            ", disponibilite='" + getDisponibilite() + "'" +
            "}";
    }
}
