import { Routes, Route, Navigate } from 'react-router-dom';
import RoomTypePage from './features/roomType/RoomTypePage';
import ReservationsPage from './features/booking/ReservationPage';
import RoomStatusPage from './features/RoomStatus/RoomStatusPage';
import { Toaster } from 'react-hot-toast';
import SeasonsPage from './features/seasons/SeasonsPage';
import Offers from './features/offers/components/Offers';
import Layout from './app/layout/MainLayout';
import HeroPage from './features/hero/HeroPage';
import ManagePagesPage from './features/managePages/ManagePagesPage';
import AddPage from './features/adds/AddPage';

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#E1F5EE",
            color: "#085041",
            borderRadius: "4px",
            padding: "12px 16px",
            borderLeft: "3px solid #1D9E75",
            fontFamily: "Lato, sans-serif",
            fontSize: "14px",
            fontWeight: 400,
          },
        }}
      />

      <Layout>
        <Routes>

          <Route path="/admin/pages" element={<ManagePagesPage />} />
          <Route path="/admin/rooms" element={<RoomTypePage />} />
          <Route path="/admin/reservations" element={<ReservationsPage />} />
          <Route path="/admin/status" element={<RoomStatusPage />} />
          <Route path="/admin/season" element={<SeasonsPage />} />
          <Route path="/admin/offers" element={<Offers />} />
          <Route path="/admin/hero" element={<HeroPage />} />
          <Route path="/admin/advertising" element={<AddPage />} />

          <Route path="" element={<Navigate to="/admin/rooms" replace />} />
        </Routes>
      </Layout>

    </>
  );
}

export default App;