import type { WeatherInfo } from '../../types/roadbook-day'

interface WeatherSectionProps {
  weather: WeatherInfo
}

export function WeatherSection({ weather }: WeatherSectionProps) {
  return (
    <div className="rb-weather">
      <span className="rb-weather__label">Weather Plan</span>
      <div className="rb-weather__options">
        <div className="rb-weather__option rb-weather__option--good">
          <span className="rb-weather__option-label">☀️ Good Weather</span>
          <span className="rb-weather__option-value">{weather.good}</span>
        </div>
        <div className="rb-weather__option rb-weather__option--rain">
          <span className="rb-weather__option-label">🌧️ Rain Alternative</span>
          <span className="rb-weather__option-value">{weather.rain}</span>
        </div>
      </div>
    </div>
  )
}
