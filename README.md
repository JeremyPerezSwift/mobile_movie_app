# 🎬 Mobile Movie App

A modern movie discovery application built with **React Native (Expo)**.  
The app integrates **TMDB API** for movie data and **Appwrite** for backend features such as trending tracking and persistence.


<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/8483392e-39b2-47ea-a495-f9c00773a38e" width="230"/>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/0640321c-bc6a-4050-b2c6-82d17782f414" width="230"/>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/f5fda006-cec4-4c03-b019-88386999faa7" width="230"/>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/122994ac-4334-4f93-9faa-c8f78e00cb77" width="230"/>
    </td>
  </tr>
</table>


## 📱 Overview

Mobile Movie App allows users to:

- 🔎 Search movies in real time
- 📈 View trending movies (persisted via Appwrite)
- 🎞 Browse movie listings with posters and ratings
- 📄 Access detailed movie information
- 🎨 Enjoy a clean and modern UI

The project focuses on API consumption, backend integration, and scalable mobile architecture.


## 🧱 Tech Stack

- **Expo**
- **React Native**
- **TypeScript**
- **TMDB API**
- **Appwrite (Database / Tables)**
- Custom data fetching hook (`useFetch`)
- Functional components + Hooks architecture


## 🏗 Architecture

The project follows a modular structure:

```
components/
  MovieCard.tsx
  MoviesSection.tsx
  SearchBar.tsx
  TrendingCard.tsx

services/
  api.ts
  appwrite.ts
  useFetch.ts

interfaces/
  interfaces.d.ts

assets/
  images/
  icons/
  fonts/
```

### 🔹 components/

Reusable UI components:
- `MovieCard` → displays movie poster and rating
- `TrendingCard` → ranked trending movie UI
- `SearchBar` → debounced search input
- `MoviesSection` → grouped movie list section

### 🔹 services/

- `api.ts` → TMDB API configuration and fetch logic
- `appwrite.ts` → Appwrite client setup and database interactions
- `useFetch.ts` → custom reusable fetching hook

### 🔹 interfaces/

Centralized TypeScript interfaces for:
- Movie types
- API response types
- Strongly typed data handling


## 🔎 Core Features

### 🎬 Movie Search

- Uses TMDB `/search/movie` endpoint
- Encodes query parameters properly
- Handles API errors
- Uses custom `useFetch` hook abstraction

### 📈 Trending Logic

When a user searches for a movie:
- The first result is stored in Appwrite
- Trending list is fetched from Appwrite database
- Ensures persistence independent of TMDB

### 🎨 UI/UX

- Custom icons and images
- Structured sections
- Clean card-based layout
- Optimized rendering with proper keys


## ⚙️ Installation

### 1️⃣ Clone the repository

```
git clone <your-repository-url>
cd mobile_movie_app
```

### 2️⃣ Install dependencies

```
npm install
```


## 🔐 Environment Variables

Create a `.env.local` file:

```
EXPO_PUBLIC_TMDB_API_KEY=<your_tmdb_api_key>

EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=<project_id>
EXPO_PUBLIC_APPWRITE_DATABASE_ID=<database_id>
EXPO_PUBLIC_APPWRITE_COLLECTION_ID=<collection_id>
```

⚠️ `EXPO_PUBLIC_` variables are exposed client-side. Do not include private secrets.


## ▶️ Running the Project

```
npx expo start
```

Then:

- `i` → Run on iOS
- `a` → Run on Android
- Or use a development build if required


## 🗃️ Backend Configuration (Appwrite)

Required setup:

- Create a Database
- Create a Collection (e.g. `metrics` or `trending`)
- Add attributes:
  - `searchTerm` (string)
  - `movie_id` (string or number)
  - `poster_url` (string)
  - `count` (integer)

Ensure appropriate read/write permissions are configured.


## 🧠 Technical Highlights

- Strong TypeScript typing via centralized interfaces
- Clean separation of UI / API / Backend logic
- Custom reusable fetch abstraction
- Scalable component structure
- Proper async error handling
- Trending persistence logic decoupled from external API


## 📜 Available Scripts

```
npm run start
npm run ios
npm run android
npm run web
npm run lint
```


## 🚀 Potential Improvements

- Pagination / infinite scroll
- Movie detail screen enhancement
- Favorites with persistence
- Caching layer
- Unit testing
- Performance optimization (memoization, FlashList)


