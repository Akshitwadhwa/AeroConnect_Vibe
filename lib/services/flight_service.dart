import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flight_tracker/models/flight.dart';

class FlightService {
  static const String _apiKey = "8790b729634ab91a95498af99b04e91c";
  static const String _baseUrl = "http://api.aviationstack.com/v1";

  Future<List<Flight>> fetchAirportSchedule({
    required String airportIata,
    required String type, // "departure" or "arrival"
  }) async {
    if (airportIata.trim().isEmpty) {
      throw Exception("Please enter a valid Airport IATA code.");
    }

    final String typeParam = type == 'departure' ? 'dep_iata' : 'arr_iata';
    final url = Uri.parse('$_baseUrl/flights?access_key=$_apiKey&$typeParam=${airportIata.toUpperCase()}');

    final response = await http.get(url);

    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      if (data['data'] != null && data['data'] is List && (data['data'] as List).isNotEmpty) {
        final List<dynamic> flightData = data['data'];
        return flightData.map((json) => Flight.fromJson(json)).toList();
      } else {
        return []; // No flights found
      }
    } else {
      final errorData = json.decode(response.body);
      final message = errorData?['error']?['message'] ?? 'Failed to fetch flight data';
      throw Exception(message);
    }
  }
}