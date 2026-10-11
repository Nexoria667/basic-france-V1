import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ShopCatalog } from './components/ShopCatalog';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { SupportView } from './components/SupportView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { LegalModal } from './components/LegalModal';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';

const MainContent: React.FC = () => {
  const { currentView, legalModalOpen, closeLegalModal, legalDocType } = useApp();

  // Scroll to top smoothly when switching views
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col bg-[#080a0f] text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'shop' && <ShopCatalog />}
        {currentView === 'dashboard' && <CustomerDashboard />}
        {currentView === 'admin' && <AdminDashboard />}
        {currentView === 'support' && <SupportView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <LegalModal
        isOpen={legalModalOpen}
        onClose={closeLegalModal}
        initialDoc={legalDocType}
      />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
