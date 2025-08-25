import { useEffect } from "react";
import "../assets/Css/privacy.css"; // styles below

export default function PrivacyPolicy() {
  return (
    
    <div className="privacy">
      <div className="privacy__hero">
        <h1>Privacy and Data Security Policies</h1>
        <p className="privacy__subtitle">
          We’re committed to protecting your privacy. This policy explains what
          we collect, how we use it, and the choices you have.
        </p>
      </div>

      <section>
        <h2>Privacy Policy</h2>
        <p>
          By using this site, you agree to the collection and use of information
          in accordance with this policy. If you do not agree, please do not use
          the site.
        </p>
        <p>
          We comply with applicable data-protection laws (including GDPR where
          relevant).
        </p>
      </section>

      <section>
        <h2>Information We Collect</h2>
        <ul className="privacy__list">
          <li>
            <strong>Information you provide.</strong> For example, details you
            submit in forms such as name, email, or message content.
          </li>
          <li>
            <strong>Information collected automatically.</strong> We use
            analytics tools (e.g., Google Analytics) to understand how you use
            the site.
          </li>
        </ul>
      </section>

      <section>
        <h2>How We Use Information</h2>
        <ul className="privacy__list">
          <li>To provide, maintain, and improve our services and content.</li>
          <li>To respond to inquiries and provide customer support.</li>
          <li>To analyze site performance and prevent fraud or abuse.</li>
          <li>To comply with legal obligations and enforce our terms.</li>
        </ul>
      </section>

      <section>
        <h2>Cookies & Similar Technologies</h2>
        <p>
          We use cookies to remember preferences and understand how our site is used.
          You can control cookies through your browser settings. Disabling cookies may
          impact some features.
        </p>
      </section>

      <section>
        <h2>Data Sharing</h2>
        <p>
          We do not sell your personal information. We may share data with trusted
          service providers who process it on our behalf under appropriate safeguards,
          or when required by law.
        </p>
      </section>

      <section>
        <h2>Your Rights</h2>
        <ul className="privacy__list">
          <li>Access, correct, or delete your personal information.</li>
          <li>Object to or restrict certain processing activities.</li>
          <li>Withdraw consent where processing is based on consent.</li>
        </ul>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          Questions? Email us at{" "}
          <a href="mailto:info@cooktaste.com">info@cooktaste.com</a>.
        </p>
      </section>

      <footer className="privacy__last-updated">
        Last updated: {new Date().toLocaleDateString()}
      </footer>
    </div>
  );
}