-- Simple schema for demo; adjust to Oracle when switching profile
CREATE TABLE IF NOT EXISTS flights (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    flight_number VARCHAR(50),
    airline VARCHAR(100),
    from_airport VARCHAR(50),
    to_airport VARCHAR(50),
    departure_time VARCHAR(50),
    arrival_time VARCHAR(50),
    seats_available INT,
    price INT,
    duration VARCHAR(50),
    "DATE" VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS ancillaries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description VARCHAR(255),
    price INT,
    category VARCHAR(50)
);
