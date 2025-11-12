/**
 * App Router
 */

import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import HomePage from '../pages/HomePage'
import SearchPage from '../pages/SearchPage'
import LibraryPage from '../pages/LibraryPage'
import ProfilePage from '../pages/ProfilePage'
import SettingsPage from '../pages/SettingsPage'
import AlbumDetailPage from '../pages/AlbumDetailPage'
import ArtistDetailPage from '../pages/ArtistDetailPage'
import PlaylistDetailPage from '../pages/PlaylistDetailPage'
import HitsPage from '../pages/HitsPage'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="hits" element={<HitsPage />} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="album/:id" element={<AlbumDetailPage />} />
        <Route path="artist/:id" element={<ArtistDetailPage />} />
        <Route path="playlist/:id" element={<PlaylistDetailPage />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
