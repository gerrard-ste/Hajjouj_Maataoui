package com.projetmicroservice.myapp.domain;

import static com.projetmicroservice.myapp.domain.ConsentementInformatiseTestSamples.*;
import static com.projetmicroservice.myapp.domain.DossierPatientTestSamples.*;
import static com.projetmicroservice.myapp.domain.PatientTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.projetmicroservice.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PatientTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Patient.class);
        Patient patient1 = getPatientSample1();
        Patient patient2 = new Patient();
        assertThat(patient1).isNotEqualTo(patient2);

        patient2.setId(patient1.getId());
        assertThat(patient1).isEqualTo(patient2);

        patient2 = getPatientSample2();
        assertThat(patient1).isNotEqualTo(patient2);
    }

    @Test
    void dossierPatientTest() throws Exception {
        Patient patient = getPatientRandomSampleGenerator();
        DossierPatient dossierPatientBack = getDossierPatientRandomSampleGenerator();

        patient.setDossierPatient(dossierPatientBack);
        assertThat(patient.getDossierPatient()).isEqualTo(dossierPatientBack);

        patient.dossierPatient(null);
        assertThat(patient.getDossierPatient()).isNull();
    }

    @Test
    void consentementInformatiseTest() throws Exception {
        Patient patient = getPatientRandomSampleGenerator();
        ConsentementInformatise consentementInformatiseBack = getConsentementInformatiseRandomSampleGenerator();

        patient.setConsentementInformatise(consentementInformatiseBack);
        assertThat(patient.getConsentementInformatise()).isEqualTo(consentementInformatiseBack);

        patient.consentementInformatise(null);
        assertThat(patient.getConsentementInformatise()).isNull();
    }
}
