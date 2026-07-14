"use client";

import { FormEvent, useState } from "react";

const experience = [
  {
    period: "Current",
    role: "General Counsel",
    organization: "CW Digital Funds",
    text: "Executive legal counsel to a digital-asset investment manager, advising on fund operations, securities regulation, governance, commercial agreements, and risk.",
  },
  {
    period: "17+ years",
    role: "Attorney in Private Practice",
    organization: "Open Esquire",
    text: "Founder of a boutique practice serving companies, founders, investment vehicles, and emerging-technology ventures in complex corporate and regulatory matters.",
  },
  {
    period: "Digital assets",
    role: "Outside Counsel",
    organization: "30+ crypto clients",
    text: "Counsel across the Ethereum ecosystem on offerings, funds, DAOs, governance, commercial transactions, enforcement questions, and compliance strategy.",
  },
];

const practiceFocus = [
  ["01", "Corporate & Securities", "Private offerings, entity formation, governance, financings, cap tables, and complex commercial transactions."],
  ["02", "Digital Assets", "Practical counsel for token projects, protocols, investment funds, DAOs, and companies operating at the edge of existing law."],
  ["03", "Regulatory Strategy", "Analysis grounded in the Securities Acts, Investment Company Act, Dodd-Frank, BSA/KYC frameworks, and agency practice."],
  ["04", "Technology & Systems", "A lawyer who also builds: Linux, Docker, Python, embedded systems, blockchain tooling, and applied AI."],
];

const education = [
  ["2018", "LL.M., Energy & Sustainable Development Law", "West Virginia University College of Law"],
  ["2009", "J.D.", "University of Pittsburgh School of Law"],
  ["2003", "B.F.A.", "West Virginia University"],
];

export default function Home() {
  const [formStatus, setFormStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    setFormStatus("Sending your message…");
    try {
      const response = await fetch("https://formsubmit.co/ajax/rdleonhard@pm.me", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const result = await response.json();
      if (!response.ok || String(result.success) !== "true") {
        throw new Error(result.message ?? `Request failed: ${response.status}`);
      }
      form.reset();
      setFormStatus("Thank you — your message has been sent.");
    } catch {
      setFormStatus("Something went wrong sending your message. Please email rdleonhard@pm.me directly.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="monogram" href="#top" aria-label="Robert Leonhard home">RL</a>
        <nav aria-label="Primary navigation">
          <a href="#profile">Profile</a>
          <a href="#experience">Experience</a>
          <a href="#focus">Practice Focus</a>
          <a href="#perspective">Perspective</a>
        </nav>
        <a className="header-cta" href="#contact">Get in Touch</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Attorney · Advisor · Builder</p>
          <h1>Robert D. Leonhard</h1>
          <p className="role-line">Attorney <span>•</span> Digital Assets <span>•</span> Emerging Technology</p>
          <div className="signal-line" aria-hidden="true"><span /></div>
          <p className="hero-statement">I guide companies and institutions through complex challenges where law, capital, and technology converge.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#experience">View Experience</a>
            <a className="button button-secondary" href="#contact">Get in Touch</a>
          </div>
        </div>
        <div className="portrait-wrap" aria-label="Portrait of Robert D. Leonhard">
          <div className="portrait-edge" />
          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/rob-suit-portrait.jpg`} alt="Robert D. Leonhard in a dark suit" />
        </div>
      </section>

      <section className="credibility" aria-label="Professional highlights">
        <div><strong>17+ Years</strong><span>Private Practice</span></div>
        <div><strong>General Counsel</strong><span>Digital Assets</span></div>
        <div><strong>U.S. Army</strong><span>Iraq War Veteran</span></div>
        <div><strong>Pittsburgh</strong><span>Pennsylvania</span></div>
      </section>

      <section className="intro section" id="profile">
        <p className="section-kicker">Profile / 01</p>
        <div>
          <h2>Where <em>law</em> meets the <em>next economy.</em></h2>
          <p>For nearly two decades, I have worked where established legal frameworks meet new markets. My practice combines securities and corporate law, investment-management experience, and genuine technical fluency—the ability to understand not only what a client is building, but how it works.</p>
        </div>
      </section>

      <section className="section experience-section" id="experience">
        <div className="section-heading">
          <p className="section-kicker">Experience / 02</p>
          <h2>Counsel shaped by the work.</h2>
          <p>Strategic judgment built through private practice, executive responsibility, and years advising the digital-asset industry.</p>
        </div>
        <div className="timeline">
          {experience.map((item) => (
            <article key={item.role}>
              <p className="period">{item.period}</p>
              <div><h3>{item.role}</h3><p className="organization">{item.organization}</p></div>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section expertise-section" id="focus">
        <div className="section-heading compact">
          <p className="section-kicker">Practice Focus / 03</p>
          <h2>Legal precision.<br />Technical range.</h2>
        </div>
        <div className="expertise-grid">
          {practiceFocus.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span><h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section perspective-section" id="perspective">
        <div className="perspective-copy">
          <p className="section-kicker">Perspective / 04</p>
          <blockquote>“The best emerging-technology lawyers do more than interpret rules. They understand the systems, incentives, and people those rules must govern.”</blockquote>
          <p>My background is deliberately unconventional: attorney, fund general counsel, Army NCO, and hands-on technologist. That range shapes how I communicate, negotiate, investigate, and solve problems.</p>
        </div>
        <aside>
          <p className="aside-label">Beyond the practice</p>
          <ul>
            <li>Embedded systems & AI</li>
            <li>Energy & sustainable development</li>
            <li>Science, history & philosophy</li>
            <li>Cooking, fitness & music</li>
          </ul>
        </aside>
      </section>

      <section className="section credentials-section">
        <div>
          <p className="section-kicker">Education</p>
          {education.map(([year, degree, school]) => (
            <article key={degree}><span>{year}</span><div><h3>{degree}</h3><p>{school}</p></div></article>
          ))}
        </div>
        <div className="service-card">
          <p className="section-kicker">Service</p>
          <p className="service-rank">Non-Commissioned Officer · E-5</p>
          <h3>United States Army</h3>
          <p>Field Artillery · Convoy Escort<br />One-year deployment to Iraq</p>
        </div>
      </section>

      <section className="contact section" id="contact">
        <div>
          <p className="section-kicker">Contact / 05</p>
          <h2>Let’s discuss what you’re building.</h2>
          <p>For professional inquiries, speaking opportunities, and conversations at the intersection of law and technology.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="_subject" value="New inquiry from robertleonhard profile site" />
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
          <label>Name<input name="name" autoComplete="name" required /></label>
          <label>Email<input name="email" type="email" autoComplete="email" required /></label>
          <label className="full">What would you like to discuss?<textarea name="message" rows={4} required /></label>
          <button className="button button-primary" type="submit" disabled={sending}>{sending ? "Sending…" : "Send Message"}</button>
          <p className="form-status" role="status">{formStatus}</p>
          <p className="form-notice full">Please do not send confidential, sensitive, or time-sensitive information through this form. Submitting a message does not create an attorney-client relationship.</p>
        </form>
      </section>

      <section className="legal-notice" aria-labelledby="legal-notice-heading">
        <h2 id="legal-notice-heading">Legal Notice</h2>
        <div>
          <p><strong>Attorney Advertising.</strong> This website is a professional profile and may be considered attorney advertising in some jurisdictions.</p>
          <p>The material on this site is provided for general informational purposes only and is not legal advice. Viewing this site, using the contact form, or communicating through it does not create an attorney-client relationship. An attorney-client relationship is formed only through a written engagement agreement. Do not act or refrain from acting based on this site without obtaining advice concerning your particular circumstances.</p>
          <p>Robert D. Leonhard is admitted to practice in Pennsylvania. No representation is made regarding certification as a specialist by the Pennsylvania Supreme Court. Descriptions of experience, representative matters, or prior work do not guarantee a similar outcome in any future matter. Legal results depend on the facts and law applicable to each matter.</p>
        </div>
      </section>

      <footer>
        <a className="monogram" href="#top">RL</a>
        <p>© {new Date().getFullYear()} Robert D. Leonhard · Pennsylvania Attorney · Responsible for site content</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
