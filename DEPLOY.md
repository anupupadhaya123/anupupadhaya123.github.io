# 🚀 Easy Deployment Guide for Anup's Portfolio

This codebase has been completely converted to **pure JavaScript & JSX** to avoid any TypeScript configuration or compile-time overhead, making it incredibly simple to build, test, and deploy!

---

## 💻 Local Commands

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Local Server**:
   ```bash
   npm run dev
   ```

3. **Build Static Files** (creates the `dist/` folder):
   ```bash
   npm run build
   ```

---

## 🌐 Deploying to GitHub Pages (`github.io`)

Since this is a fully static React + Vite application, it can be hosted on GitHub Pages in under **2 minutes**!

### Method 1: Automatic Deployment with GitHub Actions (Recommended)

1. Commit your code and push it to your GitHub repository.
2. In your repository on GitHub, go to **Settings** ➔ **Pages**.
3. Under **Build and deployment**, set **Source** to `GitHub Actions`.
4. Create a folder named `.github/workflows/` at the root of your project, and save a file named `deploy.yml` inside it with the content from the **Workflow Template** section below.
5. Push this workflow file to your `main` branch. GitHub will automatically build and deploy your site on every push!

#### `.github/workflows/deploy.yml` Workflow Template:
```yaml
name: Deploy Portfolio to GitHub Pages

on:
  push:
    branches:
      - main  # change this to master if your default branch is master

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-style: true
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

### Method 2: Manual Deployment (Fastest for testing)

If you don't want to use GitHub Actions, you can build manually and deploy using the `gh-pages` package:

1. Install the `gh-pages` dependency:
   ```bash
   npm install gh-pages --save-dev
   ```
2. Open `package.json` and add these two scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Run the deployment script (it will automatically build and push the `dist/` folder to a new `gh-pages` branch on your GitHub):
   ```bash
   npm run deploy
   ```
4. In your GitHub repository **Settings** ➔ **Pages**, select the `gh-pages` branch under **Branch** (if it isn't already selected), click Save, and your portfolio is live!

---

## 🎨 Asset Configuration

- **Resume PDF**: Simply save your updated CV as `Anup_Upadhaya_CV.pdf` in the `public/` directory, and the download button will link to it automatically.
