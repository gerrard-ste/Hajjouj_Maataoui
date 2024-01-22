package com.projetmicroservice.myapp.domain;

import static com.projetmicroservice.myapp.domain.DossierPatientTestSamples.*;
import static com.projetmicroservice.myapp.domain.MedecinTestSamples.*;
import static com.projetmicroservice.myapp.domain.OperationTestSamples.*;
import static com.projetmicroservice.myapp.domain.RessourcesTestSamples.*;
import static com.projetmicroservice.myapp.domain.SalleOperationTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.projetmicroservice.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OperationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Operation.class);
        Operation operation1 = getOperationSample1();
        Operation operation2 = new Operation();
        assertThat(operation1).isNotEqualTo(operation2);

        operation2.setId(operation1.getId());
        assertThat(operation1).isEqualTo(operation2);

        operation2 = getOperationSample2();
        assertThat(operation1).isNotEqualTo(operation2);
    }

    @Test
    void ressourcesTest() throws Exception {
        Operation operation = getOperationRandomSampleGenerator();
        Ressources ressourcesBack = getRessourcesRandomSampleGenerator();

        operation.setRessources(ressourcesBack);
        assertThat(operation.getRessources()).isEqualTo(ressourcesBack);

        operation.ressources(null);
        assertThat(operation.getRessources()).isNull();
    }

    @Test
    void salleOperationTest() throws Exception {
        Operation operation = getOperationRandomSampleGenerator();
        SalleOperation salleOperationBack = getSalleOperationRandomSampleGenerator();

        operation.setSalleOperation(salleOperationBack);
        assertThat(operation.getSalleOperation()).isEqualTo(salleOperationBack);

        operation.salleOperation(null);
        assertThat(operation.getSalleOperation()).isNull();
    }

    @Test
    void personnelTest() throws Exception {
        Operation operation = getOperationRandomSampleGenerator();
        Medecin medecinBack = getMedecinRandomSampleGenerator();

        operation.setPersonnel(medecinBack);
        assertThat(operation.getPersonnel()).isEqualTo(medecinBack);

        operation.personnel(null);
        assertThat(operation.getPersonnel()).isNull();
    }

    @Test
    void dossierPatientTest() throws Exception {
        Operation operation = getOperationRandomSampleGenerator();
        DossierPatient dossierPatientBack = getDossierPatientRandomSampleGenerator();

        operation.setDossierPatient(dossierPatientBack);
        assertThat(operation.getDossierPatient()).isEqualTo(dossierPatientBack);

        operation.dossierPatient(null);
        assertThat(operation.getDossierPatient()).isNull();
    }
}
