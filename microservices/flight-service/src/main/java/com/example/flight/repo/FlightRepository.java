package com.example.flight.repo;

import com.example.flight.domain.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {
  @Query("SELECT f FROM Flight f WHERE (LOWER(f.fromAirport) LIKE LOWER(CONCAT('%', :fromKey, '%')) OR LOWER(:fromKey) LIKE LOWER(CONCAT('%', f.fromAirport, '%'))) AND (LOWER(f.toAirport) LIKE LOWER(CONCAT('%', :toKey, '%')) OR LOWER(:toKey) LIKE LOWER(CONCAT('%', f.toAirport, '%'))) AND (:dateKey IS NULL OR f.flightDate = :dateKey)")
  List<Flight> search(@Param("fromKey") String fromKey, @Param("toKey") String toKey, @Param("dateKey") String dateKey);
}
