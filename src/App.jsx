import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./App.css";
// ===================
/* Lazy Pages */
// =======================
import {

  Home, ViewLocation, AddLocation, EditLocation, AllCards
} from "./routes/lazyPages";
import MainLayout from "./layout/MainLayout";
import CardFullDetails from "./pages/subcategori/CardFullDetails";
import SearchPage from "./pages/search/SearchPage";

function App() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <Routes>

        {/* ROOT LAYOUT */}
        <Route element={<MainLayout />}>

          {/* ========== PUBLIC ROUTES ========== */}

          <Route path="/" element={<Home />} />
          <Route path="/all-cards/:id" element={<AllCards />} />
          <Route path="/full-details/:id" element={<CardFullDetails />} />
          <Route path="/search" element={<SearchPage />} />

          {/* ========== PROTECTED ROUTES ========== */}
          <Route element={<ProtectedRoute />}>

            {/* --------------------Location Routes--------------------- */}
            <Route path="/location/view" element={<ViewLocation />} />
            <Route path="/location/add" element={<AddLocation />} />
            <Route path="/location/edit/:id" element={<EditLocation />} />
          </Route>

        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Suspense>
  );
}

export default App;
