package com.example.intermodal.api.dto;

import java.util.List;

public class BookingRequestDto {
    private Long userId;
    private Long flightId;
    private String seatType;
    private Integer seatPrice;
    private String pickupAddress;
    private String pickupMode;
    private String dropAddress;
    private String dropMode;
    private List<String> ancillaries;
    private Integer ancillaryPrice;
    private String travelDate;
    private String from;
    private String to;
    private Integer totalPrice;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Long getFlightId() { return flightId; }
    public void setFlightId(Long flightId) { this.flightId = flightId; }
    public String getSeatType() { return seatType; }
    public void setSeatType(String seatType) { this.seatType = seatType; }
    public Integer getSeatPrice() { return seatPrice; }
    public void setSeatPrice(Integer seatPrice) { this.seatPrice = seatPrice; }
    public String getPickupAddress() { return pickupAddress; }
    public void setPickupAddress(String pickupAddress) { this.pickupAddress = pickupAddress; }
    public String getPickupMode() { return pickupMode; }
    public void setPickupMode(String pickupMode) { this.pickupMode = pickupMode; }
    public String getDropAddress() { return dropAddress; }
    public void setDropAddress(String dropAddress) { this.dropAddress = dropAddress; }
    public String getDropMode() { return dropMode; }
    public void setDropMode(String dropMode) { this.dropMode = dropMode; }
    public List<String> getAncillaries() { return ancillaries; }
    public void setAncillaries(List<String> ancillaries) { this.ancillaries = ancillaries; }
    public Integer getAncillaryPrice() { return ancillaryPrice; }
    public void setAncillaryPrice(Integer ancillaryPrice) { this.ancillaryPrice = ancillaryPrice; }
    public String getTravelDate() { return travelDate; }
    public void setTravelDate(String travelDate) { this.travelDate = travelDate; }
    public String getFrom() { return from; }
    public void setFrom(String from) { this.from = from; }
    public String getTo() { return to; }
    public void setTo(String to) { this.to = to; }
    public Integer getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Integer totalPrice) { this.totalPrice = totalPrice; }
}
