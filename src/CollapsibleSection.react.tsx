import React, { useState } from 'react'

type Props = {
  title: string
  children?: React.ReactNode
}

export default function CollapsibleSection(props: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="collapsible-section">
      <div
        className="collapsible-section__title"
        onClick={() => setOpen(!open)}
      >
        <span>
          {open ? '👇' : '👉'} <em>{props.title}</em>
        </span>
      </div>
      {open && (
        <div className="collapsible-section__content">{props.children}</div>
      )}
    </div>
  )
}
