package com.projetmicroservice.myapp.repository;

import com.projetmicroservice.myapp.domain.SalleOperation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the SalleOperation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SalleOperationRepository extends JpaRepository<SalleOperation, Long> {}
