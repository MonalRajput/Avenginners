package com.example.intermodal.api.controller;

import com.example.intermodal.api.dto.BookingRequestDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:4200")
public class BookingController {

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@RequestBody BookingRequestDto request) {
        Map<String, Object> body = new HashMap<>();
        body.put("id", 1001);
        body.put("status", "confirmed");
        body.put("message", "Booking created successfully");
        return ResponseEntity.ok(body);
    }
}
