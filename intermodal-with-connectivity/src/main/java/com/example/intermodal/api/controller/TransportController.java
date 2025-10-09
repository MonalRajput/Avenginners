package com.example.intermodal.api.controller;

import com.example.intermodal.api.dto.TransportModeDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/transport-options")
@CrossOrigin(origins = "http://localhost:4200")
public class TransportController {

    @GetMapping
    public ResponseEntity<List<TransportModeDto>> getRoutes(
            @RequestParam Long locationId,
            @RequestParam Long airportId
    ) {
        List<TransportModeDto> modes = new ArrayList<>();
        modes.add(build(1L, "Taxi", "Door-to-door service", 500, "20-30 mins", true, "pre"));
        modes.add(build(2L, "Metro", "Public transport to airport", 50, "45-60 mins", true, "pre"));
        modes.add(build(3L, "Shuttle", "Shared airport shuttle", 200, "30-45 mins", true, "pre"));
        return ResponseEntity.ok(modes);
    }

    private TransportModeDto build(Long id, String name, String description, Integer price, String eta, boolean available, String type) {
        TransportModeDto dto = new TransportModeDto();
        dto.setId(id);
        dto.setName(name);
        dto.setDescription(description);
        dto.setPrice(price);
        dto.setEstimatedTime(eta);
        dto.setAvailable(available);
        dto.setModeType(type);
        return dto;
    }
}
