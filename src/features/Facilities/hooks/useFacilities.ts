import { useState, useCallback } from "react";
import type { Facility, CreateFacilityDTO, UpdateFacilityDTO, FacilityFormData } from "../types/facility";
import { facilityService } from "../services/facilityService";
import { useAsyncState } from "../../../shared/hooks/useAsyncState";

export const useFacilities = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const { isLoading, error, withAsync } = useAsyncState();

  // Fetch all facilities
  const fetchFacilities = useCallback(async () => {
    return await withAsync(async () => {
      const data = await facilityService.getAll();
      // Sort by displayOrder ascending
      const sorted = [...data].sort((a, b) => a.displayOrder - b.displayOrder);
      setFacilities(sorted);
    });
  }, []);

  // Create a new facility
  const createFacility = async (facilityData: CreateFacilityDTO) => {
    return await withAsync(async () => {
      await facilityService.create(facilityData);
      await fetchFacilities();
    });
  };

  // Update a facility
  const updateFacility = async (id: number, facilityData: UpdateFacilityDTO) => {
    return await withAsync(async () => {
      await facilityService.update(id, facilityData);
      await fetchFacilities();
    });
  };

  // Delete a facility
  const deleteFacility = async (id: number, updatedBy?: number | null) => {
    return await withAsync(async () => {
      await facilityService.delete(id, updatedBy);
      setFacilities((prev) => prev.filter((fac) => fac.id !== id));
    });
  };

  return {
    facilities,
    loading: isLoading,
    error,
    fetchFacilities,
    createFacility,
    updateFacility,
    deleteFacility,
  };
};
