import { PageHero } from '../components/PageHero'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { isLocalDemoMode } from '../lib/config'

export function PrivacyPage() {
  useDocumentTitle('Privacy')
  return (
    <>
      <PageHero eyebrow="Privacy" title="How we handle your data" intro="Plain-English summary for the pre-launch site. A full policy will be published before any sales." />
      <section className="container-page prose-nn max-w-3xl pb-20 text-[17px]">
        {isLocalDemoMode && (
          <p className="rounded-2xl bg-lavender-soft p-5">
            <strong>This site is currently running in demo mode.</strong> No form endpoint is configured, so everything you
            enter stays in your browser&rsquo;s local storage and is not sent to NightNest.
          </p>
        )}
        <h2>What we collect</h2>
        <ul>
          <li><strong>Forms:</strong> your name, email and the details you choose to share when you register interest, join the student list, request the routine sheet or send an enquiry.</li>
          <li><strong>Planner:</strong> bedtimes, study blocks, exams and mood check-ins are stored only in your browser. They are never sent to us.</li>
          <li><strong>Analytics:</strong> if enabled, privacy-friendly, cookie-free page and event counts (for example, which homepage message led to a sign-up).</li>
        </ul>
        <h2>How we use it</h2>
        <p>To tell you about the launch, send your student discount or routine sheet, and reply to enquiries. We do not sell your data.</p>
        <h2>Your choices</h2>
        <p>You can ask us to delete your details at any time through the contact page. You can clear planner data from the planner itself or by clearing your browser&rsquo;s site data.</p>
      </section>
    </>
  )
}
