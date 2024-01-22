package com.projetmicroservice.myapp.repository;

import com.projetmicroservice.myapp.domain.DossierPatient;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the DossierPatient entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DossierPatientRepository extends JpaRepository<DossierPatient, Long> {}
