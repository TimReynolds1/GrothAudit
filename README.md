# Growth Audit Consulting

Local Business Growth Audit is a Next.js app for running intake-based business growth assessments, generating diagnosis-driven recommendations, exporting PDF reports, and reopening saved audits from local storage.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- jsPDF

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Deploying on Netlify

This project is ready to deploy on Netlify Free as a standard Next.js app.

### Environment Variables

No environment variables are required.

### Beginner Deployment Steps

1. Push this project to GitHub.
2. Log in to Netlify and click `Add new site`.
3. Choose `Import an existing project`.
4. Select your GitHub repository.
5. Netlify should detect it as a Next.js app automatically.
6. Confirm these build settings:
   - Build command: `npm run build`
   - Node version: `20`
7. Click `Deploy site`.

### Routes to Check After Deploy

After the site finishes deploying, test these routes:

- `/`
- `/intake`
- `/results`
- `/saved-audits`

### Notes

- Saved audits, saved leads, and the active results view use `localStorage`, so they are browser-specific and only appear after interacting with the deployed app in that browser.
- PDF export runs only in the browser and should be tested from the deployed `/results` page after completing an audit.
