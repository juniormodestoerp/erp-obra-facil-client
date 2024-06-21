// <ul className="space-y-6">
	
// {activity.map((transaction, idx) => (
//   <li key={transaction.id} className="relative flex gap-x-4">
//     <div
//       className={cn(
//         idx === activity.length - 1 ? 'h-6' : '-bottom-6',
//         'absolute left-0 top-0 flex w-6 justify-center',
//       )}
//     >
//       <div className="w-px bg-gray-200" />
//     </div>

//     <>
//       <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
//         {transaction.type === 'paid' ? (
//           <CheckCircleIcon
//             className="h-6 w-6 text-indigo-600"
//             aria-hidden="true"
//           />
//         ) : (
//           <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
//         )}
//       </div>
//       <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
//         <span className="font-medium text-gray-900">
//           {transaction.person.name}
//         </span>{' '}
//         {transaction.type} the invoice.
//       </p>
//       <time
//         dateTime={transaction.dateTime}
//         className="flex-none py-0.5 text-xs leading-5 text-gray-500"
//       >
//         {transaction.date}
//       </time>
//     </>
//   </li>
// ))}
// </ul>