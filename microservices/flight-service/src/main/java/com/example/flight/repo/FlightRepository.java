package com.example.flight.repo;

import com.example.flight.domain.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {
  @Query("SELECT f FROM Flight f WHERE (LOWER(f.fromAirport) LIKE LOWER(CONCAT('%', :fromKey, '%')) OR LOWER(:fromKey) LIKE LOWER(CONCAT('%', f.fromAirport, '%'))) AND (LOWER(f.toAirport) LIKE LOWER(CONCAT('%', :toKey, '%')) OR LOWER(:toKey) LIKE LOWER(CONCAT('%', f.toAirport, '%'))) AND (:dateKey IS NULL OR f.flightDate = :dateKey)")
  List<Flight> search(@Param("fromKey") String fromKey, @Param("toKey") String toKey, @Param("dateKey") String dateKey);

  default List<Flight> searchWithCityFallback(String from, String to, String date) {
    List<Flight> results = search(from, to, date);
    if (!results.isEmpty()) return results;
    String fromCode = mapCity(from);
    String toCode = mapCity(to);
    if (fromCode != null || toCode != null) {
      results = search(fromCode != null ? fromCode : from, toCode != null ? toCode : to, date);
    }
    if (results.isEmpty() && date != null) {
      results = search(from, to, null);
    }
    return results;
  }

  private static String mapCity(String value) {
    if (value == null) return null;
    String v = value.trim().toLowerCase();
    return switch (v) {
      case "del", "delhi", "new delhi" -> "DEL";
      case "bom", "mumbai", "bombay" -> "BOM";
      case "blr", "bengaluru", "bangalore" -> "BLR";
      case "maa", "chennai", "madras" -> "MAA";
      case "ccu", "kolkata", "calcutta" -> "CCU";
      default -> null;
    };
  }
}
