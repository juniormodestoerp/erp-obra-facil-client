import { RevenueChart } from '@views/pages/private/initial-page/components/bar-chart'
import { BudgetCard } from '@views/pages/private/initial-page/components/budget-card'
import { TodayAppointmentCard } from '@views/pages/private/initial-page/components/today-appointment-card'
import { PatientsCard } from '@views/pages/private/initial-page/components/clients-card'
import { NextBirthDayCard } from '@views/pages/private/initial-page/components/clients'

export function InitialPage() {
  return (
    <div className="grid h-[calc(100vh-172px)] w-full gap-9">
      <div className="grid h-full grid-cols-12 gap-6">
        <BudgetCard />
        <RevenueChart />
      </div>

      <div className="flex gap-6">
        <TodayAppointmentCard />
        <PatientsCard />
        <NextBirthDayCard />
      </div>
    </div>
  )
}
