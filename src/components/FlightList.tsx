import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Flight } from "@/types/flight";

interface FlightListProps {
  flights: Flight[];
  type: "departure" | "arrival";
}

const FlightList = ({ flights, type }: FlightListProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return "bg-blue-500 hover:bg-blue-500";
      case "active":
      case "en-route":
        return "bg-green-500 hover:bg-green-500";
      case "landed":
        return "bg-purple-500 hover:bg-purple-500";
      case "cancelled":
        return "bg-red-500 hover:bg-red-500";
      case "delayed":
        return "bg-yellow-500 hover:bg-yellow-500";
      default:
        return "bg-gray-500 hover:bg-gray-500";
    }
  };

  const formatTime = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Card className="max-w-6xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="capitalize">{type}s Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>
                  {type === "departure" ? "Destination" : "Origin"}
                </TableHead>
                <TableHead>Flight</TableHead>
                <TableHead>Airline</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flights.map((flight, index) => (
                <TableRow key={`${flight.flight.iata}-${index}`}>
                  <TableCell className="font-medium">
                    {formatTime(
                      type === "departure"
                        ? flight.departure.scheduled
                        : flight.arrival.scheduled,
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {type === "departure"
                        ? flight.arrival.airport
                        : flight.departure.airport}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {type === "departure"
                        ? flight.arrival.iata
                        : flight.departure.iata}
                    </div>
                  </TableCell>
                  <TableCell>{flight.flight.iata}</TableCell>
                  <TableCell>{flight.airline.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={`capitalize text-white ${getStatusColor(
                        flight.flight_status,
                      )}`}
                    >
                      {flight.flight_status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightList;