import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaneTakeoff, PlaneLanding, Clock, Calendar } from "lucide-react";
import type { FlightData } from "@/pages/Index";

interface FlightStatusProps {
  flight: FlightData;
}

const FlightStatus = ({ flight }: FlightStatusProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "on time":
        return "bg-green-500 hover:bg-green-500";
      case "delayed":
        return "bg-yellow-500 hover:bg-yellow-500";
      case "cancelled":
        return "bg-red-500 hover:bg-red-500";
      case "landed":
        return "bg-blue-500 hover:bg-blue-500";
      default:
        return "bg-gray-500 hover:bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <Card className="max-w-4xl mx-auto mt-8">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{flight.airline} {flight.flightNumber}</CardTitle>
            <CardDescription>{flight.departure.airport} to {flight.arrival.airport}</CardDescription>
          </div>
          <Badge className={`text-white ${getStatusColor(flight.status)}`}>{flight.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center"><PlaneTakeoff className="mr-2 h-5 w-5" /> Departure</h3>
          <div className="pl-7 space-y-2">
            <p className="font-medium">{flight.departure.airport}</p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Scheduled: {formatDate(flight.departure.scheduled)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock className="mr-2 h-4 w-4" />
              <span>Time: {formatTime(flight.departure.scheduled)} (Actual: {formatTime(flight.departure.actual)})</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center"><PlaneLanding className="mr-2 h-5 w-5" /> Arrival</h3>
          <div className="pl-7 space-y-2">
            <p className="font-medium">{flight.arrival.airport}</p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Scheduled: {formatDate(flight.arrival.scheduled)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock className="mr-2 h-4 w-4" />
              <span>Time: {formatTime(flight.arrival.scheduled)} (Estimated: {formatTime(flight.arrival.estimated)})</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightStatus;