package com.projetmicroservice.myapp.domain;

import static com.projetmicroservice.myapp.domain.MedecinTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.projetmicroservice.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MedecinTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Medecin.class);
        Medecin medecin1 = getMedecinSample1();
        Medecin medecin2 = new Medecin();
        assertThat(medecin1).isNotEqualTo(medecin2);

        medecin2.setId(medecin1.getId());
        assertThat(medecin1).isEqualTo(medecin2);

        medecin2 = getMedecinSample2();
        assertThat(medecin1).isNotEqualTo(medecin2);
    }
}
