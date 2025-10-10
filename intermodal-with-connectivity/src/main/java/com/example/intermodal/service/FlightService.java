package com.example.intermodal.service;

import com.example.intermodal.api.dto.FlightDto;
import com.example.intermodal.domain.Flight;
import com.example.intermodal.repository.FlightRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class FlightService {

    private final FlightRepository flightRepository;
    private static final Logger log = LoggerFactory.getLogger(FlightService.class);

    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    public List<FlightDto> search(String from, String to, String date) {
        String fromInput = safe(from);
        String toInput = safe(to);
        String dateInput = isBlank(date) ? null : date;

        // First try with raw inputs
        List<Flight> flights = new ArrayList<>(flightRepository.search(fromInput, toInput, dateInput));

        // If no results, try mapped airport codes (DEL, BOM, etc.)
        if (flights.isEmpty()) {
            String fromCode = mapCityToAirportCode(fromInput);
            String toCode = mapCityToAirportCode(toInput);
            if (!isBlank(fromCode) || !isBlank(toCode)) {
                flights.addAll(flightRepository.search(
                        isBlank(fromCode) ? fromInput : fromCode,
                        isBlank(toCode) ? toInput : toCode,
                        dateInput
                ));
            }
        }

        // If still empty, relax date constraint
        if (flights.isEmpty() && dateInput != null) {
            flights.addAll(flightRepository.search(fromInput, toInput, null));
        }

        // Deduplicate by ID while preserving order
        Map<Long, Flight> unique = new LinkedHashMap<>();
        for (Flight f : flights) {
            if (f.getId() != null) unique.putIfAbsent(f.getId(), f);
        }
        List<Flight> deduped = new ArrayList<>(unique.values());

        List<FlightDto> result = deduped.stream().map(this::toDto).collect(Collectors.toList());
        log.info("Flight search: from='{}' to='{}' date='{}' -> {} result(s)", from, to, date, result.size());
        return result;
    }

    private FlightDto toDto(Flight f) {
        FlightDto dto = new FlightDto();
        dto.setId(f.getId());
        dto.setFlightNumber(f.getFlightNumber());
        dto.setAirline(f.getAirline());
        dto.setFromAirport(f.getFromAirport());
        dto.setToAirport(f.getToAirport());
        // Also set alternative fields some components use
        dto.setSourceAirport(f.getFromAirport());
        dto.setDestinationAirport(f.getToAirport());
        dto.setDepartureTime(f.getDepartureTime());
        dto.setArrivalTime(f.getArrivalTime());
        dto.setSeatsAvailable(f.getSeatsAvailable());
        dto.setPrice(f.getPrice());
        dto.setDuration(f.getDuration());
        dto.setDate(f.getFlightDate());
        return dto;
    }

    private static String safe(String s) {
        return s == null ? "" : s.trim();
    }

    private static boolean isBlank(String s) {
        return s == null || s.trim().isEmpty();
    }

    private static String mapCityToAirportCode(String value) {
        if (isBlank(value)) return null;
        String key = value.toLowerCase(Locale.ROOT).trim();
        switch (key) {
            case "del":
            case "delhi":
            case "new delhi":
                return "DEL";
            case "bom":
            case "mumbai":
            case "bombay":
                return "BOM";
            case "blr":
            case "bangalore":
            case "bengaluru":
                return "BLR";
            case "maa":
            case "chennai":
            case "madras":
                return "MAA";
            case "ccu":
            case "kolkata":
            case "calcutta":
                return "CCU";
            case "hyd":
            case "hyderabad":
                return "HYD";
            case "pnq":
            case "pune":
                return "PNQ";
            case "amd":
            case "ahmedabad":
                return "AMD";
            case "jai":
            case "jaipur":
                return "JAI";
            case "goi":
            case "goa":
                return "GOI";
            case "cok":
            case "kochi":
            case "cochin":
                return "COK";
            case "trv":
            case "trivandrum":
            case "thiruvananthapuram":
                return "TRV";
            case "lko":
            case "lucknow":
                return "LKO";
            default:
                return null;
        }
    }
}
