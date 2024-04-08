import { useState } from 'react'

export function UseSettingsController() {
  const [enabled, setEnabled] = useState(false)
  const [isActive, setIsActive] = useState(false)

  return {
    enabled,
    isActive,
    setEnabled,
    setIsActive,
  }
}
