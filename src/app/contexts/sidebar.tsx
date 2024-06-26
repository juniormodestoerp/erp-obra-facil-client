import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	createContext,
	useState,
} from 'react'

interface AuthContextValue {
	isSidebarSmall: boolean
	setIsSidebarSmall: Dispatch<SetStateAction<boolean>>
}

interface SidebarProviderProps {
	children: ReactNode
}

export const SidebarProviderContext = createContext({} as AuthContextValue)

export function SidebarProvider({ children }: SidebarProviderProps) {
	const [isSidebarSmall, setIsSidebarSmall] = useState(false)

	return (
		<SidebarProviderContext.Provider
			value={{ isSidebarSmall, setIsSidebarSmall }}
		>
			{children}
		</SidebarProviderContext.Provider>
	)
}
