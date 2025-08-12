class Flight {
  final String flightDate;
  final String flightStatus;
  final AirportInfo departure;
  final AirportInfo arrival;
  final AirlineInfo airline;
  final FlightInfo flight;

  Flight({
    required this.flightDate,
    required this.flightStatus,
    required this.departure,
    required this.arrival,
    required this.airline,
    required this.flight,
  });

  factory Flight.fromJson(Map<String, dynamic> json) {
    return Flight(
      flightDate: json['flight_date'] ?? 'N/A',
      flightStatus: json['flight_status'] ?? 'N/A',
      departure: AirportInfo.fromJson(json['departure'] ?? {}),
      arrival: AirportInfo.fromJson(json['arrival'] ?? {}),
      airline: AirlineInfo.fromJson(json['airline'] ?? {}),
      flight: FlightInfo.fromJson(json['flight'] ?? {}),
    );
  }
}

class AirportInfo {
  final String? airport;
  final String? iata;
  final String? scheduled;
  final String? actual;
  final String? estimated;

  AirportInfo({
    this.airport,
    this.iata,
    this.scheduled,
    this.actual,
    this.estimated,
  });

  factory AirportInfo.fromJson(Map<String, dynamic> json) {
    return AirportInfo(
      airport: json['airport'],
      iata: json['iata'],
      scheduled: json['scheduled'],
      actual: json['actual'],
      estimated: json['estimated'],
    );
  }
}

class AirlineInfo {
  final String? name;

  AirlineInfo({this.name});

  factory AirlineInfo.fromJson(Map<String, dynamic> json) {
    return AirlineInfo(name: json['name']);
  }
}

class FlightInfo {
  final String? number;
  final String? iata;

  FlightInfo({this.number, this.iata});

  factory FlightInfo.fromJson(Map<String, dynamic> json) {
    return FlightInfo(
      number: json['number'],
      iata: json['iata'],
    );
  }
}