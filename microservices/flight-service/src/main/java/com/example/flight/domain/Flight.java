package com.example.flight.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "flights")
public class Flight {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "flight_number")
  private String flightNumber;
  private String airline;
  @Column(name = "from_airport")
  private String fromAirport;
  @Column(name = "to_airport")
  private String toAirport;
  @Column(name = "departure_time")
  private String departureTime;
  @Column(name = "arrival_time")
  private String arrivalTime;
  @Column(name = "seats_available")
  private Integer seatsAvailable;
  private Integer price;
  private String duration;
  @Column(name = "DATE")
  private String flightDate;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getFlightNumber() { return flightNumber; }
  public void setFlightNumber(String flightNumber) { this.flightNumber = flightNumber; }
  public String getAirline() { return airline; }
  public void setAirline(String airline) { this.airline = airline; }
  public String getFromAirport() { return fromAirport; }
  public void setFromAirport(String fromAirport) { this.fromAirport = fromAirport; }
  public String getToAirport() { return toAirport; }
  public void setToAirport(String toAirport) { this.toAirport = toAirport; }
  public String getDepartureTime() { return departureTime; }
  public void setDepartureTime(String departureTime) { this.departureTime = departureTime; }
  public String getArrivalTime() { return arrivalTime; }
  public void setArrivalTime(String arrivalTime) { this.arrivalTime = arrivalTime; }
  public Integer getSeatsAvailable() { return seatsAvailable; }
  public void setSeatsAvailable(Integer seatsAvailable) { this.seatsAvailable = seatsAvailable; }
  public Integer getPrice() { return price; }
  public void setPrice(Integer price) { this.price = price; }
  public String getDuration() { return duration; }
  public void setDuration(String duration) { this.duration = duration; }
  public String getFlightDate() { return flightDate; }
  public void setFlightDate(String flightDate) { this.flightDate = flightDate; }
}
