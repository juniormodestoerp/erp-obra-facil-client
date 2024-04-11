import { ReactNode } from 'react'
import { Tooltip } from 'react-tooltip'

interface Props {
  id: string
  text?: string
  children?: ReactNode
}

export function ReactTooltip({ id, text, children }: Props) {
  return (
    <Tooltip
      anchorSelect={`#${id}`}
      style={{
        backgroundColor: '#fff',
        color: '#333',
      }}
      border="1px solid #333"
    >
      {text ?? children}
    </Tooltip>
  )
}
