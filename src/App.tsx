import { Routes, Route, Navigate } from 'react-router-dom';
import RoomsPage from './features/rooms/RoomsPage';
import ReservationsPage from './features/booking/ReservationPage';

function App() {
  return (
    <Routes>
      {/* Manage Rooms */}
      <Route path="/admin/rooms" element={<RoomsPage />} />
<Route path="/admin/reservations" element={<ReservationsPage />} />
      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/admin/rooms" replace />} />
    </Routes>
  );
}

export default App;
