// Small line icons (stroke = currentColor) used in place of emoji.
const PATHS = {
  // a sprout / sapling - "no background needed, you'll grow into it"
  beginner: 'M12 20v-7M12 13c-3.3 0-5.5-2.2-5.5-5.5C9.8 7.5 12 9.7 12 13Zm0 0c3.3 0 5.5-2.2 5.5-5.5C14.2 7.5 12 9.7 12 13Z',
  // code brackets - hands-on
  code: 'M9 8l-4 4 4 4M15 8l4 4-4 4',
  // two people - peer-led
  people: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20c0-3 2.2-5 5-5s5 2 5 5M16 11.5a2.5 2.5 0 1 0 0-5M16.5 15.2c2 .2 3.5 2 3.5 4.8',
  // cloud - nothing to install
  cloud: 'M7.5 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.3A3.5 3.5 0 0 1 18 18Z',
  // hand raised - call a volunteer
  hand: 'M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V12m0-1a1.5 1.5 0 0 1 3 0v3.5a6.5 6.5 0 0 1-6.5 6.5H12a6 6 0 0 1-5.2-3l-2-3.5a1.6 1.6 0 0 1 2.7-1.7L9 12',
  // checkmark - success states
  check: 'M5 13l4 4L19 7',
}

export default function Icon({ name, size = 24, className = '' }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" className={className}
      fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  )
}
