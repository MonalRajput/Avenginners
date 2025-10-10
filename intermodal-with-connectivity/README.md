# Intermodal Backend (Spring Boot + Oracle)

REST API for the Angular frontend (Avenginners). Endpoints:

- `GET /api/flights/search?from=DEL&to=BOM&date=YYYY-MM-DD`
- `GET /api/flights?sourceCity=DEL&destinationCity=BOM`
- `GET /api/ancillaries`
- `GET /api/transport-options?locationId=1&airportId=2`
- `POST /api/bookings`

Profiles:
- Default: in-memory H2 with starter schema/data
- Oracle: run with `--spring.profiles.active=oracle` and set `application-oracle.properties` values.

Build:
- `mvn -DskipTests package` (requires Maven)

Run:
- `java -jar target/intermodal-0.0.1-SNAPSHOT.jar`
