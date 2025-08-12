import { useState } from "react";
import Header from "@/components/Header";
import FlightSearch from "@/components/FlightSearch";
import FlightList from "@/components/FlightList";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { showError } from "@/utils/toast";
import { fetchAirportSchedule } from "@/services/flightService";
import type { Flight } from "@/types/flight";

const Dashboard = () => {
  const [flights, setFlights] = useState<Flight[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState<"departure" | "arrival">(
    "departure",
  );

  const handleSearch = async (iata: string, type: "departure" | "arrival") => {
    setIsLoading(true);
    setFlights(null);
    setSearchType(type);
    try {
      const data = await fetchAirportSchedule(iata, type);
      if (data && data.length > 0) {
        setFlights(data);
      } else {
        showError(
          `No ${type}s found for ${iata}. Please check the IATA code and try again.`,
        );
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
          {flights && flights.length > 0 && (
            <FlightList flights={flights} type={searchType} />
          )}
          {!flights && !isLoading && (
            <div className="mt-8 pt-8 text-center text-gray-500 dark:text-gray-400">
              <p className="text-lg">
                Enter an airport IATA code to see its schedule.
              </p>
              <p className="text-sm mt-1">(e.g., JFK, LHR, HND)</p>
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