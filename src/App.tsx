import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { DestinationsPage } from './pages/DestinationsPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { PlanTripPage } from './pages/PlanTripPage';
import { BudgetCalculatorPage } from './pages/BudgetCalculatorPage';
import { AdventuresPage } from './pages/AdventuresPage';
import { TravelGuidesPage } from './pages/TravelGuidesPage';
import { GuideDetailPage } from './pages/GuideDetailPage';
import { MyTripsPage } from './pages/MyTripsPage';
import { ProfilePage } from './pages/ProfilePage';
import './App.css';

export function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-orange-500 selection:text-white">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/destinations" element={<DestinationsPage />} />
                <Route path="/destinations/:slug" element={<DestinationDetailPage />} />
                <Route path="/plan" element={<PlanTripPage />} />
                <Route path="/budget-calculator" element={<BudgetCalculatorPage />} />
                <Route path="/adventures" element={<AdventuresPage />} />
                <Route path="/guides" element={<TravelGuidesPage />} />
                <Route path="/guides/:slug" element={<GuideDetailPage />} />
                <Route path="/my-trips" element={<MyTripsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </CurrencyProvider>
    </AuthProvider>
  );
}

export default App;
