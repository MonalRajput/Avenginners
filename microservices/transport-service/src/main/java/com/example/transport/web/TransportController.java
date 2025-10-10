package com.example.transport.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transport-options")
@CrossOrigin(origins = "http://localhost:4200")
public class TransportController {
  @GetMapping
  public ResponseEntity<List<Map<String, Object>>> routes(@RequestParam Long locationId, @RequestParam Long airportId) {
    return ResponseEntity.ok(List.of(
        Map.of("routeId", 1, "fromLocation", Map.of("id", locationId, "name", "User Location"),
            "toAirport", Map.of("code", "AP-"+airportId, "name", "Airport"),
            "mode", Map.of("id", 1, "name", "Taxi", "price", 500, "estimatedTime", "30 mins", "available", true, "modeType", "pre"),
            "estimatedCost", 500, "estimatedDuration", 30)
    ));
  }
}
