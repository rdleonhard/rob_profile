"use client";

import { FormEvent, MouseEvent, useState } from "react";

const buildDate = process.env.NEXT_PUBLIC_BUILD_DATE;
const copyrightYear = buildDate?.slice(0, 4) ?? "2026";

const ledger = [
  "17+ yrs practice",
  "GC, CW Digital Funds",
  "30+ clients, Ethereum ecosystem",
  "U.S. Army NCO — Field Artillery, Iraq",
  "LL.M. / J.D.",
];

const practice = [
  {
    num: "1.1",
    title: "Corporate & securities",
    body: (
      <>
        Private offerings, entity formation, governance, financings, cap
        tables, and complex commercial transactions — for companies, founders,
        and investment vehicles that need the paper to hold up under
        diligence.
      </>
    ),
  },
  {
    num: "1.2",
    title: "Digital assets",
    body: (
      <>
        Practical counsel for token projects, protocols, investment funds, and
        DAOs — grounded in years as outside counsel to more than thirty
        clients across the Ethereum ecosystem, on offerings, governance,
        commercial transactions, enforcement questions, and compliance
        strategy.
      </>
    ),
  },
  {
    num: "1.3",
    title: "Regulatory strategy",
    body: (
      <>
        Analysis grounded in the <span className="statute">Securities
        Acts</span>, the <span className="statute">Investment Company
        Act</span>, <span className="statute">Dodd-Frank</span>, and{" "}
        <span className="statute">BSA/KYC</span> frameworks — and in how the
        agencies actually apply them.
      </>
    ),
  },
  {
    num: "1.4",
    title: "Technology",
    body: (
      <>
        A practice informed by working fluency in the systems under
        discussion: <span className="token">Linux</span>{" "}
        <span className="token">Docker</span>{" "}
        <span className="token">Python</span>{" "}
        <span className="token">Solidity</span>{" "}
        <span className="token">embedded systems</span>{" "}
        <span className="token">applied AI</span>
      </>
    ),
  },
];

const docket = [
  {
    date: "Current",
    role: "General Counsel — CW Digital Funds",
    body: "Executive legal counsel to a digital-asset investment manager: fund operations, securities regulation, governance, commercial agreements, and risk.",
  },
  {
    date: "17+ yrs",
    role: "Private practice — Open Esquire",
    body: "Founder of a boutique practice serving companies, founders, investment vehicles, and emerging-technology ventures; outside counsel to 30+ crypto clients across the Ethereum ecosystem.",
  },
  {
    date: "Admitted",
    role: "Pennsylvania Bar",
    body: "Admitted to practice in Pennsylvania. Private practice across corporate, securities, and emerging-technology matters.",
  },
];

const scholarship = [
  {
    year: "2016",
    title: "Developing Renewable Energy Credits as Cryptocurrency on Ethereum's Blockchain",
    href: "https://ssrn.com/abstract=2885335",
    body: "Proposes issuing, transferring, and authenticating renewable-energy credits on Ethereum, in place of third-party certifiers.",
  },
  {
    year: "2017",
    title: "Corporate Governance on Ethereum's Blockchain",
    href: "https://ssrn.com/abstract=2977522",
    body: "On decentralized autonomous organizations operating like publicly traded corporations — token holders appointing a board-like governing body that issues currency and pays salaries.",
  },
  {
    year: "2017",
    title: "Developing the Crypto Carbon Credit on Ethereum's Blockchain",
    href: "https://ssrn.com/abstract=3000472",
    body: "A decentralized approach to capping greenhouse-gas emissions: teams of academics issuing carbon credits as cryptocurrency.",
  },
  {
    year: "2017",
    title: "Forget Paris: Building a Carbon Market in the U.S. Using Blockchain-Based Smart Contracts",
    href: "https://ssrn.com/abstract=3082450",
    body: "A U.S. carbon market built on smart contracts, with university departments as issuers of offset credits.",
  },
  {
    year: "2019",
    title: "Decentralized Finance on the Ethereum Blockchain",
    href: "https://ssrn.com/abstract=3359732",
    body: "Decentralized finance as an option of last resort for people fleeing failing institutions — and the regulation attorneys need to advise on it in good faith.",
  },
];

const education = [
  ["2018", "LL.M., Energy & Sustainable Development Law", "West Virginia University College of Law"],
  ["2009", "J.D.", "University of Pittsburgh School of Law"],
  ["2003", "B.F.A.", "West Virginia University"],
];

const sections = { practice: "§ 1", record: "§ 2", exhibits: "§ 3", scholarship: "§ 4", "before-the-bar": "§ 5", contact: "§ 6" } as const;
type SectionId = keyof typeof sections;

function SectionMark({
  id,
  copied,
  onCite,
}: {
  id: SectionId;
  copied: SectionId | null;
  onCite: (event: MouseEvent<HTMLAnchorElement>, id: SectionId) => void;
}) {
  return (
    <a className="smark" href={`#${id}`} onClick={(event) => onCite(event, id)} aria-label={`Copy link to section ${sections[id]}`}>
      <span aria-hidden="true">{copied === id ? "copied" : sections[id]}</span>
      <span className="sr-only" aria-live="polite">{copied === id ? "Link copied" : ""}</span>
    </a>
  );
}

export default function Home() {
  const [formStatus, setFormStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState<SectionId | null>(null);

  function cite(event: MouseEvent<HTMLAnchorElement>, id: SectionId) {
    event.preventDefault();
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    window.history.replaceState(null, "", `#${id}`);
    navigator.clipboard
      ?.writeText(url)
      .then(() => {
        setCopied(id);
        window.setTimeout(() => setCopied((current) => (current === id ? null : current)), 1200);
      })
      .catch(() => {});
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    setFormStatus("Sending your message…");
    try {
      const response = await fetch("https://formsubmit.co/ajax/b1cd22c342928e9dffbcf98f9ecb7ee7", {
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
      setFormStatus("Something went wrong sending your message. Please try again in a moment.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="site-name" href="#top">Robert D. Leonhard</a>
        <nav aria-label="Primary navigation">
          <a href="#practice">practice</a>
          <a href="#record">record</a>
          <a href="#exhibits">exhibits</a>
          <a href="#scholarship">scholarship</a>
          <a href="#contact">contact</a>
        </nav>
        <p className="site-admitted">Pittsburgh, PA — admitted: Pennsylvania</p>
      </header>

      <div className="sheet">
        <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="kicker">General Counsel — CW Digital Funds · Founder — Open Esquire</p>
            <h1>
              An attorney of record, with a{" "}
              <span className="h1-tail"><span className="h1-mono">commit history</span>.<span className="caret" aria-hidden="true">▮</span></span>
            </h1>
            <p className="dek">
              Seventeen-plus years advising companies, funds, and founders at
              the edge of securities law and software — and building the
              systems, not just papering them.
            </p>
            <p className="doc-links">
              <a href="#record">Read the record ↓</a>
              <a href="https://github.com/rdleonhard" target="_blank" rel="noopener noreferrer">github.com/rdleonhard ↗</a>
            </p>
          </div>
          <figure className="fig">
            <div className="fig-mat">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/rob-suit-portrait.jpg`}
                alt="Robert D. Leonhard in a dark suit"
              />
            </div>
            <figcaption>Fig. 1 — R. D. Leonhard, Pittsburgh, PA</figcaption>
          </figure>
        </section>

        <ul className="ledger" aria-label="Summary of record">
          {ledger.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <section className="doc-section" id="practice">
          <SectionMark id="practice" copied={copied} onCite={cite} />
          <h2>The practice</h2>
          <ol className="practice-list">
            {practice.map((item) => (
              <li key={item.num}>
                <span className="pnum">{item.num}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="doc-section" id="record">
          <SectionMark id="record" copied={copied} onCite={cite} />
          <h2>The record</h2>
          <div className="docket">
            {docket.map((row) => (
              <article className="docket-row" key={row.role}>
                <span className="docket-date">{row.date}</span>
                <div>
                  <h3>{row.role}</h3>
                  <p>{row.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="doc-section" id="exhibits">
          <SectionMark id="exhibits" copied={copied} onCite={cite} />
          <h2>Exhibits</h2>
          <p className="standfirst">
            Working systems, built by counsel and running now — follow the
            links.
          </p>

          <div className="exhibit-stack">
            <article className="exhibit">
              <div className="exhibit-tab"><span>Exhibit A</span></div>
              <p className="exhibit-lede">
                A public, timestamped docket of attorney rulings on
                AI-presented case law, issued from a dedicated hardware
                verifier.
              </p>
              <dl className="manifest">
                <div>
                  <dt>rulings</dt>
                  <dd>
                    <span className="badge ok">Verified</span>
                    <span className="badge">Wrong</span>
                    <span className="badge">Denied</span>
                  </dd>
                </div>
                <div><dt>hardware</dt><dd>dedicated ESP32 touchscreen</dd></div>
                <div><dt>receipts</dt><dd>permalinked, timestamped</dd></div>
                <div><dt>roadmap</dt><dd>on-chain oracle</dd></div>
              </dl>
              <p className="exhibit-links">
                <a className="plink" href="https://rdleonhard.github.io/open-esquire-verifier/" target="_blank" rel="noopener noreferrer">rdleonhard.github.io/open-esquire-verifier ↗</a>
              </p>
            </article>

            <article className="exhibit">
              <div className="exhibit-tab"><span>Exhibit B</span></div>
              <p className="exhibit-lede">
                A will clause, an iOS app, and a decentralized network for a
                trust-funded AI persona of the testator.
              </p>
              <dl className="manifest">
                <div><dt>contracts</dt><dd>live on Base mainnet</dd></div>
                <div><dt>avatars</dt><dd>Urbit</dd></div>
                <div><dt>intake</dt><dd>iOS voice interviews</dd></div>
                <div><dt>instrument</dt><dd>will clause + trust</dd></div>
              </dl>
              <p className="exhibit-links">
                <a className="plink" href="https://rdleonhard.github.io/digital-testament/" target="_blank" rel="noopener noreferrer">rdleonhard.github.io/digital-testament ↗</a>
                <a className="plink" href="https://github.com/rdleonhard/digital-testament" target="_blank" rel="noopener noreferrer">source ↗</a>
              </p>
            </article>

            <div className="exhibit-row">
              <article className="exhibit">
                <div className="exhibit-tab"><span>Exhibit C</span></div>
                <p className="exhibit-lede">Writing on the AI transition. Built with Astro.</p>
                <p className="exhibit-links">
                  <a className="plink" href="https://rdleonhard.github.io/blog/" target="_blank" rel="noopener noreferrer">rdleonhard.github.io/blog ↗</a>
                </p>
              </article>
              <article className="exhibit">
                <div className="exhibit-tab"><span>Exhibit D</span></div>
                <p className="exhibit-lede">Source code, public.</p>
                <p className="exhibit-langs">Solidity · Python · TypeScript · C/C++</p>
                <p className="exhibit-links">
                  <a className="plink" href="https://github.com/rdleonhard" target="_blank" rel="noopener noreferrer">github.com/rdleonhard ↗</a>
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="doc-section" id="scholarship">
          <SectionMark id="scholarship" copied={copied} onCite={cite} />
          <h2>Scholarship</h2>
          <p className="standfirst">
            Writing on Ethereum&rsquo;s legal architecture since 2016 —
            environmental markets, corporate governance, decentralized
            finance.
          </p>
          <div className="pubs">
            {scholarship.map((paper) => (
              <article className="pub-row" key={paper.href}>
                <span className="pub-year">{paper.year}</span>
                <div>
                  <h3>
                    <a href={paper.href} target="_blank" rel="noopener noreferrer">{paper.title}</a>
                  </h3>
                  <p className="pub-venue">SSRN working paper</p>
                  <p>{paper.body}</p>
                </div>
              </article>
            ))}
          </div>
          <figure className="pull-cite">
            <blockquote>
              &ldquo;Probably the first published work on combining carbon
              credit and DLT comes from Leonhard.&rdquo;
            </blockquote>
            <figcaption>
              <a href="https://arxiv.org/abs/2403.03865" target="_blank" rel="noopener noreferrer">P. Baiz (Imperial College London), &ldquo;Blockchain and Carbon Markets: Standards Overview&rdquo; (2024) ↗</a>
            </figcaption>
          </figure>
          <div className="cited-in">
            <h3 className="col-label">Cited in</h3>
            <ul className="cite-list">
              <li><a href="https://academic.oup.com/jfr/article/6/2/172/5913239" target="_blank" rel="noopener noreferrer">Zetzsche, Arner &amp; Buckley, &ldquo;Decentralized Finance,&rdquo; Journal of Financial Regulation (Oxford University Press, 2020)</a></li>
              <li><a href="https://publications.jrc.ec.europa.eu/repository/handle/JRC110298" target="_blank" rel="noopener noreferrer">European Commission, Joint Research Centre, &ldquo;Blockchain in Energy Communities&rdquo; (2018)</a></li>
              <li><a href="https://arxiv.org/abs/1904.03254" target="_blank" rel="noopener noreferrer">Trautman &amp; Molesky, &ldquo;A Primer for Blockchain,&rdquo; UMKC Law Review, Vol. 88 (2019)</a></li>
              <li><a href="https://doi.org/10.3389/fbloc.2020.00025" target="_blank" rel="noopener noreferrer">&ldquo;The DAO Controversy: The Case for a New Species of Corporate Governance?,&rdquo; Frontiers in Blockchain (2020)</a></li>
              <li><a href="https://doi.org/10.1109/OJCS.2021.3072661" target="_blank" rel="noopener noreferrer">&ldquo;From Technology to Society: An Overview of Blockchain-Based DAO,&rdquo; IEEE Open Journal of the Computer Society (2021)</a></li>
              <li><a href="https://doi.org/10.1146/annurev-chembioeng-092120-022935" target="_blank" rel="noopener noreferrer">&ldquo;Blockchain Technology in the Chemical Industry,&rdquo; Annual Review of Chemical and Biomolecular Engineering (2022)</a></li>
            </ul>
          </div>
          <p className="pub-note">
            Cited 50+ times in the academic literature ·{" "}
            <a href="https://www.researchgate.net/scientific-contributions/Robert-Donald-Leonhard-2129753377" target="_blank" rel="noopener noreferrer">per ResearchGate ↗</a>
          </p>
        </section>

        <section className="doc-section" id="before-the-bar">
          <SectionMark id="before-the-bar" copied={copied} onCite={cite} />
          <h2>Before the bar</h2>
          <div className="formation">
            <div className="service">
              <h3 className="col-label">Service</h3>
              <p>
                Non-Commissioned Officer (E-5), Field Artillery, United States
                Army. Convoy escort, with a one-year deployment to Iraq. The
                habits of that service — preparation, accountability, calm
                under load — carry into the practice.
              </p>
            </div>
            <div className="education">
              <h3 className="col-label">Education</h3>
              <ul>
                {education.map(([year, degree, school]) => (
                  <li key={degree}>
                    <span className="edu-year">{year}</span>
                    <span>
                      {degree}
                      <em>{school}</em>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="record-extra">
            <h3 className="col-label">Also of record</h3>
            <ul>
              <li>
                <span className="edu-year">2005</span>
                <div>
                  <p>
                    Wrote and produced <cite>Infidel</cite> (writing as Bobby
                    Leonhard) — a play drawn from his convoy service in Iraq,
                    staged at Raven Theatre in Chicago with his own footage
                    from Iraq projected over the set. The Chicago Reader wrote
                    that &ldquo;the script&rsquo;s harsh veracity is
                    unquestionable.&rdquo;
                  </p>
                  <p className="rx-links">
                    <a href="https://chicagoreader.com/news/three-men-and-a-humvee/" target="_blank" rel="noopener noreferrer">profile ↗</a>
                    <a href="https://chicagoreader.com/arts-culture/infidel/" target="_blank" rel="noopener noreferrer">review ↗</a>
                  </p>
                </div>
              </li>
              <li>
                <span className="edu-year">2005</span>
                <div>
                  <p>
                    Stood on the podium behind President George W. Bush at the
                    Fourth of July address at West Virginia University, while
                    finishing his National Guard service.
                  </p>
                  <p className="rx-links">
                    <a href="https://chicagoreader.com/news/three-men-and-a-humvee/" target="_blank" rel="noopener noreferrer">as reported ↗</a>
                    <a href="https://www.presidency.ucsb.edu/documents/remarks-independence-day-celebration-morgantown-west-virginia" target="_blank" rel="noopener noreferrer">the address ↗</a>
                  </p>
                </div>
              </li>
              <li>
                <span className="edu-year">2007</span>
                <div>
                  <p>
                    Awarded the Reed Smith Fellowship at the University of
                    Pittsburgh School of Law — the firm&rsquo;s annual award to
                    one rising second-year student who has overcome economic
                    or social adversity.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <p className="elsewhere">
            Elsewhere: embedded systems · energy &amp; sustainable development
            · science, history, philosophy · cooking · fitness · music
          </p>
        </section>

        <section className="doc-section" id="contact">
          <SectionMark id="contact" copied={copied} onCite={cite} />
          <h2>Correspondence</h2>
          <div className="contact-grid">
            <div className="contact-note">
              <p>
                For general counsel roles, outside counsel engagements, or a
                specific question, write directly.
              </p>
              <p className="contact-sub">
                Robert D. Leonhard is admitted to practice in Pennsylvania and
                based in Pittsburgh.
              </p>
            </div>
            <form action="https://formsubmit.co/b1cd22c342928e9dffbcf98f9ecb7ee7" method="POST" onSubmit={handleSubmit}>
              <input type="hidden" name="_subject" value="New inquiry from robertleonhard profile site" />
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
              <label>Name<input name="name" autoComplete="name" required /></label>
              <label>Email<input name="email" type="email" autoComplete="email" required /></label>
              <label>Message<textarea name="message" rows={4} required /></label>
              <button className="send-button" type="submit" disabled={sending}>{sending ? "Sending…" : "Send inquiry"}</button>
              <p className="form-status" role="status">{formStatus}</p>
              <p className="form-notice">
                Submitting this form does not create an attorney–client
                relationship. Please do not send confidential, sensitive, or
                time-sensitive information.
              </p>
            </form>
          </div>
        </section>

        <section className="notices" aria-labelledby="notices-heading">
          <h2 id="notices-heading">Notices</h2>
          <div>
            <p><strong>Attorney Advertising.</strong> This website is a professional profile and may be considered attorney advertising in some jurisdictions.</p>
            <p>The material on this site is provided for general informational purposes only and is not legal advice. Viewing this site, using the contact form, or communicating through it does not create an attorney-client relationship. An attorney-client relationship is formed only through a written engagement agreement. Do not act or refrain from acting based on this site without obtaining advice concerning your particular circumstances.</p>
            <p>Robert D. Leonhard is admitted to practice in Pennsylvania. No representation is made regarding certification as a specialist by the Pennsylvania Supreme Court. Descriptions of experience, representative matters, or prior work do not guarantee a similar outcome in any future matter. Legal results depend on the facts and law applicable to each matter.</p>
          </div>
        </section>

        </main>
        <footer className="colophon">
          <p>
            Set in Source Serif 4 &amp; IBM Plex Mono · Built by counsel ·
            Source:{" "}
            <a href="https://github.com/rdleonhard/rob_profile" target="_blank" rel="noopener noreferrer">github.com/rdleonhard/rob_profile</a>
            {buildDate ? ` · Last revised ${buildDate}` : ""}
          </p>
          <p>© {copyrightYear} Robert D. Leonhard · Pennsylvania attorney · Responsible for site content</p>
        </footer>
      </div>
    </>
  );
}
