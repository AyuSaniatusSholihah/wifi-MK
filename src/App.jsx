import React, { useState, useMemo } from 'react';
import { initialSantriData, initialPaymentData, wifiFees2025, months, monthNames } from './data/initialData';
import './index.css';

import DashboardHeader from './components/DashboardHeader';
import SantriTable from './components/SantriTable';
import SantriDetailView from './components/SantriDetailView';
import FormModal from './components/FormModal';
import ConfirmModal from './components/ConfirmModal';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [santriData, setSantriData] = useState(initialSantriData);
  const [paymentData, setPaymentData] = useState(initialPaymentData);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [newSantri, setNewSantri] = useState({
    nama: '', jan: null, feb: null, mar: null, apr: null, mei: null, jun: null,
    jul: null, agu: null, sep: null, okt: null, nov: null, des: null, keterangan: ''
  });

  const calculateTunggakan = (santri) => {
    if (santri.keterangan.toLowerCase().includes('boyong')) {
      return { total: 0, bulan: [] };
    }
    let tunggakan = 0;
    let bulanTunggak = [];
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonthIndex = today.getMonth();

    if (currentYear < 2025) return { total: 0, bulan: [] };

    months.forEach((month, index) => {
      const isMonthDue = currentYear > 2025 || (currentYear === 2025 && index <= currentMonthIndex);
      if (isMonthDue && santri[month] === null) {
        tunggakan += wifiFees2025[month] || 0;
        bulanTunggak.push(monthNames[index]);
      }
    });
    return { total: tunggakan, bulan: bulanTunggak };
  };

  const filteredSantri = useMemo(() => santriData.filter(santri => {
    const matchesSearch = santri.nama.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'boyong') return matchesSearch && santri.keterangan.toLowerCase().includes('boyong');
    if (filterStatus === 'active') return matchesSearch && !santri.keterangan.toLowerCase().includes('boyong');
    return matchesSearch;
  }), [santriData, searchTerm, filterStatus]);

  const stats = useMemo(() => ({
    totalSantri: santriData.length,
    santriAktif: santriData.filter(s => !s.keterangan.toLowerCase().includes('boyong')).length,
    totalTunggakan: santriData.reduce((total, santri) => total + calculateTunggakan(santri).total, 0),
    saldoKas: paymentData.length > 0 ? paymentData[paymentData.length - 1].saldo : 0,
  }), [santriData, paymentData]);

  const handleAddSantri = () => { /* ... logika tambah ... */ };
  const handleEditSantri = () => { /* ... logika edit ... */ };
  const handleDeleteSantri = (santri) => {
    setUserToDelete(santri);
    setShowConfirmModal(true);
  };
  const confirmDelete = () => { };

  if (!isAdmin && selectedUser) {
    return <SantriDetailView 
      user={selectedUser} 
      onBack={() => setSelectedUser(null)}
      calculateTunggakan={calculateTunggakan}
    />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader
          isAdmin={isAdmin}
          onToggleAdmin={() => setIsAdmin(!isAdmin)}
          stats={stats}
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          filterStatus={filterStatus}
          onFilterChange={(e) => setFilterStatus(e.target.value)}
          onAddClick={() => setShowAddForm(true)}
        />
        
        <SantriTable
          santriList={filteredSantri}
          isAdmin={isAdmin}
          onView={setSelectedUser}
          onEdit={(santri) => { setEditingUser({ ...santri }); setShowEditForm(true); }}
          onDelete={handleDeleteSantri}
          calculateTunggakan={calculateTunggakan}
          months={months}
          monthNames={monthNames}
        />
        
        <FormModal isVisible={showAddForm} onClose={() => setShowAddForm(false)} title="Tambah Santri Baru" onSubmit={handleAddSantri} user={newSantri} setUser={setNewSantri} buttonText="Tambah Santri" />
        {editingUser && <FormModal isVisible={showEditForm} onClose={() => setShowEditForm(false)} title="Edit Data Santri" onSubmit={handleEditSantri} user={editingUser} setUser={setEditingUser} buttonText="Simpan Perubahan" />}
        <ConfirmModal isVisible={showConfirmModal} onClose={() => setShowConfirmModal(false)} onConfirm={confirmDelete} title="Konfirmasi Hapus" message={`Apakah Anda yakin ingin menghapus data santri bernama "${userToDelete?.nama}"?`} />

      </div>
    </div>
  );
};

export default App;