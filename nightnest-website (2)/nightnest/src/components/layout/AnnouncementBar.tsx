import { Link } from 'react-router-dom'

export function AnnouncementBar() {
  return (
    <div className="bg-midnight text-white no-print">
      <p className="container-page py-2 text-center text-[13px] leading-snug text-white/80">
        <span className="font-semibold text-moon">Pre-launch:</span> the Student Rest Kit is in development. No orders
        or payments are taken yet.{' '}
        <Link to="/register-interest" className="font-semibold text-white underline decoration-moon/70 underline-offset-4 hover:decoration-moon">
          Register interest
        </Link>
      </p>
    </div>
  )
}
