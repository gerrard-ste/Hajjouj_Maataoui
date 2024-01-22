package com.projetmicroservice.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class RessourcesTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Ressources getRessourcesSample1() {
        return new Ressources().id(1L).type("type1");
    }

    public static Ressources getRessourcesSample2() {
        return new Ressources().id(2L).type("type2");
    }

    public static Ressources getRessourcesRandomSampleGenerator() {
        return new Ressources().id(longCount.incrementAndGet()).type(UUID.randomUUID().toString());
    }
}
