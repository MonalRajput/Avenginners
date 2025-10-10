package com.example.ancillary.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ancillaries")
@CrossOrigin(origins = "http://localhost:4200")
public class AncillaryController {
  @GetMapping
  public ResponseEntity<List<Map<String, Object>>> list() {
    return ResponseEntity.ok(List.of(
        Map.of("id", 1, "name", "Extra Baggage (20kg)", "price", 800, "category", "baggage"),
        Map.of("id", 2, "name", "Veg Meal", "price", 300, "category", "meal"),
        Map.of("id", 3, "name", "Window Seat", "price", 500, "category", "seat")
    ));
  }
}
