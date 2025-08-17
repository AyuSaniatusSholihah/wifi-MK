import React from 'react';

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
                {/* ... (sisa kode JSX FormModal Anda) ... */}
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

export default FormModal;