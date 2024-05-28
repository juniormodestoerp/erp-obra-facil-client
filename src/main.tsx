import './views/styles/globals.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './app.tsx'

const rootElement = document.getElementById('root')

if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	)
} else {
	throw new Error('Root element not found')
}
