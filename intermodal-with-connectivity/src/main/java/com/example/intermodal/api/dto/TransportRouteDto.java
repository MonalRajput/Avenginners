package com.example.intermodal.api.dto;

public class TransportRouteDto {
    private Long routeId;
    private LocationDto fromLocation;
    private AirportDto toAirport;
    private TransportModeDto mode;
    private Integer estimatedCost;
    private Integer estimatedDuration;

    public Long getRouteId() { return routeId; }
    public void setRouteId(Long routeId) { this.routeId = routeId; }
    public LocationDto getFromLocation() { return fromLocation; }
    public void setFromLocation(LocationDto fromLocation) { this.fromLocation = fromLocation; }
    public AirportDto getToAirport() { return toAirport; }
    public void setToAirport(AirportDto toAirport) { this.toAirport = toAirport; }
    public TransportModeDto getMode() { return mode; }
    public void setMode(TransportModeDto mode) { this.mode = mode; }
    public Integer getEstimatedCost() { return estimatedCost; }
    public void setEstimatedCost(Integer estimatedCost) { this.estimatedCost = estimatedCost; }
    public Integer getEstimatedDuration() { return estimatedDuration; }
    public void setEstimatedDuration(Integer estimatedDuration) { this.estimatedDuration = estimatedDuration; }
}
