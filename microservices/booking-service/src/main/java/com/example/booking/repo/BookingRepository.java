package com.example.booking.repo;

import com.example.booking.domain.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> { }
