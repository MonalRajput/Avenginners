package com.example.intermodal.api.dto;

public class TransportModeDto {
    private Long id;
    private String name;
    private String description;
    private Integer price;
    private String estimatedTime;
    private Boolean available;
    private String modeType; // pre or post

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Integer getPrice() { return price; }
    public void setPrice(Integer price) { this.price = price; }
    public String getEstimatedTime() { return estimatedTime; }
    public void setEstimatedTime(String estimatedTime) { this.estimatedTime = estimatedTime; }
    public Boolean getAvailable() { return available; }
    public void setAvailable(Boolean available) { this.available = available; }
    public String getModeType() { return modeType; }
    public void setModeType(String modeType) { this.modeType = modeType; }
}
