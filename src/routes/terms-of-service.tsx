import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

const DESCRIPTION =
  "The terms that govern your use of LUNA — accounts, acceptable use, AI mentor usage, content ownership, disclaimers and liability.";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: "Terms of Service | LUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Terms of Service — LUNA" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://studyluna-ai.lovable.app/terms-of-service" }],
  }),
  component: TermsPage,
});

const SECTIONS: LegalSection[] = [
  {
    heading: "Acceptance of Terms",
    body: (
      <p>
        By accessing or using LUNA (also referred to as Luna.io or StudyLUNA), you agree to these Terms
        of Service and to our Privacy Policy. If you do not agree with any part of these terms, please
        stop using the platform. If you use LUNA on behalf of a college, club or organisation, you
        confirm that you are authorised to accept these terms for them.
      </p>
    ),
  },
  {
    heading: "Description of the Service",
    body: (
      <>
        <p>LUNA is an online learning platform for engineering students. It provides:</p>
        <ul>
          <li>Branch-wise learning roadmaps and subject guidance</li>
          <li>Technical and soft skill guides with curated free resources</li>
          <li>Mini project ideas with procedures</li>
          <li>Government job and exam preparation guides</li>
          <li>Career updates and community features</li>
          <li>LunaAI, an AI mentor that answers study questions and works with uploaded files</li>
        </ul>
        <p>
          Features may be added, changed or removed at any time as the platform evolves. Some features
          require a free account.
        </p>
      </>
    ),
  },
  {
    heading: "User Accounts & Eligibility",
    body: (
      <>
        <p>
          You must be at least 13 years old to create an account. If you are under 18, you should use
          LUNA with the involvement of a parent, guardian or teacher.
        </p>
        <ul>
          <li>Give accurate information when you register and keep it up to date.</li>
          <li>You are responsible for your login credentials and for all activity on your account.</li>
          <li>Do not share, sell or transfer your account to anyone else.</li>
          <li>Tell us immediately if you suspect unauthorised access to your account.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "Acceptable Use",
    body: (
      <>
        <p>When using LUNA you agree that you will not:</p>
        <ul>
          <li>
            Scrape, crawl, bulk-download, mirror or systematically extract content, data or AI
            responses from the platform, or use automated scripts, bots or headless browsers against
            it.
          </li>
          <li>
            Misuse LunaAI — including attempting to bypass usage limits, using multiple accounts to get
            extra AI capacity, reselling access, using it to generate harmful, illegal, hateful or
            sexually explicit material, or using it to cheat in an exam or assessment where AI help is
            not permitted.
          </li>
          <li>
            Post harmful, abusive, discriminatory, misleading, spam, pirated or plagiarised content in
            community areas, or upload material you do not have the right to share.
          </li>
          <li>Upload files containing malware, or anyone else's personal or confidential data.</li>
          <li>
            Attempt to probe, reverse engineer, overload or interfere with the platform, its APIs or
            its security controls.
          </li>
        </ul>
        <p>
          To keep the AI mentor available and affordable for everyone, LunaAI has fair-use limits,
          including a daily message cap per account. We may adjust these limits at any time.
        </p>
      </>
    ),
  },
  {
    heading: "User-Generated Content",
    body: (
      <>
        <p>
          You keep ownership of everything you create or upload — your questions, chats, notes, plans,
          project write-ups and community posts.
        </p>
        <p>
          By submitting content to public areas of LUNA (such as community discussions), you grant us a
          non-exclusive, worldwide, royalty-free licence to host, store, display and distribute that
          content for the purpose of operating and improving the platform. You can delete your content
          or your account at any time; copies may remain in backups for a limited period.
        </p>
        <p>
          You are responsible for the legality and accuracy of what you post, and you confirm that it
          does not infringe anyone else's rights.
        </p>
      </>
    ),
  },
  {
    heading: "Intellectual Property",
    body: (
      <>
        <p>
          The LUNA name, logo, design, code, roadmaps, written guides, project procedures and other
          original platform content are owned by LUNA and its creators and are protected by
          intellectual property law. You may use them for your personal, non-commercial learning.
        </p>
        <p>
          You may not republish, resell, or present LUNA content as your own, or use it to train,
          fine-tune or build a competing product or dataset without written permission.
        </p>
        <p>
          Links to third-party books, videos, courses, documentation and tools remain the property of
          their respective owners. LUNA links to them for educational purposes only and does not claim
          ownership of them.
        </p>
      </>
    ),
  },
  {
    heading: "Disclaimers",
    body: (
      <>
        <p>
          LUNA is provided for educational guidance only, on an "as is" and "as available" basis. We do
          not guarantee that using LUNA will lead to a job, an internship, an exam result, an admission
          or any specific career outcome.
        </p>
        <ul>
          <li>
            AI-generated answers can be incomplete, outdated or wrong. Always verify important
            technical, academic, financial, legal, medical or safety-related information with an
            authoritative source or a qualified person.
          </li>
          <li>
            Government job notifications, exam dates, syllabi and eligibility details change often —
            always confirm with the official notification before acting.
          </li>
          <li>
            Hardware and electronics projects involve real risk. Follow proper safety practices; you
            build at your own risk.
          </li>
          <li>We do not guarantee uninterrupted or error-free availability of the service.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "Limitation of Liability",
    body: (
      <p>
        To the maximum extent permitted by law, LUNA and its creators are not liable for any indirect,
        incidental, special or consequential damages, or for loss of data, marks, opportunities,
        profits or goodwill, arising from your use of or inability to use the platform. Where liability
        cannot be excluded, it is limited to the amount you paid us for the service in the twelve
        months before the claim — which is zero for free accounts.
      </p>
    ),
  },
  {
    heading: "Account Suspension & Termination",
    body: (
      <p>
        We may suspend or terminate an account that breaches these terms, abuses LunaAI, harms other
        users, or creates legal or security risk — usually with notice, and immediately where the risk
        is serious. You can delete your account at any time from your account settings or by emailing
        us. On termination, your right to use the platform ends and your personal data is handled as
        described in the Privacy Policy.
      </p>
    ),
  },
  {
    heading: "Changes to These Terms",
    body: (
      <p>
        We may update these terms as LUNA grows. When we make material changes we will update the "last
        updated" date above and, where appropriate, notify you in the app. Continuing to use LUNA after
        the changes take effect means you accept the updated terms.
      </p>
    ),
  },
  {
    heading: "Contact",
    body: (
      <p>
        Questions about these terms? Email{" "}
        <a className="text-primary hover:underline" href="mailto:Gayathriluna1234@gmail.com">
          Gayathriluna1234@gmail.com
        </a>{" "}
        or use the contact page.
      </p>
    ),
  },
];

function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="13 August 2026"
      intro="These terms explain what you can expect from LUNA and what we expect from you when you use our roadmaps, skill guides, projects, government job guides, resources, community and the LunaAI mentor."
      sections={SECTIONS}
    />
  );
}
