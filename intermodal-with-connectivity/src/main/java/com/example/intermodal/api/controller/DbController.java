package com.example.intermodal.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/db")
@CrossOrigin(origins = "http://localhost:4200")
public class DbController {

    private final DataSource dataSource;
    private final JdbcTemplate jdbcTemplate;

    public DbController(DataSource dataSource, JdbcTemplate jdbcTemplate) {
        this.dataSource = dataSource;
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> info() {
        Map<String, Object> body = new HashMap<>();
        try (Connection conn = dataSource.getConnection()) {
            DatabaseMetaData md = conn.getMetaData();
            body.put("url", md.getURL());
            body.put("user", md.getUserName());
            body.put("dbProduct", md.getDatabaseProductName());
            body.put("dbVersion", md.getDatabaseProductVersion());
        } catch (Exception e) {
            body.put("error", e.getMessage());
        }
        return ResponseEntity.ok(body);
    }

    @GetMapping("/flights-count")
    public ResponseEntity<Map<String, Object>> flightsCount() {
        Map<String, Object> body = new HashMap<>();
        try {
            Integer count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM flights", Integer.class);
            body.put("count", count);
            List<Map<String, Object>> rows = jdbcTemplate.queryForList(
                    "SELECT id, flight_number, from_airport, to_airport, date FROM flights FETCH FIRST 5 ROWS ONLY");
            body.put("sample", rows);
        } catch (Exception e) {
            body.put("error", e.getMessage());
        }
        return ResponseEntity.ok(body);
    }
}
