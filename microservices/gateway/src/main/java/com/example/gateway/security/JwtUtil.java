package com.example.gateway.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.security.Key;

import javax.crypto.SecretKey;

public class JwtUtil {
  // Use same secret across services (move to config/secret vault in production)
  private static final String SECRET = "changeit-changeit-changeit-changeit-32b-secret";
  private static final Key KEY = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

  public static Claims parse(String token) {
    return Jwts.parser().verifyWith((SecretKey) KEY).build().parseSignedClaims(token).getPayload();
  }
}
