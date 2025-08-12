import { useState } from "react";
import Header from "@/components/Header";
import FlightSearch from "@/components/FlightSearch";
import FlightStatus from "@/components/FlightStatus";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { showError } from "@/utils/toast";
import { fetchFlightByNumber } from "@/services/flightService";
import type { Flight } from "@/types/flight";

export type FlightData = Flight; // For compatibility with FlightStatus component if needed elsewhere

const Dashboard = () => {
  const [flightData, setFlightData] = useState<Flight | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (flightNumber: string) => {
    setIsLoading(true);
    setFlightData(null); // Clear previous results
    try {
      const data = await fetchFlightByNumber(flightNumber);
      if (data) {
        setFlightData(data);
      } else {
        showError(`Flight ${flightNumber} not found. Please check the flight number and try again.`);
      }
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pb-16">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="space-y-8">
          <FlightSearch onSearch={handleSearch} isLoading={isLoading} />
          {flightData && <FlightStatus flight={flightData} />}
          {!flightData && !isLoading && (
            <div className="mt-8 pt-8 text-center text-gray-500 dark:text-gray-400">
              <p className="text-lg">Enter a flight number to begin tracking.</p>
              <p className="text-sm mt-1">(e.g., DLH400, UAL1, AAL100)</p>
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

export default Dashboard;