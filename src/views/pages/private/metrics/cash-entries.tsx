import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

export function CashEntries() {
	return (
		<Fragment>
			<Helmet title="Lançamentos de caixa" />

			<div className="">
				<h1>CashEntries</h1>
			</div>
		</Fragment>
	)
}
