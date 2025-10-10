package com.example.booking.web;

import com.example.booking.domain.Booking;
import com.example.booking.repo.BookingRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Map;

import javax.crypto.SecretKey;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:4200")
public class BookingController {

  private final BookingRepository repo;
  private static final String SECRET = "changeit-changeit-changeit-changeit-32b-secret";
  private static final Key KEY = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

  public BookingController(BookingRepository repo) { this.repo = repo; }

  @PostMapping
  public ResponseEntity<?> create(@RequestHeader HttpHeaders headers, @RequestBody Map<String, Object> body) {
    String auth = headers.getFirst(HttpHeaders.AUTHORIZATION);
    if (auth == null || !auth.startsWith("Bearer ")) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "missing token"));
    }
    try {
      String token = auth.substring(7);
      Claims claims = Jwts.parser().verifyWith((SecretKey) KEY).build().parseSignedClaims(token).getPayload();
      Long uid = claims.get("uid", Long.class);
      Booking b = new Booking();
      b.setUserId(uid);
      b.setFlightId(Long.valueOf(String.valueOf(body.getOrDefault("flightId", 0))));
      Object total = body.get("totalPrice");
      b.setTotalPrice(total == null ? 0 : Integer.valueOf(String.valueOf(total)));
      b.setStatus("confirmed");
      repo.save(b);
      return ResponseEntity.ok(Map.of("id", b.getId(), "status", b.getStatus()));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "invalid token"));
    }
  }
}
