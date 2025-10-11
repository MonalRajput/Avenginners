package com.example.flight.web;

import com.example.flight.domain.Flight;
import com.example.flight.repo.FlightRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    return ResponseEntity.ok(repo.searchWithCityFallback(from, to, effectiveDate));
  }

  @GetMapping
  public ResponseEntity<List<Flight>> searchByCity(@RequestParam(name = "sourceCity") String sourceCity,
                                                   @RequestParam(name = "destinationCity") String destinationCity,
                                                   @RequestParam(name = "date", required = false) String date,
                                                   @RequestParam(name = "flightdate", required = false) String flightdate) {
    String effectiveDate = (date != null && !date.isBlank()) ? date : flightdate;
    return ResponseEntity.ok(repo.searchWithCityFallback(sourceCity, destinationCity, effectiveDate));
  }

  @PostMapping
  public ResponseEntity<Flight> create(@RequestBody Map<String, Object> body) {
    Flight f = new Flight();
    f.setFlightNumber(String.valueOf(body.getOrDefault("flightNumber", "")));
    f.setAirline(String.valueOf(body.getOrDefault("airline", "")));
    f.setFromAirport(String.valueOf(body.getOrDefault("fromAirport", "")));
    f.setToAirport(String.valueOf(body.getOrDefault("toAirport", "")));
    f.setDepartureTime(String.valueOf(body.getOrDefault("departureTime", "")));
    f.setArrivalTime(String.valueOf(body.getOrDefault("arrivalTime", "")));
    Object seats = body.get("seatsAvailable");
    f.setSeatsAvailable(seats == null ? null : Integer.valueOf(String.valueOf(seats)));
    Object price = body.get("price");
    f.setPrice(price == null ? null : Integer.valueOf(String.valueOf(price)));
    f.setDuration(String.valueOf(body.getOrDefault("duration", "")));
    String d = body.get("flightDate") != null ? String.valueOf(body.get("flightDate")) : String.valueOf(body.getOrDefault("date", ""));
    f.setFlightDate(d);
    Flight saved = repo.save(f);
    return ResponseEntity.ok(saved);
  }
}
