package com.projetmicroservice.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class DossierPatientTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static DossierPatient getDossierPatientSample1() {
        return new DossierPatient().id(1L).informationsPatient("informationsPatient1").operationsPrevues("operationsPrevues1");
    }

    public static DossierPatient getDossierPatientSample2() {
        return new DossierPatient().id(2L).informationsPatient("informationsPatient2").operationsPrevues("operationsPrevues2");
    }

    public static DossierPatient getDossierPatientRandomSampleGenerator() {
        return new DossierPatient()
            .id(longCount.incrementAndGet())
            .informationsPatient(UUID.randomUUID().toString())
            .operationsPrevues(UUID.randomUUID().toString());
    }
}
