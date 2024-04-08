type Props = {
  className?: string
}

export function ReceiptIcon({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-2 0 16 16"
      fill="none"
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m7.404 15.883-1.4-.96-1.4.96a.666.666 0 0 1-.753 0l-1.404-.96-1.404.96A.666.666 0 0 1 0 15.333v-12A3.337 3.337 0 0 1 3.333 0h5.333A3.338 3.338 0 0 1 12 3.334v12a.667.667 0 0 1-1.042.548l-1.4-.958-1.4.959a.664.664 0 0 1-.754 0Zm-1.025-2.318 1.4.96 1.4-.96a.666.666 0 0 1 .754 0l.734.501V3.334a2 2 0 0 0-2-2H3.332a2 2 0 0 0-2 2v10.732l.739-.5a.666.666 0 0 1 .753 0l1.4.959 1.4-.96a.666.666 0 0 1 .754 0ZM3.333 9.333a.667.667 0 0 1 0-1.333h4a.667.667 0 0 1 0 1.333h-4Zm0-2.666a.667.667 0 0 1 0-1.334h5.333a.666.666 0 1 1 0 1.334H3.333Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
