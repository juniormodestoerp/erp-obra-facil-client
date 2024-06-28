import { Format } from '@app/utils/format'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useInitialPageController } from '@views/pages/private/initial-page/use-initial-page-controller'
import { cn } from '@app/utils'
import { useQuery } from '@tanstack/react-query'
import { metricsService } from '@app/services/metrics'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export function InitialPage() {
    const { isBalanceVisible } = useInitialPageController()

    const { data } = useQuery({
        queryKey: ['initialPage'],
        queryFn: async () => await metricsService.fetchStats(),
    })

    return (
        <Fragment>
            <Helmet title="Lançamentos" />
            <div className="grid h-20 w-full gap-9">
                <div className="flex gap-x-9">
                    <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4 border border-zinc-300 rounded-xl overflow-hidden">
                        {data?.stats.map((stat) => (
                            <div
                                key={stat.name}
                                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
                            >
                                <dt className="text-sm font-medium leading-6 text-gray-500">
                                    {stat.name}
                                </dt>
                                <dd
                                    className={cn(
                                        stat.changeType === 'negative'
                                            ? 'text-rose-600'
                                            : 'text-gray-700',
                                        'text-xs font-medium',
                                    )}
                                >
                                    {stat.change}
                                </dd>
                                <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                                    {stat.value.replace('$', 'R$')}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
                <div className="grid h-full grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-6">
                        <p className="text-2xl text-dark-blue font-medium">
                            Faturas em atraso
                        </p>
                        <ul className="space-y-6 w-full">
                            {data && data?.outstandingInvoices?.length > 1 ? (
                                data?.outstandingInvoices.map((transaction, idx) => (
                                    <li key={transaction.id} className="relative flex">
                                        <div
                                            className={`absolute left-0 top-0 flex w-6 justify-center ${idx === data.outstandingInvoices.length - 1 ? 'h-6' : '-bottom-6'}`}
                                        >
                                            <div className="w-px bg-gray-200" />
                                        </div>
                                        <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                            <CheckCircleIcon className="h-6 w-6" aria-hidden="true" />
                                        </div>
                                        <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500 px-4">
                                            <span className="font-medium text-gray-900 mr-1">
                                                {Format.capitalizeFirstLetter(transaction.description)}
                                            </span>
                                            no valor de{' '}
                                            <span
                                                className={cn(
                                                    transaction.amount > 0
                                                        ? 'text-green-600'
                                                        : 'text-red-600',
                                                )}
                                            >
                                                {Format.currency(transaction.amount)}
                                            </span>
                                        </p>
                                        <time
                                            dateTime={transaction.date}
                                            className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                                        >
                                            {Format.parseIso(transaction.date)}
                                        </time>
                                    </li>
                                ))
                            ) : (
                                <div className="my-8 h-auto border-collapse overflow-hidden rounded border shadow dark:border-slate-400 dark:bg-slate-800">
                                    <div className="h-24 text-center flex items-center justify-center">
                                        <p>Nenhum resultado encontrado</p>
                                    </div>
                                </div>
                            )}
                        </ul>
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                        <p className="text-2xl text-dark-blue font-medium">
                            Faturas pendentes
                        </p>
                        <ul className="space-y-6 w-full">
                            {data && data?.outstandingInvoices?.length > 1 ? (
                                data?.outstandingInvoices.map((transaction, idx) => (
                                    <li key={transaction.id} className="relative flex">
                                        <div
                                            className={`absolute left-0 top-0 flex w-6 justify-center ${idx === data.outstandingInvoices.length - 1 ? 'h-6' : '-bottom-6'}`}
                                        >
                                            <div className="w-px bg-gray-200" />
                                        </div>
                                        <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                            <CheckCircleIcon className="h-6 w-6" aria-hidden="true" />
                                        </div>
                                        <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500 px-4">
                                            <span className="font-medium text-gray-900 mr-1">
                                                {Format.capitalizeFirstLetter(transaction.description)}
                                            </span>
                                            no valor de{' '}
                                            <span
                                                className={cn(
                                                    transaction.amount > 0
                                                        ? 'text-green-600'
                                                        : 'text-red-600',
                                                )}
                                            >
                                                {isBalanceVisible ? Format.currency(transaction.amount) : '***'}
                                            </span>
                                        </p>
                                        <time
                                            dateTime={transaction.date}
                                            className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                                        >
                                            {Format.parseIso(transaction.date)}
                                        </time>
                                    </li>
                                ))
                            ) : (
                                <div className="my-8 h-auto border-collapse overflow-hidden rounded border shadow dark:border-slate-400 dark:bg-slate-800">
                                    <div className="h-24 text-center flex items-center justify-center">
                                        <p>Nenhum resultado encontrado</p>
                                    </div>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
