import { useState, type ReactNode } from 'react'

interface RoadbookSectionProps {
  title: string
  eyebrow?: string
  icon?: ReactNode
  defaultOpen?: boolean
  children: ReactNode
}

export function RoadbookSection({
  title,
  eyebrow,
  icon,
  defaultOpen = true,
  children,
}: RoadbookSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className={`roadbook-section ${open ? 'roadbook-section--open' : ''}`}>
      <button
        className="roadbook-section__header"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={`${open ? 'Collapse' : 'Expand'} ${title}`}
      >
        <div className="roadbook-section__title-group">
          {icon && <span className="roadbook-section__icon">{icon}</span>}
          <div>
            {eyebrow && <span className="roadbook-section__eyebrow">{eyebrow}</span>}
            <h3 className="roadbook-section__title">{title}</h3>
          </div>
        </div>
        <span className={`roadbook-section__chevron ${open ? 'rotated' : ''}`}>▾</span>
      </button>
      {open && <div className="roadbook-section__content">{children}</div>}
    </section>
  )
}
