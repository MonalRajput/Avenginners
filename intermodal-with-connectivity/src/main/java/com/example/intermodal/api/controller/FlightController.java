package com.example.intermodal.api.controller;

import com.example.intermodal.api.dto.FlightDto;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.intermodal.service.FlightService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "http://localhost:4200")
public class FlightController {
    private final FlightService flightService;

    @Autowired
    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<FlightDto>> search(
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam(name = "date", required = false) String date,
            @RequestParam(name = "flightdate", required = false) String flightdate
    ) {
        String effectiveDate = (date != null && !date.isBlank()) ? date : flightdate;
        List<FlightDto> flights = flightService.search(from, to, effectiveDate);
        return ResponseEntity.ok(flights);
    }

    @GetMapping
    public ResponseEntity<List<FlightDto>> searchByCity(
            @RequestParam(name = "sourceCity") String sourceCity,
            @RequestParam(name = "destinationCity") String destinationCity,
            @RequestParam(name = "date", required = false) String date,
            @RequestParam(name = "flightdate", required = false) String flightdate
    ) {
        String effectiveDate = (date != null && !date.isBlank()) ? date : flightdate;
        List<FlightDto> flights = flightService.search(sourceCity, destinationCity, effectiveDate);
        return ResponseEntity.ok(flights);
    }
}
