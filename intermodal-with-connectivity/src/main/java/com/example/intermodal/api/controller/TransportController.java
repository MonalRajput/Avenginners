package com.example.intermodal.api.controller;

import com.example.intermodal.api.dto.TransportModeDto;
import com.example.intermodal.api.dto.TransportRouteDto;
import com.example.intermodal.api.dto.LocationDto;
import com.example.intermodal.api.dto.AirportDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/transport-options")
@CrossOrigin(origins = "http://localhost:4200")
public class TransportController {

    @GetMapping
    public ResponseEntity<List<TransportRouteDto>> getRoutes(
            @RequestParam Long locationId,
            @RequestParam Long airportId
    ) {
        List<TransportRouteDto> routes = new ArrayList<>();
        routes.add(route(1L, locationId, airportId, "Taxi", 500, 30));
        routes.add(route(2L, locationId, airportId, "Metro", 50, 55));
        routes.add(route(3L, locationId, airportId, "Shuttle", 200, 40));
        return ResponseEntity.ok(routes);
    }

    private TransportRouteDto route(Long routeId, Long locationId, Long airportId, String modeName, int price, int duration) {
        LocationDto from = new LocationDto();
        from.setId(locationId);
        from.setName("User Location " + locationId);
        from.setCity("City" + locationId);

        AirportDto airport = new AirportDto();
        airport.setCode("AP-" + airportId);
        airport.setName("Airport " + airportId);
        airport.setLocationId(locationId);

        TransportModeDto mode = new TransportModeDto();
        mode.setId(routeId);
        mode.setName(modeName);
        mode.setDescription("Suggested route via " + modeName);
        mode.setPrice(price);
        mode.setEstimatedTime(duration + " mins");
        mode.setAvailable(true);
        mode.setModeType("pre");

        TransportRouteDto route = new TransportRouteDto();
        route.setRouteId(routeId);
        route.setFromLocation(from);
        route.setToAirport(airport);
        route.setMode(mode);
        route.setEstimatedCost(price);
        route.setEstimatedDuration(duration);
        return route;
    }
}
