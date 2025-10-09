package com.example.intermodal.api.controller;

import com.example.intermodal.api.dto.AncillaryDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/ancillaries")
@CrossOrigin(origins = "http://localhost:4200")
public class AncillaryController {

    @GetMapping
    public ResponseEntity<List<AncillaryDto>> list() {
        List<AncillaryDto> list = Arrays.asList(
                build(1L, "Extra Baggage (20kg)", "Additional checked baggage", 800, "baggage"),
                build(2L, "Veg Meal", "Vegetarian in-flight meal", 300, "meal"),
                build(3L, "Window Seat", "Preferred window seat", 500, "seat"),
                build(4L, "Priority Boarding", "Fast-track boarding", 400, "other")
        );
        return ResponseEntity.ok(list);
    }

    private AncillaryDto build(Long id, String name, String description, Integer price, String category) {
        AncillaryDto dto = new AncillaryDto();
        dto.setId(id);
        dto.setName(name);
        dto.setDescription(description);
        dto.setPrice(price);
        dto.setCategory(category);
        return dto;
    }
}
