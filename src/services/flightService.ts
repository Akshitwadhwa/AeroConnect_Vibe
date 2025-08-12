import type { Flight } from "@/types/flight";

// WARNING: In a real application, never expose your API key directly in client-side code.
// Use a secure backend server or environment variables to handle API keys.
const AVIATION_STACK_API_KEY = "8790b729634ab91a95498af99b04e91c";
const AVIATION_STACK_BASE_URL = "http://api.aviationstack.com/v1";

export const fetchAirportSchedule = async (
  airportIata: string,
  type: "departure" | "arrival",
): Promise<Flight[]> => {
  if (!airportIata.trim()) {
    throw new Error("Please enter a valid Airport IATA code.");
  }

  // Using http instead of https because the free plan of AviationStack doesn't support https
  const url = `${AVIATION_STACK_BASE_URL}/flights?access_key=${AVIATION_STACK_API_KEY}&${
    type === "departure" ? "dep_iata" : "arr_iata"
  }=${airportIata.toUpperCase()}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    const message =
      errorData?.error?.message ||
      `Failed to fetch flight data: ${response.statusText}`;
    throw new Error(message);
  }

  const data = await response.json();

  if (data.data && data.data.length > 0) {
    return data.data as Flight[];
  }

  return []; // No flights found, return an empty array
};