import type { Flight } from "@/types/flight";

// WARNING: In a real application, never expose your API key directly in client-side code.
// Use a secure backend server or environment variables to handle API keys.
const AVIATION_STACK_API_KEY = "8790b729634ab91a95498af99b04e91c";
const AVIATION_STACK_BASE_URL = "http://api.aviationstack.com/v1";

export const fetchFlightByNumber = async (
  flightNumber: string,
): Promise<Flight | null> => {
  if (!flightNumber.trim()) {
    throw new Error("Please enter a valid flight number.");
  }

  // Using http instead of https because the free plan of AviationStack doesn't support https
  const url = `${AVIATION_STACK_BASE_URL}/flights?access_key=${AVIATION_STACK_API_KEY}&flight_iata=${flightNumber.toUpperCase()}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    // Attempt to parse a meaningful error message from the API response
    const message =
      errorData?.error?.message ||
      `Failed to fetch flight data: ${response.statusText}`;
    throw new Error(message);
  }

  const data = await response.json();

  if (data.data && data.data.length > 0) {
    // The API returns an array, we'll take the first result for a specific flight number search.
    return data.data[0] as Flight;
  }

  return null; // No flight found
};