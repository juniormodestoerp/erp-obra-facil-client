import '../../styles/bell-animation.css'

import { BellIcon } from '@heroicons/react/24/outline'
import { Button } from '@views/components/ui/button'
import { useState } from 'react'

export function NotificationTrigger() {
	const [isSwinging, setIsSwinging] = useState(false)

	const toggleSwing = () => {
		setIsSwinging(!isSwinging)

		setTimeout(() => {
			setIsSwinging(false)
		}, 2000)
	}

	return (
		<Button variant="outline" size="icon" onClick={toggleSwing}>
			<BellIcon
				className={`h-6 w-6 transition-transform ease-in-out ${
					isSwinging ? 'animate-swing' : ''
				}`}
			/>
			<span className="sr-only">Ver notificações</span>
		</Button>
	)
}
