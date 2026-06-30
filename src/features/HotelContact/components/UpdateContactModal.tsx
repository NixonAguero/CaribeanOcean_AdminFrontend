import { useState } from "react";
import toast from "react-hot-toast";
import "./CreateModal.css";

import type { HotelContact } from "../types/HotelContact.types";
import { updateContact } from "../services/HotelContact.services";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  contact: HotelContact;
}

const contactTypes = [
  "whatsapp",
  "calls",
  "email",
  "instagram",
  "tikTok",
  "facebook",
];

const UpdateContactModal = ({
  isOpen,
  onClose,
  onSuccess,
  contact,
}: Props) => {
  const [formData, setFormData] = useState({
    type: contact.type,
    contact: contact.contact,
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleTypeChange = (
  e: React.ChangeEvent<HTMLSelectElement>
) => {
  setFormData((prev) => ({
    ...prev,
    type: e.target.value,
  }));
};

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!formData.type.trim()) {
      toast.error("Type is required");
      return;
    }

    if (!formData.contact.trim()) {
      toast.error("Contact is required");
      return;
    }

    try {
      await updateContact(contact.id, {
        type: formData.type,
        contact: formData.contact,
      });

      toast.success(
        "Contact updated successfully"
      );

      await onSuccess();

      onClose();

    } catch (error) {

      console.error(error);

      toast.error(
        "Error updating contact"
      );
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>Edit Contact</h2>

        <form className="season-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Type</label>

            <select
            name="type"
            value={formData.type}
            onChange={handleTypeChange}
              >
            <option value="">Select a type</option>

             {contactTypes.map((type) => (
              <option key={type} value={type}>
               {type}
               </option>
                    ))}
              </select>
          </div>

          <div className="form-group">
            <label>Contact</label>

            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>

          <div className="modal-actions">
            <button
              type="submit"
              className="btn-action"
            >
              Update
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateContactModal;
