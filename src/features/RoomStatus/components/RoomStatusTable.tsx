import type { RoomStatus } from '../types/roomStatus.types';
import '../styles/roomStatus.css';

interface Props {
  rooms: RoomStatus[];
}

const statusClassMap = {
  AVAILABLE: 'status-available',
  OCCUPIED: 'status-occupied',
  INACTIVE: 'status-inactive',
};

const RoomStatusTable = ({ rooms }: Props) => {
  return (
    <table className="room-table">
      <thead>
        <tr>
          <th>Room Number</th>
          <th>Room Type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room) => (
          <tr key={room.number}>
            <td>{room.number}</td>
            <td>{room.roomType}</td>
            <td className={statusClassMap[room.status]}>
              {room.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoomStatusTable;