import { PDFDownloadLink } from "@react-pdf/renderer";
import { useRoomStatus } from "./hooks/useRoomStatus";
import RoomStatusPDF from "./components/RoomStatusPDF";
import './styles/roomStatus.css';

const RoomStatusPage = () => {
  const {
    rooms,
    loading,
    selectedRoomType,
    setSelectedRoomType
  } = useRoomStatus();

  return (
    <div className="room-status-page">
      <h2>Room Status Today</h2>

      <div className="filter-container">
        <select
          className="filter-select"
          value={selectedRoomType ?? ""}
          onChange={(e) =>
            setSelectedRoomType(
              e.target.value ? Number(e.target.value) : null
            )
          }
        >
          <option value="">All room types</option>
          <option value="1">Junior</option>
          <option value="2">Standart</option>
          <option value="3">Premiun</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="room-table">
          <thead>
            <tr>
              <th>Room</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.number}</td>
                <td>{room.roomType}</td>
                <td className={`status-${room.status.toLowerCase()}`}>
                  {room.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="print-button-container">
        <PDFDownloadLink
          document={<RoomStatusPDF rooms={rooms} />}
          fileName="room-status-today.pdf"
        >
          {({ loading }) => (
            <button className="print-button" disabled={loading}>
              <span className="print-icon">🖨️</span>
              {loading ? "Generating..." : "Print"}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default RoomStatusPage;