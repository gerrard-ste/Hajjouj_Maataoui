package com.projetmicroservice.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class SalleOperationTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static SalleOperation getSalleOperationSample1() {
        return new SalleOperation().id(1L).equipementsDisponibles("equipementsDisponibles1");
    }

    public static SalleOperation getSalleOperationSample2() {
        return new SalleOperation().id(2L).equipementsDisponibles("equipementsDisponibles2");
    }

    public static SalleOperation getSalleOperationRandomSampleGenerator() {
        return new SalleOperation().id(longCount.incrementAndGet()).equipementsDisponibles(UUID.randomUUID().toString());
    }
}
