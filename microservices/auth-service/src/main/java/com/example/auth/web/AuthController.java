package com.example.auth.web;

import com.example.auth.domain.UserAccount;
import com.example.auth.repo.UserAccountRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

  private final UserAccountRepository users;
  private final PasswordEncoder encoder = new BCryptPasswordEncoder();

  public AuthController(UserAccountRepository users) {
    this.users = users;
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
    String username = body.getOrDefault("username", "");
    String password = body.getOrDefault("password", "");
    if (username.isBlank() || password.isBlank()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "username/password required"));
    }
    if (users.findByUsername(username).isPresent()) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "username exists"));
    }
    UserAccount user = new UserAccount();
    user.setUsername(username);
    user.setPasswordHash(encoder.encode(password));
    users.save(user);
    return ResponseEntity.ok(Map.of("status", "registered"));
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
    String username = body.getOrDefault("username", "");
    String password = body.getOrDefault("password", "");
    UserAccount user = users.findByUsername(username).orElse(null);
    if (user == null || !encoder.matches(password, user.getPasswordHash())) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "invalid credentials"));
    }
    // No token; return light session info for frontend storage if needed
    return ResponseEntity.ok(Map.of(
        "userId", user.getId(),
        "username", user.getUsername(),
        "role", user.getRole()
    ));
  }
}
