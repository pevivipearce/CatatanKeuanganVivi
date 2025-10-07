# Pelacak Keuangan Pribadi

Aplikasi web modern dan bersih tanpa build untuk melacak keuangan pribadi secara lokal di browser Anda. Data **terenkripsi** dan disimpan di `localStorage`. Termasuk grafik via Chart.js, anggaran kategori, dan impor/ekspor.

## Fitur
- **🔒 Dilindungi Kata Sandi**: Semua data dienkripsi dengan AES-256-GCM menggunakan kata sandi Anda.
- **Lokal & privat**: Data tidak pernah meninggalkan browser Anda.
- **Transaksi**: Tambah/edit pemasukan dan pengeluaran dengan tanggal, kategori, jumlah, dan catatan.
- **Filter**: Tipe, kategori, bulan, dan pencarian kata kunci.
- **Anggaran**: Anggaran bulanan opsional per kategori dengan status di KPI.
- **Grafik**: Pengeluaran per kategori, tren pemasukan vs pengeluaran.
- **Impor/Ekspor**: Cadangkan atau migrasi data Anda sebagai JSON.
- **Mode Gelap/Terang**: Toggle via tombol header. Tersimpan.
- **UI Responsif**: Bekerja dengan baik di desktop dan mobile.

## Memulai
1. Buka `index.html` di browser Anda (klik dua kali atau seret ke tab).
2. **Atur kata sandi** saat peluncuran pertama. Ini mengenkripsi semua data Anda.
3. Klik **Tambah Transaksi** untuk membuat entri.
4. Kelola kategori dan anggaran via **Kelola**.
5. Gunakan filter untuk fokus pada bulan atau kategori; KPI menyesuaikan.
6. Ekspor ke JSON untuk cadangan. Impor untuk memulihkan.
7. Klik **🔒 Kunci** untuk mengunci aplikasi dan memerlukan entri ulang kata sandi.

## Catatan Keamanan
- **Enkripsi**: Menggunakan Web Crypto API dengan AES-256-GCM dan PBKDF2 (100k iterasi).
- **Kata Sandi**: Pilih kata sandi yang kuat. Jika lupa, data tidak dapat dipulihkan.
- **Penyimpanan**: Data terenkripsi disimpan di `localStorage` browser dengan kunci `ft_state_v1_encrypted`.
- **Hanya sisi klien**: Tanpa server, tanpa permintaan jaringan. Semua enkripsi terjadi di browser Anda.
- **Keterbatasan**: Ini adalah enkripsi sisi klien. Siapa pun dengan akses fisik ke perangkat dan browser Anda berpotensi mengekstrak data terenkripsi. Gunakan kata sandi yang kuat dan kunci perangkat Anda.

## File
- `index.html` – Halaman utama dan struktur
- `styles.css` – Gaya UI modern dan tema gelap/terang
- `app.js` – Logika aplikasi, state, persistensi, grafik

## Format Data
State disimpan di kunci `localStorage` `ft_state_v1_encrypted`:
```json
{
  "categories": [
    {"id":"abc123","name":"Makanan","color":"#ef4444","budget":300}
  ],
  "transactions": [
    {"id":"tx1","type":"expense","amount":12.5,"date":"2025-10-06","categoryId":"abc123","note":"Makan siang"}
  ]
}
```

## Catatan
- Ini adalah aplikasi statis; tidak memerlukan server.
- Jika Anda menghapus penyimpanan browser, data Anda akan dihapus. Ekspor secara teratur.
- Anda dapat menyesuaikan kategori default di `app.js` (`defaultCategories`).
