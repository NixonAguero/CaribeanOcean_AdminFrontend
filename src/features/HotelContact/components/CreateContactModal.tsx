import { useState } from "react";
import toast from "react-hot-toast";
import "./CreateModal.css";

import { createContact } from "../services/HotelContact.services";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateContactModal = ({
  isOpen,
  onClose,
  onSuccess,
}: Props) => {
  const [formData, setFormData] = useState({
    type: "",
    contact: "",
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
      await createContact({
        type: formData.type,
        contact: formData.contact,
      });

      toast.success(
        "Contact created successfully"
      );

      onSuccess();

      setFormData({
        type: "",
        contact: "",
      });

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        "Error creating contact"
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
        <h2>Create Contact</h2>

        <form className="season-form"  onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Type:  </label>

            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Email, Phone..."
            />
          </div>

          <div className="form-group">
            <label>Contact: </label>

            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="example@email.com"
            />
          </div>

          <div className="modal-actions">
            <button
              type="submit"
              className="add-button"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContactModal;