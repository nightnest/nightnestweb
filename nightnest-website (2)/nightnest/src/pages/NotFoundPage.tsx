import { LinkButton } from '../components/ui/Button'
import { StarField } from '../components/home/StarField'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('Page not found')
  return (
    <section className="relative overflow-hidden bg-midnight text-white on-dark">
      <StarField />
      <div className="container-page relative flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-display text-8xl font-bold text-moon">404</p>
        <h1 className="mt-4 text-3xl font-bold">This page has drifted off to sleep.</h1>
        <p className="mt-3 max-w-md text-white/70">The link may be old or mistyped. Try the homepage or the Rest Kit.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton to="/" variant="moon">Go home</LinkButton>
          <LinkButton to="/kit" variant="ghost-dark">See the kit</LinkButton>
        </div>
      </div>
    </section>
  )
}
