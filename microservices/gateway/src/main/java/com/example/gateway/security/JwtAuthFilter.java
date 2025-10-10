package com.example.gateway.security;

import io.jsonwebtoken.Claims;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class JwtAuthFilter implements GlobalFilter, Ordered {

  private boolean isProtectedPath(String path) {
    // Protect booking APIs only; adjust as needed
    return path.startsWith("/api/bookings");
  }

  @Override
  public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
    ServerHttpRequest request = exchange.getRequest();
    String path = request.getPath().value();
    if (!isProtectedPath(path)) {
      return chain.filter(exchange);
    }
    String auth = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
    if (auth == null || !auth.startsWith("Bearer ")) {
      exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
      return exchange.getResponse().setComplete();
    }
    String token = auth.substring(7);
    try {
      Claims claims = JwtUtil.parse(token);
      // optionally validate roles or subject here
      return chain.filter(exchange);
    } catch (Exception ex) {
      exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
      return exchange.getResponse().setComplete();
    }
  }

  @Override
  public int getOrder() {
    return -1;
  }
}
