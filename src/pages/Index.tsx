import { useState } from "react";
import Header from "@/components/Header";
import FlightSearch from "@/components/FlightSearch";
import FlightStatus from "@/components/FlightStatus";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { showError } from "@/utils/toast";

// Mock data for a flight
const mockFlightData = {
  flightNumber: "DYAD123",
  status: "On Time",
  departure: {
    airport: "San Francisco (SFO)",
    scheduled: "2024-08-15T10:00:00Z",
    actual: "2024-08-15T10:05:00Z",
  },
  arrival: {
    airport: "New York (JFK)",
    scheduled: "2024-08-15T18:30:00Z",
    estimated: "2024-08-15T18:25:00Z",
  },
  aircraft: "Boeing 777",
  airline: "Dyad Air",
};

export type FlightData = typeof mockFlightData;

const Index = () => {
  const [flightData, setFlightData] = useState<FlightData | null>(null);

  const handleSearch = (flightNumber: string) => {
    // In a real app, you'd fetch data from an API
    // For now, we'll just use the mock data if the number matches
    if (flightNumber.toUpperCase() === "DYAD123") {
      setFlightData(mockFlightData);
    } else {
      setFlightData(null);
      showError("Flight not found. Please try 'DYAD123'.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pb-16">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="space-y-8">
          <FlightSearch onSearch={handleSearch} />
          {flightData ? (
            <FlightStatus flight={flightData} />
          ) : (
            <div className="mt-8 pt-8 text-center text-gray-500 dark:text-gray-400">
              <p className="text-lg">Enter a flight number to begin tracking.</p>
              <p className="text-sm mt-1">(Hint: Try "DYAD123")</p>
            </div>
          )}
        </div>
      </main>
      <div className="absolute bottom-0 w-full">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;