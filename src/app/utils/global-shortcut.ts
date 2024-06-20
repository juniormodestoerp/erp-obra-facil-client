import { useEffect } from 'react'

export const useGlobalShortcut = (
	keyCombination: string,
	callback: () => void,
) => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const keys = keyCombination.split('+')
			const key = keys.pop()
			const ctrl = keys.includes('Ctrl') || keys.includes('Control')

			if (event.key === key && (!ctrl || (ctrl && event.ctrlKey))) {
				event.preventDefault()
				callback()
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [keyCombination, callback])
}
