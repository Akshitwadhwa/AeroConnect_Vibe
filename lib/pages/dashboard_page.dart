import 'package:flutter/material.dart';
import 'package:flight_tracker/models/flight.dart';
import 'package:flight_tracker/services/flight_service.dart';
import 'package:flight_tracker/widgets/flight_list.dart';
import 'package:flight_tracker/widgets/flight_search_card.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

class DashboardPage extends StatefulWidget {
  const DashboardPage({super.key});

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  final FlightService _flightService = FlightService();
  List<Flight>? _flights;
  bool _isLoading = false;
  String _searchType = 'departure';

  void _handleSearch(String iata, String type) async {
    setState(() {
      _isLoading = true;
      _flights = null;
      _searchType = type;
    });

    try {
      final flights = await _flightService.fetchAirportSchedule(airportIata: iata, type: type);
      setState(() {
        _flights = flights;
      });

      if (flights.isEmpty && mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('No ${type}s found for ${iata.toUpperCase()}.')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: ${e.toString()}')),
        );
      }
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Flight Tracker'),
        actions: [
          PopupMenuButton(
            icon: const Icon(Icons.account_circle),
            itemBuilder: (context) => [
              const PopupMenuItem(child: Text('Settings')),
              const PopupMenuItem(child: Text('Support')),
              const PopupMenuDivider(),
              PopupMenuItem(
                child: const Text('Logout'),
                onTap: () => Navigator.pushReplacementNamed(context, '/login'),
              ),
            ],
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 1200),
            child: Column(
              children: [
                FlightSearchCard(
                  onSearch: _handleSearch,
                  isLoading: _isLoading,
                ),
                const SizedBox(height: 24),
                if (_isLoading)
                  const SpinKitCircle(color: Colors.blue, size: 50.0)
                else if (_flights != null)
                  FlightList(flights: _flights!, type: _searchType)
                else
                  const Padding(
                    padding: EdgeInsets.all(32.0),
                    child: Text(
                      'Enter an airport IATA code to see its schedule.',
                      style: TextStyle(fontSize: 16, color: Colors.grey),
                      textAlign: TextAlign.center,
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}