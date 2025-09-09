import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Detect base for GitHub Pages automatically. For repos named <user>.github.io use '/',
// otherwise use '/<repo>/' so asset paths work on Pages.
const repo = process.env.GITHUB_REPOSITORY || ''
const repoName = repo.split('/')[1] || ''
const isUserSite = repoName.endsWith('.github.io')
const base = isUserSite ? '/' : (repoName ? `/${repoName}/` : '/')

export default defineConfig({
  plugins: [react()],
  base,
})
