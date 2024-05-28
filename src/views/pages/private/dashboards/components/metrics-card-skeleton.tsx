import { Skeleton } from '@views/components/ui/skeleton'
import { Fragment } from 'react'

export function MetricsCardSkeleton() {
	return (
		<Fragment>
			<Skeleton className="h-7 w-36" />
		</Fragment>
	)
}
