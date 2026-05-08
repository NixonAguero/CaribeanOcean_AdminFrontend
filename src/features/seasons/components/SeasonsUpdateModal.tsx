import { useState } from "react";
import toast from "react-hot-toast";

import type { SeasonType } from "../types/season.types";
import { updateSeason } from "../services/season.service";

import "./SeasonModal.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  season: SeasonType;
}

type FormDataType = {
  name: string;
  startDate: string;
  endDate: string;
  discountAmount: string;
};

const SeasonsUpdateModal = ({
  isOpen,
  onClose,
  onSuccess,
  season,
}: Props) => {

 const [formData, setFormData] = useState<FormDataType>({
  name: season.name,

  startDate: new Date(season.startDate)
    .toISOString()
    .split("T")[0],

  endDate: new Date(season.endDate)
    .toISOString()
    .split("T")[0],

  discountAmount: season.discountAmount.toString(),
});


 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (
      !formData.name ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.discountAmount
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

     const start = new Date(formData.startDate);
     const end = new Date(formData.endDate);

  if (start > end) {
    toast.error("Start date cannot be greater than end date.");
    return;
  }

    try {

      await updateSeason(season.id, {
        name: formData.name,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        discountAmount: Number(formData.discountAmount),
      });

      toast.success("Season updated successfully ✏️");

     
      onSuccess();

      
      onClose();

    } catch (error) {

      console.error(error);
      toast.error("Error updating season ❌");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>

      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>Update Season</h2>

        <form
          className="season-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="name"
            placeholder="Season name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />

          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />

          <input
            type="number"
            name="discountAmount"
            placeholder="Discount (%)"
            value={formData.discountAmount}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="add-button"
          >
            Update Season
          </button>

        </form>
      </div>
    </div>
  );
};

export default SeasonsUpdateModal;