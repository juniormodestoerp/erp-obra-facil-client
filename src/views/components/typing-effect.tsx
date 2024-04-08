import { useEffect, useState } from 'react'

interface Props {
  text: string
  typingSpeed: number
  deletingSpeed: number
  delay: number
}

export function TypingEffect({
  text,
  typingSpeed = 100,
  deletingSpeed = 50,
  delay = 4000,
}: Props) {
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < text.length && !isDeleting) {
      const timeoutId = setTimeout(() => {
        setDisplayText((currentText) => currentText + text.charAt(index))
        setIndex(index + 1)
      }, typingSpeed)
      return () => clearTimeout(timeoutId)
    } else if (index === text.length) {
      const timeoutId = setTimeout(() => {
        setIsDeleting(true)
      }, delay)
      return () => clearTimeout(timeoutId)
    } else if (isDeleting && index > 0) {
      const timeoutId = setTimeout(() => {
        setDisplayText(text.substring(0, index - 1))
        setIndex(index - 1)
      }, deletingSpeed)
      return () => clearTimeout(timeoutId)
    } else if (isDeleting && index === 0) {
      setIsDeleting(false)
    }
  }, [displayText, isDeleting, index, text, typingSpeed, deletingSpeed, delay])

  return <div className="text-foreground">{displayText}</div>
}
