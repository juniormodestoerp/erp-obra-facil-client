import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Props {
  target: number
  duration: number
}

function AnimatedNumber({ target, duration }: Props) {
  const [number, setNumber] = useState<number>(0)

  useEffect(() => {
    let startTimestamp: number | null = null

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      setNumber(Math.floor(progress * target))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }, [target, duration])

  return (
    <span className="text-2xl font-bold tracking-tight">
      {number.toLocaleString()}
    </span>
  )
}

export function Statistics() {
  return (
    <div className="flex justify-around bg-transparent p-5 text-foreground">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center">
          <AnimatedNumber target={46} duration={2000} />
          <Plus className="ml-0.5 h-6 w-6 pb-px text-primary" strokeWidth={3} />
        </div>
        <span className="text-lg font-medium tracking-tight">CONSTRUTORES</span>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center">
          <span className="mr-2 text-2xl font-bold">R$</span>
          <AnimatedNumber target={200000} duration={2500} />
          <Plus className="ml-0.5 h-6 w-6 pb-px text-primary" strokeWidth={3} />
        </div>
        <span className="text-lg font-medium tracking-tight">
          TRANSCIONADOS
        </span>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <AnimatedNumber target={2} duration={750} />
          <Plus className="ml-0.5 h-6 w-6 pb-px text-primary" strokeWidth={3} />
        </div>
        <span className="text-lg font-medium tracking-tight">ESTADOS</span>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center">
          <AnimatedNumber target={186} duration={3000} />
          <Plus className="ml-0.5 h-6 w-6 pb-px text-primary" strokeWidth={3} />
        </div>
        <span className="text-lg font-medium tracking-tight">
          OBRAS FINALIZADAS
        </span>
      </div>
    </div>
  )
}
