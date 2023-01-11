import React from 'react'

export default function Qualitie({ qualitie }) {
  const className = 'badge bg-' + qualitie.color + ' mx-1'
  return (
    <span className={className} key={qualitie._id}>
      {qualitie.name}
    </span>
  )
}
