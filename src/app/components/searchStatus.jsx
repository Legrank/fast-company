import React from 'react'

export const SearchStatus = ({ countUser }) => {
  const renderPhrase = (countUser) => {
    const lastNumber = countUser % 10
    const lastTwoNumber = countUser % 100
    const numbers = [2, 3, 4]
    const ignoreNumbers = [12, 13, 14]
    return ignoreNumbers.includes(lastTwoNumber) ||
      !numbers.includes(lastNumber)
      ? 'человек тусанёт'
      : 'человека тусанут'
  }
  if (countUser === 0)
    return (
      <span className="badge bg-danger fs-4">Сегодня тусы не будет :(</span>
    )
  return (
    <span className="badge bg-primary fs-4">
      {countUser} {renderPhrase(countUser)} с тобой сегодня
    </span>
  )
}