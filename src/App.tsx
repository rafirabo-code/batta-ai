import { Routes, Route } from 'react-router';
import { AppShell } from '@/components/layout/AppShell';
import { DashboardPage } from '@/components/dashboard/DashboardPage';
import { InventoryPage } from '@/components/inventory/InventoryPage';
import { FeatureDetailPage } from '@/components/feature-detail/FeatureDetailPage';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/inventory/:featureId" element={<FeatureDetailPage />} />
      </Routes>
    </AppShell>
  );
}
