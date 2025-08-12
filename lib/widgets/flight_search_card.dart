import 'package:flutter/material.dart';

class FlightSearchCard extends StatefulWidget {
  final Function(String, String) onSearch;
  final bool isLoading;

  const FlightSearchCard({
    super.key,
    required this.onSearch,
    required this.isLoading,
  });

  @override
  State<FlightSearchCard> createState() => _FlightSearchCardState();
}

class _FlightSearchCardState extends State<FlightSearchCard> {
  final _iataController = TextEditingController();
  final List<bool> _isSelected = [true, false]; // [departure, arrival]

  @override
  void dispose() {
    _iataController.dispose();
    super.dispose();
  }

  void _performSearch() {
    final type = _isSelected[0] ? 'departure' : 'arrival';
    widget.onSearch(_iataController.text, type);
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Airport Flight Schedule', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            const Text('Enter an Airport IATA code to see its live schedule.', style: TextStyle(color: Colors.grey)),
            const SizedBox(height: 16),
            ToggleButtons(
              isSelected: _isSelected,
              onPressed: (index) {
                setState(() {
                  for (int i = 0; i < _isSelected.length; i++) {
                    _isSelected[i] = i == index;
                  }
                });
              },
              borderRadius: BorderRadius.circular(8),
              children: const [
                Padding(padding: EdgeInsets.symmetric(horizontal: 16), child: Text('Departures')),
                Padding(padding: EdgeInsets.symmetric(horizontal: 16), child: Text('Arrivals')),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _iataController,
                    maxLength: 3,
                    textCapitalization: TextCapitalization.characters,
                    decoration: const InputDecoration(
                      labelText: 'IATA Code',
                      hintText: 'e.g., JFK, LHR',
                      border: OutlineInputBorder(),
                      counterText: "",
                    ),
                    onSubmitted: (_) => _performSearch(),
                  ),
                ),
                const SizedBox(width: 8),
                ElevatedButton.icon(
                  onPressed: widget.isLoading ? null : _performSearch,
                  icon: const Icon(Icons.search),
                  label: const Text('Search'),
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}