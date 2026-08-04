# Robert D. Leonhard — Professional Profile

Source for the responsive professional profile of Robert D. Leonhard, a Pennsylvania attorney working across corporate and securities law, digital assets, investment management, and emerging technology.

**Live site:** [rdleonhard.github.io/rob_profile](https://rdleonhard.github.io/rob_profile/) (deployed automatically from `main` via GitHub Actions). A parallel deployment runs on ChatGPT Sites at [robert-leonhard.ethlawyer.chatgpt.site](https://robert-leonhard.ethlawyer.chatgpt.site).

## Stack

- React and TypeScript
- Next.js application structure
- Vinext and Vite
- Cloudflare-compatible worker build

## Local development

Node.js 22.13 or newer is required.

```bash
npm ci
npm run dev
```

Then open the local URL displayed in the terminal.

## Validation

```bash
npm test
npm run lint
```

The test command creates and validates the production artifact and checks the rendered page metadata.

## Deployment

Pushes to `main` trigger the [Deploy to GitHub Pages](.github/workflows/deploy-pages.yml) workflow, which builds a static export (`npx next build` with `NEXT_PUBLIC_BASE_PATH=/rob_profile`) and publishes it to GitHub Pages. The ChatGPT Sites deployment uses the vinext/Cloudflare worker build. The repository can also be adapted for another compatible React or Cloudflare hosting provider.

The contact form submits through [FormSubmit](https://formsubmit.co) and delivers messages by email. It includes a honeypot field for basic spam protection.

## Legal notice

The website includes attorney-advertising, informational-use, confidentiality, jurisdiction, specialist-certification, and results disclaimers. Those disclosures are part of the published site content and should be reviewed whenever the professional claims, jurisdictions, practice areas, or contact workflow change.

© Robert D. Leonhard. All rights reserved.
