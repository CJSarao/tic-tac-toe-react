import React from 'react';

interface SquareProps {
    onClick: (e: React.MouseEvent) => void
    value: number
}
const Square = (props:SquareProps) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}
export default Square;