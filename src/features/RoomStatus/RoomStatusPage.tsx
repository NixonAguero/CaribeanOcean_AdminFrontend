import { PDFDownloadLink } from "@react-pdf/renderer";
import { useRoomStatus } from "./hooks/useRoomStatus";
import { useEffect, useState } from "react";
import RoomStatusPDF from "./components/RoomStatusPDF";
import { getRoomTypes } from "../RoomStatus/services/roomType.service";
import type { RoomType } from "./types/roomType.types";
import styles from './styles/roomStatus.module.css';

const RoomStatusPage = () => {
  const {
    rooms,
    loading,
    selectedRoomType,
    setSelectedRoomType
  } = useRoomStatus();

  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const data = await getRoomTypes();
        setRoomTypes(data);
      } catch (error) {
        console.error("Error loading room types:", error);
      }
    };

    fetchRoomTypes();
  }, []);

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "available": return styles.statusAvailable;
      case "occupied":  return styles.statusOccupied;
      default:          return styles.statusInactive;
    }
  };

  return (
    <div className={styles.page}>
      <h2>Room Status Today</h2>

      <div className={styles.filterContainer}>
        <select
          className={styles.filterSelect}
          value={selectedRoomType ?? ""}
          onChange={(e) =>
            setSelectedRoomType(
              e.target.value ? Number(e.target.value) : null
            )
          }
        >
          <option value="">All room types</option>
          {roomTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Room</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.number} className={styles.tableRow}>
                  <td>{room.number}</td>
                  <td>{room.roomType}</td>
                  <td>
                    <span className={getStatusClass(room.status)}>
                      {room.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className={styles.printContainer}>
        <PDFDownloadLink
          document={<RoomStatusPDF rooms={rooms} />}
          fileName="room-status-today.pdf"
        >
          {({ loading }) => (
            <button className={styles.printButton} disabled={loading}>
              <span className={styles.printIcon}>🖨️</span>
              {loading ? "Generating..." : "Print"}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default RoomStatusPage;