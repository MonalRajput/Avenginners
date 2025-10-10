package com.example.booking.domain;

import java.time.Instant;

import jakarta.persistence.*;

@Entity
@Table(name = "bookings")
public class Booking {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Long userId;
  private Long flightId;
  private Integer totalPrice;
  private String status;
  private Instant createdAt = Instant.now();

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public Long getUserId() { return userId; }
  public void setUserId(Long userId) { this.userId = userId; }
  public Long getFlightId() { return flightId; }
  public void setFlightId(Long flightId) { this.flightId = flightId; }
  public Integer getTotalPrice() { return totalPrice; }
  public void setTotalPrice(Integer totalPrice) { this.totalPrice = totalPrice; }
  public String getStatus() { return status; }
  public void setStatus(String status) { this.status = status; }
  public Instant getCreatedAt() { return createdAt; }
  public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
