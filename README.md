# Eurecsanstd Portfolio

Portfolio website built with React Router, TypeScript, Vite, Tailwind CSS,
Three.js, and GSAP.

## Requirements

- Node.js 24+
- npm 11+

## Local development

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

The application is available at `http://localhost:5173`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run typecheck` | Generate route types and run TypeScript checks |
| `npm run build` | Generate the production build |
| `npm run start` | Serve the production build locally |

## Deployment to Vercel

This project is configured for static prerendering. The production output is
generated in `build/client` and configured in `vercel.json`.

1. Push the repository to GitHub.
2. In Vercel, choose **Add New Project** and import the GitHub repository.
3. Keep the project root as the root directory.
4. Use `npm ci` as the install command and `npm run build` as the build command.
5. Deploy.

Vercel will create preview deployments for pull requests and production
deployments for the configured production branch.

## Project routes

- `/`
- `/about`
- `/works`
- `/contact`

## License

Private project.
