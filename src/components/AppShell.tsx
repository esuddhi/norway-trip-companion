import { HomeIcon, MapIcon, CalendarDaysIcon, ClipboardDocumentCheckIcon, MagnifyingGlassIcon, Cog6ToothIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import { NavLink, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'

const nav = [{ to: '/', label: 'Home', icon: HomeIcon }, { to: '/roadbook', label: 'Roadbook', icon: BookOpenIcon }, { to: '/timeline', label: 'Plan', icon: CalendarDaysIcon }, { to: '/map', label: 'Map', icon: MapIcon }, { to: '/packing', label: 'Pack', icon: ClipboardDocumentCheckIcon }, { to: '/search', label: 'Search', icon: MagnifyingGlassIcon }, { to: '/settings', label: 'Settings', icon: Cog6ToothIcon }]
export function AppShell() { const theme = useAppStore((s) => s.theme); useEffect(() => { document.documentElement.dataset.theme = theme === 'system' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme }, [theme]); return <div className="app-shell"><header><NavLink to="/" className="brand"><span>△</span><div>FJORDLINE<small>Norway 2026</small></div></NavLink><div className="status"><i /> Offline ready</div></header><main><Outlet /></main><nav aria-label="Primary navigation">{nav.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} end={to === '/'}><Icon /><span>{label}</span></NavLink>)}</nav></div> }
