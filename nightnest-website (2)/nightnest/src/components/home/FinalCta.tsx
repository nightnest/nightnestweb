import { LinkButton } from '../ui/Button'
import { StarField } from './StarField'

export function FinalCta() {
  return (
    <section className="container-page pb-20 lg:pb-28" aria-label="Register interest">
      <div className="relative overflow-hidden rounded-[32px] bg-midnight px-6 py-16 text-center text-white on-dark sm:px-12 lg:py-20">
        <StarField />
        <div aria-hidden className="absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-moon/25 blur-3xl" />
        <div className="relative mx-auto max-w-2xl">
          <p className="eyebrow text-moon">First small batch</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-5xl">Rest well. Study better.</h2>
          <p className="mt-5 text-lg text-white/75">
            Register interest to hear first when the Student Rest Kit is ready, with launch pricing and the student
            discount. No payment, no commitment.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <LinkButton to="/register-interest" variant="moon" size="lg" trackLabel="final_register">
              Register interest
            </LinkButton>
            <LinkButton to="/student-discount" variant="ghost-dark" size="lg" trackLabel="final_discount">
              Join the student list
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  )
}
