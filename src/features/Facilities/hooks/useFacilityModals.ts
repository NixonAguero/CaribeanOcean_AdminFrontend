import { useState } from "react";
import type { Facility } from "../types/facility";

export const useFacilityModals = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  const openAddFlow = () => {
    setSelectedFacility(null);
    setFormOpen(true);
  };

  const openUpdateFlow = (facility: Facility) => {
    setSelectedFacility(facility);
    setFormOpen(true);
  };

  const openDeleteFlow = (facility: Facility) => {
    setSelectedFacility(facility);
    setDeleteOpen(true);
  };

  const closeFormFlow = () => {
    setFormOpen(false);
    setSelectedFacility(null);
  };

  const closeDeleteFlow = () => {
    setDeleteOpen(false);
    setSelectedFacility(null);
  };

  return {
    modals: {
      isFormOpen,
      isDeleteOpen,
    },
    data: {
      selectedFacility,
    },
    actions: {
      openAddFlow,
      openUpdateFlow,
      openDeleteFlow,
      closeFormFlow,
      closeDeleteFlow,
    },
  };
};
