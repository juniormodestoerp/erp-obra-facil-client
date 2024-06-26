import { useContext } from 'react'

import { SidebarProviderContext } from '@app/contexts/sidebar'

export function useSidebar() {
	const context = useContext(SidebarProviderContext)

	if (context === undefined) {
		throw new Error('useSidebar must be used within a SidebarProvider')
	}

	return context
}
