import { httpClient } from '@app/services/http-client';

export interface IStat {
	name: string;
	value: string;
	change: string;
	changeType: string;
}

export interface IInvoice {
	id: string;
	amount: number;
	date: string;
	description: string;
}

interface IResponse {
	stats: IStat[];
	overdueInvoices: IInvoice[];
	outstandingInvoices: IInvoice[];
}

export async function fetchStats(): Promise<IResponse> {
	const response = await httpClient.get('/metrics/initial-page');

	if (!response) {
		return {
			stats: [],
			overdueInvoices: [],
			outstandingInvoices: [],
		};
	}

	return {
		stats: response.data.stats.map((stat: IStat) => ({
			name: stat.name,
			value: stat.value,
			change: stat.change,
			changeType: stat.changeType,
		})),
		overdueInvoices: response.data.overdueInvoices.map((invoice: IInvoice) => ({
			id: invoice.id,
			amount: invoice.amount,
			date: invoice.date,
			description: invoice.description,
		})),
		outstandingInvoices: response.data.outstandingInvoices.map((invoice: IInvoice) => ({
			id: invoice.id,
			amount: invoice.amount,
			date: invoice.date,
			description: invoice.description,
		})),
	};
}
