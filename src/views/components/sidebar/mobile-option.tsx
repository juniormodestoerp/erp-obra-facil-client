import { cn } from '@app/utils/cn'
import { DisclosureButton } from '@headlessui/react'
import { Link } from 'react-router-dom'

interface Props {
	linkTo: string
	title: string
}

export function MobileOption({ linkTo, title }: Props) {
	return (
		<Link to={linkTo}>
			<DisclosureButton
				as="a"
				className={cn(
					location.pathname === linkTo
						? 'border-cyan-500 bg-cyan-50 text-dark-blue'
						: 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-dark-blue',
					'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
				)}
				aria-current={location.pathname === linkTo ? 'page' : undefined}
			>
				{title}
			</DisclosureButton>
		</Link>
	)
}


// import { cn } from "@app/utils/cn";
// import { DisclosureButton } from "@headlessui/react";
// import { Link } from "react-router-dom";

// interface Props {
//   linkTo: string
//   title: string
// }

// export function MobileOption({ linkTo, title }: Props) {
//   return (
//     <Link to={linkTo}>
//     <DisclosureButton
//       as="a"
//       className={cn(
//         location.pathname === linkTo
//           ? 'border-cyan-500 bg-cyan-50 text-dark-blue'
//           : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-dark-blue',
//         'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
//       )}
//       aria-current={
//         location.pathname === linkTo ? 'page' : undefined
//       }
//     >
//       {title}
//     </DisclosureButton>
//   </Link>
//   )
// }