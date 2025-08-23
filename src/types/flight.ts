export interface Flight {
  flight_date: string;
  flight_status: string;
  departure: {
    airport: string;
    timezone: string;
    iata: string;
    scheduled: string;
    actual: string | null;
    estimated: string;
    delay: number | null;
  };
  arrival: {
    airport: string;
    timezone: string;
    iata: string;
    scheduled: string;
    actual: string | null;
    estimated: string;
    delay: number | null;
  };
  airline: {
    name: string;
  };
  flight: {
    number: string;
    iata: string;
  };
}