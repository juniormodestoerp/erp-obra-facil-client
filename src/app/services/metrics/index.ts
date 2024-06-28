import { accountsPayable } from '@app/services/metrics/accounts-payable'
import { accountsReceivable } from '@app/services/metrics/accounts-receivable'
import { cashEntries } from '@app/services/metrics/cash-entries'
import { cashFlow } from '@app/services/metrics/cash-flow'
import { entriesByCategory } from '@app/services/metrics/entries-by-category'
import { entriesByCenter } from '@app/services/metrics/entries-by-center'
import { entriesByContact } from '@app/services/metrics/entries-by-contact'
import { entriesByProject } from '@app/services/metrics/entries-by-project'
import { evolutionByCategory } from '@app/services/metrics/evolution-by-category'
import { evolutionByCenter } from '@app/services/metrics/evolution-by-center'
import { evolutionByContact } from '@app/services/metrics/evolution-by-contact'
import { paidAccounts } from '@app/services/metrics/paid-accounts'
import { receivedAccounts } from '@app/services/metrics/received-accounts'
import { totalsByCategory } from '@app/services/metrics/totals-by-category'
import { totalsByCenter } from '@app/services/metrics/totals-by-center'
import { totalsByContact } from '@app/services/metrics/totals-by-contact'
import { totalsByProject } from '@app/services/metrics/totals-by-project'
import { fetchStats } from '@app/services/metrics/initial-page'

export const metricsService = {
	fetchStats,
	accountsPayable,
	accountsReceivable,
	cashEntries,
	cashFlow,
	entriesByCategory,
	entriesByCenter,
	entriesByContact,
	entriesByProject,
	evolutionByCategory,
	evolutionByCenter,
	evolutionByContact,
	paidAccounts,
	receivedAccounts,
	totalsByCategory,
	totalsByCenter,
	totalsByContact,
	totalsByProject,
}
