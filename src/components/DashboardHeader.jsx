import React from 'react';
import { Users, Plus, UserCheck, AlertTriangle, DollarSign, Search, Eye } from 'lucide-react';
import StatCard from './StatCard';

const DashboardHeader = ({
    isAdmin,
    onToggleAdmin,
    stats,
    searchTerm,
    onSearchChange,
    filterStatus,
    onFilterChange,
    onAddClick
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-0">Dashboard WiFi Santri Putri 2025</h1>
                <button
                    onClick={onToggleAdmin}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${isAdmin ? 'bg-indigo-500 text-white hover:bg-indigo-600' : 'bg-green-500 text-white hover:bg-green-600'}`}
                >
                    {isAdmin ? <UserCheck size={16} /> : <Eye size={16} />}
                    {isAdmin ? 'Mode Admin' : 'Mode User'}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard icon={<Users size={32} />} title="Total Santri" value={stats.totalSantri} color="blue" />
                <StatCard icon={<UserCheck size={32} />} title="Santri Aktif" value={stats.santriAktif} color="green" />
                <StatCard icon={<AlertTriangle size={32} />} title="Total Tunggakan" value={`Rp ${stats.totalTunggakan.toLocaleString('id-ID')}`} color="red" />
                <StatCard icon={<DollarSign size={32} />} title="Saldo Kas" value={`Rp ${stats.saldoKas.toLocaleString('id-ID')}`} color="purple" />
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Cari nama santri..."
                        value={searchTerm}
                        onChange={onSearchChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
                <select
                    value={filterStatus}
                    onChange={onFilterChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                    <option value="all">Semua Status</option>
                    <option value="active">Aktif</option>
                    <option value="boyong">Boyong</option>
                </select>
                {isAdmin && (
                    <button
                        onClick={onAddClick}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus size={20} />
                        <span>Tambah Santri</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default DashboardHeader;