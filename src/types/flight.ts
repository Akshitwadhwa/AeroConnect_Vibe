export interface Flight {
  flight_date: string;
  flight_status: string;
  departure: {
    airport: string;
    iata: string;
    scheduled: string;
    actual: string | null;
    estimated: string;
  };
  arrival: {
    airport: string;

    iata: string;
    scheduled: string;
    actual: string | null;
    estimated: string;
  };
  airline: {
    name: string;
  };
  flight: {
    number: string;
    iata: string;
  };
}