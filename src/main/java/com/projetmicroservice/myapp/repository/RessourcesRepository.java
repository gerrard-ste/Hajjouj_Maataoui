package com.projetmicroservice.myapp.repository;

import com.projetmicroservice.myapp.domain.Ressources;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Ressources entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RessourcesRepository extends JpaRepository<Ressources, Long> {}
