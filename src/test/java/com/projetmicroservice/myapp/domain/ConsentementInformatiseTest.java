package com.projetmicroservice.myapp.domain;

import static com.projetmicroservice.myapp.domain.ConsentementInformatiseTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.projetmicroservice.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ConsentementInformatiseTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ConsentementInformatise.class);
        ConsentementInformatise consentementInformatise1 = getConsentementInformatiseSample1();
        ConsentementInformatise consentementInformatise2 = new ConsentementInformatise();
        assertThat(consentementInformatise1).isNotEqualTo(consentementInformatise2);

        consentementInformatise2.setId(consentementInformatise1.getId());
        assertThat(consentementInformatise1).isEqualTo(consentementInformatise2);

        consentementInformatise2 = getConsentementInformatiseSample2();
        assertThat(consentementInformatise1).isNotEqualTo(consentementInformatise2);
    }
}
