import "./SeasonDetailModal.css";

type Season = {
  id: number;
  startDate: Date;
  endDate: Date;
  discountAmount: number;
};

interface Props {
  season: Season;
  onClose: () => void;
}

const SeasonDetailsModal = ({ season, onClose }: Props) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <button className="close-btn" onClick={onClose}>✕</button>

        <h2>Detalles de la Temporada</h2>

        <p><strong>ID:</strong> {season.id}</p>
        <p><strong>Inicio:</strong> {season.startDate.toISOString()}</p>
        <p><strong>Fin:</strong> {season.endDate.toISOString()}</p>
        <p><strong>Descuento:</strong> {season.discountAmount}%</p>

      </div>
    </div>
  );
};

export default SeasonDetailsModal;