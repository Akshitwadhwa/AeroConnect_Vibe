import 'package:flutter/material.dart';
import 'package:flight_tracker/models/flight.dart';
import 'package:intl/intl.dart';

class FlightList extends StatelessWidget {
  final List<Flight> flights;
  final String type;

  const FlightList({super.key, required this.flights, required this.type});

  Color _getStatusColor(String status) {
    switch (status.toLowerCase()) {
      case "scheduled": return Colors.blue;
      case "active":
      case "en-route": return Colors.green;
      case "landed": return Colors.purple;
      case "cancelled": return Colors.red;
      case "delayed": return Colors.orange;
      default: return Colors.grey;
    }
  }

  String _formatTime(String? dateString) {
    if (dateString == null) return "N/A";
    try {
      final date = DateTime.parse(dateString);
      return DateFormat.jm().format(date); // e.g., 5:08 PM
    } catch (e) {
      return "N/A";
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text(
              '${type[0].toUpperCase()}${type.substring(1)}s Schedule',
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
          ),
          SizedBox(
            width: double.infinity,
            child: DataTable(
              columnSpacing: 16,
              columns: [
                const DataColumn(label: Text('Time')),
                DataColumn(label: Text(type == 'departure' ? 'Destination' : 'Origin')),
                const DataColumn(label: Text('Flight')),
                const DataColumn(label: Text('Airline')),
                const DataColumn(label: Text('Status')),
              ],
              rows: flights.map((flight) {
                final time = type == 'departure' ? flight.departure.scheduled : flight.arrival.scheduled;
                final airportInfo = type == 'departure' ? flight.arrival : flight.departure;

                return DataRow(cells: [
                  DataCell(Text(_formatTime(time))),
                  DataCell(
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(airportInfo.airport ?? 'N/A', style: const TextStyle(fontWeight: FontWeight.bold)),
                        Text(airportInfo.iata ?? 'N/A', style: const TextStyle(color: Colors.grey)),
                      ],
                    ),
                  ),
                  DataCell(Text(flight.flight.iata ?? 'N/A')),
                  DataCell(Text(flight.airline.name ?? 'N/A')),
                  DataCell(
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: _getStatusColor(flight.flightStatus),
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: Text(
                        flight.flightStatus,
                        style: const TextStyle(color: Colors.white),
                      ),
                    ),
                  ),
                ]);
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }
}