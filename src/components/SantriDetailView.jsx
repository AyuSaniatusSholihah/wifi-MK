import React from 'react';
import { DollarSign } from 'lucide-react';
import { wifiFees2025, months, monthNames } from '../data/initialData'; // Import data yang dibutuhkan

const SantriDetailView = ({ user, onBack, calculateTunggakan }) => {
    const tunggakan = calculateTunggakan(user);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={onBack}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            ← Kembali
                        </button>
                        <h1 className="text-2xl font-bold text-gray-800">Detail Pembayaran WiFi</h1>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white mb-6">
                        <h2 className="text-xl font-semibold mb-2">{user.nama}</h2>
                        {/* ... sisa JSX untuk header detail ... */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-red-50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-red-800 mb-4">Bulan Belum Bayar</h3>
                            {/* ... sisa JSX untuk bulan belum bayar ... */}
                        </div>

                        <div className="bg-green-50 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-green-800 mb-4">Riwayat Pembayaran</h3>
                            {/* ... sisa JSX untuk riwayat pembayaran ... */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SantriDetailView;