package com.example.flight.web;

import com.example.flight.domain.Flight;
import com.example.flight.repo.FlightRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "http://localhost:4200")
public class FlightController {
  private final FlightRepository repo;
  public FlightController(FlightRepository repo) { this.repo = repo; }

  @GetMapping("/search")
  public ResponseEntity<List<Flight>> search(@RequestParam String from, @RequestParam String to,
                                             @RequestParam(name = "date", required = false) String date,
                                             @RequestParam(name = "flightdate", required = false) String flightdate) {
    String effectiveDate = (date != null && !date.isBlank()) ? date : flightdate;
    return ResponseEntity.ok(repo.search(from, to, effectiveDate));
  }

  @GetMapping
  public ResponseEntity<List<Flight>> searchByCity(@RequestParam(name = "sourceCity") String sourceCity,
                                                   @RequestParam(name = "destinationCity") String destinationCity,
                                                   @RequestParam(name = "date", required = false) String date,
                                                   @RequestParam(name = "flightdate", required = false) String flightdate) {
    String effectiveDate = (date != null && !date.isBlank()) ? date : flightdate;
    return ResponseEntity.ok(repo.search(sourceCity, destinationCity, effectiveDate));
  }
}
