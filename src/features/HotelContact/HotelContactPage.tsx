import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./components/HotelContactPage.css";
import { type HotelContact }  from "./types/hotelContact.types";
import { getAllContacts,deleteContact,} from "./services/HotelContact.services";
import CreateContactModal from "./components/CreateContactModal";

import UpdateContactModal from "./components/UpdateContactModal";
import ConfirmModal from "../seasons/components/ConfirmModal";



const HotelContactsPage = () => {

  const [contacts, setContacts] = useState<HotelContact[]>([]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const [selectedContact, setSelectedContact] =
    useState<HotelContact | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] =
    useState(false);

  const [contactToDelete, setContactToDelete] =
    useState<number | null>(null);

  const fetchContacts = async () => {
    try {

      const data = await getAllContacts();

       console.log("CONTACTS API:", data);

      setContacts(data);

    } catch (error) {

      console.error(error);

      toast.error("Error loading contacts");
    }
  };

  useEffect(() => {
    void fetchContacts();
  }, []);

  const openEditModal = (
    contact: HotelContact
  ) => {

    setSelectedContact(contact);

    setIsUpdateOpen(true);
  };

  const openDeleteModal = (
    id: number
  ) => {

    setContactToDelete(id);

    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {

    if (contactToDelete === null) return;

    try {

      await deleteContact(contactToDelete);

      toast.success(
        "Contact deleted successfully"
      );

      await fetchContacts();

    } catch (error) {

      console.error(error);

      toast.error(
        "Error deleting contact"
      );

    } finally {

      setIsDeleteOpen(false);

      setContactToDelete(null);
    }
  };

  return (
    <div className="page container">

      <div className="header">

        <h1 className="page-title">Manage Contacts</h1>

        <button
          className="add-button"
          onClick={() =>
            setIsCreateOpen(true)
          }
        >
          Add Contact
        </button>

      </div>
          
      <table className="season-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {contacts.map(contact => (

            <tr key={contact.id}>

              <td>{contact.id}</td>

              <td>{contact.type}</td>

              <td>{contact.contact}</td>

              <td>
                <div className="actions">
                <button
                  className="btn-action"
                  onClick={() =>
                    openEditModal(contact)
                  }
                >
                  Edit
                </button>

                <button
                  className="btn-action"
                  onClick={() =>
                    openDeleteModal(
                      contact.id
                    )
                  }
                >
                  Delete
                </button>
                </div>
              </td>
                  
            </tr>

          ))}

        </tbody>

      </table>

      <CreateContactModal
        isOpen={isCreateOpen}
        onClose={() =>
          setIsCreateOpen(false)
        }
        onSuccess={fetchContacts}
      />

      {selectedContact && (
        <UpdateContactModal
          isOpen={isUpdateOpen}
          onClose={() =>
            setIsUpdateOpen(false)
          }
          onSuccess={fetchContacts}
          contact={selectedContact}
        />
      )}

      <ConfirmModal
        isOpen={isDeleteOpen}
        title="Delete Contact"
        message="Are you sure you want to delete this contact?"
        onConfirm={confirmDelete}
        onCancel={() =>
          setIsDeleteOpen(false)
        }
      />

    </div>
  );
};

export default HotelContactsPage;