// The 4-point sparkle from the Data Alchemy logo. Inherits color via currentColor.
export default function Spark({ size = 16, className = 'spark' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 1c.6 6.1 4.3 9.8 11 11-6.7 1.2-10.4 4.9-11 11-.6-6.1-4.3-9.8-11-11 6.7-1.2 10.4-4.9 11-11Z"
        fill="currentColor"
      />
    </svg>
  )
}
