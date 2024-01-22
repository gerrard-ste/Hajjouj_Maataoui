package com.projetmicroservice.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ConsentementInformatiseTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static ConsentementInformatise getConsentementInformatiseSample1() {
        return new ConsentementInformatise().id(1L).informationsPatient("informationsPatient1");
    }

    public static ConsentementInformatise getConsentementInformatiseSample2() {
        return new ConsentementInformatise().id(2L).informationsPatient("informationsPatient2");
    }

    public static ConsentementInformatise getConsentementInformatiseRandomSampleGenerator() {
        return new ConsentementInformatise().id(longCount.incrementAndGet()).informationsPatient(UUID.randomUUID().toString());
    }
}
