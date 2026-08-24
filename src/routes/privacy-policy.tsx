import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

const DESCRIPTION =
  "How LUNA collects, uses, stores and protects your data — accounts, learning progress, LunaAI chats, cookies, retention and your privacy rights.";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | LUNA" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Privacy Policy — LUNA" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://studyluna-ai.lovable.app/privacy-policy" }],
  }),
  component: PrivacyPage,
});

const SECTIONS: LegalSection[] = [
  {
    heading: "Information We Collect",
    body: (
      <>
        <p>We keep data collection to what the platform actually needs:</p>
        <ul>
          <li>
            <strong>Account data</strong> — your name or display name, email address, and an encrypted
            password (or a Google account identifier if you sign in with Google).
          </li>
          <li>
            <strong>Learning preferences</strong> — your engineering branch, selected goals, study
            schedule, reminder times and theme choice.
          </li>
          <li>
            <strong>Learning progress</strong> — goals you create, their status (not started, in
            progress, completed) and bookmarks.
          </li>
          <li>
            <strong>LunaAI chat data</strong> — the messages you send, the AI's replies, and any images,
            audio or documents you attach for analysis.
          </li>
          <li>
            <strong>Usage data</strong> — pages visited, features used, approximate device and browser
            information, and AI usage counts used to enforce fair daily limits.
          </li>
        </ul>
        <p>
          Some data (such as local chat threads, planner goals and theme settings) is stored only in
          your own browser and never leaves your device unless you are signed in and choose to sync it.
        </p>
      </>
    ),
  },
  {
    heading: "How We Use Your Information",
    body: (
      <ul>
        <li>To create and secure your account and sign you in</li>
        <li>To personalise roadmaps, subjects, projects and career updates to your branch</li>
        <li>To save your plans, progress, bookmarks and chat history across devices</li>
        <li>To generate answers through LunaAI and to enforce fair usage limits</li>
        <li>To fix bugs, monitor reliability and improve the platform</li>
        <li>To respond to your support or privacy requests</li>
      </ul>
    ),
  },
  {
    heading: "Legal Basis & Consent",
    body: (
      <p>
        We process your data to perform the service you asked for, on the basis of your consent where
        required (for example, browser notifications), and on our legitimate interest in keeping the
        platform secure and working. You can withdraw consent at any time by changing your settings or
        deleting your account.
      </p>
    ),
  },
  {
    heading: "Third-Party Services",
    body: (
      <>
        <p>LUNA relies on a small number of trusted providers to operate:</p>
        <ul>
          <li>
            <strong>Cloud backend and authentication</strong> — stores your account, profile, chat
            history and progress securely.
          </li>
          <li>
            <strong>Hosting and content delivery</strong> — serves the website and handles requests.
          </li>
          <li>
            <strong>AI model providers</strong> — the text, image and audio you send to LunaAI is
            forwarded to third-party AI model providers (currently Google Gemini models accessed
            through our AI gateway) to generate a response. Do not send confidential or sensitive
            personal information to the AI mentor.
          </li>
          <li>
            <strong>Basic analytics and error reporting</strong> — aggregate usage and crash
            information used to improve reliability.
          </li>
          <li>
            <strong>Google Sign-In</strong> — if you choose to sign in with Google.
          </li>
        </ul>
        <p>We do not sell your personal data or share it with advertisers.</p>
      </>
    ),
  },
  {
    heading: "Cookies & Local Storage",
    body: (
      <p>
        We use cookies and browser local storage for essential functionality only: keeping you signed
        in, remembering your branch, theme, selected AI model, planner goals and local chat threads,
        and protecting forms against cross-site requests. We do not use advertising or cross-site
        tracking cookies. You can clear this data through your browser at any time, though some
        features will reset.
      </p>
    ),
  },
  {
    heading: "Data Retention",
    body: (
      <ul>
        <li>Account, profile and progress data is kept while your account is active.</li>
        <li>
          LunaAI chat history is kept until you delete the conversation or your account; locally stored
          threads stay only in your browser.
        </li>
        <li>AI usage counters are kept for a short period for abuse prevention.</li>
        <li>
          After account deletion, personal data is removed from active systems promptly and from
          backups within a limited period.
        </li>
      </ul>
    ),
  },
  {
    heading: "Your Rights",
    body: (
      <>
        <p>You can:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Correct inaccurate details such as your name or branch</li>
          <li>Delete individual chats, goals and bookmarks, or your whole account</li>
          <li>Request a copy of your data, or object to specific processing</li>
        </ul>
        <p>
          Email{" "}
          <a className="text-primary hover:underline" href="mailto:Gayathriluna1234@gmail.com">
            Gayathriluna1234@gmail.com
          </a>{" "}
          and we will respond within a reasonable time.
        </p>
      </>
    ),
  },
  {
    heading: "Children's Privacy",
    body: (
      <p>
        LUNA is intended for students aged 13 and above. We do not knowingly collect personal data from
        children under 13. If you believe a child under 13 has created an account, contact us and we
        will delete the account and its data.
      </p>
    ),
  },
  {
    heading: "Data Security",
    body: (
      <p>
        Data is transmitted over encrypted HTTPS connections and stored with our cloud provider using
        encryption at rest. Passwords are hashed, never stored in plain text. Database access is
        protected by row-level security so each user can only read their own records, and administrative
        keys are kept server-side only. No system is perfectly secure, so please use a strong, unique
        password and tell us promptly about anything suspicious.
      </p>
    ),
  },
  {
    heading: "Changes to This Policy",
    body: (
      <p>
        We may update this policy as the platform changes. The "last updated" date above always shows
        the current version, and material changes will be highlighted in the app.
      </p>
    ),
  },
  {
    heading: "Contact Us",
    body: (
      <p>
        For any privacy question or request, email{" "}
        <a className="text-primary hover:underline" href="mailto:Gayathriluna1234@gmail.com">
          Gayathriluna1234@gmail.com
        </a>{" "}
        or use the contact page.
      </p>
    ),
  },
];

function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="13 August 2026"
      intro="This policy explains what data LUNA collects when you use our roadmaps, skills, projects, government job guides, community and the LunaAI mentor — and how we use, store and protect it."
      sections={SECTIONS}
    />
  );
}
