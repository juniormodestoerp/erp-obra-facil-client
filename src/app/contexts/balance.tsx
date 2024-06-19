import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	createContext,
	useState,
} from 'react'

interface AuthContextValue {
	isBalanceVisible: boolean
	setIsBalanceVisible: Dispatch<SetStateAction<boolean>>
}

interface BalanceProviderProps {
	children: ReactNode
}

export const BalanceProviderContext = createContext({} as AuthContextValue)

export function BalanceProvider({ children }: BalanceProviderProps) {
	const [isBalanceVisible, setIsBalanceVisible] = useState(false)

	return (
		<BalanceProviderContext.Provider value={{ isBalanceVisible, setIsBalanceVisible }}>
			{children}
		</BalanceProviderContext.Provider>
	)
}
