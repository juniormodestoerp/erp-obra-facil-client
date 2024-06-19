import { useBalance } from '@app/hooks/use-balance'

export function useInitialPageController() {
	const { isBalanceVisible } = useBalance()

	return {
		isBalanceVisible
	}
}
