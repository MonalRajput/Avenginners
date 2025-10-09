package com.example.intermodal.api.dto;

public class FlightDto {
    private Long id;
    private String flightNumber;
    private String airline;
    private String fromAirport;
    private String toAirport;
    // Compatibility with another Angular model variant
    private String sourceAirport;
    private String destinationAirport;
    private String departureTime;
    private String arrivalTime;
    private Integer seatsAvailable;
    private Integer price;
    private String duration;
    private String date;

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
    public String getSourceAirport() { return sourceAirport; }
    public void setSourceAirport(String sourceAirport) { this.sourceAirport = sourceAirport; }
    public String getDestinationAirport() { return destinationAirport; }
    public void setDestinationAirport(String destinationAirport) { this.destinationAirport = destinationAirport; }
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
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
}
