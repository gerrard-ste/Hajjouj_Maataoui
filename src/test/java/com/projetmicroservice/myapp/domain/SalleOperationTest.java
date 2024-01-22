package com.projetmicroservice.myapp.domain;

import static com.projetmicroservice.myapp.domain.SalleOperationTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.projetmicroservice.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SalleOperationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SalleOperation.class);
        SalleOperation salleOperation1 = getSalleOperationSample1();
        SalleOperation salleOperation2 = new SalleOperation();
        assertThat(salleOperation1).isNotEqualTo(salleOperation2);

        salleOperation2.setId(salleOperation1.getId());
        assertThat(salleOperation1).isEqualTo(salleOperation2);

        salleOperation2 = getSalleOperationSample2();
        assertThat(salleOperation1).isNotEqualTo(salleOperation2);
    }
}
