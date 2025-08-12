import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Loader2 } from "lucide-react";

interface FlightSearchProps {
  onSearch: (iata: string, type: "departure" | "arrival") => void;
  isLoading: boolean;
}

const FlightSearch = ({ onSearch, isLoading }: FlightSearchProps) => {
  const [iata, setIata] = useState("");
  const [type, setType] = useState<"departure" | "arrival">("departure");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (iata.trim()) {
      onSearch(iata.trim(), type);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Airport Flight Schedule</CardTitle>
        <CardDescription>
          Enter an Airport IATA code to see its live schedule.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={type}
          onValueChange={(value) => setType(value as "departure" | "arrival")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="departure">Departures</TabsTrigger>
            <TabsTrigger value="arrival">Arrivals</TabsTrigger>
          </TabsList>
        </Tabs>
        <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
          <Input
            type="text"
            placeholder="e.g., JFK, LHR, HND"
            value={iata}
            onChange={(e) => e.target.value.length <= 3 && setIata(e.target.value.toUpperCase())}
            className="flex-grow"
            disabled={isLoading}
            maxLength={3}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Search className="h-4 w-4 mr-2" />
            )}
            Search
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FlightSearch;