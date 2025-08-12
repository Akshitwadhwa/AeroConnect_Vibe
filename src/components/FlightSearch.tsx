import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Loader2 } from "lucide-react";

interface FlightSearchProps {
  onSearch: (flightNumber: string) => void;
  isLoading: boolean;
}

const FlightSearch = ({ onSearch, isLoading }: FlightSearchProps) => {
  const [flightNumber, setFlightNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (flightNumber.trim()) {
      onSearch(flightNumber.trim());
    }
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Track a Flight</CardTitle>
        <CardDescription>Enter a flight number to see its live status.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="e.g., UA423"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            className="flex-grow"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Search className="h-4 w-4 mr-2" />
            )}
            Track
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FlightSearch;