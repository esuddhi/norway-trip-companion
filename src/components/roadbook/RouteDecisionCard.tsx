import { useState } from 'react'
import type { RouteDecision } from '../../types/roadbook-day'

interface RouteDecisionCardProps {
  routeDecision: RouteDecision
}

/**
 * RouteDecisionCard renders only when routeDecision.enabled === true.
 * Default: Option A selected. User can toggle to Option B (UI only, no YAML modification).
 */
export function RouteDecisionCard({ routeDecision }: RouteDecisionCardProps) {
  const [selectedId, setSelectedId] = useState<string>(
    routeDecision.options.find((o) => o.selected)?.id || routeDecision.options[0]?.id || '',
  )

  if (!routeDecision.enabled) return null

  const selectedOption = routeDecision.options.find((o) => o.id === selectedId)

  return (
    <section className="rb-card rb-route-decision" aria-labelledby="route-decision-title">
      <h2 className="rb-card__title" id="route-decision-title">
        🔀 Route Decision
      </h2>
      <p className="rb-route-decision__recommendation">{routeDecision.recommendation}</p>

      <div className="rb-route-decision__options" role="radiogroup" aria-label="Route options">
        {routeDecision.options.map((option) => (
          <button
            key={option.id}
            className={`rb-route-decision__option ${option.id === selectedId ? 'rb-route-decision__option--selected' : ''}`}
            onClick={() => setSelectedId(option.id)}
            role="radio"
            aria-checked={option.id === selectedId}
            aria-label={option.title}
          >
            <div className="rb-route-decision__option-header">
              <span className="rb-route-decision__option-title">{option.title}</span>
              <span className="rb-route-decision__option-badge">{option.badge}</span>
            </div>
          </button>
        ))}
      </div>

      {selectedOption && (
        <div className="rb-route-decision__detail">
          {selectedOption.experienceOfTheDay && (
            <div className="rb-route-decision__highlight">
              <span className="rb-route-decision__label">Experience of the Day</span>
              <span className="rb-route-decision__value">{selectedOption.experienceOfTheDay}</span>
            </div>
          )}

          {selectedOption.pros.length > 0 && (
            <div className="rb-route-decision__pros">
              <span className="rb-route-decision__label">Pros</span>
              <ul>
                {selectedOption.pros.map((pro) => (
                  <li key={pro}>✓ {pro}</li>
                ))}
              </ul>
            </div>
          )}

          {selectedOption.cons.length > 0 && (
            <div className="rb-route-decision__cons">
              <span className="rb-route-decision__label">Cons</span>
              <ul>
                {selectedOption.cons.map((con) => (
                  <li key={con}>✗ {con}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
