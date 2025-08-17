import React from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';

const SantriTable = ({ santriList, isAdmin, onView, onEdit, onDelete, calculateTunggakan, months, monthNames }) => {
    return (
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
                        {santriList.map((santri, index) => {
                            const tunggakan = calculateTunggakan(santri);
                            return (
                                <tr key={santri.id} className="border-b hover:bg-gray-50 transition-colors duration-200">
                                    <td className="p-4 font-medium text-center">{index + 1}</td>
                                    <td className="p-4 font-semibold text-gray-800">{santri.nama}</td>
                                    {months.map((month) => (
                                        <td key={month} className="p-2 text-center">
                                            {/* ... (logika untuk menampilkan ✓, -, atau ✕) ... */}
                                            {santri[month] > 0 ? (
                                                <div className="w-6 h-6 mx-auto bg-green-100 text-green-800 rounded-full text-xs font-semibold flex items-center justify-center" title={`Bayar: Rp ${santri[month].toLocaleString('id-ID')}`}>✓</div>
                                            ) : santri[month] === 0 ? (
                                                <div className="w-6 h-6 mx-auto bg-gray-200 text-gray-600 rounded-full text-xs font-semibold flex items-center justify-center" title="Tidak Wajib Bayar">-</div>
                                            ) : (
                                                <div className="w-6 h-6 mx-auto bg-red-100 text-red-800 rounded-full text-xs font-semibold flex items-center justify-center" title="Belum Bayar">✕</div>
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
                                            <button onClick={() => onView(santri)} className="text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition-colors" title="Lihat Detail"><Eye size={16} /></button>
                                            {isAdmin && (
                                                <>
                                                    <button onClick={() => onEdit(santri)} className="text-yellow-600 p-2 rounded-lg hover:bg-yellow-100 transition-colors" title="Edit"><Edit2 size={16} /></button>
                                                    <button onClick={() => onDelete(santri)} className="text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors" title="Hapus"><Trash2 size={16} /></button>
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
    );
};

export default SantriTable;