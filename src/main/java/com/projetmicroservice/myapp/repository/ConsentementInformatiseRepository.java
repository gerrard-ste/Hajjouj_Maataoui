package com.projetmicroservice.myapp.repository;

import com.projetmicroservice.myapp.domain.ConsentementInformatise;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ConsentementInformatise entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsentementInformatiseRepository extends JpaRepository<ConsentementInformatise, Long> {}
