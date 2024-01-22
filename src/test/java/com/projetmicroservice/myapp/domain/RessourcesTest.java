package com.projetmicroservice.myapp.domain;

import static com.projetmicroservice.myapp.domain.MedecinTestSamples.*;
import static com.projetmicroservice.myapp.domain.RessourcesTestSamples.*;
import static com.projetmicroservice.myapp.domain.SalleOperationTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.projetmicroservice.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RessourcesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ressources.class);
        Ressources ressources1 = getRessourcesSample1();
        Ressources ressources2 = new Ressources();
        assertThat(ressources1).isNotEqualTo(ressources2);

        ressources2.setId(ressources1.getId());
        assertThat(ressources1).isEqualTo(ressources2);

        ressources2 = getRessourcesSample2();
        assertThat(ressources1).isNotEqualTo(ressources2);
    }

    @Test
    void salleOperationTest() throws Exception {
        Ressources ressources = getRessourcesRandomSampleGenerator();
        SalleOperation salleOperationBack = getSalleOperationRandomSampleGenerator();

        ressources.setSalleOperation(salleOperationBack);
        assertThat(ressources.getSalleOperation()).isEqualTo(salleOperationBack);

        ressources.salleOperation(null);
        assertThat(ressources.getSalleOperation()).isNull();
    }

    @Test
    void personnelTest() throws Exception {
        Ressources ressources = getRessourcesRandomSampleGenerator();
        Medecin medecinBack = getMedecinRandomSampleGenerator();

        ressources.setPersonnel(medecinBack);
        assertThat(ressources.getPersonnel()).isEqualTo(medecinBack);

        ressources.personnel(null);
        assertThat(ressources.getPersonnel()).isNull();
    }
}
