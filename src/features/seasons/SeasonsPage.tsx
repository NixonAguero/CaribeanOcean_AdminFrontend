import { useEffect, useState } from "react";
import SeasonsModal from "./components/SeasonsModal";
import SeasonsUpdateModal from "./components/SeasonsUpdateModal";
import ConfirmModal from "./components/ConfirmModal";
import { GetAllSeasons, deleteSeason } from "./services/season.service";
import type { SeasonType } from "./types/season.types";
import toast from "react-hot-toast";
import "./components/SeasonsPage.css";

const SeasonsPage = () => {
  const [seasons, setSeasons] = useState<SeasonType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<SeasonType|null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [seasonToDelete, setSeasonToDelete] = useState<number | null>(null);

  // Cargar seasons
  const fetchSeasons = async () => {
    try {
      const data = await GetAllSeasons();
      setSeasons(data);
    } catch (error) {
      console.error("Error loading seasons", error);
    }
  };

  useEffect(() => {
    const loadSeasons = async () => {
    try {
      const data = await GetAllSeasons();
      setSeasons(data);
    } catch (error) {
      console.error("Error cargando seasons", error);
    }
  };

  loadSeasons();
  }, []);

  const openDeleteModal = (id: number) => {
  setSeasonToDelete(id);
  setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {

  if (!seasonToDelete) return;

  try {

    await deleteSeason(seasonToDelete);

    toast.success("Season deleted successfully 🗑️");

    fetchSeasons();

  } catch (error) {

    console.error(error);

    toast.error("Error deleting season ❌");

  } finally {

    setIsDeleteOpen(false);

    setSeasonToDelete(null);
  }
};

  // ABRIR MODAL CREAR
  const handleCreate = () => {
    setSelectedSeason(null);
    setIsEditing(false);
    setIsOpen(true);
  };

  //  EDITAR
  const handleEdit = (season: SeasonType) => {
    setSelectedSeason(season);
    setIsEditing(true);
    setIsOpen(true);
  };



  return (
    <div className="page-container">
      <div className="header">
        <h1 className="page-title">Manage Seasons</h1>
        <button className="add-button" onClick={handleCreate}>Add Season</button>
      </div>

      <div className="table-container">
      <table className="season-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Start</th>
            <th>End</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {seasons.map((season) => (
            <tr key={season.id}>
              <td>{season.name}</td>
              <td>{new Date(season.startDate).toLocaleDateString()}</td>
              <td>{new Date(season.endDate).toLocaleDateString()}</td>
              <td>{season.discountAmount}%</td>

              <td>
                
                 <div className="actions">
                <button
                  className="btn-action"
                  onClick={() => handleEdit(season)}
                >
                  Edit
                </button>

                <button
                  className="btn-action"
                  onClick={() => openDeleteModal(season.id)}
                >
                  Delete
                </button>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      
      <SeasonsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={fetchSeasons}
        season={selectedSeason}
        isEditing={isEditing}
      />
        {selectedSeason && (
  <SeasonsUpdateModal
    isOpen={isOpen}
    onClose={() => {
      setIsOpen(false);
      setSelectedSeason(null);
    }}
    onSuccess={fetchSeasons}
    season={selectedSeason}
  />
)}

<ConfirmModal
  isOpen={isDeleteOpen}
  title="Delete Season"
  message="Are you sure you want to delete this season? This action cannot be undone."
  onConfirm={confirmDelete}
  onCancel={() => {
    setIsDeleteOpen(false);
    setSeasonToDelete(null);
  }}
/>
       
    </div>
  );
};

export default SeasonsPage;