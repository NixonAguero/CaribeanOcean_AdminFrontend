import { Routes, Route, Navigate } from 'react-router-dom';
import RoomsPage from './features/rooms/RoomsPage';
import ReservationsPage from './features/booking/ReservationPage';
import RoomStatusPage from './features/RoomStatus/RoomStatusPage';

function App() {
  return (
    <Routes>
      {/* Manage Rooms */}
      <Route path="/admin/rooms" element={<RoomsPage />} />
      <Route path="/admin/reservations" element={<ReservationsPage />} />
      <Route path="/admin/status" element={<RoomStatusPage />} />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/admin/rooms" replace />} />
    </Routes>
  );
}

export default App;
