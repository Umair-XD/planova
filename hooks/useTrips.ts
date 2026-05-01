import { useState, useEffect } from "react";
import { Trip } from "@/types";
import { toast } from "react-hot-toast";

export const useTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrips = async () => {
    try {
      const res = await fetch("/api/trips");
      const data = await res.json();
      if (data.data) {
        setTrips(data.data);
      }
    } catch (error) {
      toast.error("Failed to load trips");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return { trips, isLoading, refetch: fetchTrips };
};
