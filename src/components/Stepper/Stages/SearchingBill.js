import React from 'react';

export default function({ requisites }) {
  return (
    <div>
      ФН: <span>{requisites.fn || "Неверный формат!"}</span><br />
      ФД: <span>{requisites.i || "Неверный формат!"}</span><br />
      ФП: <span>{requisites.fp || "Неверный формат!"}</span><br />
    </div>
  )
}