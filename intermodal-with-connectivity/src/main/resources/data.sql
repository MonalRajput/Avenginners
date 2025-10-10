INSERT INTO flights (flight_number, airline, from_airport, to_airport, departure_time, arrival_time, seats_available, price, duration, "DATE")
VALUES ('AI-101', 'Air India', 'DEL', 'BOM', '08:00 AM', '10:30 AM', 120, 4500, '2h 30m', '2025-10-10');

INSERT INTO ancillaries (name, description, price, category)
VALUES
('Extra Baggage (20kg)', 'Additional checked baggage', 800, 'baggage'),
('Veg Meal', 'Vegetarian in-flight meal', 300, 'meal'),
('Window Seat', 'Preferred window seat', 500, 'seat'),
('Priority Boarding', 'Fast-track boarding', 400, 'other');
