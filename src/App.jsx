import React, { useState } from 'react';
import { Users, Plus, Edit2, Trash2, Eye, UserCheck, AlertTriangle, DollarSign, Search } from 'lucide-react';
import './index.css'; // Pastikan file CSS ini ada di proyek Anda

// Helper Component: StatCard
const StatCard = ({ icon, title, value, color }) => {
    const colors = { blue: 'from-blue-500 to-blue-600', green: 'from-green-500 to-green-600', red: 'from-red-500 to-red-600', purple: 'from-purple-500 to-purple-600' };
    return (
        <div className={`bg-gradient-to-r ${colors[color]} rounded-xl p-4 text-white shadow-lg`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="opacity-80">{title}</p>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
                <div className="opacity-50">{icon}</div>
            </div>
        </div>
    );
};

// Helper Component: FormModal
const FormModal = ({ isVisible, onClose, title, onSubmit, user, setUser, buttonText }) => {
    if (!isVisible) return null;
    const months = ['jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'agu', 'sep', 'okt', 'nov', 'des'];
    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setUser({ ...user, [name]: type === 'number' ? (value === '' ? null : parseInt(value)) : value });
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">{title}</h2>
                <div className="space-y-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Nama Santri</label>
                        <input type="text" name="nama" value={user.nama} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {months.map((month, index) => (
                            <div key={month}>
                                <label className="block text-sm font-medium mb-2">{monthNames[index]}</label>
                                <input type="number" name={month} value={user[month] ?? ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Bayar / 0 jika libur" />
                            </div>
                        ))}
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Keterangan</label>
                        <input type="text" name="keterangan" value={user.keterangan} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Misal: Boyong, Magang, dll" />
                    </div>
                    <div className="flex gap-4">
                        <button onClick={onSubmit} className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors">{buttonText}</button>
                        <button onClick={onClose} className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">Batal</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Component: ConfirmModal
const ConfirmModal = ({ isVisible, onClose, onConfirm, title, message }) => {
    if (!isVisible) return null;
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 shadow-xl max-w-sm w-full">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Batal</button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Hapus</button>
                </div>
            </div>
        </div>
    );
};


// Main App Component
const App = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const wifiFees2025 = {
    jan: 35000, feb: 35000, mar: 35000, apr: 35000, mei: 35000, jun: 35000, 
    jul: 35000, agu: 30000, sep: 35000, okt: 35000, nov: 35000, des: 35000
  };

    const [santriData, setSantriData] = useState([
    { id: 1, nama: 'ADILA HANY FUTHNA', jan: 25000, feb: 35000, mar: 35000, apr: 35000, mei: 35000, jun: 35000, jul: 0, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 2, nama: 'AIFA ZAHDA AULIA AHMAD', jan: 0, feb: 35000, mar: 35000, apr: 35000, mei: 35000, jun: null, jul: 0, agu: 0, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 3, nama: 'ANDINA DEWI NURMALINA', jan: 0, feb: 0, mar: 35000, apr: 35000, mei: 35000, jun: 35000, jul: 35000, agu: null, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 4, nama: 'ANGGI SUKMA INDAH', jan: 25000, feb: 35000, mar: 35000, apr: 0, mei: 35000, jun: 35000, jul: 35000, agu: null, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 5, nama: 'ANNA LIYA NAJWA LAILA', jan: 25000, feb: 35000, mar: 35000, apr: 35000, mei: 35000, jun: 35000, jul: null, agu: null, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 6, nama: 'AULIA ARIFA', jan: 35000, feb: 35000, mar: 35000, apr: 35000, mei: 35000, jun: 35000, jul: 35000, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 7, nama: 'AYU SANIATUS SHOLIHAH', jan: 25000, feb: 35000, mar: 35000, apr: 35000, mei: 35000, jun: 35000, jul: 35000, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 8, nama: 'FARADINA LATIVA', jan: 25000, feb: 35000, mar: 35000, apr: 35000, mei: 35000, jun: 35000, jul: 0, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 9, nama: 'FATWA ISNAYA ECHA ANASTASYA', jan: 25000, feb: 35000, mar: 35000, apr: 35000, mei: 35000, jun: 35000, jul: 35000, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 10, nama: 'IRDINA MAZIYATUN NAFISAH', jan: 25000, feb: 35000, mar: 35000, apr: 35000, mei: 35000, jun: 35000, jul: 35000, agu: null, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 11, nama: 'ITSNA ROHMANIA', jan: 25000, feb: 0, mar: 0, apr: 0, mei: 0, jun: 0, jul: 0, agu: 0, sep: 0, okt: 0, nov: 0, des: 0, keterangan: 'Boyong' },
    { id: 12, nama: 'IZZA AYU MEIVIA', jan: 25000, feb: 35000, mar: 35000, apr: null, mei: 35000, jun: 35000, jul: 35000, agu: null, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 13, nama: 'JULIA SULISTYAWATI', jan: 0, feb: 35000, mar: 0, apr: 0, mei: 0, jun: 0, jul: 0, agu: 0, sep: 0, okt: 0, nov: 0, des: 0, keterangan: 'Boyong' },
    { id: 14, nama: 'KARTIKA BILQIS', jan: 25000, feb: 35000, mar: 35000, apr: 35000, mei: 35000, jun: 35000, jul: 0, agu: 0, sep: 0, okt: 0, nov: 0, des: 0, keterangan: 'Boyong' },
    { id: 15, nama: 'KHAIRINA PUTRI DWI NAINGGOLAN', jan: 25000, feb: 0, mar: 35000, apr: 35000, mei: 0, jun: 0, jul: 0, agu: 0, sep: 0, okt: 0, nov: 0, des: 0, keterangan: 'Boyong' },
    { id: 16, nama: 'KHOLIFAHTUL QONAAH', jan: 25000, feb: 0, mar: 0, apr: 35000, mei: 35000, jun: 35000, jul: 35000, agu: 0, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 17, nama: 'KUSNUL KHOTIMAH', jan: 0, feb: 0, mar: 35000, apr: 35000, mei: 35000, jun: 35000, jul: 35000, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 18, nama: 'MILADIA TSALITSA SYUROYA', jan: 0, feb: 0, mar: 35000, apr: 35000, mei: 35000, jun: 0, jul: 0, agu: 0, sep: 0, okt: 0, nov: 0, des: 0, keterangan: 'Boyong' },
    { id: 19, nama: 'NADYA ZIA ULFA', jan: 25000, feb: 35000, mar: 35000, apr: 35000, mei: 35000, jun: 35000, jul: 0, agu: 0, sep: 0, okt: 0, nov: 0, des: 0, keterangan: 'KKN' },
    { id: 20, nama: 'NALA AJRINA FAUZATUL MAULIDA', jan: 25000, feb: 35000, mar: 35000, apr: 35000, mei: 35000, jun: 35000, jul: 0, agu: 0, sep: 0, okt: 0, nov: 0, des: 0, keterangan: 'Magang' },
    { id: 21, nama: 'RANIA ATIKA', jan: 0, feb: 35000, mar: null, apr: null, mei: null, jun: null, jul: null, agu: null, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 22, nama: 'SALMA ANINDITA ARAFAH', jan: 25000, feb: 0, mar: 35000, apr: 35000, mei: 35000, jun: 35000, jul: 35000, agu: 0, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 23, nama: 'SALWA AWALIA WAHYUNINGTYAS', jan: 0, feb: 35000, mar: 35000, apr: 0, mei: 35000, jun: 0, jul: 0, agu: 0, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 24, nama: 'SANIA SALSABILA AZ-ZAHRA', jan: 0, feb: 0, mar: 0, apr: 0, mei: 35000, jun: 35000, jul: 35000, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 25, nama: 'SEPTIANA AFIFAHTUL DAHNIA', jan: 0, feb: 35000, mar: 35000, apr: 0, mei: 0, jun: 0, jul: 0, agu: 0, sep: 0, okt: 0, nov: 0, des: 0, keterangan: 'Boyong' },
    { id: 26, nama: 'SUKRIYA AZZAHRA FATIMAH', jan: 0, feb: 35000, mar: 35000, apr: 35000, mei: 35000, jun: 35000, jul: 35000, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '+10k' },
    { id: 27, nama: 'ULFIANI LATIFAH', jan: 0, feb: 35000, mar: 35000, apr: 35000, mei: 35000, jun: 35000, jul: 35000, agu: 0, sep: 0, okt: 0, nov: 0, des: 0, keterangan: 'Magang' },
    { id: 28, nama: 'ZAHWA FITROTUL MAGHFIROH', jan: 0, feb: 35000, mar: 35000, apr: 35000, mei: 35000, jun: 35000, jul: 35000, agu: null, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 29, nama: 'ZAINABUN KHASANAH', jan: 25000, feb: 35000, mar: 35000, apr: 35000, mei: 35000, jun: 35000, jul: 0, agu: 0, sep: 0, okt: 0, nov: 0, des: 0, keterangan: 'KKN' },
    { id: 30, nama: 'ZUHAIDA TSANIA NABILAZKA', jan: 25000, feb: 35000, mar: 35000, apr: 35000, mei: 35000, jun: 35000, jul: 35000, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 31, nama: 'AGHNIYATUZ SHOBIROH', jan: 0, feb: 0, mar: 0, apr: 0, mei: 0, jun: 0, jul: 35000, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 32, nama: 'ANIEQ TAZKIA AZZAHRA', jan: 0, feb: 0, mar: 0, apr: 0, mei: 0, jun: 0, jul: 0, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 33, nama: 'DEWI UYUNY MASYKUROH', jan: 0, feb: 0, mar: 0, apr: 0, mei: 0, jun: 0, jul: 0, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 34, nama: 'DIANA FATIMAH AZ ZAHRO', jan: 0, feb: 0, mar: 0, apr: 0, mei: 0, jun: 0, jul: 0, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 35, nama: 'GADIS ECSILIA', jan: 0, feb: 0, mar: 0, apr: 0, mei: 0, jun: 0, jul: 0, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 36, nama: 'HANUM NUR MAULIDA', jan: 0, feb: 0, mar: 0, apr: 0, mei: 0, jun: 0, jul: 0, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 37, nama: 'IFFAH FADHILAH SHOFAWATI', jan: 0, feb: 0, mar: 0, apr: 0, mei: 0, jun: 0, jul: 0, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 38, nama: 'MAYA ARIFA MAIMUNA', jan: 0, feb: 0, mar: 0, apr: 0, mei: 0, jun: 0, jul: 0, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 39, nama: 'MUFIDA ILMA SOFIA', jan: 0, feb: 0, mar: 0, apr: 0, mei: 0, jun: 0, jul: 0, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 40, nama: 'NABILA FATYA BALQIS', jan: 0, feb: 0, mar: 0, apr: 0, mei: 0, jun: 0, jul: 0, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 41, nama: 'NAILATUS SYIFA AL KAMILA', jan: 0, feb: 0, mar: 0, apr: 0, mei: 0, jun: 0, jul: 0, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 42, nama: 'NAJMA FALACHIYYA RAHMA D', jan: 0, feb: 0, mar: 0, apr: 0, mei: 0, jun: 0, jul: 0, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 43, nama: 'NILNA NAFAHATIL MAULA',jan: 0, feb: 0, mar: 0, apr: 0, mei: 0, jun: 0, jul: 35000, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 44, nama: 'SAYYIDATINA KAAFUUROO AL JANNAH', jan: 0, feb: 0, mar: 0, apr: 0, mei: 0, jun: 0, jul: null, agu: 0, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '' },
    { id: 45, nama: 'MUNIF', jan: 0, feb: 35000, mar: 0, apr: 0, mei: 35000, jun: 35000, jul: 35000, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '+5k' },
    { id: 46, nama: 'YAQIN (KI SEPUH)', jan: 0, feb: 0, mar: 0, apr: 0, mei: 0, jun: 0, jul: 35000, agu: 30000, sep: 0, okt: 0, nov: 0, des: 0, keterangan: '+85k' },

  ]);

  const [paymentData, setPaymentData] = useState([
  { id: 1, tanggal: 'Senin, 06 Januari 2025', pemasukan: 118000, pengeluaran: 0, keterangan: 'sisa bulan sebelumnya', saldo: 118000 },
  { id: 2, tanggal: 'Selasa, 14 Januari 2025', pemasukan: 0, pengeluaran: 727100, keterangan: 'pembayaran wifi januari', saldo: -609100 },
  { id: 3, tanggal: 'Selasa, 04 Februari 2025', pemasukan: 425000, pengeluaran: 0, keterangan: 'Total pemasukan wifi januari', saldo: -184100 },
  { id: 4, tanggal: 'Sabtu, 15 Februari 2025', pemasukan: 0, pengeluaran: 727100, keterangan: 'pembayaran wifi februari', saldo: -911200 },
  { id: 5, tanggal: 'Selasa, 25 Februari 2025', pemasukan: 805000, pengeluaran: 0, keterangan: 'total pemasukan wifi februari', saldo: -106200 },
  { id: 6, tanggal: 'Rabu, 12 Maret 2025', pemasukan: 0, pengeluaran: 727100, keterangan: 'pembayaran wifi maret', saldo: -833300 },
  { id: 7, tanggal: 'Sabtu, 19 April 2025', pemasukan: 875000, pengeluaran: 0, keterangan: 'total pemasukan wifi maret', saldo: 41700 },
  { id: 8, tanggal: 'Selasa, 15 April 2025', pemasukan: 0, pengeluaran: 727100, keterangan: 'pembayaran wifi april', saldo: -685400 },
  { id: 9, tanggal: 'Kamis, 01 Mei 2025', pemasukan: 805000, pengeluaran: 0, keterangan: 'total pemasukan wifi april', saldo: 119600 },
  { id: 10, tanggal: 'Sabtu, 10 Mei 2025', pemasukan: 0, pengeluaran: 727100, keterangan: 'pembayaran wifi mei', saldo: -607500 },
  { id: 11, tanggal: '24 Mei 2025', pemasukan: 910000, pengeluaran: 0, keterangan: 'total pemasukan wifi mei', saldo: 302500 },
  { id: 12, tanggal: 'Rabu, 04 Juni 2025', pemasukan: 0, pengeluaran: 727100, keterangan: 'pembayaran wifi juni', saldo: -424600 },
  { id: 13, tanggal: 'Senin, 30 Juni 2025', pemasukan: 875000, pengeluaran: 0, keterangan: 'total pemasukan wifi Juni', saldo: 450400 },
  { id: 14, tanggal: 'Selasa, 08 Juli 2025', pemasukan: 0, pengeluaran: 727100, keterangan: 'pembayaran wifi Juli', saldo: -276700 },
  { id: 15, tanggal: 'Kamis, 31 Juli 2025', pemasukan: 685000, pengeluaran: 0, keterangan: 'total pemasukan wifi Juli', saldo: 388300 },
  { id: 16, tanggal: 'Kamis, 07 Agustus 2025', pemasukan: 0, pengeluaran: 727100, keterangan: 'pembayaran wifi Agustus', saldo: -338800 },
  { id: 17, tanggal: 'Jumat, 15 Agustus 2025', pemasukan: 720000, pengeluaran: 0, keterangan: 'total pemasukan wifi Agustus', saldo: 351200 },
]);

  const [newSantri, setNewSantri] = useState({
    nama: '', jan: null, feb: null, mar: null, apr: null, mei: null, jun: null,
    jul: null, agu: null, sep: null, okt: null, nov: null, des: null, keterangan: ''
  });

  const months = ['jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'agu', 'sep', 'okt', 'nov', 'des'];
  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  const filteredSantri = santriData.filter(santri => {
    const matchesSearch = santri.nama.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'boyong') return matchesSearch && santri.keterangan.toLowerCase().includes('boyong');
    if (filterStatus === 'active') return matchesSearch && !santri.keterangan.toLowerCase().includes('boyong');
    return matchesSearch;
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

    if (currentYear < 2025) {
      return { total: 0, bulan: [] }
    }

    months.forEach((month, index) => {
      const isMonthDue = currentYear > 2025 || (currentYear === 2025 && index <= currentMonthIndex);
      
      if (isMonthDue && santri[month] === null) {
        tunggakan += wifiFees2025[month] || 0; 
        bulanTunggak.push(monthNames[index]);
      }
    });

    return { total: tunggakan, bulan: bulanTunggak };
  };

  const handleAddSantri = () => {
    if (newSantri.nama.trim() === '') return;
    const id = santriData.length > 0 ? Math.max(...santriData.map(s => s.id)) + 1 : 1;
    setSantriData([...santriData, { id, ...newSantri }]);
    setNewSantri({
      nama: '', jan: null, feb: null, mar: null, apr: null, mei: null, jun: null,
      jul: null, agu: null, sep: null, okt: null, nov: null, des: null, keterangan: ''
    });
    setShowAddForm(false);
  };

  const handleEditSantri = () => {
    setSantriData(santriData.map(santri =>
      santri.id === editingUser.id ? editingUser : santri
    ));
    setShowEditForm(false);
    setEditingUser(null);
  };

  const handleDeleteSantri = (santri) => {
    setUserToDelete(santri);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setSantriData(santriData.filter(santri => santri.id !== userToDelete.id));
    }
    setShowConfirmModal(false);
    setUserToDelete(null);
  };
  
  const getTotalSaldo = () => {
    const lastPayment = paymentData[paymentData.length - 1];
    return lastPayment ? lastPayment.saldo : 0;
  };

  const getTotalTunggakan = () => {
    return santriData.reduce((total, santri) => {
      const tunggakan = calculateTunggakan(santri);
      return total + tunggakan.total;
    }, 0);
  };

  // --- KODE YANG HILANG DIKEMBALIKAN DI SINI ---
  // User View (tampilan detail saat ikon mata diklik dalam mode user)
  if (!isAdmin && selectedUser) {
    const tunggakan = calculateTunggakan(selectedUser);
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4 font-sans">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setSelectedUser(null)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                ← Kembali
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Detail Pembayaran WiFi</h1>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white mb-6">
              <h2 className="text-xl font-semibold mb-2">{selectedUser.nama}</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign size={20} />
                  <span>Total Tunggakan: Rp {tunggakan.total.toLocaleString('id-ID')}</span>
                </div>
                {selectedUser.keterangan && (
                  <div className="bg-white/20 px-3 py-1 rounded-full">
                    <span className="text-sm">{selectedUser.keterangan}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-4">Bulan Belum Bayar</h3>
                {tunggakan.bulan.length > 0 ? (
                  <div className="space-y-2">
                    {tunggakan.bulan.map((bulan, index) => (
                      <div key={index} className="flex items-center justify-between bg-red-100 p-3 rounded-lg">
                        <span className="text-red-800">{bulan} 2025</span>
                        <span className="text-red-600 font-semibold">Rp {wifiFees2025[bulan.toLowerCase().slice(0,3)].toLocaleString('id-ID')}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-green-600 font-semibold">✓ Semua bulan yang jatuh tempo sudah lunas</p>
                )}
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Riwayat Pembayaran</h3>
                <div className="space-y-2">
                  {months.map((month, index) => {
                    if (selectedUser[month] !== null) {
                      const amount = selectedUser[month];
                      return (
                        <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${amount > 0 ? 'bg-green-100' : 'bg-gray-200'}`}>
                          <span className={`${amount > 0 ? 'text-green-800' : 'text-gray-700'}`}>{monthNames[index]} 2025</span>
                          <span className={`${amount > 0 ? 'text-green-600' : 'text-gray-600'} font-semibold`}>
                            {amount > 0 ? `✓ Rp ${amount.toLocaleString('id-ID')}` : 'Tidak Wajib Bayar'}
                          </span>
                        </div>
                      );
                    }
                    return null;
                  }).filter(Boolean)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard View
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-0">Dashboard WiFi Santri Putri 2025</h1>
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${isAdmin ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-green-500 text-white hover:bg-green-600'}`}
            >
              {isAdmin ? <UserCheck size={16} /> : <Eye size={16} />}
              {isAdmin ? 'Mode Admin' : 'Mode User'}
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard icon={<Users size={32} />} title="Total Santri" value={santriData.length} color="blue" />
            <StatCard icon={<UserCheck size={32} />} title="Santri Aktif" value={santriData.filter(s => !s.keterangan.toLowerCase().includes('boyong')).length} color="green" />
            <StatCard icon={<AlertTriangle size={32} />} title="Total Tunggakan" value={`Rp ${getTotalTunggakan().toLocaleString('id-ID')}`} color="red" />
            <StatCard icon={<DollarSign size={32} />} title="Saldo Kas" value={`Rp ${getTotalSaldo().toLocaleString('id-ID')}`} color="purple" />
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari nama santri..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="boyong">Boyong</option>
            </select>
            {isAdmin && (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                <span>Tambah Santri</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Content Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <tr>
                  <th className="p-4 text-left font-semibold">No</th>
                  <th className="p-4 text-left font-semibold w-1/4">Nama Santri</th>
                  {monthNames.map((month) => (
                    <th key={month} className="p-2 text-center font-semibold text-xs">{month.slice(0, 3)}</th>
                  ))}
                  <th className="p-4 text-center font-semibold">Tunggakan</th>
                  <th className="p-4 text-center font-semibold">Status</th>
                  <th className="p-4 text-center font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredSantri.map((santri, index) => {
                  const tunggakan = calculateTunggakan(santri);
                  return (
                    <tr key={santri.id} className="border-b hover:bg-gray-50 transition-colors duration-200">
                      <td className="p-4 font-medium text-center">{index + 1}</td>
                      <td className="p-4 font-semibold text-gray-800">{santri.nama}</td>
                      
                      {months.map((month) => (
                        <td key={month} className="p-2 text-center">
                          {santri[month] > 0 ? (
                            <div className="w-6 h-6 mx-auto bg-green-100 text-green-800 rounded-full text-xs font-semibold flex items-center justify-center" title={`Bayar: Rp ${santri[month].toLocaleString('id-ID')}`}>
                              ✓
                            </div>
                          ) : santri[month] === 0 ? (
                            <div className="w-6 h-6 mx-auto bg-gray-200 text-gray-600 rounded-full text-xs font-semibold flex items-center justify-center" title="Tidak Wajib Bayar">
                              -
                            </div>
                          ) : (
                            <div className="w-6 h-6 mx-auto bg-red-100 text-red-800 rounded-full text-xs font-semibold flex items-center justify-center" title="Belum Bayar">
                              ✕
                            </div>
                          )}
                        </td>
                      ))}

                      <td className="p-4 text-center">
                        <div className={`font-bold ${tunggakan.total > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {tunggakan.total > 0 ? `Rp ${tunggakan.total.toLocaleString('id-ID')}` : 'Lunas'}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${santri.keterangan.toLowerCase().includes('boyong') ? 'bg-gray-200 text-gray-800' : 'bg-green-100 text-green-800'}`}>
                          {santri.keterangan || 'Aktif'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => setSelectedUser(santri)} className="text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition-colors" title="Lihat Detail"><Eye size={16} /></button>
                          {isAdmin && (
                            <>
                              <button onClick={() => { setEditingUser({ ...santri }); setShowEditForm(true); }} className="text-yellow-600 p-2 rounded-lg hover:bg-yellow-100 transition-colors" title="Edit"><Edit2 size={16} /></button>
                              <button onClick={() => handleDeleteSantri(santri)} className="text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors" title="Hapus"><Trash2 size={16} /></button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modals */}
        <FormModal isVisible={showAddForm} onClose={() => setShowAddForm(false)} title="Tambah Santri Baru" onSubmit={handleAddSantri} user={newSantri} setUser={setNewSantri} buttonText="Tambah Santri" />
        {editingUser && <FormModal isVisible={showEditForm} onClose={() => setShowEditForm(false)} title="Edit Data Santri" onSubmit={handleEditSantri} user={editingUser} setUser={setEditingUser} buttonText="Simpan Perubahan" />}
        <ConfirmModal isVisible={showConfirmModal} onClose={() => setShowConfirmModal(false)} onConfirm={confirmDelete} title="Konfirmasi Hapus" message={`Apakah Anda yakin ingin menghapus data santri bernama "${userToDelete?.nama}"?`} />
      </div>
    </div>
  );
};

export default App;