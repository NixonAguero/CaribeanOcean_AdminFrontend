import { useEffect, useState } from "react";
import SeasonsModal from "./components/SeasonsModal";
import { GetAllSeasons, deleteSeason } from "./services/season.service";
import type { SeasonType } from "./types/season.types";
import "./components/SeasonsPage.css";

const SeasonsPage = () => {
  const [seasons, setSeasons] = useState<SeasonType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<SeasonType|null>(null);

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

  //  ELIMINAR
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("¿Eliminar season?");
    if (!confirmDelete) return;

    try {
      await deleteSeason(id);
      await fetchSeasons();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar");
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Seasons</h1>
      
      <button className="btn-action"
       onClick={handleCreate}>Add Season</button>

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
                  onClick={() => handleDelete(season.id)}
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
    </div>
  );
};

export default SeasonsPage;