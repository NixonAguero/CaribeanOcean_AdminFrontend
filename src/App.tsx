import { Routes, Route, Navigate } from 'react-router-dom';
import RoomsPage from './features/rooms/RoomsPage';

function App() {
  return (
    <Routes>
      {/* Manage Rooms */}
      <Route path="/admin/rooms" element={<RoomsPage />} />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/admin/rooms" replace />} />
    </Routes>
  );
}

export default App;
