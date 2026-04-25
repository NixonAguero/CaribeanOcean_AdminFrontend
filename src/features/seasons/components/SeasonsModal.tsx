import { useState } from "react";
import "./SeasonModal.css";
import { createSeason } from "../services/season.service";
import type { SeasonType } from "../types/season.types";
import toast from "react-hot-toast";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  season?: SeasonType  | null ;
  isEditing?: boolean;
}



const SeasonsModal = ({isOpen,onClose, onSuccess}:Props) => {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    discountAmount: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
    const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.name || !formData.startDate || !formData.endDate || !formData.discountAmount) {
    toast.error("Please fill in all required fields ");
    return;
  }

  try {
    const data = await createSeason({
      name: formData.name,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      discountAmount: Number(formData.discountAmount),
    });

    console.log("Respuesta backend:", data);

    toast.success("Season created succesfully");

    await onSuccess();
    onClose();

    setFormData({
      name: "",
      startDate: "",
      endDate: "",
      discountAmount: "",
    });

  } catch (error) {
    console.error(error);
    toast.error("Error saving season ❌");
  }
  
};


if (!isOpen) return null;
 return (
  <div className="modal-overlay" onClick={onClose}>
    <div 
      className="modal-content"
      onClick={(e) => e.stopPropagation()} // evita cerrar al hacer click dentro
    >

      <button className="close-btn" onClick={onClose}>✕</button>

      <h2>Register Season</h2>

      <form className="season-form" onSubmit={handleSubmit}>
        
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

        <button className="btn-edit" type="submit">Add Season</button>
      </form>

    </div>
  </div>
);
};

export default SeasonsModal;