# EdTech Slot Machine (Vite + React + Tailwind)

This is a ready-to-deploy project. It builds your EdTech Slot Machine React component and deploys
it to GitHub Pages using GitHub Actions.

## Local dev
```bash
npm install
npm run dev
```

## Deploy to GitHub Pages
1. Create a **new GitHub repo** (any name). If you name it `<username>.github.io`, it will deploy at the root domain.
2. Push this code:
   ```bash
   git init
   git add -A
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
3. In your repo, go to **Settings → Pages**. Under **Build and deployment**, ensure **Source = GitHub Actions**.
4. The included workflow will build and deploy on every push to `main`. When it finishes, your site will be live at:
   - `https://<username>.github.io` for repos named `<username>.github.io`
   - `https://<username>.github.io/<repo>/` for any other repo name

No manual gh-pages branch management is needed.

## Notes
- The Vite `base` is set automatically from `GITHUB_REPOSITORY` in the Actions environment, so assets resolve correctly on Pages.
- Tailwind is configured with `darkMode: 'class'`. Add `class="dark"` to `<html>` if you want to force dark mode.
