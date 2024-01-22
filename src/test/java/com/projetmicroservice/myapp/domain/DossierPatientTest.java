package com.projetmicroservice.myapp.domain;

import static com.projetmicroservice.myapp.domain.DossierPatientTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.projetmicroservice.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DossierPatientTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DossierPatient.class);
        DossierPatient dossierPatient1 = getDossierPatientSample1();
        DossierPatient dossierPatient2 = new DossierPatient();
        assertThat(dossierPatient1).isNotEqualTo(dossierPatient2);

        dossierPatient2.setId(dossierPatient1.getId());
        assertThat(dossierPatient1).isEqualTo(dossierPatient2);

        dossierPatient2 = getDossierPatientSample2();
        assertThat(dossierPatient1).isNotEqualTo(dossierPatient2);
    }
}
