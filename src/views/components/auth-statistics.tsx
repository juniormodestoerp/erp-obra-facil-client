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
    <div className="flex flex-col items-center justify-around bg-transparent py-5 text-foreground">
      <div className="mr-28 flex flex-wrap items-center space-x-32 md:flex-nowrap">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center pr-2.5">
            <Plus
              className="mr-0.5 h-6 w-6 pb-px text-primary"
              strokeWidth={3}
            />
            <AnimatedNumber target={46} duration={2000} />
          </div>
          <span className="font-medium tracking-tighter">CONSTRUTORES</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center pr-1.5">
            <Plus
              className="mr-0.5 h-6 w-6 pb-px text-primary"
              strokeWidth={3}
            />
            <span className="mr-2 text-2xl font-bold">R$</span>
            <AnimatedNumber target={200000} duration={2500} />
          </div>
          <span className="font-medium tracking-tighter">TRANSCIONADOS</span>
        </div>
      </div>

      <div className="ml-20 flex flex-wrap items-center space-x-36 md:flex-nowrap">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center pr-2.5">
            <Plus
              className="mr-0.5 h-6 w-6 pb-px text-primary"
              strokeWidth={3}
            />
            <AnimatedNumber target={186} duration={3000} />
          </div>
          <span className="font-medium tracking-tighter">
            OBRAS FINALIZADAS
          </span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center pr-2.5">
            <Plus
              className="mr-0.5 h-6 w-6 pb-px text-primary"
              strokeWidth={3}
            />
            <AnimatedNumber target={2} duration={750} />
          </div>
          <span className="font-medium tracking-tighter">ESTADOS</span>
        </div>
      </div>
    </div>
  )
}
