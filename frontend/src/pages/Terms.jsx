import "../assets/Css/privacy.css"; // reuse same styles for consistency

export default function Terms() {
  return (
    <div className="privacy">
      <div className="privacy__hero">
        <h1>Terms & Conditions</h1>
        <p className="privacy__subtitle">
          Please read these Terms carefully before using our website. 
          By accessing or using the site, you agree to be bound by these Terms.
        </p>
      </div>

      <section>
        <h2>Acceptance of Terms</h2>
        <p>
          By using our website, you agree to comply with and be legally bound by these Terms & Conditions. 
          If you do not agree, please discontinue use immediately.
        </p>
      </section>

      <section>
        <h2>Use of the Site</h2>
        <ul className="privacy__list">
          <li>You must be at least 18 years old or have parental/guardian consent.</li>
          <li>You agree not to use the site for any unlawful or prohibited activities.</li>
          <li>We reserve the right to restrict or terminate access if you misuse the site.</li>
        </ul>
      </section>

      <section>
        <h2>Intellectual Property</h2>
        <p>
          All content on this website, including text, images, and design, is the property of Cook&Taste (or licensors)
          and is protected by copyright and intellectual property laws. Unauthorized use is strictly prohibited.
        </p>
      </section>

      <section>
        <h2>Limitation of Liability</h2>
        <p>
          We make no warranties or representations about the accuracy or reliability of the site’s content. 
          To the fullest extent permitted by law, Cook&Taste shall not be held liable for any damages resulting 
          from the use of this site.
        </p>
      </section>

      <section>
        <h2>Third-Party Links</h2>
        <p>
          Our site may contain links to third-party websites. We are not responsible for the content or privacy 
          practices of those sites. Accessing them is at your own risk.
        </p>
      </section>

      <section>
        <h2>Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time to reflect changes in our practices or for other operational, 
          legal, or regulatory reasons. Updates will be posted on this page with a new “Last updated” date.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          If you have questions about these Terms, contact us at{" "}
          <a href="mailto:info@cooktaste.com">info@cooktaste.com</a>.
        </p>
      </section>

      <footer className="privacy__last-updated">
        Last updated: {new Date().toLocaleDateString()}
      </footer>
    </div>
  );
}
