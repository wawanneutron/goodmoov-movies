# GoodMoov Movies

**GoodMoov Movies** adalah aplikasi web untuk melihat informasi film terbaru, populer, dan berdasarkan genre.  
Aplikasi ini menggunakan data dari [The Movie Database (TMDB)](https://developer.themoviedb.org/) API dan dibangun dengan **Nuxt 3**, **Pinia**, dan **TailwindCSS**.

## Live Demo

[Deployment Link](https://goodmoov-movies.netlify.app)

---

## Tech Stack

- **Nuxt 3** – Framework berbasis Vue 3
- **Pinia** – State management
- **TailwindCSS** – Styling
- **TypeScript** – Secure
- **TMDB API** – Sumber data film
- **Netlify** – Deployment platform

---

## Fitur Utama

**Trending & Popular Movies** – Menampilkan film trending dan populer  
**Genre List** – List genre
**Movie Detail Page** – Detail film (poster, overview, cast, runtime, dll.)  
**Carousel Banner** – Slider otomatis didapat dari film popular setiap minggu  
**Skeleton Loading** – Loader saat memuat data  
**Load More Pagination** – Menampilkan lebih banyak film  
**Responsive Design** – Desain responsive untuk mobile & desktop

---

## Instalasi & Setup

### Clone repository

```bash
git clone https://github.com/wawanneutron/goodmoov-movies.git
cd goodmoov-movies
```

### Install dependencies

```bash
npm install
# atau
yarn install
```

### Buat file `.env`

Buat file `.env` di root project dan diisi dengan:

```bash
API_TOKEN=<YOUR_TMDB_API_TOKEN>
NUXT_PUBLIC_BASE_API=https://api.themoviedb.org/3
```

> Pastikan sudah memiliki API TOKEN dari [TMDB](https://developer.themoviedb.org/).

### Screenshot TMDB

Login dan masuk ke dashboard TMDB

<img width="700" height="605" alt="Image" src="https://github.com/user-attachments/assets/d4273f9c-9f8d-4e7d-8cc6-8d6c12d008be" />

Lalu masuk ke menu setting API
Setelah itu coppy API Read Access Token

<img width="700" height="719" alt="Image" src="https://github.com/user-attachments/assets/13514f1b-690f-4aa7-b7c8-5fa620359d4d" />

### Jalankan project secara lokal

```bash
npm run dev
```

Aplikasi akan berjalan di port:

```
http://localhost:3000
```

Jika berhasil akan menampilkan halaman dan data seperti ini:

<img width="779" height="1002" alt="Image" src="https://github.com/user-attachments/assets/ee8b47f1-2ee8-4bad-a1ef-d96ca4ac2ab6" />

## Contact

- 📧 Email: hellowawansetiawan@gmail.com
- 💬 WhatsApp: +62 877-3269-7337
- 💼 LinkedIn: [linkedin.com/in/wawan-setiawan](https://www.linkedin.com/in/wawan-setiawan-84934a206/)

---
