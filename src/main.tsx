import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { Dashboard, Timeline, Planner, MapPage, Packing, Search, Settings, Accommodation, Emergency, Expenses, Admin } from './pages'
import './styles.css'

createRoot(document.getElementById('root')!).render(<StrictMode><QueryClientProvider client={new QueryClient()}><BrowserRouter><Routes><Route element={<AppShell />}><Route index element={<Dashboard />} /><Route path="timeline" element={<Timeline />} /><Route path="planner/:dayId" element={<Planner />} /><Route path="map" element={<MapPage />} /><Route path="packing" element={<Packing />} /><Route path="search" element={<Search />} /><Route path="settings" element={<Settings />} /><Route path="accommodation" element={<Accommodation />} /><Route path="emergency" element={<Emergency />} /><Route path="expenses" element={<Expenses />} /><Route path="admin" element={<Admin />} /></Route></Routes></BrowserRouter></QueryClientProvider></StrictMode>)
