package com.example.intermodal.service;

import com.example.intermodal.api.dto.FlightDto;
import com.example.intermodal.domain.Flight;
import com.example.intermodal.repository.FlightRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlightService {

    private final FlightRepository flightRepository;

    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    public List<FlightDto> search(String from, String to, String date) {
        List<Flight> flights = flightRepository.findByFromAirportAndToAirportAndDate(from, to, date);
        return flights.stream().map(this::toDto).collect(Collectors.toList());
    }

    private FlightDto toDto(Flight f) {
        FlightDto dto = new FlightDto();
        dto.setId(f.getId());
        dto.setFlightNumber(f.getFlightNumber());
        dto.setAirline(f.getAirline());
        dto.setFromAirport(f.getFromAirport());
        dto.setToAirport(f.getToAirport());
        dto.setDepartureTime(f.getDepartureTime());
        dto.setArrivalTime(f.getArrivalTime());
        dto.setSeatsAvailable(f.getSeatsAvailable());
        dto.setPrice(f.getPrice());
        dto.setDuration(f.getDuration());
        dto.setDate(f.getDate());
        return dto;
    }
}
