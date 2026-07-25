import type { DriverDashboard as DriverDashboardType } from '../../types/roadbook'

interface DriverDashboardProps {
  dashboard: DriverDashboardType
}

export function DriverDashboard({ dashboard }: DriverDashboardProps) {
  return (
    <section className="driver-dashboard">
      <h2 className="driver-dashboard__title">Driver Dashboard</h2>
      <div className="driver-dashboard__grid">
        <DashItem label="Departure" value={dashboard.departureTime} icon="🕐" />
        <DashItem label="Distance" value={`${dashboard.distanceKm} km`} icon="📏" />
        <DashItem label="Driving" value={dashboard.drivingTime} icon="🚗" />
        <DashItem label="Weather" value={dashboard.weather} icon="🌤" />
        <DashItem label="Elevation" value={dashboard.highestElevation} icon="⛰" />
        <DashItem label="Charging" value={`${dashboard.chargingStops} stop(s)`} icon="⚡" />
        <DashItem label="Sunrise" value={dashboard.sunrise} icon="🌅" />
        <DashItem label="Sunset" value={dashboard.sunset} icon="🌇" />
        <DashItem label="Road" value={dashboard.roadType} icon="🛣" />
        <DashItem label="Condition" value={dashboard.roadCondition} icon="✓" />
      </div>
    </section>
  )
}

function DashItem({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="driver-dashboard__item">
      <span className="driver-dashboard__icon">{icon}</span>
      <div>
        <span className="driver-dashboard__label">{label}</span>
        <span className="driver-dashboard__value">{value}</span>
      </div>
    </div>
  )
}
