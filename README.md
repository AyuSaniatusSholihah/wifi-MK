# Dashboard Manajemen WiFi Pesma Miftahul Khoirot

Aplikasi web berbasis React yang dirancang untuk memudahkan pengelolaan dan pemantauan pembayaran iuran WiFi bulanan untuk santri putri di Pesma Putri Miftahul Khoirot. Aplikasi ini memiliki dua mode tampilan: **Admin** untuk manajemen data lengkap dan **User** untuk melihat riwayat pembayaran pribadi.

## ✨ Fitur Utama

Aplikasi ini dilengkapi dengan berbagai fitur untuk memudahkan manajemen data:

#### Mode Admin
- **Dashboard Statistik:** Menampilkan ringkasan data penting seperti Total Santri, Santri Aktif, Total Tunggakan, dan Saldo Kas saat ini.
- **Manajemen Data Santri (CRUD):** Admin dapat menambah, melihat, mengedit, dan menghapus data santri dengan mudah melalui antarmuka modal.
- **Pencatatan Pembayaran Bulanan:** Input pembayaran untuk setiap santri per bulan. Terdapat 3 status: Lunas, Belum Bayar, dan Tidak Wajib Bayar (untuk kasus seperti magang, KKN, atau libur).
- **Biaya Dinamis:** Sistem dapat mengakomodasi biaya iuran yang berbeda setiap bulannya.
- **Pencarian & Filter:** Mencari santri berdasarkan nama dan memfilter berdasarkan status (Aktif atau Boyong).

#### Mode Santri (User)
- **Lihat Riwayat Pembayaran:** Santri dapat melihat detail riwayat pembayarannya sendiri untuk setiap bulan dalam setahun.
- **Rincian Tunggakan:** Menampilkan total tunggakan dan rincian bulan apa saja yang belum terbayar.
- **Tampilan Sederhana & Informatif:** Antarmuka yang mudah dibaca untuk memastikan santri mendapatkan informasi yang jelas.

---

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun menggunakan teknologi modern untuk pengembangan web:

- **[React.js](https://reactjs.org/):** Library JavaScript untuk membangun antarmuka pengguna.
- **[Tailwind CSS](https://tailwindcss.com/):** Framework CSS untuk desain yang cepat dan responsif.
- **[Lucide React](https://lucide.dev/):** Library ikon yang ringan dan mudah digunakan.

---

## 🚀 Instalasi & Menjalankan Proyek

Untuk menjalankan proyek ini di komputer lokal Anda, ikuti langkah-langkah berikut:

1.  **Clone repositori ini:**
    ```bash
    git clone [https://github.com/AyuSaniatusSholihah/wifi-MK.git](https://github.com/AyuSaniatusSholihah/wifi-MK.git)
    ```

2.  **Masuk ke direktori proyek:**
    ```bash
    cd wifi-MK
    ```

3.  **Install semua dependencies yang dibutuhkan:**
    ```bash
    npm install
    ```

4.  **Jalankan aplikasi di mode development:**
    ```bash
    npm start
    ```
    Aplikasi akan berjalan dan bisa diakses di [http://localhost:5173/](http://localhost:5173/).

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT.

---

## 👩‍💻 Dibuat oleh

Proyek ini didesain dan dikembangkan oleh:
**Ayu Saniatus Sholihah**
