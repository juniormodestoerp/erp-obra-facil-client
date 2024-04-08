interface Props {
  className?: string
}

export function BellIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 30 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M26.25 23.951v1.25H3.75v-1.25l2.5-2.5v-7.5a8.738 8.738 0 016.25-8.387V5.2a2.5 2.5 0 015 0v.363a8.738 8.738 0 016.25 8.387v7.5l2.5 2.5zm-8.75 2.5a2.5 2.5 0 01-5 0"
        fill="currentColor"
      />
    </svg>
  )
}
