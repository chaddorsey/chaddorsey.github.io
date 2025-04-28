## SpecStory

## Merge Current Branch into Main and Push (4/28/2025, 11:07:43 AM)

_**User**_

Help me fold the current branch into the main branch and push commits to the remote repo.

---

_**Assistant**_

Great! Before we proceed, let's follow our collaborative process:

### 1. Problem Statement

Let's clarify the problem statement together:

**Problem Statement:**  
You want to merge the changes from your current working branch into the `main` branch and push the updated `main` branch to the remote repository. This should ensure that all your latest work is integrated into the main codebase and available remotely.

#### Requirements:
- The current branch's changes should be safely integrated into `main`.
- Any merge conflicts should be resolved thoughtfully.
- The updated `main` branch should be pushed to the remote repository.
- The process should follow best practices (e.g., review, testing, clear commit history).

---

**Does this problem statement accurately capture your goal?**  
If you’d like to add or clarify anything, let’s discuss! Once you confirm, I’ll draft a design document outlining the steps and considerations for this merge.

---

_**User**_

Actually, I'd like to change that. I want the current branch to be available as a different tag so that the current deployment remains available at the original index.html. What are some ways I can achieve that?

---

_**Assistant**_

Thanks for clarifying! Let’s restate and refine the problem statement:

---

### 1. Problem Statement

**Problem Statement:**  
You want to make the current branch’s version of your site available under a different tag or URL, so that the main deployment (served at the root `index.html` on GitHub Pages) remains unchanged. The goal is to allow users to access the current branch’s build at a separate, stable location (e.g., a subfolder or a custom tag), while the main site continues to serve the production version.

#### Requirements:
- The main deployment at the root (`index.html`) should not be affected.
- The current branch’s build should be accessible at a different, predictable URL (e.g., `/feature-branch/`, `/tag/v2/`, etc.).
- The solution should be maintainable and compatible with GitHub Pages.
- Ideally, the process should be repeatable for future branches or tags.

---

### 2. Discussion: Possible Approaches

Here are some common ways to achieve this with GitHub Pages:

#### **A. Deploy to a Subfolder on `gh-pages`**
- Use a GitHub Action (like `JamesIves/github-pages-deploy-action`) to deploy the branch’s build to a subfolder (e.g., `/feature-branch/`) on the `gh-pages` branch.
- The main site remains at `/`, while the branch is available at `/feature-branch/`.

#### **B. Use GitHub Releases and Tags**
- Tag the branch and create a GitHub Release.
- Attach build artifacts to the release, but this does not provide a live preview URL—just downloadable files.

#### **C. Use Separate Branches for Previews**
- Deploy each branch to its own GitHub Pages site using a different branch (e.g., `gh-pages-feature-branch`), but this requires configuring GitHub Pages to serve from that branch, which is less flexible for multiple previews.

#### **D. Use a Custom Domain or Subdomain**
- If you control a custom domain, you can map subdomains to different branches or folders, but this is more advanced and requires DNS changes.

---

**Most common and maintainable:**  
**Option A** (deploying to a subfolder on `gh-pages`) is the most straightforward and aligns with your current workflow.

---

### Next Steps

1. **Confirm the approach:**  
   Do you want to proceed with deploying the current branch’s build to a subfolder (e.g., `/feature-branch/`) on the `gh-pages` branch, so it’s accessible at `https://your-username.github.io/your-repo/feature-branch/`?

2. **If yes:**  
   - We’ll update your GitHub Actions workflow to deploy the branch’s build to a subfolder.
   - The main site at `/` will remain unchanged.

---

**Does this approach sound good to you, or would you like to discuss other options?**  
Let me know your preference, and I’ll draft a design document for the chosen solution!

---

_**User**_

I have removed the .github/workflows folder and want to start fresh. Currently, my top-level folder is deployed to Gitub pages, so that the folder CountyHealthSelect, which contains a plugin project, is available at CODAP-plugins/CountyHealthSelect. The Github pages for the repo chaddorsey/github.io is set up to deploy from the branch main and the root subfolder. I would like to retain this but deploy the feature branch to a separate URL. Describe how I can do this while retaining the current deployment at CODAP-plugins/CountyHealthSelect

---

_**Assistant**_

Thank you for the detailed context! Let’s clarify your requirements and discuss the best approach.

---

## 1. Problem Statement

**Problem Statement:**  
You want to keep your current GitHub Pages deployment (from the `main` branch, root folder) unchanged, so that `CODAP-plugins/CountyHealthSelect` remains available at its current URL. At the same time, you want to deploy the build from a feature branch to a separate, stable URL for preview/testing, without affecting the main deployment.

**Requirements:**
- The main deployment at `https://chaddorsey.github.io/CODAP-plugins/CountyHealthSelect` (from `main` branch, root) must remain unchanged.
- The feature branch should be deployed to a different URL (e.g., `https://chaddorsey.github.io/feature-preview/CountyHealthSelect` or similar).
- The process should be repeatable for future feature branches.
- No existing GitHub Actions workflows are present; you want a fresh setup.

---

## 2. Design Discussion: How to Achieve This

### A. How GitHub Pages Works in Your Setup

- **Current:**  
  - GitHub Pages is set to deploy from the `main` branch, root folder.
  - The folder `CountyHealthSelect` is available at `CODAP-plugins/CountyHealthSelect`.

- **Goal:**  
  - Keep the above unchanged.
  - Deploy a feature branch’s build to a different subfolder (e.g., `/feature-preview/CountyHealthSelect`).

### B. Solution: Deploy Feature Branch to a Subfolder on `gh-pages`

#### **How it works:**
- Use a GitHub Action workflow that, when run on a feature branch, builds your project and deploys the output to a subfolder (e.g., `/feature-preview/`) on the `gh-pages` branch.
- The `main` branch continues to deploy from the root as before.
- The `gh-pages` branch will contain both the main site (at root) and the feature preview (at `/feature-preview/`).

#### **Resulting URLs:**
- Production: `https://chaddorsey.github.io/CODAP-plugins/CountyHealthSelect`
- Feature preview: `https://chaddorsey.github.io/feature-preview/CountyHealthSelect`

#### **Key Points:**
- The `gh-pages` branch will need to be managed so that the root is always the production build, and subfolders are used for previews.
- You can automate this with a GitHub Action that only deploys to a subfolder when on a feature branch.

---

## 3. Steps to Implement

1. **Set up a new GitHub Action workflow** that:
   - On push to a feature branch, builds the project and deploys to a subfolder on `gh-pages` (e.g., `/feature-preview/`).
   - On push to `main`, continues to deploy to the root of `gh-pages` (if you want to keep using `gh-pages` for production, or just leave `main` as the source for GitHub Pages as you do now).

2. **Configure the workflow** to:
   - Use a deploy action (e.g., `peaceiris/actions-gh-pages` or `JamesIves/github-pages-deploy-action`).
   - Specify the target directory for the deployment (root for production, subfolder for preview).

3. **Retain the current GitHub Pages settings:**
   - Keep GitHub Pages set to deploy from `main` branch, root folder for production.
   - Use the `gh-pages` branch only for previews, or as an artifact store.

---

## 4. Example Workflow Outline

- On push to feature branch:
  - Build project.
  - Deploy build output to `gh-pages/feature-preview/`.

- On push to `main`:
  - No change to current deployment (remains at root).

---

## 5. Next Steps

- **Confirm:** Is this approach (deploying feature branch builds to a subfolder on `gh-pages`) what you want?
- **If yes:** I’ll draft a design document and a sample GitHub Actions workflow for your review.

---

**Does this plan align with your goals?**  
Would you like to discuss any details or alternative approaches before we proceed to the design document?

---

_**User**_

Describe the design generically without reference to my specific repository.

---

_**Assistant**_

Absolutely! Here’s a generic design for maintaining a stable main deployment while allowing feature branch previews at separate URLs using GitHub Pages.

---

## 1. Problem Statement

**Goal:**  
Enable preview deployments for feature branches on GitHub Pages at unique URLs, while keeping the main deployment (from the default branch and root folder) unchanged and stable.

**Requirements:**
- The main site remains available at its original URL (e.g., `/project/`).
- Feature branch builds are accessible at separate, predictable URLs (e.g., `/feature-preview/project/`).
- The process is repeatable and maintainable for future branches.
- No existing deployment workflows are assumed.

---

## 2. Design Overview

### A. Main Deployment

- The main branch (often `main` or `master`) is configured as the source for GitHub Pages.
- The site is built and deployed from the root directory of the main branch.
- The main deployment is always available at the root URL (e.g., `https://username.github.io/project/`).

### B. Feature Branch Previews

- When a feature branch is updated, a workflow builds the project and deploys the output to a subfolder on a dedicated branch (commonly `gh-pages`).
- Each feature branch’s build is deployed to a unique subfolder (e.g., `/feature-branch-name/`).
- The preview is accessible at a URL like `https://username.github.io/feature-branch-name/project/`.

### C. Deployment Workflow

- A GitHub Actions workflow is set up to:
  - Trigger on pushes to feature branches.
  - Build the project.
  - Deploy the build output to a subfolder on the `gh-pages` branch (or another branch used for previews).
  - Optionally, clean up old previews as needed.

- The main branch workflow remains unchanged, continuing to deploy to the root.

---

## 3. Implementation Steps

1. **Configure GitHub Pages:**
   - Set the main branch and root folder as the source for the main deployment.

2. **Set Up GitHub Actions Workflow:**
   - On push to a feature branch:
     - Build the project.
     - Deploy the build output to a subfolder on the `gh-pages` branch named after the feature branch (e.g., `/feature-branch-name/`).
   - On push to the main branch:
     - (Optional) Deploy to the root of the `gh-pages` branch if you want to use `gh-pages` for production as well.

3. **Access URLs:**
   - Main deployment: `https://username.github.io/project/`
   - Feature preview: `https://username.github.io/feature-branch-name/project/`

---

## 4. Benefits

- The main site remains stable and unaffected by feature development.
- Stakeholders can preview feature branches at dedicated URLs.
- The process is automated and repeatable for any branch.

---

## 5. Considerations

- Ensure the build output supports being served from a subfolder (relative paths, etc.).
- Manage the `gh-pages` branch to avoid clutter from old previews.
- Optionally, automate cleanup of previews for deleted branches.

---

Would you like to see a sample workflow file or discuss any part of this design further?

---

_**User**_

Please show me a generic sample workflow file. Assume that the production deploys from the main branch and root folder and that pushes to any branch feature/foobar should deploy to a new URL at https://username.github.io/foobar/project/

---

_**Assistant**_

Absolutely! Here’s a generic GitHub Actions workflow that accomplishes this:

---

## Generic GitHub Actions Workflow for Feature Branch Previews

This workflow:
- Deploys the main branch (root) as usual (no action needed if GitHub Pages is set to deploy from `main`/root).
- On any push to a branch matching `feature/*`, builds the project and deploys it to a subfolder on the `gh-pages` branch named after the feature (e.g., `feature/foobar` → `/foobar/`).
- The preview is then available at:  
  `https://username.github.io/foobar/project/`

**Assumptions:**
- Your build output is in a folder like `dist` or `build`.
- You want to deploy the contents of that folder to the subfolder.

---

```yaml
# .github/workflows/feature-preview.yml
name: Deploy Feature Branch Preview

on:
  push:
    branches:
      - 'feature/*'

jobs:
  deploy-preview:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18' # or your preferred version

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build # or your build command

      - name: Extract feature name
        id: extract
        run: echo "FEATURE_NAME=${GITHUB_REF#refs/heads/feature/}" >> $GITHUB_ENV

      - name: Deploy to gh-pages subfolder
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist # or your build output directory
          destination_dir: ${{ env.FEATURE_NAME }}/project
          keep_files: true # keeps other previews and main site intact
          publish_branch: gh-pages
```

---

### How it works

- When you push to `feature/foobar`, the workflow:
  - Builds your project.
  - Deploys the build output to the `gh-pages` branch under `/foobar/project/`.
- The preview is available at:  
  `https://username.github.io/foobar/project/`
- The main site (from `main` branch, root) remains unchanged.

---

### Notes

- Make sure your project’s build supports being served from a subfolder (relative asset paths, etc.).
- The `keep_files: true` option ensures that other previews and the main site are not overwritten.
- You can clean up old previews manually or automate it with additional workflow steps if desired.

---

Would you like to discuss or customize this workflow further?

---

_**User**_

This is good. What would an example workflow file look like?

---

_**Assistant**_

Certainly! Here’s a concrete example of a workflow file that implements the generic design above. This example assumes:

- Your build output is in the `dist` directory.
- You want to deploy to a subfolder named after the feature branch (e.g., `feature/foobar` → `/foobar/project/`).
- You use Node.js and npm for building.
- You want to keep all other files in the `gh-pages` branch (so main and other previews are not overwritten).

---

```yaml
# .github/workflows/feature-preview.yml
name: Deploy Feature Branch Preview

on:
  push:
    branches:
      - 'feature/*'

jobs:
  deploy-preview:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Extract feature name
        id: extract
        run: echo "FEATURE_NAME=${GITHUB_REF#refs/heads/feature/}" >> $GITHUB_ENV

      - name: Deploy to gh-pages subfolder
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          destination_dir: ${{ env.FEATURE_NAME }}/project
          keep_files: true
          publish_branch: gh-pages
```

---

### Example in Action

- If you push to a branch named `feature/foobar`, the workflow will deploy your build to:
  ```
  gh-pages/foobar/project/
  ```
  and it will be accessible at:
  ```
  https://username.github.io/foobar/project/
  ```

---

Let me know if you’d like to see a version for a different build system, output directory, or with additional features (like automatic cleanup of old previews)!

---

_**User**_

What file would I create in .github/workflows to do this?

---

_**Assistant**_

You would create a new YAML file in the `.github/workflows` directory of your repository.  
A common and descriptive name for this file would be:

```
.github/workflows/feature-preview.yml
```

This file will contain the workflow configuration as shown in the previous example.  
You can name the file anything you like (e.g., `feature-preview.yml`, `deploy-preview.yml`, etc.), but it must have the `.yml` or `.yaml` extension and be placed inside the `.github/workflows` directory for GitHub Actions to recognize and run it.

Would you like a step-by-step guide for creating and committing this file, or do you have any other questions about the setup?

---

_**User**_

Create an example file at .github/feature-preview.yml. Assume my Github pages URL is chaddorsey.github.io.

---

_**Assistant**_

Great! Here’s an example workflow file you can place at `.github/workflows/feature-preview.yml` for your repository.  
This will deploy any branch named `feature/foobar` to `https://chaddorsey.github.io/foobar/project/` (assuming your build output is in the `dist` directory).

```yaml
# .github/workflows/feature-preview.yml
name: Deploy Feature Branch Preview

on:
  push:
    branches:
      - 'feature/*'

jobs:
  deploy-preview:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Extract feature name
        id: extract
        run: echo "FEATURE_NAME=${GITHUB_REF#refs/heads/feature/}" >> $GITHUB_ENV

      - name: Deploy to gh-pages subfolder
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          destination_dir: ${{ env.FEATURE_NAME }}/project
          keep_files: true
          publish_branch: gh-pages
```

**Instructions:**
1. Create the file at `.github/workflows/feature-preview.yml` in your repository.
2. Adjust the `publish_dir` if your build output is not in `dist`.
3. Push a branch named `feature/foobar` and the workflow will deploy to `https://chaddorsey.github.io/foobar/project/`.

Let me know if you’d like help with the next steps or have any questions!

---

_**User**_

I've had GitHub set to deploy to Pages from the main branch. What changes do I need to make on GitHub and how can I ensure that they will retain the deployment for the main branch index?

---

_**Assistant**_

Great question! Here’s a clear breakdown of what you need to do and what to check to ensure your main deployment remains stable while adding feature branch previews:

---

## 1. Current Setup

- **GitHub Pages is set to deploy from:**  
  `main` branch, `/ (root)` folder.
- **Your main site is available at:**  
  `https://chaddorsey.github.io/` (and subfolders, e.g., `/CODAP-plugins/CountyHealthSelect`).

---

## 2. What the Workflow Does

- The new workflow only deploys feature branches to the `gh-pages` branch, in subfolders.
- It does **not** touch the `main` branch or its deployment.
- Your GitHub Pages settings (deploying from `main`/root) remain unchanged.

---

## 3. What You Need to Do on GitHub

**A. Pages Settings:**
- **Do not change** your GitHub Pages settings.  
  Keep them set to deploy from the `main` branch and the root folder.

**B. Branch Protection:**
- If you have branch protection rules on `main`, they remain as is.

**C. gh-pages Branch:**
- The workflow will create/update the `gh-pages` branch for previews.
- This branch is not used for your main deployment, so it won’t affect your main site.

---

## 4. How to Ensure Main Deployment is Retained

- **Your main deployment will remain at `https://chaddorsey.github.io/` and its subfolders, served from the `main` branch.**
- The workflow for feature branches only affects the `gh-pages` branch and only for subfolders (e.g., `/foobar/project/`).
- As long as you do not change the GitHub Pages source setting, your main deployment is safe.

---

## 5. Optional: Test and Verify

1. **Push a change to `main`** and verify that your main site updates as expected.
2. **Push a feature branch** (e.g., `feature/foobar`) and verify that the preview appears at `https://chaddorsey.github.io/foobar/project/`.
3. **Check your GitHub Pages settings:**  
   - Go to your repo → Settings → Pages  
   - Ensure the source is still set to `main` branch, `/ (root)`.

---

## 6. Summary Table

| Branch         | GitHub Pages Source | URL                                 | Affected by Workflow? |
|----------------|--------------------|-------------------------------------|-----------------------|
| main           | main / root        | https://chaddorsey.github.io/       | No                    |
| feature/foobar | (not used)         | https://chaddorsey.github.io/foobar/project/ | Yes (preview only)    |
| gh-pages       | (not used)         | (used for previews only)            | Yes (by workflow)     |

---

**In short:**  
You do not need to change your GitHub Pages settings.  
The workflow for feature branch previews is completely separate and will not interfere with your main deployment.

Would you like a checklist or step-by-step verification instructions?

---

_**User**_

Examine the current code structure — this is a Javascript page. Adjust the suggested workflow file as needed to reflect this project and create it within the file structure.

---

_**Assistant**_

Let me examine the project structure to better understand the JavaScript setup and create an appropriate workflow file.

---

_****_

<details>
            <summary>Listed current directory • **8** results</summary>
        
| Name |
|-------|
| 📄 `.DS_Store` |
| 📁 `.git` |
| 📄 `.bash_profile` |
| 📁 `context` |
| 📁 `.specstory` |
| 📁 `CODAP-plugins` |
| 📄 `LICENSE` |
| 📄 `README.md` |

</details>

---

_****_

Let's look at the `CODAP-plugins` directory to understand the project structure better:

---

_****_

<details>
            <summary>Listed directory CODAP-plugins • **6** results</summary>
        
| Name |
|-------|
| 📄 `.DS_Store` |
| 📁 `CountyHealthSelect` |
| 📄 `.bash_profile` |
| 📁 `Mini-tutorials` |
| 📁 `PurpleAir-test` |
| 📄 `Mini-tutorials.zip` |

</details>

---

_****_

Now, let's look at the `CountyHealthSelect` directory structure:

---

_****_

<details>
            <summary>Listed directory CODAP-plugins/CountyHealthSelect • **11** results</summary>
        
| Name |
|-------|
| 📄 `.DS_Store` |
| 📄 `package.json` |
| 📁 `js` |
| 📄 `index.html` |
| 📁 `docs` |
| 📄 `.bash_profile` |
| 📁 `assets` |
| 📁 `lib` |
| 📄 `package-lock.json` |
| 📁 `bin` |
| 📁 `css` |

</details>

---

_****_

Let's check the `package.json` to understand the build process:

---

_****_

Read file: undefined

---

_****_

Let's see if there are any GitHub workflow files already in place:

---

_****_

Could not resolve URI: Error: Unable to resolve nonexistent file '/Users/chaddorsey/Dropbox/dev/github-pages/chaddorsey.github.io/.github'

---

_****_

Now I'll create an appropriate workflow file based on this JavaScript project structure. I notice this is a simple JavaScript project that doesn't appear to have a build step, so we'll customize the workflow accordingly.

---

_****_

```bash
mkdir -p .github/workflows
```

```
(base) Chads-MacBook-Air-6158:chaddorsey.github.io chaddorsey$ 

```

---

_****_

Now, let's create the feature-preview.yml workflow file customized for your project:

---

_****_

```diff
- 
+ # Deploy Feature Branch Preview
+ name: Deploy Feature Branch Preview
+ 
+ on:
+   push:
+     branches:
+       - 'feature/*'
+ 
+ jobs:
+   deploy-preview:
+     runs-on: ubuntu-latest
+ 
+     steps:
+       - name: Checkout code
+         uses: actions/checkout@v3
+         with:
+           fetch-depth: 0
+           
+       # No build step needed since this is a simple JavaScript project with no build process
+       # If you add a build process later, insert build steps here
+       
+       - name: Extract feature name
+         id: extract
+         run: echo "FEATURE_NAME=${GITHUB_REF#refs/heads/feature/}" >> $GITHUB_ENV
+ 
+       - name: Deploy to gh-pages subfolder
+         uses: peaceiris/actions-gh-pages@v3
+         with:
+           github_token: ${{ secrets.GITHUB_TOKEN }}
+           # Deploy the whole repository content since there's no build directory
+           publish_dir: ./
+           destination_dir: ${{ env.FEATURE_NAME }}
+           keep_files: true
+           publish_branch: gh-pages 
```

---

_****_

I've created a workflow file at `.github/workflows/feature-preview.yml` that is customized for your JavaScript project. Here's what I adjusted based on examining your project structure:

1. **No Build Step**: Your project doesn't appear to have a build process (based on the package.json), so I removed the npm build steps.

2. **Publish Directory**: Set to `./` to publish the whole repository content since there's no build output directory.

3. **Destination Directory**: Set to deploy to a subfolder named after the feature branch (e.g., `feature/new-layout` → `/new-layout/`).

4. **Project Structure**: The workflow preserves the existing directory structure, so the County Health Select plugin will be available at:
   - Main deployment (unchanged): `https://chaddorsey.github.io/CODAP-plugins/CountyHealthSelect/`
   - Feature branch preview: `https://chaddorsey.github.io/[feature-name]/CODAP-plugins/CountyHealthSelect/`

The workflow is now ready for use:

1. When you push to a branch named like `feature/new-feature`, it will:
   - Deploy that branch's content to the `gh-pages` branch in a subfolder named `new-feature`
   - Make it accessible at `https://chaddorsey.github.io/new-feature/`

Remember, your main deployment from the `main` branch (set in GitHub Pages settings) remains untouched.

Would you like to make any changes to this workflow?

---

_**User**_

What should I do with these errors? 

---

_**Assistant**_

You're encountering a GitHub file size limit error. GitHub has a maximum file size limit of 100MB per file, but your repository contains a file that's 183.67MB:

```
File CODAP-plugins/CountyHealthSelect/assets/data/CountyHealth-All-Data.zip is 183.67 MB; this exceeds GitHub's file size limit of 100.00 MB
```

Here are your options to resolve this issue:

### Option 1: Use Git Large File Storage (LFS)

GitHub recommends using Git LFS for large files. This is the best approach if you need to keep this large file in your repository:

1. **Install Git LFS**:
   ```bash
   brew install git-lfs  # On macOS with Homebrew
   ```

2. **Set up Git LFS in your repository**:
   ```bash
   git lfs install
   ```

3. **Track the large file**:
   ```bash
   git lfs track "CODAP-plugins/CountyHealthSelect/assets/data/CountyHealth-All-Data.zip"
   ```

4. **Add the .gitattributes file that was created**:
   ```bash
   git add .gitattributes
   ```

5. **Re-add the large file and commit**:
   ```bash
   git add CODAP-plugins/CountyHealthSelect/assets/data/CountyHealth-All-Data.zip
   git commit -m "Add large file using Git LFS"
   ```

6. **Push again**:
   ```bash
   git push origin feature/attribute-selector-structure
   ```

### Option 2: Remove the large file from your repository

If the data file doesn't need to be in the repository:

1. **Remove the file from your commit**:
   ```bash
   git rm --cached CODAP-plugins/CountyHealthSelect/assets/data/CountyHealth-All-Data.zip
   git commit -m "Remove large data file"
   ```

2. **Add the file to .gitignore**:
   ```bash
   echo "CODAP-plugins/CountyHealthSelect/assets/data/CountyHealth-All-Data.zip" >> .gitignore
   git add .gitignore
   git commit -m "Add large data file to gitignore"
   ```

3. **Push again**:
   ```bash
   git push origin feature/attribute-selector-structure
   ```

### Option 3: Host the data file externally

You could host the data file on an external service and reference it in your code:

1. Host on cloud storage (AWS S3, Google Cloud Storage, etc.)
2. Update your code to point to the external URL
3. Remove the file from your repository using the steps in Option 2

### Which option is best?

If this is a data file your application needs:
- Option 1 (Git LFS) is best if you need version control for the file
- Option 3 (External hosting) is best if the file rarely changes and doesn't need versioning

Would you like me to help you implement one of these solutions?

---

_**User**_

I'm still getting this: 

---

_**Assistant**_

I see that you've already tried ignoring the large file using `.gitignore`, but you're still getting the error. This happens because Git is still tracking the file even though you've added it to `.gitignore`.

The `.gitignore` file only prevents untracked files from being added to the repository. If the file was already tracked before you added it to `.gitignore`, Git will continue to track it.

Here's how to completely remove the large file from your repository:

1. **Remove the file from Git's tracking but keep it on your disk**:

```bash
git rm --cached CODAP-plugins/CountyHealthSelect/assets/data/CountyHealth-All-Data.zip
```

2. **Commit this change**:

```bash
git commit -m "Remove large data file from Git tracking"
```

3. **Force push to overwrite the remote branch history**:

```bash
git push -f origin feature/attribute-selector-structure
```

If you're getting this error when trying to merge or push to another branch, you'll need to ensure the large file is completely removed from your Git history. This can be more complex and might require rewriting Git history using `git filter-branch` or the BFG Repo-Cleaner.

Would you like me to provide instructions for completely removing the file from your Git history?

---

_**User**_

I'm still getting: 

---

_**Assistant**_

I see the issue. You've added the file to `.gitignore`, but it's still in your Git history. Since you've already committed the large file in the past, simply adding it to `.gitignore` isn't enough to remove it from Git's tracking.

You need to remove the file from your Git history completely:

1. **First, remove the file from Git tracking but keep it on disk**:

```bash
git rm --cached CODAP-plugins/CountyHealthSelect/assets/data/CountyHealth-All-Data.zip
git commit -m "Remove large data file from tracking"
```

2. **Then, rewrite Git history to remove the file from past commits** using the BFG Repo-Cleaner (easier than `git filter-branch`):

```bash
# Download BFG Repo-Cleaner
curl -o bfg.jar https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar

# Create a backup of your repo
cp -r .git .git.bak

# Remove the large file from history
java -jar bfg.jar --delete-files CountyHealth-All-Data.zip .

# Clean up and optimize the repository
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push to update the remote branch
git push -f origin feature/attribute-selector-structure
```

This approach will completely remove the large file from your Git history, which is necessary to successfully push to GitHub.

Alternatively, if you're more comfortable with a simpler approach and don't mind creating a fresh branch:

1. **Create a new branch from main/master (without the large file)**:
```bash
git checkout main
git checkout -b feature/attribute-selector-structure-new
```

2. **Copy your changes (excluding the large file) to the new branch**
3. **Add the large file to .gitignore before committing**
4. **Commit and push the new branch**

Would you like more detailed instructions for either approach?

---

_**User**_

Where should my feature be now?

---

_**Assistant**_

Based on our discussion and the steps you've taken, here's where your feature should be:

1. **Main Branch**: Unchanged. Your main deployment at `https://chaddorsey.github.io/CODAP-plugins/CountyHealthSelect/` should still be working as before.

2. **Feature Branch**: You've been working in a branch (which appears to be `feature/attribute-selector-structure` based on previous context).

3. **Deployment Status**: The GitHub workflow we created (`.github/workflows/feature-preview.yml`) should trigger whenever you push to a branch starting with `feature/`.

If you've successfully pushed your feature branch (after resolving the large file issue), your feature should be deployed to:

```
https://chaddorsey.github.io/attribute-selector-structure/CODAP-plugins/CountyHealthSelect/
```

(The prefix "feature/" is removed from the URL, leaving just the branch name "attribute-selector-structure")

You can check the deployment status in your GitHub repository by:

1. Going to the "Actions" tab in your GitHub repository
2. Looking for the most recent run of the "Deploy Feature Branch Preview" workflow
3. Checking if it completed successfully

If the workflow ran successfully, your feature branch should be accessible at the URL mentioned above. If not, you might need to check the workflow logs for any errors.

Would you like help troubleshooting the deployment or checking its status?

---

_**User**_

I see "Annotations
1 error
deploy-preview
Action failed with "The process '/usr/bin/git' failed with exit code 128"

---

_**Assistant**_

This error typically occurs in GitHub Actions when there's a Git-related issue. Let's troubleshoot the workflow failure:

### Common Causes and Solutions for "Git failed with exit code 128"

1. **Permission Issues**

The GitHub token may not have sufficient permissions to deploy to the gh-pages branch.

**Solution**:
- Check that your workflow is using the correct token: `github_token: ${{ secrets.GITHUB_TOKEN }}`
- You might need to adjust repository settings to allow GitHub Actions to create and push to branches

2. **Large Files Issue**

The large file might still be causing problems in the workflow.

**Solution**:
- Make sure the large file is completely removed from all branches that the workflow is processing
- Ensure your `.gitignore` file includes the large file

3. **Git Configuration Issues**

Sometimes the workflow fails because Git isn't properly configured.

**Solution**:
- Add explicit Git configuration steps to your workflow

Let's modify your workflow file to include more debugging information and better error handling:

---

_****_

```diff
            fetch-depth: 0
  
+       - name: Setup Git
+         run: |
+           git config --global user.name 'GitHub Actions'
+           git config --global user.email 'actions@github.com'
+           
        # No build step needed since this is a simple JavaScript project with no build process
        # If you add a build process later, insert build steps here
          run: echo "FEATURE_NAME=${GITHUB_REF#refs/heads/feature/}" >> $GITHUB_ENV
  
+       - name: Debug Info
+         run: |
+           echo "Repository: $GITHUB_REPOSITORY"
+           echo "Branch: $GITHUB_REF"
+           echo "Feature name: $FEATURE_NAME"
+           echo "Workspace: $GITHUB_WORKSPACE"
+           du -sh .
+           ls -la
+ 
+       - name: Remove large files (if any)
+         run: |
+           # Example: Remove large data files that might cause issues
+           find . -type f -size +50M -exec ls -lh {} \; || true
+           find . -type f -name "*.zip" -size +50M -exec rm -f {} \; || true
+ 
        - name: Deploy to gh-pages subfolder
          uses: peaceiris/actions-gh-pages@v3
            keep_files: true
            publish_branch: gh-pages
+           force_orphan: false 
```

---

_****_

I've updated your workflow file with several improvements to help diagnose and fix the "git failed with exit code 128" error:

### Key Changes:

1. **Added Git Configuration**:
   - Explicitly sets Git user name and email, which can prevent authentication issues.

2. **Added Debug Information**:
   - Outputs useful information about the repository, branch, and workspace.
   - Lists all files and directory sizes to help identify large files.

3. **Added Large File Removal Step**:
   - Automatically finds and removes files larger than 50MB.
   - Focuses on ZIP files (like your problematic CountyHealth-All-Data.zip).

4. **Modified Deployment Options**:
   - Added `force_orphan: false` to preserve history when possible.

### Next Steps:

1. **Commit these changes** to your feature branch:

```bash
git add .github/workflows/feature-preview.yml
git commit -m "Update workflow with better error handling"
git push origin feature/attribute-selector-structure
```

2. **Check GitHub Actions** after the push to see if the error persists.

3. **Review the logs** carefully, especially the output from the "Debug Info" step, which will show:
   - What large files are present
   - The structure of your repository
   - Other details that might help identify the issue

If the error still persists, we may need to try a different approach, such as:

1. Creating a `.gitattributes` file to handle large files with Git LFS
2. Creating a separate workflow branch that excludes the large files
3. Using a different deployment strategy, such as a custom script

Would you like me to explain any of these alternative approaches in more detail?

---

_**User**_

I see this:

  /usr/bin/git push origin gh-pages
  remote: Permission to chaddorsey/chaddorsey.github.io.git denied to github-actions[bot].
  fatal: unable to access 'https://github.com/chaddorsey/chaddorsey.github.io.git/': The requested URL returned error: 403
  Error: Action failed with "The process '/usr/bin/git' failed with exit code 128"


---

_**Assistant**_

This error indicates a permissions issue. GitHub Actions doesn't have permission to push to your repository. This happens because GitHub Pages repositories have special security settings.

### Solution: Update Repository Permissions

For GitHub Pages repositories, you need to explicitly give GitHub Actions permission to write to your repository:

1. Go to your repository on GitHub
2. Click on **Settings**
3. In the left sidebar, click on **Actions** under "Code and automation"
4. Under "Workflow permissions", select **Read and write permissions**
5. Click **Save**

This will allow GitHub Actions to push to your repository.

Alternatively, you can create a Personal Access Token (PAT) with push permissions and use that instead of the default `GITHUB_TOKEN`:

1. Go to your GitHub account settings
2. Click on **Developer settings** in the left sidebar
3. Click on **Personal access tokens** → **Tokens (classic)**
4. Click **Generate new token** → **Generate new token (classic)**
5. Name it something like "GitHub Pages Deployment"
6. Select the **repo** scope (full control of repositories)
7. Click **Generate token** and copy the token

Then, add this token as a repository secret:

1. Go to your repository on GitHub
2. Click on **Settings**
3. In the left sidebar, click on **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Name it `PAT` and paste your token as the value
6. Click **Add secret**

Then update your workflow file to use this token:

---

_****_

```diff
  
        - name: Deploy to gh-pages subfolder
-         uses: peaceiris/actions-gh-pages@v3
+         uses: JamesIves/github-pages-deploy-action@v4
          with:
-           github_token: ${{ secrets.GITHUB_TOKEN }}
-           # Deploy the whole repository content since there's no build directory
-           publish_dir: ./
-           destination_dir: ${{ env.FEATURE_NAME }}
-           keep_files: true
-           publish_branch: gh-pages
-           force_orphan: false 
+           # Use a PAT with write access instead of GITHUB_TOKEN
+           # Add this secret in your repository settings
+           token: ${{ secrets.GITHUB_TOKEN }}
+           folder: ./
+           branch: gh-pages
+           target-folder: ${{ env.FEATURE_NAME }}
+           clean: false 
```

---

_****_

I've updated your workflow file to use a different GitHub Actions deployment package (`JamesIves/github-pages-deploy-action`) which has better handling for GitHub Pages repositories. This may work with the default `GITHUB_TOKEN`, but if you still encounter permission issues, you'll need to follow the instructions above to either:

1. **Update Workflow Permissions** in your repository settings (recommended first approach)
   - Settings → Actions → Workflow permissions → Select "Read and write permissions"

2. **Or Create a Personal Access Token** and update the workflow:
   - Follow the steps above to create a PAT with repo scope
   - Add it as a repository secret named `PAT`
   - Then change the `token: ${{ secrets.GITHUB_TOKEN }}` line to `token: ${{ secrets.PAT }}`

### Additional Notes:

1. The updated workflow uses the `JamesIves/github-pages-deploy-action` action, which is specifically designed for GitHub Pages deployments and often works better with permission restrictions.

2. I kept the `GITHUB_TOKEN` for now - try this first after updating the workflow permissions in your repository settings. Only create and use a PAT if you still face permission issues.

3. With GitHub Pages repositories, there are often additional permission considerations since they are often published publicly, so GitHub applies stricter security controls.

Would you like me to explain any of these steps in more detail?

---

_**User**_

What if I don't want to use a PAT?

---

_**Assistant**_

If you don't want to use a Personal Access Token (PAT), you have a simpler option:

### Update the Repository Workflow Permissions

This is the easiest solution and doesn't require creating a PAT:

1. Go to your repository on GitHub
2. Click on **Settings**
3. In the left sidebar, click on **Actions** under "Code and automation"
4. Under "Workflow permissions", select **Read and write permissions**
5. Click **Save**

This setting allows the default `GITHUB_TOKEN` (which your workflow is already using) to push to your repository, including the `gh-pages` branch.

Your current workflow already uses `${{ secrets.GITHUB_TOKEN }}`, so once you update the permissions, it should work without any changes to the workflow file.

This approach is actually preferable to using a PAT because:

1. It's more secure (no need to create and manage a separate token)
2. It's specifically designed for GitHub Actions workflows
3. It's easier to maintain and understand

Would you like me to help you with any other aspects of setting up these workflow permissions?

---

_**User**_

Now I have issues with running out of space. Help me remove all of the files in the folders assets/data/NNNN/raw from the Git history and add them to gitignore.

---

_**Assistant**_

I'll help you remove the large files in the `assets/data/NNNN/raw` directories from your Git history and add them to `.gitignore`. This is a multi-step process:

## Step 1: Create/update your .gitignore file

First, let's add the pattern to your `.gitignore`:

---

_****_

```diff
+ # Ignore large raw data files
+ assets/data/*/raw/
+ CODAP-plugins/CountyHealthSelect/assets/data/*/raw/
+ **/assets/data/*/raw/
+ 
+ # Specific large files
  CODAP-plugins/CountyHealthSelect/assets/data/CountyHealth-All-Data.zip
  .git.bak
```

---

_****_

## Step 2: Remove the files from Git tracking (but keep them on your disk)

---

_****_

```bash
find CODAP-plugins/CountyHealthSelect/assets/data -path "*/raw/*" -type f | wc -l
```

```
(base) Chads-MacBook-Air-6158:chaddorsey.github.io chaddorsey$ find CODAP-plugins/CountyHealthSelect/assets/
data -path "*/raw/*" -type f | wc -l
     753
You have new mail in /var/mail/chaddorsey
(base) Chads-MacBook-Air-6158:chaddorsey.github.io chaddorsey$
```

---

_****_

I see there are 753 files in the raw directories. Let's remove them from Git tracking while keeping them on your disk:

---

_****_

```bash
git rm --cached $(find CODAP-plugins/CountyHealthSelect/assets/data -path "*/raw/*" -type f) 2>/dev/null || echo "Some files were not tracked"
```

```
(base) Chads-MacBook-Air-6158:chaddorsey.github.io chaddorsey$ git rm --cached $(find CODAP-plugins/CountyHe
althSelect/assets/data -path "*/raw/*" -type f) 2>/dev/null || echo "Some files were not tracked"
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/.DS_Store'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_alabama_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_alaska_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_arizona_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_arkansas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_california_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_colorado_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_connecticut_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_delaware_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_florida_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_georgia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_hawaii_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_idaho_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_illinois_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_indiana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_iowa_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_kansas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_kentucky_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_louisiana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_maine_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_maryland_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_massachusetts_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_michigan_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_minnesota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_mississippi_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_missouri_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_montana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_nebraska_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_nevada_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_new_hampshire_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_new_jersey_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_new_mexico_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_new_york_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_north_carolina_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_north_dakota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_ohio_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_oklahoma_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_oregon_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_pennsylvania_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_rhode_island_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_south_carolina_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_south_dakota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_tennessee_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_texas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_utah_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_vermont_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_virginia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_washington_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_west_virginia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_wisconsin_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_wyoming_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_alabama_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_alaska_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_arizona_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_arkansas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_california_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_colorado_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_connecticut_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_delaware_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_florida_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_georgia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_hawaii_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_idaho_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_illinois_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_indiana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_iowa_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_kansas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_kentucky_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_louisiana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_maine_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_maryland_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_massachusetts_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_michigan_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_minnesota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_mississippi_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_missouri_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_montana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_nebraska_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_nevada_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_new_hampshire_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_new_jersey_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_new_mexico_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_new_york_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_north_carolina_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_north_dakota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_ohio_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_oklahoma_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_oregon_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_pennsylvania_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_rhode_island_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_south_carolina_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_south_dakota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_tennessee_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_texas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_utah_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_vermont_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_virginia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_washington_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_west_virginia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_wisconsin_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_wyoming_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/.DS_Store'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_alabama_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_alaska_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_arizona_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_arkansas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_california_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_colorado_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_connecticut_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_delaware_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_florida_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_georgia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_hawaii_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_idaho_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_illinois_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_indiana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_iowa_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_kansas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_kentucky_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_louisiana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_maine_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_maryland_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_massachusetts_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_michigan_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_minnesota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_mississippi_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_missouri_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_montana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_nebraska_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_nevada_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_new_hampshire_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_new_jersey_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_new_mexico_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_new_york_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_north_carolina_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_north_dakota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_ohio_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_oklahoma_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_oregon_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_pennsylvania_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_rhode_island_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_south_carolina_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_south_dakota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_tennessee_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_texas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_utah_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_vermont_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_virginia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_washington_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_west_virginia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_wisconsin_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_wyoming_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_alabama_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_alaska_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_arizona_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_arkansas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_california_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_colorado_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_connecticut_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_delaware_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_florida_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_georgia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_hawaii_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_idaho_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_illinois_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_indiana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_iowa_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_kansas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_kentucky_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_louisiana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_maine_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_maryland_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_massachusetts_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_michigan_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_minnesota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_mississippi_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_missouri_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_montana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_nebraska_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_nevada_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_new_hampshire_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_new_jersey_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_new_mexico_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_new_york_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_north_carolina_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_north_dakota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_ohio_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_oklahoma_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_oregon_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_pennsylvania_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_rhode_island_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_south_carolina_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_south_dakota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_tennessee_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_texas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_utah_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_vermont_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_virginia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_washington_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_west_virginia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_wisconsin_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_wyoming_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/.DS_Store'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_alabama_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_alaska_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_arizona_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_arkansas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_california_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_colorado_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_connecticut_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_delaware_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_florida_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_georgia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_hawaii_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_idaho_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_illinois_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_indiana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_iowa_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_kansas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_kentucky_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_louisiana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_maine_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_maryland_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_massachusetts_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_michigan_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_minnesota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_mississippi_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_missouri_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_montana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_nebraska_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_nevada_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_new_hampshire_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_new_jersey_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_new_mexico_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_new_york_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_north_carolina_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_north_dakota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_ohio_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_oklahoma_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_oregon_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_pennsylvania_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_rhode_island_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_south_carolina_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_south_dakota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_tennessee_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_texas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_utah_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_vermont_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_virginia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_washington_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_west_virginia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_wisconsin_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_wyoming_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_alabama_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_alaska_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_arizona_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_arkansas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_california_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_colorado_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_connecticut_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_delaware_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_florida_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_georgia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_hawaii_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_idaho_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_illinois_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_indiana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_iowa_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_kansas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_kentucky_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_louisiana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_maine_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_maryland_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_massachusetts_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_michigan_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_minnesota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_mississippi_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_missouri_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_montana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_nebraska_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_nevada_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_new_hampshire_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_new_jersey_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_new_mexico_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_new_york_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_north_carolina_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_north_dakota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_ohio_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_oklahoma_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_oregon_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_pennsylvania_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_rhode_island_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_south_carolina_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_south_dakota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_tennessee_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_texas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_utah_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_vermont_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_virginia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_washington_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_west_virginia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_wisconsin_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_wyoming_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/.DS_Store'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_alabama_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_alaska_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_arizona_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_arkansas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_california_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_colorado_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_connecticut_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_delaware_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_florida_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_georgia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_hawaii_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_idaho_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_illinois_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_indiana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_iowa_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_kansas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_kentucky_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_louisiana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_maine_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_maryland_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_massachusetts_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_michigan_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_minnesota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_mississippi_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_missouri_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_montana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_nebraska_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_nevada_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_new_hampshire_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_new_jersey_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_new_mexico_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_new_york_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_north_carolina_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_north_dakota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_ohio_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_oklahoma_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_oregon_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_pennsylvania_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_rhode_island_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_south_carolina_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_south_dakota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_tennessee_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_texas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_utah_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_vermont_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_virginia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_washington_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_west_virginia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_wisconsin_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_wyoming_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_alabama_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_alaska_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_arizona_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_arkansas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_california_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_colorado_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_connecticut_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_delaware_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_florida_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_georgia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_hawaii_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_idaho_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_illinois_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_indiana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_iowa_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_kansas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_kentucky_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_louisiana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_maine_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_maryland_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_massachusetts_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_michigan_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_minnesota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_mississippi_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_missouri_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_montana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_nebraska_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_nevada_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_new_hampshire_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_new_jersey_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_new_mexico_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_new_york_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_north_carolina_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_north_dakota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_ohio_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_oklahoma_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_oregon_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_pennsylvania_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_rhode_island_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_south_carolina_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_south_dakota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_tennessee_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_texas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_utah_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_vermont_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_virginia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_washington_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_west_virginia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_wisconsin_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_wyoming_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/.DS_Store'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_alabama_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_alaska_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_arizona_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_arkansas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_california_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_colorado_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_connecticut_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_delaware_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_florida_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_georgia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_hawaii_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_idaho_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_illinois_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_indiana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_iowa_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_kansas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_kentucky_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_louisiana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_maine_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_maryland_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_massachusetts_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_michigan_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_minnesota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_mississippi_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_missouri_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_montana_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_nebraska_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_nevada_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_new_hampshire_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_new_jersey_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_new_mexico_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_new_york_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_north_carolina_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_north_dakota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_ohio_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_oklahoma_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_oregon_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_pennsylvania_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_rhode_island_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_south_carolina_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_south_dakota_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_tennessee_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_texas_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_utah_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_vermont_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_virginia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_washington_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_west_virginia_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_wisconsin_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_wyoming_data.xls'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_alabama_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_alaska_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_arizona_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_arkansas_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_california_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_colorado_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_connecticut_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_delaware_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_florida_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_georgia_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_hawaii_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_idaho_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_illinois_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_indiana_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_iowa_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_kansas_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_kentucky_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_louisiana_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_maine_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_maryland_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_massachusetts_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_michigan_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_minnesota_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_mississippi_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_missouri_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_montana_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_nebraska_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_nevada_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_new_hampshire_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_new_jersey_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_new_mexico_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_new_york_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_north_carolina_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_north_dakota_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_ohio_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_oklahoma_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_oregon_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_pennsylvania_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_rhode_island_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_south_carolina_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_south_dakota_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_tennessee_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_texas_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_utah_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_vermont_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_virginia_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_washington_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_west_virginia_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_wisconsin_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_wyoming_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/.DS_Store'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_alabama_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_alaska_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_arizona_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_arkansas_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_california_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_colorado_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_connecticut_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_delaware_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_florida_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_georgia_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_hawaii_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_idaho_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_illinois_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_indiana_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_iowa_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_kansas_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_kentucky_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_louisiana_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_maine_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_maryland_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_massachusetts_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_michigan_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_minnesota_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_mississippi_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_missouri_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_montana_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_nebraska_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_nevada_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_new_hampshire_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_new_jersey_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_new_mexico_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_new_york_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_north_carolina_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_north_dakota_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_ohio_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_oklahoma_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_oregon_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_pennsylvania_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_rhode_island_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_south_carolina_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_south_dakota_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_tennessee_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_texas_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_utah_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_vermont_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_virginia_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_washington_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_west_virginia_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_wisconsin_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_wyoming_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/.DS_Store'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_alabama_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_alaska_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_arizona_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_arkansas_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_california_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_colorado_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_connecticut_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_delaware_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_florida_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_georgia_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_hawaii_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_idaho_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_illinois_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_indiana_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_iowa_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_kansas_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_kentucky_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_louisiana_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_maine_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_maryland_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_massachusetts_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_michigan_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_minnesota_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_mississippi_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_missouri_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_montana_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_nebraska_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_nevada_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_new_hampshire_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_new_jersey_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_new_mexico_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_new_york_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_north_carolina_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_north_dakota_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_ohio_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_oklahoma_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_oregon_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_pennsylvania_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_rhode_island_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_south_carolina_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_south_dakota_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_tennessee_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_texas_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_utah_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_vermont_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_virginia_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_washington_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_west_virginia_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_wisconsin_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_wyoming_data.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_alabama_data_-_v1.xlsx
'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_alaska_data_-_v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_arizona_data_-_v1.xlsx
'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_arkansas_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_california_data_-_v1.x
lsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_colorado_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_connecticut_data_-_v1.
xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_delaware_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_florida_data_-_v1.xlsx
'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_georgia_data_-_v1.xlsx
'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_hawaii_data_-_v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_idaho_data_-_v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_illinois_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_indiana_data_-_v1.xlsx
'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_iowa_data_-_v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_kansas_data_-_v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_kentucky_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_louisiana_data_-_v1.xl
sx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_maine_data_-_v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_maryland_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_massachusetts_data_-_v
1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_michigan_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_minnesota_data_-_v1.xl
sx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_mississippi_data_-_v1.
xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_missouri_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_montana_data_-_v1.xlsx
'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_nebraska_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_nevada_data_-_v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_new_hampshire_data_-_v
1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_new_jersey_data_-_v1.x
lsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_new_mexico_data_-_v1.x
lsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_new_york_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_north_carolina_data_-_
v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_north_dakota_data_-_v1
.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_ohio_data_-_v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_oklahoma_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_oregon_data_-_v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_pennsylvania_data_-_v1
.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_rhode_island_data_-_v1
.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_south_carolina_data_-_
v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_south_dakota_data_-_v1
.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_tennessee_data_-_v1.xl
sx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_texas_data_-_v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_utah_data_-_v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_vermont_data_-_v1.xlsx
'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_virginia_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_washington_data_-_v1.x
lsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_west_virginia_data_-_v
1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_wisconsin_data_-_v1.xl
sx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_wyoming_data_-_v1.xlsx
'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/.DS_Store'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_alabama_data_-_v1.xlsx
'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_alaska_data_-_v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_arizona_data_-_v1.xlsx
'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_arkansas_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_california_data_-_v1.x
lsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_colorado_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_connecticut_data_-_v1.
xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_delaware_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_florida_data_-_v1.xlsx
'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_georgia_data_-_v1.xlsx
'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_hawaii_data_-_v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_idaho_data_-_v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_illinois_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_indiana_data_-_v1.xlsx
'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_iowa_data_-_v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_kansas_data_-_v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_kentucky_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_louisiana_data_-_v1.xl
sx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_maine_data_-_v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_maryland_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_massachusetts_data_-_v
1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_michigan_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_minnesota_data_-_v1.xl
sx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_mississippi_data_-_v1.
xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_missouri_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_montana_data_-_v1.xlsx
'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_nevada_data_-_v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_new_hampshire_data_-_v
1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_new_jersey_data_-_v1.x
lsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_new_mexico_data_-_v1.x
lsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_new_york_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_north_carolina_data_-_
v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_north_dakota_data_-_v1
.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_ohio_data_-_v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_oklahoma_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_oregon_data_-_v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_pennsylvania_data_-_v1
.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_rhode_island_data_-_v1
.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_south_carolina_data_-_
v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_south_dakota_data_-_v1
.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_tennessee_data_-_v1.xl
sx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_texas_data_-_v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_utah_data_-_v1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_vermont_data_-_v1.xlsx
'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_virginia_data_-_v1.xls
x'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_washington_data_-_v1.x
lsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_west_virginia_data_-_v
1.xlsx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_wisconsin_data_-_v1.xl
sx'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_wyoming_data_-_v1.xlsx
'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/.DS_Store'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/CountyHealth-AL.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/CountyHealth-AL_Additional_Measure_Data.
csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/CountyHealth-AL_Select_Measure_Data.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/convert_all.py'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/.DS_Store'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_Unknown_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_alabama_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_arizona_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_arkansas_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_california_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_colorado_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_connecticut_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_delaware_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_florida_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_georgia_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_hawaii_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_idaho_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_illinois_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_indiana_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_iowa_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_kansas_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_kentucky_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_maine_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_maryland_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_massachusetts_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_michigan_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_minnesota_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_mississippi_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_missouri_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_montana_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_nevada_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_ohio_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_oklahoma_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_oregon_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_pennsylvania_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_tennessee_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_texas_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_utah_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_vermont_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_virginia_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_washington_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_wisconsin_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county_health_rankings
_wyoming_curated.csv'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/fix_files.py'
rm 'CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/transform_to_csv.py'
(base) Chads-MacBook-Air-6158:chaddorsey.github.io chaddorsey$
```

---

_****_

Great! Now let's commit these changes to Git:

---

_****_

```bash
git commit -m "Remove large raw data files from Git tracking and add them to .gitignore"
```

```
[feature/attribute-selector-structure 5bdf30d8] Remove large raw data files from Git tracking and add them t
o .gitignore
 753 files changed, 3184 deletions(-)
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/.DS_Store
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_alabama_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_alaska_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_arizona_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_arkansas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_california_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_colorado_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_connecticut_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_delaware_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_florida_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_georgia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_hawaii_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_idaho_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_illinois_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_indiana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_iowa_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_kansas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_kentucky_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_louisiana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_maine_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_maryland_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_massachusetts_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_michigan_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_minnesota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_mississippi_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_missouri_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_montana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_nebraska_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_nevada_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_new_hampshire_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_new_jersey_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_new_mexico_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_new_york_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_north_carolina_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_north_dakota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_ohio_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_oklahoma_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_oregon_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_pennsylvania_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_rhode_island_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_south_carolina_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_south_dakota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_tennessee_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_texas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_utah_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_vermont_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_virginia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_washington_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_west_virginia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_wisconsin_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2011/raw/2011_wyoming_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_alabama_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_alaska_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_arizona_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_arkansas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_california_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_colorado_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_connecticut_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_delaware_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_florida_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_georgia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_hawaii_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_idaho_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_illinois_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_indiana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_iowa_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_kansas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_kentucky_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_louisiana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_maine_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_maryland_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_massachusetts_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_michigan_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_minnesota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_mississippi_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_missouri_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_montana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_nebraska_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_nevada_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_new_hampshire_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_new_jersey_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_new_mexico_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_new_york_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_north_carolina_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_north_dakota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_ohio_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_oklahoma_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_oregon_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_pennsylvania_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_rhode_island_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_south_carolina_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_south_dakota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_tennessee_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_texas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_utah_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_vermont_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_virginia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_washington_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_west_virginia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_wisconsin_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2012/raw/2012_wyoming_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/.DS_Store
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_alabama_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_alaska_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_arizona_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_arkansas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_california_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_colorado_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_connecticut_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_delaware_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_florida_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_georgia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_hawaii_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_idaho_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_illinois_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_indiana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_iowa_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_kansas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_kentucky_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_louisiana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_maine_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_maryland_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_massachusetts_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_michigan_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_minnesota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_mississippi_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_missouri_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_montana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_nebraska_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_nevada_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_new_hampshire_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_new_jersey_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_new_mexico_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_new_york_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_north_carolina_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_north_dakota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_ohio_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_oklahoma_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_oregon_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_pennsylvania_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_rhode_island_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_south_carolina_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_south_dakota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_tennessee_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_texas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_utah_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_vermont_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_virginia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_washington_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_west_virginia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_wisconsin_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2013/raw/2013_wyoming_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_alabama_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_alaska_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_arizona_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_arkansas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_california_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_colorado_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_connecticut_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_delaware_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_florida_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_georgia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_hawaii_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_idaho_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_illinois_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_indiana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_iowa_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_kansas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_kentucky_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_louisiana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_maine_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_maryland_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_massachusetts_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_michigan_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_minnesota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_mississippi_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_missouri_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_montana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_nebraska_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_nevada_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_new_hampshire_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_new_jersey_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_new_mexico_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_new_york_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_north_carolina_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_north_dakota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_ohio_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_oklahoma_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_oregon_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_pennsylvania_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_rhode_island_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_south_carolina_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_south_dakota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_tennessee_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_texas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_utah_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_vermont_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_virginia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_washington_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_west_virginia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_wisconsin_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2014/raw/2014_wyoming_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/.DS_Store
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_alabama_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_alaska_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_arizona_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_arkansas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_california_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_colorado_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_connecticut_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_delaware_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_florida_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_georgia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_hawaii_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_idaho_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_illinois_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_indiana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_iowa_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_kansas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_kentucky_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_louisiana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_maine_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_maryland_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_massachusetts_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_michigan_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_minnesota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_mississippi_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_missouri_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_montana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_nebraska_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_nevada_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_new_hampshire_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_new_jersey_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_new_mexico_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_new_york_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_north_carolina_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_north_dakota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_ohio_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_oklahoma_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_oregon_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_pennsylvania_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_rhode_island_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_south_carolina_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_south_dakota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_tennessee_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_texas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_utah_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_vermont_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_virginia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_washington_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_west_virginia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_wisconsin_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2015/raw/2015_wyoming_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_alabama_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_alaska_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_arizona_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_arkansas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_california_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_colorado_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_connecticut_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_delaware_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_florida_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_georgia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_hawaii_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_idaho_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_illinois_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_indiana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_iowa_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_kansas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_kentucky_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_louisiana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_maine_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_maryland_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_massachusetts_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_michigan_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_minnesota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_mississippi_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_missouri_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_montana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_nebraska_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_nevada_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_new_hampshire_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_new_jersey_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_new_mexico_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_new_york_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_north_carolina_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_north_dakota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_ohio_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_oklahoma_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_oregon_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_pennsylvania_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_rhode_island_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_south_carolina_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_south_dakota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_tennessee_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_texas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_utah_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_vermont_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_virginia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_washington_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_west_virginia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_wisconsin_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2016/raw/2016_wyoming_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/.DS_Store
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_alabama_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_alaska_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_arizona_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_arkansas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_california_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_colorado_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_connecticut_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_delaware_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_florida_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_georgia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_hawaii_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_idaho_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_illinois_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_indiana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_iowa_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_kansas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_kentucky_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_louisiana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_maine_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_maryland_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_massachusetts_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_michigan_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_minnesota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_mississippi_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_missouri_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_montana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_nebraska_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_nevada_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_new_hampshire_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_new_jersey_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_new_mexico_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_new_york_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_north_carolina_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_north_dakota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_ohio_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_oklahoma_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_oregon_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_pennsylvania_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_rhode_island_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_south_carolina_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_south_dakota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_tennessee_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_texas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_utah_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_vermont_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_virginia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_washington_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_west_virginia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_wisconsin_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2017/raw/2017_wyoming_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_alabama_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_alaska_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_arizona_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_arkansas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_california_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_colorado_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_connecticut_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_delaware_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_florida_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_georgia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_hawaii_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_idaho_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_illinois_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_indiana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_iowa_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_kansas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_kentucky_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_louisiana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_maine_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_maryland_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_massachusetts_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_michigan_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_minnesota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_mississippi_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_missouri_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_montana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_nebraska_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_nevada_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_new_hampshire_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_new_jersey_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_new_mexico_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_new_york_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_north_carolina_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_north_dakota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_ohio_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_oklahoma_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_oregon_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_pennsylvania_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_rhode_island_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_south_carolina_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_south_dakota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_tennessee_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_texas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_utah_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_vermont_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_virginia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_washington_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_west_virginia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_wisconsin_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2018/raw/2018_wyoming_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/.DS_Store
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_alabama_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_alaska_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_arizona_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_arkansas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_california_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_colorado_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_connecticut_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_delaware_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_florida_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_georgia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_hawaii_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_idaho_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_illinois_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_indiana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_iowa_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_kansas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_kentucky_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_louisiana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_maine_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_maryland_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_massachusetts_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_michigan_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_minnesota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_mississippi_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_missouri_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_montana_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_nebraska_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_nevada_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_new_hampshire_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_new_jersey_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_new_mexico_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_new_york_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_north_carolina_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_north_dakota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_ohio_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_oklahoma_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_oregon_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_pennsylvania_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_rhode_island_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_south_carolina_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_south_dakota_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_tennessee_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_texas_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_utah_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_vermont_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_virginia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_washington_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_west_virginia_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_wisconsin_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2019/raw/2019_wyoming_data.xls
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_alabama_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_alaska_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_arizona_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_arkansas_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_california_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_colorado_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_connecticut_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_delaware_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_florida_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_georgia_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_hawaii_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_idaho_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_illinois_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_indiana_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_iowa_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_kansas_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_kentucky_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_louisiana_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_maine_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_maryland_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_massachusetts_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_michigan_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_minnesota_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_mississippi_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_missouri_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_montana_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_nebraska_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_nevada_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_new_hampshire_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_new_jersey_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_new_mexico_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_new_york_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_north_carolina_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_north_dakota_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_ohio_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_oklahoma_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_oregon_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_pennsylvania_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_rhode_island_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_south_carolina_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_south_dakota_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_tennessee_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_texas_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_utah_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_vermont_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_virginia_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_washington_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_west_virginia_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_wisconsin_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2020/raw/2020_wyoming_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/.DS_Store
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_alabama_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_alaska_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_arizona_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_arkansas_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_california_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_colorado_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_connecticut_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_delaware_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_florida_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_georgia_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_hawaii_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_idaho_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_illinois_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_indiana_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_iowa_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_kansas_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_kentucky_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_louisiana_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_maine_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_maryland_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_massachusetts_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_michigan_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_minnesota_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_mississippi_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_missouri_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_montana_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_nebraska_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_nevada_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_new_hampshire_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_new_jersey_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_new_mexico_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_new_york_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_north_carolina_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_north_dakota_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_ohio_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_oklahoma_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_oregon_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_pennsylvania_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_rhode_island_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_south_carolina_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_south_dakota_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_tennessee_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_texas_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_utah_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_vermont_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_virginia_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_washington_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_west_virginia_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_wisconsin_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2021/raw/2021_wyoming_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/.DS_Store
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_alabama_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_alaska_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_arizona_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_arkansas_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_california_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_colorado_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_connecticut_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_delaware_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_florida_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_georgia_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_hawaii_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_idaho_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_illinois_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_indiana_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_iowa_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_kansas_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_kentucky_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_louisiana_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_maine_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_maryland_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_massachusetts_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_michigan_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_minnesota_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_mississippi_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_missouri_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_montana_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_nebraska_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_nevada_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_new_hampshire_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_new_jersey_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_new_mexico_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_new_york_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_north_carolina_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_north_dakota_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_ohio_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_oklahoma_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_oregon_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_pennsylvania_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_rhode_island_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_south_carolina_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_south_dakota_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_tennessee_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_texas_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_utah_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_vermont_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_virginia_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_washington_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_west_virginia_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_wisconsin_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2022/raw/2022_wyoming_data.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_alabam
a_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_alaska
_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_arizon
a_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_arkans
as_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_califo
rnia_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_colora
do_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_connec
ticut_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_delawa
re_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_florid
a_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_georgi
a_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_hawaii
_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_idaho_
data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_illino
is_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_indian
a_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_iowa_d
ata_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_kansas
_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_kentuc
ky_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_louisi
ana_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_maine_
data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_maryla
nd_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_massac
husetts_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_michig
an_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_minnes
ota_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_missis
sippi_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_missou
ri_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_montan
a_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_nebras
ka_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_nevada
_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_new_ha
mpshire_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_new_je
rsey_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_new_me
xico_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_new_yo
rk_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_north_
carolina_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_north_
dakota_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_ohio_d
ata_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_oklaho
ma_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_oregon
_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_pennsy
lvania_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_rhode_
island_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_south_
carolina_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_south_
dakota_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_tennes
see_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_texas_
data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_utah_d
ata_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_vermon
t_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_virgin
ia_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_washin
gton_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_west_v
irginia_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_wiscon
sin_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2024/raw/2024_county_health_rankings_wyomin
g_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/.DS_Store
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_alabam
a_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_alaska
_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_arizon
a_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_arkans
as_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_califo
rnia_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_colora
do_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_connec
ticut_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_delawa
re_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_florid
a_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_georgi
a_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_hawaii
_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_idaho_
data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_illino
is_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_indian
a_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_iowa_d
ata_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_kansas
_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_kentuc
ky_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_louisi
ana_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_maine_
data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_maryla
nd_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_massac
husetts_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_michig
an_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_minnes
ota_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_missis
sippi_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_missou
ri_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_montan
a_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_nevada
_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_new_ha
mpshire_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_new_je
rsey_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_new_me
xico_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_new_yo
rk_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_north_
carolina_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_north_
dakota_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_ohio_d
ata_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_oklaho
ma_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_oregon
_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_pennsy
lvania_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_rhode_
island_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_south_
carolina_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_south_
dakota_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_tennes
see_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_texas_
data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_utah_d
ata_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_vermon
t_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_virgin
ia_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_washin
gton_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_west_v
irginia_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_wiscon
sin_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_county_health_rankings_wyomin
g_data_-_v1.xlsx
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/.DS_Store
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/CountyHealth-AL.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/CountyHealth-AL_Addition
al_Measure_Data.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/CountyHealth-AL_Select_M
easure_Data.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/convert_all.py
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/.DS_Store
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_Unknown_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_alabama_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_arizona_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_arkansas_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_california_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_colorado_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_connecticut_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_delaware_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_florida_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_georgia_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_hawaii_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_idaho_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_illinois_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_indiana_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_iowa_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_kansas_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_kentucky_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_maine_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_maryland_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_massachusetts_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_michigan_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_minnesota_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_mississippi_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_missouri_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_montana_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_nevada_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_ohio_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_oklahoma_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_oregon_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_pennsylvania_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_tennessee_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_texas_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_utah_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_vermont_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_virginia_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_washington_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_wisconsin_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/2025_county
_health_rankings_wyoming_curated.csv
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/curated_data/fix_files.p
y
 delete mode 100644 CODAP-plugins/CountyHealthSelect/assets/data/2025/raw/2025_data/transform_to_csv.py

```

---

_****_

Now let's push your changes to GitHub:

---

_****_

```bash
git push origin feature/attribute-selector-structure
```

```
Enumerating objects: 39, done.
Counting objects: 100% (39/39), done.
Delta compression using up to 10 threads
Compressing objects: 100% (20/20), done.
Writing objects: 100% (20/20), 1.55 KiB | 1.55 MiB/s, done.
Total 20 (delta 17), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (17/17), completed with 17 local objects.
To https://github.com/chaddorsey/chaddorsey.github.io
   9388178f..5bdf30d8  feature/attribute-selector-structure -> feature/attribute-selector-structure

```

---

_****_

Perfect! You've successfully:

1. **Removed the large raw data files** from your Git tracking
2. **Added patterns to your `.gitignore`** to exclude these files in the future
3. **Committed these changes** to your feature branch
4. **Pushed your changes** to GitHub

This should significantly reduce the size of your repository, making it much easier to deploy to GitHub Pages.

### Next Steps:

1. **Workflow Permissions:** Make sure to update the GitHub repository workflow permissions to allow the GitHub Actions workflow to push to your repository:
   - Go to your repository → Settings → Actions → Workflow permissions
   - Select "Read and write permissions"
   - Click "Save"

2. **Try the Deployment:**
   - Wait for the GitHub Actions workflow to run (it should run automatically since you just pushed to a feature branch)
   - Check the Actions tab on GitHub for the workflow status
   - If it's successful, your feature branch should be accessible at:  
     `https://chaddorsey.github.io/attribute-selector-structure/`

3. **Verify Directory Structure:**
   - Ensure the CountyHealthSelect plugin is accessible at:  
     `https://chaddorsey.github.io/attribute-selector-structure/CODAP-plugins/CountyHealthSelect/`

Your main site at `https://chaddorsey.github.io/CODAP-plugins/CountyHealthSelect/` should remain unchanged.

Would you like me to help with any of these next steps?

---

_**User**_

I get errors that look like: der/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/console-browserify/.travis.yml
filename overflows max-path len by 4: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/console-browserify/README.md
filename overflows max-path len by 8: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/console-browserify/test/index.js
filename overflows max-path len by 6: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/console-browserify/test/static
filename overflows max-path len by 8: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/console-control-strings/index.js
filename overflows max-path len by 7: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/console-control-strings/LICENSE
filename overflows max-path len by 12: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/console-control-strings/package.json
filename overflows max-path len by 10: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/console-control-strings/README.md~
filename overflows max-path len by 9: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/console-control-strings/README.md
filename overflows max-path len by 4: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/constants-browserify/test.js
filename overflows max-path len by 9: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/constants-browserify/package.json
filename overflows max-path len by 11: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/constants-browserify/constants.json
filename overflows max-path len by 5: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/constants-browserify/build.sh
filename overflows max-path len by 6: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/constants-browserify/README.md
filename overflows max-path len by 3: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/convert-source-map/index.js
filename overflows max-path len by 2: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/convert-source-map/LICENSE
filename overflows max-path len by 7: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/convert-source-map/package.json
filename overflows max-path len by 4: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/convert-source-map/README.md
filename overflows max-path len by 2: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/build/Gruntfile.ls
filename overflows max-path len by 2: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/client/shim.min.js
filename overflows max-path len by 9: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/client/library.min.js.map
filename overflows max-path len by 2: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/client/core.min.js
filename overflows max-path len by 6: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/client/shim.min.js.map
filename overflows max-path len by 6: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/client/core.min.js.map
filename overflows max-path len by 1: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/client/library.js
filename overflows max-path len by 5: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/client/library.min.js
filename overflows max-path len by 2: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/es6/parse-float.js
filename overflows max-path len by 1: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/es7/observable.js
filename overflows max-path len by 2: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/fn/dom-collections
filename overflows max-path len by 5: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/fn/clear-immediate.js
filename overflows max-path len by 3: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/fn/set-immediate.js
filename overflows max-path len by 1: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/fn/parse-float.js
filename overflows max-path len by 2: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/fn/set-interval.js
filename overflows max-path len by 1: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/fn/set-timeout.js
filename overflows max-path len by 2: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/fn/get-iterator.js
filename overflows max-path len by 1: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/fn/is-iterable.js
filename overflows max-path len by 9: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/fn/get-iterator-method.js
filename overflows max-path len by 7: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/fn/array/copy-within.js
filename overflows max-path len by 4: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/fn/array/for-each.js
filename overflows max-path len by 1: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/fn/array/index.js
filename overflows max-path len by 1: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/fn/array/shift.js
filename overflows max-path len by 2: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/node_modules/core-js/fn/array/values.js
filename overflows max-path len by 1: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attri

---

_**Assistant**_

You're encountering "path too long" errors during deployment. This happens when the nested temporary folders created by the GitHub Pages deploy action exceed the filesystem's maximum path length limit (typically 260 characters on Windows).

To fix this, you need to:

1. **Add `node_modules/` to your `.gitignore`**:
   The errors show multiple node modules with extremely long paths. Since these are dependencies that can be reinstalled, they don't need to be in version control.

---

_****_

```diff
  ..bfg-report
  bfg.jar
+ 
+ # Node modules
+ **/node_modules/
+ node_modules/
```

---

_****_

2. **Remove the node_modules directories from Git tracking**:

---

_****_

```bash
git rm -r --cached "**/node_modules" 2> /dev/null || echo "No matching files found"
```

```
No matching files found

```

---

_****_

Let's check if specific node_modules directories might be tracked:

---

_****_

```bash
git ls-files | grep node_modules | head -n 10
```

```
CODAP-plugins/Mini-tutorials/node_modules/.DS_Store
CODAP-plugins/Mini-tutorials/node_modules/.bin/JSONStream
CODAP-plugins/Mini-tutorials/node_modules/.bin/acorn
CODAP-plugins/Mini-tutorials/node_modules/.bin/arborist
CODAP-plugins/Mini-tutorials/node_modules/.bin/babylon
CODAP-plugins/Mini-tutorials/node_modules/.bin/browser-pack
CODAP-plugins/Mini-tutorials/node_modules/.bin/browserify
CODAP-plugins/Mini-tutorials/node_modules/.bin/color-support
CODAP-plugins/Mini-tutorials/node_modules/.bin/conventional-changelog-writer
CODAP-plugins/Mini-tutorials/node_modules/.bin/conventional-commits-parser

```

---

_****_

I see that there are node_modules files being tracked, particularly within the CODAP-plugins directory. Let's remove them from Git tracking:

---

_****_

```bash
git rm -r --cached "CODAP-plugins/Mini-tutorials/node_modules"
```

```
(base) Chads-MacBook-Air-6158:chaddorsey.github.io chaddorsey$ 
stream-browser.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/
stream.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/node_modules/readable-stream/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/node_modules/readable-stream/passthrough.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/node_modules/readable-stream/readable-browser.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/node_modules/readable-stream/readable.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/node_modules/readable-stream/transform.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/node_modules/readable-stream/writable-browser.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/node_modules/readable-stream/writable.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/node_modules/safe-buffer/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/node_modules/safe-buffer/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/node_modules/safe-buffer/index.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/node_modules/safe-buffer/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/node_modules/safe-buffer/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/node_modules/string_decoder/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/node_modules/string_decoder/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/node_modules/string_decoder/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/node_modules/string_decoder/lib/string_decoder.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/node_modules/string_decoder/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/test/browser/abort.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/test/browser/auth.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/test/browser/binary-streaming.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/test/browser/binary.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/test/browser/body-empty.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/test/browser/cookie.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/test/browser/disable-fetch.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/test/browser/error.js.disabled'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/test/browser/headers.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/test/browser/lib/webworker-worker.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/test/browser/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/test/browser/post-binary.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/test/browser/post-text.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/test/browser/text-streaming.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/test/browser/text.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/test/browser/timeout.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/test/browser/webworker.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/test/node/http-browserify.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/test/server/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/test/server/static/basic.txt'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/test/server/static/browserify.png'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-http/test/server/static/test-polyfill.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/example/header.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/CONTRIBUTING.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/GOVERNANCE.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/doc/wg-meetings/20
15-01-30.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/duplex-browser.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/duplex.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/lib/_stream_duplex
.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/lib/_stream_passth
rough.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/lib/_stream_readab
le.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/lib/_stream_transf
orm.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/lib/_stream_writab
le.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/lib/internal/strea
ms/BufferList.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/lib/internal/strea
ms/destroy.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/lib/internal/strea
ms/stream-browser.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/lib/internal/strea
ms/stream.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/passthrough.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/readable-browser.j
s'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/readable.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/transform.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/writable-browser.j
s'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/readable-stream/writable.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/safe-buffer/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/safe-buffer/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/safe-buffer/index.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/safe-buffer/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/safe-buffer/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/string_decoder/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/string_decoder/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/string_decoder/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/string_decoder/lib/string_decoder.
js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules/string_decoder/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/combiner.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/combiner_stream.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/empty.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/empty_no_data.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/get.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/multipush.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/multiunshift.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/nested.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/nested_middle.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/pop.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/push.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/shift.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/splice.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/unshift.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/string-width/index.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/string-width/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/string-width/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/string-width/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/string-width/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/string_decoder/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/string_decoder/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/string_decoder/lib/string_decoder.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/string_decoder/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strip-ansi/index.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strip-ansi/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strip-ansi/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strip-ansi/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strip-ansi/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strip-bom/index.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strip-bom/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strip-bom/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strip-bom/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strip-bom/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strip-final-newline/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strip-final-newline/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strip-final-newline/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strip-final-newline/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strip-indent/index.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strip-indent/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strip-indent/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strip-indent/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strip-indent/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/CHANGES.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/CONTRIBUTING.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/bin/sl-log-transformer.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/lib/cli.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/lib/logger.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/subarg/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/node_modules/subarg/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/subarg/example/show.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/subarg/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/subarg/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/subarg/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/node_modules/subarg/test/arg.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/subarg/test/recursive.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/supports-color/browser.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/supports-color/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/supports-color/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/supports-color/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/supports-color/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/.eslintrc'
rm 'CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/.github/FUNDING.yml'
rm 'CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/.nycrc'
rm 'CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/browser.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/test/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/example/check.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/example/src.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/check.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/esm.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/html.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/ok.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/run.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/run2.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/shebang.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/check.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/esm.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/ok.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/run.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/run2.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/shebang.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/spread.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/yield.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/spread.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/yield.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar-stream/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar-stream/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar-stream/extract.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar-stream/headers.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar-stream/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar-stream/pack.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar-stream/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar-stream/sandbox.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/create.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/extract.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/get-write-flag.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/header.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/high-level-opt.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/large-numbers.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/list.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/mkdir.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/mode-fix.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/normalize-unicode.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/normalize-windows-path.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/pack.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/parse.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/path-reservations.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/pax.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/read-entry.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/replace.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/strip-absolute-path.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/strip-trailing-slashes.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/types.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/unpack.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/update.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/warn-mixin.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/winchars.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/lib/write-entry.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/node_modules/minipass/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/node_modules/minipass/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/node_modules/minipass/index.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/node_modules/minipass/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/node_modules/minipass/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tar/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/temp-dir/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/temp-dir/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/temp-dir/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/temp-dir/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/text-extensions/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/text-extensions/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/text-extensions/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/text-extensions/text-extensions.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/through/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/node_modules/through/LICENSE.APACHE2'
rm 'CODAP-plugins/Mini-tutorials/node_modules/through/LICENSE.MIT'
rm 'CODAP-plugins/Mini-tutorials/node_modules/through/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/through/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/through/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/node_modules/through/test/async.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/through/test/auto-destroy.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/through/test/buffering.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/through/test/end.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/through/test/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/through2/LICENSE.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/through2/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/through2/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/through2/through2.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/.npmignore'
rm 'CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/LICENSE.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/example/enroll/build.sh'
rm 'CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/example/enroll/index.html'
rm 'CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/example/enroll/js/browserify.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/example/enroll/js/main.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/example/enroll/server.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/main.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tmp/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tmp/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tmp/lib/tmp.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tmp/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/.npmignore'
rm 'CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/.zuul.yml'
rm 'CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/test.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/to-fast-properties/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/to-fast-properties/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/to-fast-properties/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/to-fast-properties/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/to-regex-range/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/to-regex-range/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/to-regex-range/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/to-regex-range/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tr46/.npmignore'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tr46/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tr46/lib/.gitkeep'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tr46/lib/mappingTable.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tr46/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/treeverse/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/treeverse/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/treeverse/lib/breadth.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/treeverse/lib/depth-descent.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/treeverse/lib/depth.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/treeverse/lib/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/treeverse/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/trim-newlines/index.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/trim-newlines/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/trim-newlines/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/trim-newlines/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/trim-newlines/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/trim-right/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/trim-right/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/trim-right/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/trim-right/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/config-loader.test.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/config-loader.test.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/config-loader.test.js.map'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/data/match-path-data.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/data/match-path-data.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/data/match-path-data.js.map'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/filesystem.test.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/filesystem.test.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/filesystem.test.js.map'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/mapping-entry.test.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/mapping-entry.test.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/mapping-entry.test.js.map'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/match-path-async.test.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/match-path-async.test.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/match-path-async.test.js.map'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/match-path-sync.test.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/match-path-sync.test.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/match-path-sync.test.js.map'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/try-path.test.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/try-path.test.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/try-path.test.js.map'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/tsconfig-loader.test.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/tsconfig-loader.test.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/tsconfig-loader.test.js.map'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/config-loader.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/config-loader.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/config-loader.js.map'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/filesystem.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/filesystem.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/filesystem.js.map'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/index.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/index.js.map'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/mapping-entry.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/mapping-entry.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/mapping-entry.js.map'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/match-path-async.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/match-path-async.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/match-path-async.js.map'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/match-path-sync.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/match-path-sync.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/match-path-sync.js.map'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/register.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/register.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/register.js.map'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/try-path.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/try-path.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/try-path.js.map'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/tsconfig-loader.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/tsconfig-loader.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/tsconfig-loader.js.map'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/node_modules/strip-bom/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/node_modules/strip-bom/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/node_modules/strip-bom/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/node_modules/strip-bom/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/register.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/config-loader.test.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/data/match-path-data.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/filesystem.test.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/mapping-entry.test.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/match-path-async.test.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/match-path-sync.test.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/try-path.test.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/tsconfig-loader.test.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/tsconfig-named.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/config-loader.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/filesystem.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/index.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/mapping-entry.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/match-path-async.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/match-path-sync.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/register.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/try-path.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/tsconfig-loader.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tslib/CopyrightNotice.txt'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tslib/LICENSE.txt'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tslib/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tslib/SECURITY.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tslib/modules/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tslib/modules/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tslib/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tslib/tslib.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tslib/tslib.es6.html'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tslib/tslib.es6.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tslib/tslib.html'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tslib/tslib.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tty-browserify/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tty-browserify/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tty-browserify/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/tty-browserify/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/base.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/index.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/async-return-type.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/asyncify.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/basic.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/conditional-except.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/conditional-keys.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/conditional-pick.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/entries.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/entry.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/except.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/fixed-length-array.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/iterable-element.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/literal-union.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/merge-exclusive.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/merge.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/mutable.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/opaque.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/package-json.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/partial-deep.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/promisable.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/promise-value.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/readonly-deep.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/require-at-least-one.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/require-exactly-one.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/set-optional.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/set-required.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/set-return-type.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/simplify.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/stringified.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/tsconfig-json.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/typed-array.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/union-to-intersection.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/utilities.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/value-of.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/camel-case.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/delimiter-case.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/get.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/index.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/kebab-case.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/pascal-case.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/snake-case.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/utilities.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typedarray-to-buffer/.airtap.yml'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typedarray-to-buffer/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typedarray-to-buffer/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typedarray-to-buffer/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typedarray-to-buffer/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typedarray-to-buffer/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typedarray-to-buffer/test/basic.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typedarray/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typedarray/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typedarray/example/tarray.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typedarray/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typedarray/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typedarray/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typedarray/test/server/undef_globals.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typedarray/test/tarray.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/LICENSE.txt'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/SECURITY.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/ThirdPartyNoticeText.txt'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/bin/tsc'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/bin/tsserver'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/cancellationToken.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/cs/diagnosticMessages.generated.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/de/diagnosticMessages.generated.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/dynamicImportCompat.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/es/diagnosticMessages.generated.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/fr/diagnosticMessages.generated.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/it/diagnosticMessages.generated.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/ja/diagnosticMessages.generated.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/ko/diagnosticMessages.generated.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.dom.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.dom.iterable.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.collection.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.core.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.generator.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.iterable.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.promise.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.proxy.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.reflect.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.symbol.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2016.array.include.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2016.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2016.full.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2017.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2017.full.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2017.intl.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2017.object.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2017.sharedmemory.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2017.string.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2017.typedarrays.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2018.asyncgenerator.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2018.asynciterable.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2018.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2018.full.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2018.intl.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2018.promise.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2018.regexp.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2019.array.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2019.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2019.full.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2019.intl.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2019.object.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2019.string.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2019.symbol.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.bigint.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.date.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.full.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.intl.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.number.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.promise.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.sharedmemory.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.string.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.symbol.wellknown.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2021.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2021.full.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2021.intl.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2021.promise.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2021.string.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2021.weakref.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.array.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.error.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.full.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.intl.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.object.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.sharedmemory.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.string.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es5.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es6.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.esnext.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.esnext.full.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.esnext.intl.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.esnext.promise.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.esnext.string.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.esnext.weakref.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.scripthost.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.webworker.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.webworker.importscripts.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.webworker.iterable.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/pl/diagnosticMessages.generated.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/protocol.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/pt-br/diagnosticMessages.generated.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/ru/diagnosticMessages.generated.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/tr/diagnosticMessages.generated.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/tsc.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/tsserver.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/tsserverlibrary.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/tsserverlibrary.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/typesMap.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/typescript.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/typescript.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/typescriptServices.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/typescriptServices.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/typingsInstaller.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/watchGuard.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/zh-cn/diagnosticMessages.generated.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/zh-tw/diagnosticMessages.generated.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/typescript/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uglify-js/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uglify-js/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uglify-js/bin/uglifyjs'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/ast.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/compress.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/minify.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/mozilla-ast.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/output.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/parse.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/propmangle.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/scope.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/sourcemap.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/transform.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/utils.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uglify-js/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uglify-js/tools/domprops.html'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uglify-js/tools/domprops.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uglify-js/tools/exports.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uglify-js/tools/node.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uglify-js/tools/tty.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/umd/HISTORY.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/umd/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/umd/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/umd/bin/cli.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/umd/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/umd/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/LICENSE.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/bench/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/bin.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/test/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/unique-filename/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/unique-filename/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/unique-filename/lib/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/unique-filename/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/unique-slug/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/unique-slug/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/unique-slug/lib/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/unique-slug/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/LICENSE.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/dist-node/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/dist-node/index.js.map'
rm 'CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/dist-src/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/dist-types/index.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/dist-web/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/dist-web/index.js.map'
rm 'CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/upath/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/upath/build/code/upath.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/upath/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/upath/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/upath/upath.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/url/.npmignore'
rm 'CODAP-plugins/Mini-tutorials/node_modules/url/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/node_modules/url/.zuul.yml'
rm 'CODAP-plugins/Mini-tutorials/node_modules/url/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/url/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/url/node_modules/punycode/LICENSE-MIT.txt'
rm 'CODAP-plugins/Mini-tutorials/node_modules/url/node_modules/punycode/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/url/node_modules/punycode/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/url/node_modules/punycode/punycode.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/url/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/url/test.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/url/url.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/url/util.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/util-deprecate/History.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/util-deprecate/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/util-deprecate/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/util-deprecate/browser.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/util-deprecate/node.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/util-deprecate/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/util/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/util/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/util/node_modules/inherits/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/util/node_modules/inherits/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/util/node_modules/inherits/inherits.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/util/node_modules/inherits/inherits_browser.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/util/node_modules/inherits/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/util/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/util/support/isBuffer.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/util/support/isBufferBrowser.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/util/util.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/CONTRIBUTING.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/LICENSE.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/bin/uuid'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/md5.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/nil.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/parse.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/regex.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/rng.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/sha1.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/stringify.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/v1.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/v3.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/v35.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/v4.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/v5.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/validate.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/version.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/md5.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/nil.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/parse.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/regex.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/rng.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/sha1.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/stringify.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/v1.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/v3.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/v35.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/v4.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/v5.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/validate.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/version.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/md5-browser.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/md5.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/nil.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/parse.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/regex.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/rng-browser.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/rng.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/sha1-browser.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/sha1.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/stringify.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuid.min.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidNIL.min.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidParse.min.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidStringify.min.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidValidate.min.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidVersion.min.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidv1.min.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidv3.min.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidv4.min.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidv5.min.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/uuid-bin.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/v1.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/v3.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/v35.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/v4.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/v5.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/validate.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/version.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/uuid/wrapper.mjs'
rm 'CODAP-plugins/Mini-tutorials/node_modules/v8-compile-cache/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/v8-compile-cache/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/v8-compile-cache/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/v8-compile-cache/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/v8-compile-cache/v8-compile-cache.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-license/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-license/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-license/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-license/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-name/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-name/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-name/lib/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-name/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/example/run/bundle.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/example/run/entry.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/example/run/index.html'
rm 'CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/example/run/server.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/test/vm.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/walk-up-path/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/walk-up-path/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/walk-up-path/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/walk-up-path/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wcwidth/.npmignore'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wcwidth/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wcwidth/Readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wcwidth/combining.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wcwidth/docs/index.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wcwidth/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wcwidth/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wcwidth/test/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/webidl-conversions/LICENSE.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/webidl-conversions/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/webidl-conversions/lib/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/webidl-conversions/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/LICENSE.txt'
rm 'CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/lib/URL-impl.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/lib/URL.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/lib/public-api.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/lib/url-state-machine.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/lib/utils.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/which/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/which/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/which/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/which/bin/node-which'
rm 'CODAP-plugins/Mini-tutorials/node_modules/which/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/which/which.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wide-align/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wide-align/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wide-align/align.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wide-align/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wordwrap/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wordwrap/README.markdown'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wordwrap/example/center.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wordwrap/example/meat.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wordwrap/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wordwrap/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wordwrap/test/break.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wordwrap/test/idleness.txt'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wordwrap/test/wrap.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wrap-ansi/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wrap-ansi/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wrap-ansi/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wrap-ansi/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wrappy/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wrappy/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wrappy/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/wrappy/wrappy.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-file-atomic/LICENSE.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-file-atomic/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-file-atomic/lib/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-file-atomic/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-json-file/index.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-json-file/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-json-file/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/is-plain-obj/index.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/is-plain-obj/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/is-plain-obj/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/is-plain-obj/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/is-plain-obj/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/write-file-atomic/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/write-file-atomic/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/write-file-atomic/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/write-file-atomic/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/write-file-atomic/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-json-file/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-json-file/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/index.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/.bin/semver'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/detect-indent/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/detect-indent/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/detect-indent/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/detect-indent/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/make-dir/index.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/make-dir/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/make-dir/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/make-dir/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/make-dir/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/pify/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/pify/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/pify/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/pify/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/semver/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/semver/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/semver/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/semver/bin/semver'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/semver/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/semver/range.bnf'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/semver/semver.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/sort-keys/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/sort-keys/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/sort-keys/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/sort-keys/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/index.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/basic.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/literal-union.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/merge-exclusive.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/merge.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/mutable.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/omit.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/package-json.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/require-at-least-one.d
.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-file-atomic/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-file-atomic/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-file-atomic/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-file-atomic/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-file-atomic/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-json-file/index.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-json-file/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-json-file/license'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-json-file/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-json-file/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/write-pkg/readme.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/xtend/.jshintrc'
rm 'CODAP-plugins/Mini-tutorials/node_modules/xtend/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/xtend/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/xtend/immutable.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/xtend/mutable.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/xtend/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/xtend/test.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/y18n/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/y18n/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/y18n/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/y18n/build/index.cjs'
rm 'CODAP-plugins/Mini-tutorials/node_modules/y18n/build/lib/cjs.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/y18n/build/lib/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/y18n/build/lib/platform-shims/node.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/y18n/index.mjs'
rm 'CODAP-plugins/Mini-tutorials/node_modules/y18n/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yallist/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yallist/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yallist/iterator.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yallist/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yallist/yallist.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/PlainValue-b8036b75.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/Schema-e94716c8.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/legacy-exports.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/parse-cst.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/resolveSeq-492ab440.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/types.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/util.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/warnings-df54cb69.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/map.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/pair.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/parse-cst.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/scalar.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/schema.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/seq.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/types.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/types/binary.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/types/omap.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/types/pairs.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/types/set.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/types/timestamp.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/util.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/Document-9b4560a1.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/PlainValue-ec8e588e.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/Schema-88e323a7.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/legacy-exports.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/parse-cst.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/resolveSeq-d03cb037.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/test-events.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/types.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/util.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/warnings-1000a372.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/index.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/map.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/pair.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/parse-cst.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/parse-cst.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/scalar.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/schema.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/seq.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/types.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/types.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/types.mjs'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/types/binary.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/types/omap.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/types/pairs.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/types/set.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/types/timestamp.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/util.d.ts'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/util.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yaml/util.mjs'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/LICENSE.txt'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/browser.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/build/index.cjs'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/build/lib/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/build/lib/string-utils.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/build/lib/tokenize-arg-string.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/build/lib/yargs-parser-types.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/build/lib/yargs-parser.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/README.md'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/browser.mjs'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/build/index.cjs'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/argsert.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/command.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/completion-templates.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/completion.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/middleware.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/parse-command.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/typings/common-types.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/typings/yargs-parser-types.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/usage.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/utils/apply-extends.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/utils/is-promise.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/utils/levenshtein.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/utils/obj-filter.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/utils/process-argv.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/utils/set-blocking.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/utils/which-module.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/validation.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/yargs-factory.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/yerror.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/helpers/helpers.mjs'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/helpers/index.js'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/helpers/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/index.cjs'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/index.mjs'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/lib/platform-shims/browser.mjs'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/lib/platform-shims/esm.mjs'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/be.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/de.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/en.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/es.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/fi.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/fr.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/hi.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/hu.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/id.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/it.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/ja.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/ko.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/nb.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/nl.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/nn.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/pirate.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/pl.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/pt.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/pt_BR.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/ru.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/th.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/tr.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/zh_CN.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/zh_TW.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/package.json'
rm 'CODAP-plugins/Mini-tutorials/node_modules/yargs/yargs'

```

---

_****_

Now let's make sure node_modules is ignored in your Git configuration. Let's check if it's already in your .gitignore file:

---

_****_

```bash
cat .gitignore
```

```
# Ignore large raw data files
assets/data/*/raw/
CODAP-plugins/CountyHealthSelect/assets/data/*/raw/
**/assets/data/*/raw/

# Specific large files
CODAP-plugins/CountyHealthSelect/assets/data/CountyHealth-All-Data.zip
.git.bak
..bfg-report
bfg.jar

# Node modules
**/node_modules/

```

---

_****_

Good news! Your .gitignore already has `**/node_modules/` which ignores node_modules directories at any level in your project. Now let's commit this change:

---

_****_

```bash
git status
```

```
(base) Chads-MacBook-Air-6158:chaddorsey.github.io chaddorsey$ 
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/push.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/shift.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/splice.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/unshift.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/string-width/index.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/string-width/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/string-width/license
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/string-width/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/string-width/readme.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/string_decoder/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/string_decoder/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/string_decoder/lib/string_decoder.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/string_decoder/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strip-ansi/index.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strip-ansi/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strip-ansi/license
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strip-ansi/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strip-ansi/readme.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strip-bom/index.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strip-bom/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strip-bom/license
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strip-bom/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strip-bom/readme.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strip-final-newline/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strip-final-newline/license
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strip-final-newline/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strip-final-newline/readme.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strip-indent/index.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strip-indent/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strip-indent/license
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strip-indent/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strip-indent/readme.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/CHANGES.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/CONTRIBUTING.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/bin/sl-log-transformer.
js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/lib/cli.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/lib/logger.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/subarg/.travis.yml
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/subarg/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/subarg/example/show.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/subarg/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/subarg/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/subarg/readme.markdown
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/subarg/test/arg.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/subarg/test/recursive.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/supports-color/browser.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/supports-color/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/supports-color/license
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/supports-color/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/supports-color/readme.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/.eslintrc
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/.github/FUNDIN
G.yml
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/.nycrc
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/CHANGELOG.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/browser.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/test/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/.travis.yml
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/example/check.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/example/src.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/readme.markdown
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/check.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/esm.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/html.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/ok.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/run.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/run2.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/shebang.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/check.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/esm.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/ok.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/run.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/run2.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/shebang.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/spread.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/yield.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/spread.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/yield.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar-stream/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar-stream/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar-stream/extract.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar-stream/headers.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar-stream/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar-stream/pack.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar-stream/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar-stream/sandbox.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/create.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/extract.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/get-write-flag.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/header.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/high-level-opt.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/large-numbers.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/list.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/mkdir.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/mode-fix.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/normalize-unicode.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/normalize-windows-path.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/pack.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/parse.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/path-reservations.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/pax.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/read-entry.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/replace.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/strip-absolute-path.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/strip-trailing-slashes.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/types.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/unpack.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/update.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/warn-mixin.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/winchars.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/lib/write-entry.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/node_modules/minipass/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/node_modules/minipass/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/node_modules/minipass/index.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/node_modules/minipass/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/node_modules/minipass/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tar/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/temp-dir/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/temp-dir/license
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/temp-dir/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/temp-dir/readme.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/text-extensions/license
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/text-extensions/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/text-extensions/readme.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/text-extensions/text-extensions.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/through/.travis.yml
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/through/LICENSE.APACHE2
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/through/LICENSE.MIT
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/through/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/through/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/through/readme.markdown
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/through/test/async.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/through/test/auto-destroy.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/through/test/buffering.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/through/test/end.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/through/test/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/through2/LICENSE.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/through2/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/through2/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/through2/through2.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/.npmignore
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/CHANGELOG.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/LICENSE.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/example/enroll/build.sh
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/example/enroll/index.html
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/example/enroll/js/browserify
.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/example/enroll/js/main.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/example/enroll/server.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/main.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tmp/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tmp/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tmp/lib/tmp.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tmp/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/.npmignore
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/.travis.yml
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/.zuul.yml
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/test.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/to-fast-properties/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/to-fast-properties/license
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/to-fast-properties/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/to-fast-properties/readme.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/to-regex-range/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/to-regex-range/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/to-regex-range/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/to-regex-range/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tr46/.npmignore
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tr46/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tr46/lib/.gitkeep
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tr46/lib/mappingTable.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tr46/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/treeverse/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/treeverse/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/treeverse/lib/breadth.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/treeverse/lib/depth-descent.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/treeverse/lib/depth.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/treeverse/lib/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/treeverse/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/trim-newlines/index.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/trim-newlines/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/trim-newlines/license
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/trim-newlines/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/trim-newlines/readme.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/trim-right/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/trim-right/license
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/trim-right/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/trim-right/readme.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/CHANGELOG.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/config-loader.tes
t.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/config-loader.tes
t.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/config-loader.tes
t.js.map
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/data/match-path-d
ata.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/data/match-path-d
ata.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/data/match-path-d
ata.js.map
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/filesystem.test.d
.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/filesystem.test.j
s
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/filesystem.test.j
s.map
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/mapping-entry.tes
t.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/mapping-entry.tes
t.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/mapping-entry.tes
t.js.map
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/match-path-async.
test.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/match-path-async.
test.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/match-path-async.
test.js.map
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/match-path-sync.t
est.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/match-path-sync.t
est.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/match-path-sync.t
est.js.map
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/try-path.test.d.t
s
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/try-path.test.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/try-path.test.js.
map
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/tsconfig-loader.t
est.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/tsconfig-loader.t
est.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/tsconfig-loader.t
est.js.map
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/config-loader.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/config-loader.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/config-loader.js.map
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/filesystem.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/filesystem.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/filesystem.js.map
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/index.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/index.js.map
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/mapping-entry.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/mapping-entry.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/mapping-entry.js.map
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/match-path-async.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/match-path-async.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/match-path-async.js.map
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/match-path-sync.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/match-path-sync.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/match-path-sync.js.map
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/register.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/register.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/register.js.map
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/try-path.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/try-path.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/try-path.js.map
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/tsconfig-loader.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/tsconfig-loader.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/tsconfig-loader.js.map
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/node_modules/strip-bom/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/node_modules/strip-bom/license
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/node_modules/strip-bom/package.
json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/node_modules/strip-bom/readme.m
d
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/register.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/config-loader.tes
t.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/data/match-path-d
ata.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/filesystem.test.t
s
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/mapping-entry.tes
t.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/match-path-async.
test.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/match-path-sync.t
est.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/try-path.test.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/tsconfig-loader.t
est.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/tsconfig-named.js
on
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/config-loader.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/filesystem.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/index.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/mapping-entry.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/match-path-async.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/match-path-sync.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/register.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/try-path.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/tsconfig-loader.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tslib/CopyrightNotice.txt
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tslib/LICENSE.txt
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tslib/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tslib/SECURITY.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tslib/modules/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tslib/modules/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tslib/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tslib/tslib.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tslib/tslib.es6.html
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tslib/tslib.es6.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tslib/tslib.html
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tslib/tslib.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tty-browserify/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tty-browserify/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tty-browserify/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/tty-browserify/readme.markdown
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/base.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/index.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/license
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/readme.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/async-return-type.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/asyncify.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/basic.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/conditional-except.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/conditional-keys.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/conditional-pick.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/entries.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/entry.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/except.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/fixed-length-array.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/iterable-element.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/literal-union.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/merge-exclusive.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/merge.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/mutable.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/opaque.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/package-json.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/partial-deep.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/promisable.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/promise-value.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/readonly-deep.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/require-at-least-one.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/require-exactly-one.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/set-optional.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/set-required.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/set-return-type.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/simplify.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/stringified.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/tsconfig-json.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/typed-array.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/union-to-intersection.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/utilities.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/value-of.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/camel-case.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/delimiter-case.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/get.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/index.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/kebab-case.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/pascal-case.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/snake-case.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/utilities.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typedarray-to-buffer/.airtap.yml
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typedarray-to-buffer/.travis.yml
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typedarray-to-buffer/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typedarray-to-buffer/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typedarray-to-buffer/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typedarray-to-buffer/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typedarray-to-buffer/test/basic.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typedarray/.travis.yml
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typedarray/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typedarray/example/tarray.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typedarray/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typedarray/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typedarray/readme.markdown
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typedarray/test/server/undef_globals.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typedarray/test/tarray.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/LICENSE.txt
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/SECURITY.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/ThirdPartyNoticeText.txt
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/bin/tsc
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/bin/tsserver
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/cancellationToken.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/cs/diagnosticMessages.generated
.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/de/diagnosticMessages.generated
.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/dynamicImportCompat.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/es/diagnosticMessages.generated
.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/fr/diagnosticMessages.generated
.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/it/diagnosticMessages.generated
.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/ja/diagnosticMessages.generated
.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/ko/diagnosticMessages.generated
.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.dom.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.dom.iterable.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.collection.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.core.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.generator.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.iterable.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.promise.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.proxy.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.reflect.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.symbol.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.t
s
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2016.array.include.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2016.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2016.full.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2017.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2017.full.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2017.intl.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2017.object.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2017.sharedmemory.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2017.string.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2017.typedarrays.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2018.asyncgenerator.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2018.asynciterable.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2018.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2018.full.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2018.intl.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2018.promise.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2018.regexp.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2019.array.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2019.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2019.full.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2019.intl.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2019.object.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2019.string.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2019.symbol.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.bigint.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.date.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.full.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.intl.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.number.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.promise.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.sharedmemory.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.string.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.symbol.wellknown.d.t
s
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2021.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2021.full.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2021.intl.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2021.promise.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2021.string.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2021.weakref.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.array.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.error.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.full.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.intl.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.object.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.sharedmemory.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.string.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es5.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es6.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.esnext.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.esnext.full.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.esnext.intl.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.esnext.promise.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.esnext.string.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.esnext.weakref.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.scripthost.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.webworker.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.webworker.importscripts.d.t
s
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.webworker.iterable.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/pl/diagnosticMessages.generated
.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/protocol.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/pt-br/diagnosticMessages.genera
ted.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/ru/diagnosticMessages.generated
.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/tr/diagnosticMessages.generated
.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/tsc.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/tsserver.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/tsserverlibrary.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/tsserverlibrary.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/typesMap.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/typescript.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/typescript.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/typescriptServices.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/typescriptServices.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/typingsInstaller.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/watchGuard.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/zh-cn/diagnosticMessages.genera
ted.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/zh-tw/diagnosticMessages.genera
ted.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/typescript/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uglify-js/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uglify-js/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uglify-js/bin/uglifyjs
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/ast.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/compress.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/minify.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/mozilla-ast.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/output.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/parse.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/propmangle.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/scope.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/sourcemap.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/transform.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/utils.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uglify-js/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uglify-js/tools/domprops.html
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uglify-js/tools/domprops.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uglify-js/tools/exports.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uglify-js/tools/node.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uglify-js/tools/tty.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/umd/HISTORY.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/umd/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/umd/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/umd/bin/cli.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/umd/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/umd/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/.travis.yml
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/CHANGELOG.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/LICENSE.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/bench/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/bin.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/test/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/unique-filename/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/unique-filename/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/unique-filename/lib/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/unique-filename/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/unique-slug/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/unique-slug/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/unique-slug/lib/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/unique-slug/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/LICENSE.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/dist-node/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/dist-node/index.js.map
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/dist-src/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/dist-types/index.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/dist-web/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/dist-web/index.js.map
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/upath/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/upath/build/code/upath.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/upath/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/upath/readme.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/upath/upath.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/url/.npmignore
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/url/.travis.yml
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/url/.zuul.yml
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/url/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/url/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/url/node_modules/punycode/LICENSE-MIT.txt
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/url/node_modules/punycode/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/url/node_modules/punycode/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/url/node_modules/punycode/punycode.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/url/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/url/test.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/url/url.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/url/util.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/util-deprecate/History.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/util-deprecate/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/util-deprecate/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/util-deprecate/browser.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/util-deprecate/node.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/util-deprecate/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/util/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/util/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/util/node_modules/inherits/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/util/node_modules/inherits/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/util/node_modules/inherits/inherits.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/util/node_modules/inherits/inherits_browser.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/util/node_modules/inherits/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/util/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/util/support/isBuffer.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/util/support/isBufferBrowser.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/util/util.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/CHANGELOG.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/CONTRIBUTING.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/LICENSE.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/bin/uuid
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/md5.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/nil.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/parse.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/regex.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/rng.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/sha1.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/stringify.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/v1.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/v3.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/v35.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/v4.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/v5.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/validate.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/version.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/md5.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/nil.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/parse.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/regex.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/rng.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/sha1.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/stringify.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/v1.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/v3.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/v35.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/v4.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/v5.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/validate.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/version.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/md5-browser.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/md5.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/nil.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/parse.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/regex.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/rng-browser.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/rng.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/sha1-browser.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/sha1.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/stringify.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuid.min.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidNIL.min.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidParse.min.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidStringify.min.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidValidate.min.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidVersion.min.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidv1.min.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidv3.min.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidv4.min.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidv5.min.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/uuid-bin.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/v1.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/v3.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/v35.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/v4.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/v5.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/validate.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/version.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/uuid/wrapper.mjs
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/v8-compile-cache/CHANGELOG.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/v8-compile-cache/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/v8-compile-cache/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/v8-compile-cache/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/v8-compile-cache/v8-compile-cache.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-license/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-license/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-license/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-license/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-name/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-name/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-name/lib/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-name/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/example/run/bundle.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/example/run/entry.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/example/run/index.html
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/example/run/server.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/readme.markdown
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/test/vm.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/walk-up-path/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/walk-up-path/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/walk-up-path/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/walk-up-path/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wcwidth/.npmignore
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wcwidth/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wcwidth/Readme.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wcwidth/combining.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wcwidth/docs/index.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wcwidth/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wcwidth/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wcwidth/test/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/webidl-conversions/LICENSE.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/webidl-conversions/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/webidl-conversions/lib/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/webidl-conversions/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/LICENSE.txt
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/lib/URL-impl.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/lib/URL.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/lib/public-api.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/lib/url-state-machine.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/lib/utils.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/which/CHANGELOG.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/which/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/which/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/which/bin/node-which
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/which/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/which/which.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wide-align/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wide-align/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wide-align/align.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wide-align/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wordwrap/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wordwrap/README.markdown
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wordwrap/example/center.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wordwrap/example/meat.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wordwrap/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wordwrap/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wordwrap/test/break.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wordwrap/test/idleness.txt
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wordwrap/test/wrap.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wrap-ansi/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wrap-ansi/license
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wrap-ansi/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wrap-ansi/readme.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wrappy/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wrappy/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wrappy/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/wrappy/wrappy.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-file-atomic/LICENSE.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-file-atomic/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-file-atomic/lib/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-file-atomic/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-json-file/index.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-json-file/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-json-file/license
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/is-plain-obj/inde
x.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/is-plain-obj/inde
x.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/is-plain-obj/lice
nse
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/is-plain-obj/pack
age.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/is-plain-obj/read
me.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/write-file-atomic
/CHANGELOG.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/write-file-atomic
/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/write-file-atomic
/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/write-file-atomic
/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/write-file-atomic
/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-json-file/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-json-file/readme.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/index.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/license
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/.bin/semver
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/detect-indent/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/detect-indent/license
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/detect-indent/package.j
son
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/detect-indent/readme.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/make-dir/index.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/make-dir/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/make-dir/license
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/make-dir/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/make-dir/readme.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/pify/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/pify/license
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/pify/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/pify/readme.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/semver/CHANGELOG.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/semver/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/semver/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/semver/bin/semver
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/semver/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/semver/range.bnf
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/semver/semver.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/sort-keys/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/sort-keys/license
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/sort-keys/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/sort-keys/readme.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/index.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/license
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/readme.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/basic.
d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/litera
l-union.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/merge-
exclusive.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/merge.
d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/mutabl
e.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/omit.d
.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/packag
e-json.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/requir
e-at-least-one.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-file-atomic/CHANG
ELOG.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-file-atomic/LICEN
SE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-file-atomic/READM
E.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-file-atomic/index
.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-file-atomic/packa
ge.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-json-file/index.d
.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-json-file/index.j
s
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-json-file/license
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-json-file/package
.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-json-file/readme.
md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/write-pkg/readme.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/xtend/.jshintrc
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/xtend/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/xtend/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/xtend/immutable.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/xtend/mutable.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/xtend/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/xtend/test.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/y18n/CHANGELOG.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/y18n/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/y18n/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/y18n/build/index.cjs
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/y18n/build/lib/cjs.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/y18n/build/lib/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/y18n/build/lib/platform-shims/node.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/y18n/index.mjs
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/y18n/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yallist/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yallist/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yallist/iterator.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yallist/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yallist/yallist.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/PlainValue-b8036b75.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/Schema-e94716c8.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/legacy-exports.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/parse-cst.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/resolveSeq-492ab440.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/types.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/util.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/warnings-df54cb69.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/map.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/pair.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/parse-cst.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/scalar.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/schema.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/seq.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/types.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/types/binary.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/types/omap.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/types/pairs.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/types/set.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/types/timestamp.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/util.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/Document-9b4560a1.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/PlainValue-ec8e588e.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/Schema-88e323a7.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/legacy-exports.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/parse-cst.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/resolveSeq-d03cb037.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/test-events.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/types.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/util.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/warnings-1000a372.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/index.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/map.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/pair.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/parse-cst.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/parse-cst.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/scalar.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/schema.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/seq.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/types.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/types.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/types.mjs
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/types/binary.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/types/omap.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/types/pairs.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/types/set.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/types/timestamp.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/util.d.ts
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/util.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yaml/util.mjs
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/CHANGELOG.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/LICENSE.txt
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/browser.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/build/index.cjs
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/build/lib/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/build/lib/string-utils.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/build/lib/tokenize-arg-string.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/build/lib/yargs-parser-types.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/build/lib/yargs-parser.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/CHANGELOG.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/LICENSE
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/README.md
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/browser.mjs
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/build/index.cjs
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/argsert.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/command.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/completion-templates.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/completion.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/middleware.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/parse-command.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/typings/common-types.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/typings/yargs-parser-types.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/usage.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/utils/apply-extends.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/utils/is-promise.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/utils/levenshtein.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/utils/obj-filter.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/utils/process-argv.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/utils/set-blocking.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/utils/which-module.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/validation.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/yargs-factory.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/yerror.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/helpers/helpers.mjs
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/helpers/index.js
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/helpers/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/index.cjs
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/index.mjs
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/lib/platform-shims/browser.mjs
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/lib/platform-shims/esm.mjs
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/be.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/de.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/en.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/es.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/fi.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/fr.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/hi.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/hu.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/id.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/it.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/ja.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/ko.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/nb.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/nl.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/nn.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/pirate.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/pl.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/pt.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/pt_BR.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/ru.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/th.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/tr.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/zh_CN.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/zh_TW.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/package.json
        deleted:    CODAP-plugins/Mini-tutorials/node_modules/yargs/yargs

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   .gitignore
        modified:   .specstory/history/2025-04-28_11-07-merge-current-branch-into-main-and-push.md
        modified:   CODAP-plugins/CountyHealthSelect/assets/.DS_Store
        modified:   CODAP-plugins/CountyHealthSelect/assets/data/.DS_Store


```

---

_****_

Perfect! Now I can see the Git status. You have a lot of deleted files from CODAP-plugins/Mini-tutorials/node_modules/ that were probably tracked before you added node_modules to your .gitignore.

Let's commit these changes:

---

_****_

```bash
git add .
```

```
(base) Chads-MacBook-Air-6158:chaddorsey.github.io chaddorsey$ 

```

---

_****_

Now let's commit these changes:

---

_****_

```bash
git commit -m "Update .gitignore to exclude node_modules and remove tracked node_modules files"
```

```
(base) Chads-MacBook-Air-6158:chaddorsey.github.io chaddorsey$ 
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/combiner_stream.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/empty.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/empty_no_data.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/get.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/multipush.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/multiunshift.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/nested.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/nested_middle.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/pop.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/push.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/shift.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/splice.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/test/unshift.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/string-width/index.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/string-width/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/string-width/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/string-width/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/string-width/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/string_decoder/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/string_decoder/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/string_decoder/lib/string_decoder.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/string_decoder/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strip-ansi/index.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strip-ansi/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strip-ansi/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strip-ansi/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strip-ansi/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strip-bom/index.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strip-bom/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strip-bom/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strip-bom/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strip-bom/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strip-final-newline/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strip-final-newline/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strip-final-newline/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strip-final-newline/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strip-indent/index.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strip-indent/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strip-indent/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strip-indent/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strip-indent/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/CHANGES.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/CONTRIBUTING.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/README.md
 delete mode 100755 CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/bin/sl-log-transformer.
js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/lib/cli.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/lib/logger.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/strong-log-transformer/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/subarg/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/subarg/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/subarg/example/show.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/subarg/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/subarg/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/subarg/readme.markdown
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/subarg/test/arg.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/subarg/test/recursive.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/supports-color/browser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/supports-color/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/supports-color/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/supports-color/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/supports-color/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/.eslintrc
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/.github/FUNDIN
G.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/.nycrc
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/CHANGELOG.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/browser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/supports-preserve-symlinks-flag/test/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/example/check.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/example/src.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/readme.markdown
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/check.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/esm.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/html.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/ok.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/run.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/run2.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/shebang.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/check.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/esm.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/ok.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/run.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/run2.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/shebang.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/spread.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/sources/yield.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/spread.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/syntax-error/test/yield.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar-stream/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar-stream/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar-stream/extract.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar-stream/headers.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar-stream/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar-stream/pack.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar-stream/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar-stream/sandbox.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/create.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/extract.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/get-write-flag.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/header.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/high-level-opt.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/large-numbers.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/list.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/mkdir.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/mode-fix.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/normalize-unicode.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/normalize-windows-path.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/pack.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/parse.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/path-reservations.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/pax.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/read-entry.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/replace.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/strip-absolute-path.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/strip-trailing-slashes.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/types.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/unpack.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/update.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/warn-mixin.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/winchars.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/lib/write-entry.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/node_modules/minipass/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/node_modules/minipass/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/node_modules/minipass/index.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/node_modules/minipass/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/node_modules/minipass/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tar/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/temp-dir/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/temp-dir/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/temp-dir/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/temp-dir/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/text-extensions/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/text-extensions/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/text-extensions/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/text-extensions/text-extensions.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/through/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/through/LICENSE.APACHE2
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/through/LICENSE.MIT
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/through/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/through/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/through/readme.markdown
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/through/test/async.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/through/test/auto-destroy.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/through/test/buffering.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/through/test/end.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/through/test/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/through2/LICENSE.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/through2/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/through2/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/through2/through2.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/.npmignore
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/CHANGELOG.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/LICENSE.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/README.md
 delete mode 100755 CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/example/enroll/build.sh
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/example/enroll/index.html
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/example/enroll/js/browserify
.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/example/enroll/js/main.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/example/enroll/server.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/main.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/timers-browserify/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tmp/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tmp/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tmp/lib/tmp.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tmp/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/.npmignore
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/.zuul.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/to-arraybuffer/test.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/to-fast-properties/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/to-fast-properties/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/to-fast-properties/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/to-fast-properties/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/to-regex-range/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/to-regex-range/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/to-regex-range/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/to-regex-range/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tr46/.npmignore
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tr46/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tr46/lib/.gitkeep
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tr46/lib/mappingTable.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tr46/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/treeverse/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/treeverse/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/treeverse/lib/breadth.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/treeverse/lib/depth-descent.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/treeverse/lib/depth.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/treeverse/lib/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/treeverse/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/trim-newlines/index.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/trim-newlines/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/trim-newlines/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/trim-newlines/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/trim-newlines/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/trim-right/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/trim-right/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/trim-right/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/trim-right/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/CHANGELOG.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/config-loader.tes
t.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/config-loader.tes
t.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/config-loader.tes
t.js.map
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/data/match-path-d
ata.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/data/match-path-d
ata.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/data/match-path-d
ata.js.map
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/filesystem.test.d
.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/filesystem.test.j
s
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/filesystem.test.j
s.map
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/mapping-entry.tes
t.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/mapping-entry.tes
t.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/mapping-entry.tes
t.js.map
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/match-path-async.
test.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/match-path-async.
test.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/match-path-async.
test.js.map
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/match-path-sync.t
est.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/match-path-sync.t
est.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/match-path-sync.t
est.js.map
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/try-path.test.d.t
s
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/try-path.test.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/try-path.test.js.
map
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/tsconfig-loader.t
est.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/tsconfig-loader.t
est.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/__tests__/tsconfig-loader.t
est.js.map
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/config-loader.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/config-loader.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/config-loader.js.map
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/filesystem.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/filesystem.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/filesystem.js.map
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/index.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/index.js.map
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/mapping-entry.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/mapping-entry.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/mapping-entry.js.map
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/match-path-async.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/match-path-async.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/match-path-async.js.map
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/match-path-sync.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/match-path-sync.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/match-path-sync.js.map
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/register.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/register.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/register.js.map
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/try-path.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/try-path.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/try-path.js.map
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/tsconfig-loader.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/tsconfig-loader.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/lib/tsconfig-loader.js.map
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/node_modules/strip-bom/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/node_modules/strip-bom/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/node_modules/strip-bom/package.
json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/node_modules/strip-bom/readme.m
d
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/register.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/config-loader.tes
t.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/data/match-path-d
ata.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/filesystem.test.t
s
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/mapping-entry.tes
t.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/match-path-async.
test.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/match-path-sync.t
est.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/try-path.test.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/tsconfig-loader.t
est.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/__tests__/tsconfig-named.js
on
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/config-loader.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/filesystem.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/index.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/mapping-entry.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/match-path-async.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/match-path-sync.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/register.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/try-path.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/src/tsconfig-loader.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tslib/CopyrightNotice.txt
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tslib/LICENSE.txt
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tslib/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tslib/SECURITY.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tslib/modules/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tslib/modules/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tslib/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tslib/tslib.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tslib/tslib.es6.html
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tslib/tslib.es6.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tslib/tslib.html
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tslib/tslib.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tty-browserify/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tty-browserify/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tty-browserify/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/tty-browserify/readme.markdown
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/base.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/index.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/async-return-type.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/asyncify.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/basic.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/conditional-except.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/conditional-keys.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/conditional-pick.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/entries.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/entry.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/except.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/fixed-length-array.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/iterable-element.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/literal-union.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/merge-exclusive.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/merge.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/mutable.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/opaque.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/package-json.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/partial-deep.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/promisable.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/promise-value.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/readonly-deep.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/require-at-least-one.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/require-exactly-one.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/set-optional.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/set-required.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/set-return-type.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/simplify.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/stringified.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/tsconfig-json.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/typed-array.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/union-to-intersection.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/utilities.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/source/value-of.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/camel-case.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/delimiter-case.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/get.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/index.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/kebab-case.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/pascal-case.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/snake-case.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/type-fest/ts41/utilities.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typedarray-to-buffer/.airtap.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typedarray-to-buffer/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typedarray-to-buffer/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typedarray-to-buffer/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typedarray-to-buffer/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typedarray-to-buffer/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typedarray-to-buffer/test/basic.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typedarray/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typedarray/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typedarray/example/tarray.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typedarray/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typedarray/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typedarray/readme.markdown
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typedarray/test/server/undef_globals.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typedarray/test/tarray.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/LICENSE.txt
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/SECURITY.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/ThirdPartyNoticeText.txt
 delete mode 100755 CODAP-plugins/Mini-tutorials/node_modules/typescript/bin/tsc
 delete mode 100755 CODAP-plugins/Mini-tutorials/node_modules/typescript/bin/tsserver
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/cancellationToken.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/cs/diagnosticMessages.generated
.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/de/diagnosticMessages.generated
.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/dynamicImportCompat.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/es/diagnosticMessages.generated
.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/fr/diagnosticMessages.generated
.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/it/diagnosticMessages.generated
.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/ja/diagnosticMessages.generated
.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/ko/diagnosticMessages.generated
.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.dom.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.dom.iterable.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.collection.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.core.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.generator.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.iterable.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.promise.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.proxy.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.reflect.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.symbol.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.t
s
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2016.array.include.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2016.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2016.full.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2017.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2017.full.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2017.intl.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2017.object.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2017.sharedmemory.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2017.string.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2017.typedarrays.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2018.asyncgenerator.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2018.asynciterable.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2018.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2018.full.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2018.intl.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2018.promise.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2018.regexp.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2019.array.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2019.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2019.full.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2019.intl.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2019.object.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2019.string.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2019.symbol.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.bigint.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.date.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.full.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.intl.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.number.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.promise.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.sharedmemory.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.string.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2020.symbol.wellknown.d.t
s
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2021.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2021.full.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2021.intl.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2021.promise.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2021.string.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2021.weakref.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.array.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.error.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.full.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.intl.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.object.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.sharedmemory.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es2022.string.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es5.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.es6.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.esnext.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.esnext.full.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.esnext.intl.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.esnext.promise.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.esnext.string.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.esnext.weakref.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.scripthost.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.webworker.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.webworker.importscripts.d.t
s
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/lib.webworker.iterable.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/pl/diagnosticMessages.generated
.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/protocol.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/pt-br/diagnosticMessages.genera
ted.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/ru/diagnosticMessages.generated
.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/tr/diagnosticMessages.generated
.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/tsc.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/tsserver.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/tsserverlibrary.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/tsserverlibrary.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/typesMap.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/typescript.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/typescript.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/typescriptServices.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/typescriptServices.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/typingsInstaller.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/watchGuard.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/zh-cn/diagnosticMessages.genera
ted.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/lib/zh-tw/diagnosticMessages.genera
ted.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/typescript/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uglify-js/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uglify-js/README.md
 delete mode 100755 CODAP-plugins/Mini-tutorials/node_modules/uglify-js/bin/uglifyjs
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/ast.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/compress.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/minify.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/mozilla-ast.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/output.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/parse.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/propmangle.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/scope.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/sourcemap.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/transform.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uglify-js/lib/utils.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uglify-js/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uglify-js/tools/domprops.html
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uglify-js/tools/domprops.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uglify-js/tools/exports.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uglify-js/tools/node.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uglify-js/tools/tty.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/umd/HISTORY.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/umd/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/umd/README.md
 delete mode 100755 CODAP-plugins/Mini-tutorials/node_modules/umd/bin/cli.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/umd/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/umd/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/CHANGELOG.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/LICENSE.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/bench/index.js
 delete mode 100755 CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/bin.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/undeclared-identifiers/test/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/unique-filename/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/unique-filename/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/unique-filename/lib/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/unique-filename/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/unique-slug/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/unique-slug/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/unique-slug/lib/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/unique-slug/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/LICENSE.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/dist-node/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/dist-node/index.js.map
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/dist-src/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/dist-types/index.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/dist-web/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/dist-web/index.js.map
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/universal-user-agent/package.json
 delete mode 100755 CODAP-plugins/Mini-tutorials/node_modules/upath/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/upath/build/code/upath.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/upath/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/upath/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/upath/upath.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/url/.npmignore
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/url/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/url/.zuul.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/url/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/url/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/url/node_modules/punycode/LICENSE-MIT.txt
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/url/node_modules/punycode/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/url/node_modules/punycode/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/url/node_modules/punycode/punycode.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/url/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/url/test.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/url/url.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/url/util.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/util-deprecate/History.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/util-deprecate/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/util-deprecate/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/util-deprecate/browser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/util-deprecate/node.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/util-deprecate/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/util/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/util/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/util/node_modules/inherits/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/util/node_modules/inherits/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/util/node_modules/inherits/inherits.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/util/node_modules/inherits/inherits_browser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/util/node_modules/inherits/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/util/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/util/support/isBuffer.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/util/support/isBufferBrowser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/util/util.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/CHANGELOG.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/CONTRIBUTING.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/LICENSE.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/README.md
 delete mode 100755 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/bin/uuid
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/md5.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/nil.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/parse.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/regex.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/rng.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/sha1.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/stringify.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/v1.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/v3.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/v35.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/v4.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/v5.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/validate.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-browser/version.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/md5.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/nil.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/parse.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/regex.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/rng.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/sha1.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/stringify.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/v1.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/v3.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/v35.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/v4.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/v5.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/validate.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/esm-node/version.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/md5-browser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/md5.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/nil.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/parse.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/regex.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/rng-browser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/rng.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/sha1-browser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/sha1.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/stringify.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuid.min.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidNIL.min.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidParse.min.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidStringify.min.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidValidate.min.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidVersion.min.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidv1.min.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidv3.min.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidv4.min.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/umd/uuidv5.min.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/uuid-bin.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/v1.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/v3.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/v35.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/v4.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/v5.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/validate.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/dist/version.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/uuid/wrapper.mjs
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/v8-compile-cache/CHANGELOG.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/v8-compile-cache/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/v8-compile-cache/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/v8-compile-cache/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/v8-compile-cache/v8-compile-cache.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-license/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-license/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-license/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-license/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-name/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-name/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-name/lib/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/validate-npm-package-name/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/example/run/bundle.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/example/run/entry.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/example/run/index.html
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/example/run/server.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/readme.markdown
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/vm-browserify/test/vm.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/walk-up-path/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/walk-up-path/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/walk-up-path/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/walk-up-path/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wcwidth/.npmignore
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wcwidth/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wcwidth/Readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wcwidth/combining.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wcwidth/docs/index.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wcwidth/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wcwidth/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wcwidth/test/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/webidl-conversions/LICENSE.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/webidl-conversions/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/webidl-conversions/lib/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/webidl-conversions/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/LICENSE.txt
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/lib/URL-impl.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/lib/URL.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/lib/public-api.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/lib/url-state-machine.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/lib/utils.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/whatwg-url/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/which/CHANGELOG.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/which/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/which/README.md
 delete mode 100755 CODAP-plugins/Mini-tutorials/node_modules/which/bin/node-which
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/which/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/which/which.js
 delete mode 100755 CODAP-plugins/Mini-tutorials/node_modules/wide-align/LICENSE
 delete mode 100755 CODAP-plugins/Mini-tutorials/node_modules/wide-align/README.md
 delete mode 100755 CODAP-plugins/Mini-tutorials/node_modules/wide-align/align.js
 delete mode 100755 CODAP-plugins/Mini-tutorials/node_modules/wide-align/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wordwrap/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wordwrap/README.markdown
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wordwrap/example/center.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wordwrap/example/meat.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wordwrap/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wordwrap/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wordwrap/test/break.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wordwrap/test/idleness.txt
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wordwrap/test/wrap.js
 delete mode 100755 CODAP-plugins/Mini-tutorials/node_modules/wrap-ansi/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wrap-ansi/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wrap-ansi/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wrap-ansi/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wrappy/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wrappy/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wrappy/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/wrappy/wrappy.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-file-atomic/LICENSE.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-file-atomic/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-file-atomic/lib/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-file-atomic/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-json-file/index.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-json-file/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-json-file/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/is-plain-obj/inde
x.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/is-plain-obj/inde
x.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/is-plain-obj/lice
nse
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/is-plain-obj/pack
age.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/is-plain-obj/read
me.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/write-file-atomic
/CHANGELOG.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/write-file-atomic
/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/write-file-atomic
/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/write-file-atomic
/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules/write-file-atomic
/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-json-file/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-json-file/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/index.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/license
 delete mode 120000 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/.bin/semver
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/detect-indent/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/detect-indent/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/detect-indent/package.j
son
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/detect-indent/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/make-dir/index.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/make-dir/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/make-dir/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/make-dir/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/make-dir/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/pify/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/pify/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/pify/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/pify/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/semver/CHANGELOG.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/semver/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/semver/README.md
 delete mode 100755 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/semver/bin/semver
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/semver/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/semver/range.bnf
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/semver/semver.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/sort-keys/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/sort-keys/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/sort-keys/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/sort-keys/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/index.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/basic.
d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/litera
l-union.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/merge-
exclusive.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/merge.
d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/mutabl
e.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/omit.d
.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/packag
e-json.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/type-fest/source/requir
e-at-least-one.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-file-atomic/CHANG
ELOG.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-file-atomic/LICEN
SE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-file-atomic/READM
E.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-file-atomic/index
.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-file-atomic/packa
ge.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-json-file/index.d
.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-json-file/index.j
s
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-json-file/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-json-file/package
.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules/write-json-file/readme.
md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/write-pkg/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/xtend/.jshintrc
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/xtend/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/xtend/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/xtend/immutable.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/xtend/mutable.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/xtend/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/xtend/test.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/y18n/CHANGELOG.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/y18n/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/y18n/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/y18n/build/index.cjs
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/y18n/build/lib/cjs.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/y18n/build/lib/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/y18n/build/lib/platform-shims/node.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/y18n/index.mjs
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/y18n/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yallist/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yallist/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yallist/iterator.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yallist/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yallist/yallist.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/PlainValue-b8036b75.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/Schema-e94716c8.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/legacy-exports.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/parse-cst.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/resolveSeq-492ab440.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/types.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/util.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/dist/warnings-df54cb69.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/map.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/pair.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/parse-cst.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/scalar.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/schema.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/seq.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/types.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/types/binary.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/types/omap.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/types/pairs.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/types/set.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/types/timestamp.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/browser/util.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/Document-9b4560a1.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/PlainValue-ec8e588e.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/Schema-88e323a7.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/legacy-exports.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/parse-cst.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/resolveSeq-d03cb037.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/test-events.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/types.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/util.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/dist/warnings-1000a372.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/index.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/map.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/pair.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/parse-cst.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/parse-cst.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/scalar.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/schema.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/seq.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/types.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/types.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/types.mjs
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/types/binary.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/types/omap.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/types/pairs.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/types/set.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/types/timestamp.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/util.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/util.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yaml/util.mjs
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/CHANGELOG.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/LICENSE.txt
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/browser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/build/index.cjs
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/build/lib/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/build/lib/string-utils.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/build/lib/tokenize-arg-string.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/build/lib/yargs-parser-types.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/build/lib/yargs-parser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs-parser/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/CHANGELOG.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/browser.mjs
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/build/index.cjs
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/argsert.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/command.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/completion-templates.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/completion.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/middleware.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/parse-command.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/typings/common-types.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/typings/yargs-parser-types.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/usage.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/utils/apply-extends.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/utils/is-promise.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/utils/levenshtein.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/utils/obj-filter.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/utils/process-argv.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/utils/set-blocking.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/utils/which-module.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/validation.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/yargs-factory.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/build/lib/yerror.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/helpers/helpers.mjs
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/helpers/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/helpers/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/index.cjs
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/index.mjs
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/lib/platform-shims/browser.mjs
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/lib/platform-shims/esm.mjs
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/be.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/de.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/en.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/es.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/fi.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/fr.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/hi.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/hu.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/id.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/it.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/ja.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/ko.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/nb.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/nl.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/nn.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/pirate.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/pl.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/pt.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/pt_BR.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/ru.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/th.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/tr.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/zh_CN.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/locales/zh_TW.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/node_modules/yargs/yargs

```

---

_****_

Let's push the changes to your remote repository:

---

_****_

Cancelled

---

_**User**_

I still get this when deploying (head of the usage output):

Checking configuration and starting deployment… 🚦
Deploying using Deploy Token… 🔑
Configuring git…
/usr/bin/git config --global --add safe.directory /home/runner/work/chaddorsey.github.io/chaddorsey.github.io
/usr/bin/git config user.name chaddorsey
/usr/bin/git config user.email cdorsey@concord.org
/usr/bin/git config core.ignorecase false
/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
/usr/bin/git remote rm origin
/usr/bin/git remote add origin ***github.com/chaddorsey/chaddorsey.github.io.git
Git configured… 🔧
Starting to commit changes…
/usr/bin/git ls-remote --heads ***github.com/chaddorsey/chaddorsey.github.io.git refs/heads/gh-pages
b4283c4788486ee9672d26de1778c71e1327158c	refs/heads/gh-pages
Creating worktree…
/usr/bin/git fetch --no-recurse-submodules --depth=1 origin gh-pages
From https://github.com/chaddorsey/chaddorsey.github.io
 * branch              gh-pages   -> FETCH_HEAD
 * [new branch]        gh-pages   -> origin/gh-pages
/usr/bin/git worktree add --no-checkout --detach github-pages-deploy-action-temp-deployment-folder
Preparing worktree (detached HEAD f1d41053)
/usr/bin/git checkout -B gh-pages origin/gh-pages
Previous HEAD position was f1d41053 Update .gitignore to exclude node_modules and remove tracked node_modules files
Switched to a new branch 'gh-pages'
branch 'gh-pages' set up to track 'origin/gh-pages'.
/usr/bin/git config --global --add safe.directory /home/runner/work/chaddorsey.github.io/chaddorsey.github.io/github-pages-deploy-action-temp-deployment-folder
/usr/bin/chmod -R +rw /home/runner/work/chaddorsey.github.io/chaddorsey.github.io/
Creating target folder if it doesn't already exist… 📌
/usr/bin/rsync -q -av --checksum --progress --mkpath /home/runner/work/chaddorsey.github.io/chaddorsey.github.io//. github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure --exclude .ssh --exclude .git --exclude .github
filename overflows max-path len by 6: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browser-resolve/node_modules/resolve/test/pathfilter/deep_ref/node_modules/deep/package.json
filename overflows max-path len by 7: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browser-resolve/node_modules/resolve/test/pathfilter/deep_ref/node_modules/deep/deeper/ref.js
filename overflows max-path len by 1: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browser-resolve/node_modules/resolve/test/resolver/biz/node_modules/garply/package.json
filename overflows max-path len by 1: github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/github-pages-deploy-action-temp-deployment-folder/attribute-selector-structure/CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browser-

---

_**Assistant**_

The issue you're experiencing is due to file paths that are too long for the GitHub Pages deployment process. Even though you've removed the existing node_modules files from Git tracking, it looks like there are still some node_modules directories in the repository, particularly in the `CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/` path.

Let's fix this by ensuring that all node_modules directories are properly excluded from the repository and deployment:

1. First, let's check to see what node_modules directories still exist in the repo:

---

_****_

```bash
find . -name "node_modules" -type d | grep -v "^./node_modules"
```

```
./CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/string_decoder/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/string_decoder/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/string_decoder/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browserify/test/ignore_browser_field/node_modul
es
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browserify/test/browser_field_resolve/a/node_mo
dules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browserify/test/browser_field_resolve/k/node_mo
dules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browserify/test/browser_field_resolve/l/node_mo
dules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browserify/test/tr_symlink/app/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browserify/test/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browserify/test/subdep/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browserify/test/subdep/node_modules/qq/node_mod
ules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browserify/test/field/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browserify/test/noparse/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browserify/test/ignore_transform_key/node_modul
es
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browserify/test/pkg_event/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browserify/test/tr_global/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browserify/test/tr_global/node_modules/x/node_m
odules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browserify/test/shared_symlink/app/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browserify/test/global/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browserify/test/tr/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browserify/test/tr/node_modules/g/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browserify/test/identical_different/wow/node_mo
dules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browserify/test/identical_different/node_module
s
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/elliptic/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/shadowed_core/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/symlinked/_/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browser-resolve/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browser-resolve/node_modules/resolve/test/pathf
ilter/deep_ref/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browser-resolve/node_modules/resolve/test/subdi
rs/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browser-resolve/node_modules/resolve/test/resol
ver/punycode/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browser-resolve/node_modules/resolve/test/resol
ver/biz/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browser-resolve/node_modules/resolve/test/resol
ver/without_basedir/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browser-resolve/node_modules/resolve/test/resol
ver/bar/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/insert-module-globals/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/diffie-hellman/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/assert/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/combine-source-map/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/create-ecdh/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/browserify-sign/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/asn1.js/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/convert-source-map/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/concat-stream/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/hash-base/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules
./CODAP-plugins/Mini-tutorials/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/test/ignore_browser_field/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/test/browser_field_resolve/a/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/test/browser_field_resolve/k/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/test/browser_field_resolve/l/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/test/tr_symlink/app/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/test/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/test/subdep/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/test/subdep/node_modules/qq/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/test/field/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/test/noparse/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/test/ignore_transform_key/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/test/pkg_event/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/test/tr_global/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/test/tr_global/node_modules/x/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/test/shared_symlink/app/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/test/global/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/test/tr/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/test/tr/node_modules/g/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/test/identical_different/wow/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/test/identical_different/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/node_modules/concat-stream/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browserify/node_modules/readable-stream/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/npm-registry-fetch/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/npm-registry-fetch/node_modules/semver/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/hosted-git-info/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/deps-sort/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browser-pack/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/read-only-stream/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/read-package-json/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/read-package-json/node_modules/semver/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/normalize-package-data/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/multimatch/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/duplexer2/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/init-package-json/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/init-package-json/node_modules/semver/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/babel-traverse/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/tsconfig-paths/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/inline-source-map/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/elliptic/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@yarnpkg/parsers/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/npm-packlist/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/npm-install-checks/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@nrwl/devkit/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/resolve/test/shadowed_core/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/resolve/test/resolver/symlinked/_/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/write-json-file/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/util/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/ignore-walk/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browser-resolve/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browser-resolve/node_modules/resolve/test/pathfilter/deep_ref/no
de_modules
./CODAP-plugins/Mini-tutorials/node_modules/browser-resolve/node_modules/resolve/test/subdirs/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browser-resolve/node_modules/resolve/test/resolver/punycode/node
_modules
./CODAP-plugins/Mini-tutorials/node_modules/browser-resolve/node_modules/resolve/test/resolver/biz/node_modu
les
./CODAP-plugins/Mini-tutorials/node_modules/browser-resolve/node_modules/resolve/test/resolver/without_based
ir/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/browser-resolve/node_modules/resolve/test/resolver/bar/node_modu
les
./CODAP-plugins/Mini-tutorials/node_modules/parse-json/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/babel-register/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/has-ansi/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/insert-module-globals/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/stream-combiner2/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/libnpmaccess/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/libnpmaccess/node_modules/semver/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/miller-rabin/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/stream-http/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/source-map-support/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/read-pkg-up/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/pacote/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/pacote/node_modules/semver/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/public-encrypt/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/decamelize-keys/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/diffie-hellman/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/encoding/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/babel-code-frame/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/cacache/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/assert/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/combine-source-map/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/stream-splicer/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/builtins/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/url/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/module-deps/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/stream-browserify/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@lerna/init/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@lerna/npm-publish/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@lerna/bootstrap/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@lerna/symlink-binary/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@lerna/create-symlink/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@lerna/npm-conf/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@lerna/project/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@lerna/publish/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@lerna/add/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@lerna/resolve-symlink/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@lerna/version/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@lerna/get-packed/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@lerna/package-graph/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@lerna/npm-install/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@lerna/conventional-commits/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@lerna/profiler/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@lerna/run/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@lerna/has-npm-version/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@lerna/symlink-dependencies/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@lerna/import/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@lerna/create/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@lerna/prerelease-id-from-version/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/compare-func/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/load-json-file/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/clone-deep/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@npmcli/metavuln-calculator/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@npmcli/map-workspaces/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@npmcli/arborist/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@npmcli/arborist/node_modules/semver/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@npmcli/fs/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@npmcli/git/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@npmcli/git/node_modules/semver/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/libnpmpublish/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/libnpmpublish/node_modules/semver/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/create-ecdh/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/asn1.js/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/@babel/highlight/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/nx/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/nx/node_modules/yargs/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/write-pkg/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/node-gyp/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/babel-core/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/filelist/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/bin-links/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/sort-keys/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/import-fresh/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/meow/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/meow/node_modules/read-pkg-up/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/meow/node_modules/read-pkg/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/babel-generator/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/get-pkg-repo/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/npm-pick-manifest/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/npm-pick-manifest/node_modules/semver/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/npm-package-arg/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/tar/node_modules
./CODAP-plugins/Mini-tutorials/node_modules/read-pkg/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/string_decoder/node_modules
./CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/node_modules

```

---

_****_

There are still many node_modules directories in your repository that need to be removed. Let's update your .gitignore file to ensure all node_modules directories are properly excluded, and then make the necessary changes:

---

_****_

```diff
  bfg.jar
  
- # Node modules
+ # Node modules - ensure all node_modules directories are excluded
+ node_modules/
  **/node_modules/
- node_modules/
+ **/*/node_modules/
+ **/*/*/node_modules/
+ **/*/*/*/node_modules/
+ **/*/*/*/*/node_modules/
+ **/*/*/*/*/*/node_modules/
+ **/*/*/*/*/*/*/node_modules/
+ 
+ # Also exclude any paths that are too long or problematic
+ **/attribute-selector-structure/
```

---

_****_

Now, let's remove these node_modules directories from your repository that are still being tracked. We'll do this by using the `git rm -r --cached` command to delete the directories from Git's index without removing them from your file system:

---

_****_

```bash
git rm -r --cached "CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules" "CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules" "CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules" "CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules" "CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules" "CODAP-plugins/Mini-tutorials/node_modules"
```

```
fatal: pathspec 'CODAP-plugins/Mini-tutorials/node_modules' did not match any files

```

---

_****_

Let's check which node_modules directories are still being tracked:

---

_****_

```bash
git ls-files | grep "node_modules"
```

```
(base) Chads-MacBook-Air-6158:chaddorsey.github.io chaddorsey$ 
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/padStart.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/parseInt.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/partial.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/partialRight.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/partition.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/pick.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/pickBy.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/plant.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/property.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/propertyOf.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/pull.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/pullAll.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/pullAllBy.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/pullAllWith.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/pullAt.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/random.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/range.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/rangeRight.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/rearg.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/reduce.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/reduceRight.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/reject.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/release.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/remove.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/repeat.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/replace.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/rest.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/result.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/reverse.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/round.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sample.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sampleSize.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/seq.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/set.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/setWith.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/shuffle.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/size.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/slice.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/snakeCase.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/some.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sortBy.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sortedIndex.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sortedIndexBy.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sortedIndexOf.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sortedLastIndex.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sortedLastIndexBy.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sortedLastIndexOf.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sortedUniq.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sortedUniqBy.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/split.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/spread.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/startCase.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/startsWith.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/string.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/stubArray.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/stubFalse.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/stubObject.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/stubString.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/stubTrue.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/subtract.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sum.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sumBy.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/tail.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/take.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/takeRight.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/takeRightWhile.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/takeWhile.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/tap.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/template.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/templateSettings.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/throttle.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/thru.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/times.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toArray.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toFinite.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toInteger.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toIterator.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toJSON.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toLength.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toLower.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toNumber.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toPairs.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toPairsIn.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toPath.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toPlainObject.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toSafeInteger.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toString.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toUpper.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/transform.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/trim.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/trimEnd.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/trimStart.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/truncate.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/unary.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/unescape.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/union.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/unionBy.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/unionWith.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/uniq.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/uniqBy.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/uniqWith.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/uniqueId.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/unset.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/unzip.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/unzipWith.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/update.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/updateWith.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/upperCase.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/upperFirst.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/util.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/value.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/valueOf.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/values.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/valuesIn.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/without.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/words.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/wrap.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/wrapperAt.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/wrapperChain.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/wrapperLodash.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/wrapperReverse.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/wrapperValue.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/xor.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/xorBy.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/xorWith.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/zip.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/zipObject.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/zipObjectDeep.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/zipWith.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/loose-envify/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/loose-envify/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/loose-envify/cli.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/loose-envify/custom.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/loose-envify/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/loose-envify/loose-envify.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/loose-envify/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/loose-envify/replace.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/md5.js/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/md5.js/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/md5.js/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/md5.js/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/.npmignore
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/1.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/bin/miller-rabin
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/lib/mr.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/node_modules/bn.js/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/node_modules/bn.js/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/node_modules/bn.js/lib/bn.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/node_modules/bn.js/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/test.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/test/api-test.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimalistic-assert/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimalistic-assert/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimalistic-assert/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimalistic-assert/readme.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimalistic-crypto-utils/.npmignore
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimalistic-crypto-utils/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimalistic-crypto-utils/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimalistic-crypto-utils/lib/utils.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimalistic-crypto-utils/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimalistic-crypto-utils/test/utils-test.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimatch/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimatch/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimatch/minimatch.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimatch/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/example/parse.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/readme.markdown
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/all_bool.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/bool.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/dash.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/default_bool.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/dotted.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/kv_short.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/long.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/num.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/parse.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/parse_modified.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/proto.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/short.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/stop_early.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/unknown.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/whitespace.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/mkdirp/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/mkdirp/bin/cmd.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/mkdirp/bin/usage.txt
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/mkdirp/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/mkdirp/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/mkdirp/readme.markdown
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/CHANGELOG.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/bin/cmd.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/bin/usage.txt
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/example/deps.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/example/files/bar.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/example/files/foo.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/example/files/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/example/files/xyz.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/node_modules/concat-stream/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/node_modules/concat-stream/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/node_modules/concat-stream/package.js
on
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/node_modules/concat-stream/readme.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/readme.markdown
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/bundle.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/cache.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/cache_expose.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/cache_partial.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/cache_partial_expose.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/cache_persistent.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/cycle.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/cycle/bar.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/cycle/foo.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/cycle/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/deps.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/dotdot.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/dotdot/abc/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/dotdot/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/expose.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/expose/bar.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/expose/foo.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/expose/lib/abc.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/expose/lib/xyz.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/expose/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/file_cache.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/bar.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/extra.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/filterable.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/foo.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/pkg_filter/one.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/pkg_filter/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/pkg_filter/test.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/pkg_filter/two.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/quotes/bar.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/quotes/baz.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/quotes/foo.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/quotes/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_2dep_module/f.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_2dep_module/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_global/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_global/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_module/f.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_module/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_module/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_module/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_module/xxx.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_no_entry/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_rel/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_rel/subdir/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_rel/xxx.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_sh/f.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_sh/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_sh/tr_a.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_sh/tr_b.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_whole_package/f.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_whole_package/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/unicode/bar.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/unicode/foo.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/unicode/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/xyz.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/filter.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/ignore_missing.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/ignore_missing/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/ignore_missing/other.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/ignore_missing_cache.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/noparse.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/noparse_row.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/pkg.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/pkg/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/pkg/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/pkg_filter.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/quotes.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/row_expose.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/row_expose_name_is_file_transfor
m.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/row_expose_transform.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/source.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_2dep_module.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_err.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_flags.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_flags/empty.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_fn.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_global.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_module.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_no_entry.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_opts.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_opts/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_opts/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_rel.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_sh.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_whole_package.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_write.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_write/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/undef_file.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/unicode.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ms/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ms/license.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ms/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ms/readme.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/object-assign/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/object-assign/license
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/object-assign/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/object-assign/readme.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/once/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/once/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/once/once.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/once/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-browserify/.npmignore
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-browserify/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-browserify/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-browserify/browser.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-browserify/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-browserify/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-homedir/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-homedir/license
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-homedir/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-homedir/readme.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-tmpdir/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-tmpdir/license
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-tmpdir/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-tmpdir/readme.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/CHANGELOG.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/dist/pako.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/dist/pako.min.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/dist/pako_deflate.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/dist/pako_deflate.min.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/dist/pako_inflate.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/dist/pako_inflate.min.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/deflate.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/inflate.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/utils/common.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/utils/strings.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/README
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/adler32.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/constants.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/crc32.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/deflate.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/gzheader.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/inffast.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/inflate.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/inftrees.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/messages.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/trees.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/zstream.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/example/dirname.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/example/win32.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/readme.markdown
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/test/dirname.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/test/win32.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/aesid.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/asn1.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/certificate.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/fixProc.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-browserify/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-browserify/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-browserify/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-browserify/readme.markdown
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-browserify/test/test-path.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-is-absolute/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-is-absolute/license
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-is-absolute/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-is-absolute/readme.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-parse/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-parse/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-parse/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-parse/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-platform/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-platform/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-platform/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-platform/path.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/browser.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/lib/async.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/lib/default-encoding.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/lib/precondition.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/lib/sync-browser.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/lib/sync.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/lib/to-buffer.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/private/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/private/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/private/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/private/private.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process-nextick-args/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process-nextick-args/license.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process-nextick-args/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process-nextick-args/readme.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process/.eslintrc
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process/browser.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process/test.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/browser.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/mgf.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/node_modules/bn.js/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/node_modules/bn.js/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/node_modules/bn.js/lib/bn.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/node_modules/bn.js/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/privateDecrypt.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/publicEncrypt.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/readme.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/1024.priv
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/1024.pub
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/ec.pass.priv
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/ec.priv
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/ec.pub
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/nodeTests.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/pass.1024.priv
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/pass.1024.pub
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/rsa.1024.priv
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/rsa.1024.pub
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/rsa.2028.priv
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/rsa.2028.pub
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/rsa.pass.priv
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/rsa.pass.pub
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/test_cert.pem
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/test_key.pem
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/test_rsa_privkey.pem
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/test_rsa_privkey_encrypted.pe
m
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/test_rsa_pubkey.pem
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/withPublic.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/xor.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/punycode/LICENSE-MIT.txt
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/punycode/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/punycode/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/punycode/punycode.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/History.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/License.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/Readme.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/decode.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/encode.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/test/common-index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/test/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/test/tap-index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/.History.md.un~
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/.Readme.md.un~
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/.package.json.un~
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/History.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/License.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/Readme.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/decode.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/encode.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/test/.index.js.un~
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/test/common-index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/test/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/test/tap-index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/.zuul.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/browser.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/test.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/.zuul.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/browser.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/test.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/example/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/example/wrap.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/readme.markdown
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/test/error.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/test/ro.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/test/streams1.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/CONTRIBUTING.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/GOVERNANCE.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/doc/wg-meetings/2015-01-30.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/duplex-browser.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/duplex.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/_stream_duplex.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/_stream_passthrough.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/_stream_readable.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/_stream_transform.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/_stream_writable.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/internal/streams/BufferList.j
s
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/internal/streams/destroy.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/internal/streams/stream-brows
er.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/internal/streams/stream.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/safe-buffer/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/safe-buffer/README.m
d
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/safe-buffer/index.d.
ts
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/safe-buffer/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/safe-buffer/package.
json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/string_decoder/.trav
is.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/string_decoder/LICEN
SE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/string_decoder/READM
E.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/string_decoder/lib/s
tring_decoder.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/string_decoder/packa
ge.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/passthrough.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/readable-browser.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/readable.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/transform.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/writable-browser.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/writable.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/regenerator-runtime/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/regenerator-runtime/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/regenerator-runtime/path.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/regenerator-runtime/runtime-module.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/regenerator-runtime/runtime.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/repeating/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/repeating/license
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/repeating/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/repeating/readme.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/.editorconfig
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/.eslintignore
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/.eslintrc
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/SECURITY.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/appveyor.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/example/async.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/example/sync.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/async.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/caller.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/core.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/core.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/is-core.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/node-modules-paths.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/normalize-options.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/sync.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/readme.markdown
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/.eslintrc
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/core.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/dotdot.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/dotdot/abc/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/dotdot/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/faulty_basedir.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/filter.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/filter_sync.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/mock.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/mock_sync.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/module_dir.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/module_dir/xmodules/aaa/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/module_dir/ymodules/aaa/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/module_dir/zmodules/bbb/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/module_dir/zmodules/bbb/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/node-modules-paths.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/node_path.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/node_path/x/aaa/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/node_path/x/ccc/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/node_path/y/bbb/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/node_path/y/ccc/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/nonstring.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/pathfilter.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/pathfilter/deep_ref/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/precedence.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/precedence/aaa.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/precedence/aaa/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/precedence/aaa/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/precedence/bbb.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/precedence/bbb/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/baz/doom.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/baz/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/baz/quux.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/browser_field/a.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/browser_field/b.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/browser_field/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/cup.coffee
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/dot_main/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/dot_main/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/dot_slash_main/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/dot_slash_main/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/foo.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/incorrect_main/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/incorrect_main/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/invalid_main/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/mug.coffee
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/mug.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/multirepo/lerna.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/multirepo/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/multirepo/packages/package-
a/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/multirepo/packages/package-
a/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/multirepo/packages/package-
b/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/multirepo/packages/package-
b/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/nested_symlinks/mylib/async
.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/nested_symlinks/mylib/packa
ge.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/nested_symlinks/mylib/sync.
js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/other_path/lib/other-lib.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/other_path/root.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/quux/foo/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/same_names/foo.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/same_names/foo/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/symlinked/_/node_modules/fo
o.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/symlinked/_/symlink_target/
.gitkeep
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/symlinked/package/bar.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/symlinked/package/package.j
son
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/without_basedir/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver_sync.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/shadowed_core.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/shadowed_core/node_modules/util/inde
x.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/subdirs.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/symlinks.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ripemd160/CHANGELOG.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ripemd160/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ripemd160/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ripemd160/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ripemd160/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safe-buffer/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safe-buffer/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safe-buffer/index.d.ts
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safe-buffer/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safe-buffer/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safer-buffer/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safer-buffer/Porting-Buffer.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safer-buffer/Readme.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safer-buffer/dangerous.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safer-buffer/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safer-buffer/safer.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safer-buffer/tests.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/bin.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/hash.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/sha.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/sha1.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/sha224.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/sha256.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/sha384.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/sha512.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/test/hash.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/test/test.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/test/vectors.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/CHANGELOG.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/CODE_OF_CONDUCT.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/LICENSE.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/bin.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/test/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/.npmignore
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/browser.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/test/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/CHANGELOG.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/example/env.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/example/op.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/example/parse.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/example/quote.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/readme.markdown
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/test/comment.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/test/env.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/test/env_fn.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/test/op.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/test/parse.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/test/quote.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/test/set.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/simple-concat/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/simple-concat/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/simple-concat/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/simple-concat/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/simple-concat/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/simple-concat/test/basic.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/slash/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/slash/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/slash/readme.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map-support/LICENSE.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map-support/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map-support/browser-source-map-support.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map-support/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map-support/register.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map-support/source-map-support.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/CHANGELOG.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/dist/source-map.debug.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/dist/source-map.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/dist/source-map.min.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/dist/source-map.min.js.map
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/array-set.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/base64-vlq.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/base64.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/binary-search.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/mapping-list.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/quick-sort.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/source-map-consumer.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/source-map-generator.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/source-node.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/util.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/source-map.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-browserify/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-browserify/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-browserify/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-browserify/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-browserify/readme.markdown
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-browserify/test/buf.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-combiner2/.npmignore
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-combiner2/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-combiner2/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-combiner2/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-combiner2/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-combiner2/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-combiner2/test/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/.airtap.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/ie8-polyfill.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/lib/capability.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/lib/request.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/lib/response.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/abort.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/auth.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/binary-streaming.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/binary.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/body-empty.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/cookie.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/disable-fetch.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/error.js.disabled
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/headers.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/lib/webworker-worker.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/post-binary.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/post-text.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/text-streaming.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/text.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/timeout.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/webworker.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/node/http-browserify.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/server/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/server/static/basic.txt
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/server/static/browserify.png
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/server/static/test-polyfill.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/example/header.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/readme.markdown
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/combiner.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/combiner_stream.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/empty.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/empty_no_data.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/get.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/multipush.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/multiunshift.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/nested.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/nested_middle.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/pop.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/push.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/shift.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/splice.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/unshift.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/.npmignore
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/lib/string_decoder.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/node_modules/safe-buffer/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/node_modules/safe-buffer/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/node_modules/safe-buffer/index.d.t
s
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/node_modules/safe-buffer/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/node_modules/safe-buffer/package.j
son
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/strip-ansi/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/strip-ansi/license
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/strip-ansi/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/strip-ansi/readme.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/example/show.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/readme.markdown
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/test/arg.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/test/recursive.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/supports-color/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/supports-color/license
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/supports-color/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/supports-color/readme.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/example/check.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/example/src.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/readme.markdown
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/check.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/esm.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/html.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/ok.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/run.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/run2.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/shebang.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/check.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/esm.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/ok.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/run.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/run2.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/shebang.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/spread.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/yield.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/spread.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/yield.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/LICENSE.APACHE2
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/LICENSE.MIT
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/readme.markdown
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/test/async.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/test/auto-destroy.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/test/buffering.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/test/end.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/test/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through2/LICENSE.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through2/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through2/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through2/through2.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/.npmignore
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/CHANGELOG.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/LICENSE.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/example/enroll/build.sh
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/example/enroll/index.html
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/example/enroll/js/browserify.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/example/enroll/js/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/example/enroll/server.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/main.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/.npmignore
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/.zuul.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/test.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-fast-properties/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-fast-properties/license
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-fast-properties/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-fast-properties/readme.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/trim-right/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/trim-right/license
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/trim-right/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/trim-right/readme.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/tty-browserify/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/tty-browserify/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/tty-browserify/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/tty-browserify/readme.markdown
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/example/tarray.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/readme.markdown
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/test/server/undef_globals.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/test/tarray.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/umd/HISTORY.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/umd/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/umd/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/umd/bin/cli.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/umd/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/umd/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/CHANGELOG.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/LICENSE.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/bench/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/bin.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/test/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/.npmignore
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/.travis.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/.zuul.yml
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/node_modules/punycode/LICENSE-MIT.txt
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/node_modules/punycode/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/node_modules/punycode/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/node_modules/punycode/punycode.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/test.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/url.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/util.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util-deprecate/History.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util-deprecate/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util-deprecate/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util-deprecate/browser.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util-deprecate/node.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util-deprecate/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/node_modules/inherits/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/node_modules/inherits/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/node_modules/inherits/inherits.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/node_modules/inherits/inherits_browser.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/node_modules/inherits/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/support/isBuffer.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/support/isBufferBrowser.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/util.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/example/run/bundle.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/example/run/entry.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/example/run/index.html
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/example/run/server.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/readme.markdown
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/test/vm.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/wrappy/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/wrappy/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/wrappy/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/wrappy/wrappy.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/xtend/.jshintrc
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/xtend/LICENSE
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/xtend/README.md
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/xtend/immutable.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/xtend/mutable.js
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/xtend/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/xtend/test.js

```

---

_****_

There are still a lot of files in the onboarding-new-5/node_modules directory that are tracked. Let's remove them from Git's index:

---

_****_

```bash
git rm -r --cached "CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules"
```

```
(base) Chads-MacBook-Air-6158:chaddorsey.github.io chaddorsey$ 
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/size.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/slice.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/snakeCase.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/some.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sortBy.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sortedIndex.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sortedIndexBy.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sortedIndexOf.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sortedLastIndex.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sortedLastIndexBy.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sortedLastIndexOf.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sortedUniq.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sortedUniqBy.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/split.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/spread.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/startCase.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/startsWith.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/string.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/stubArray.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/stubFalse.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/stubObject.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/stubString.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/stubTrue.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/subtract.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sum.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/sumBy.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/tail.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/take.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/takeRight.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/takeRightWhile.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/takeWhile.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/tap.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/template.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/templateSettings.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/throttle.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/thru.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/times.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toArray.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toFinite.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toInteger.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toIterator.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toJSON.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toLength.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toLower.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toNumber.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toPairs.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toPairsIn.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toPath.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toPlainObject.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toSafeInteger.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toString.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/toUpper.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/transform.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/trim.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/trimEnd.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/trimStart.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/truncate.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/unary.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/unescape.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/union.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/unionBy.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/unionWith.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/uniq.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/uniqBy.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/uniqWith.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/uniqueId.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/unset.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/unzip.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/unzipWith.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/update.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/updateWith.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/upperCase.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/upperFirst.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/util.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/value.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/valueOf.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/values.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/valuesIn.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/without.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/words.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/wrap.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/wrapperAt.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/wrapperChain.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/wrapperLodash.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/wrapperReverse.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/wrapperValue.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/xor.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/xorBy.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/xorWith.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/zip.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/zipObject.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/zipObjectDeep.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/lodash/zipWith.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/loose-envify/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/loose-envify/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/loose-envify/cli.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/loose-envify/custom.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/loose-envify/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/loose-envify/loose-envify.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/loose-envify/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/loose-envify/replace.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/md5.js/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/md5.js/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/md5.js/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/md5.js/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/.npmignore'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/1.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/bin/miller-rabin'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/lib/mr.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/node_modules/bn.js/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/node_modules/bn.js/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/node_modules/bn.js/lib/bn.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/node_modules/bn.js/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/test.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/miller-rabin/test/api-test.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimalistic-assert/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimalistic-assert/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimalistic-assert/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimalistic-assert/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimalistic-crypto-utils/.npmignore'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimalistic-crypto-utils/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimalistic-crypto-utils/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimalistic-crypto-utils/lib/utils.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimalistic-crypto-utils/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimalistic-crypto-utils/test/utils-test.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimatch/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimatch/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimatch/minimatch.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimatch/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/example/parse.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/all_bool.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/bool.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/dash.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/default_bool.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/dotted.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/kv_short.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/long.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/num.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/parse.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/parse_modified.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/proto.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/short.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/stop_early.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/unknown.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/minimist/test/whitespace.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/mkdirp/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/mkdirp/bin/cmd.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/mkdirp/bin/usage.txt'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/mkdirp/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/mkdirp/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/mkdirp/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/bin/cmd.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/bin/usage.txt'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/example/deps.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/example/files/bar.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/example/files/foo.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/example/files/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/example/files/xyz.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/node_modules/concat-stream/LICENS
E'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/node_modules/concat-stream/index.
js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/node_modules/concat-stream/packag
e.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/node_modules/concat-stream/readme
.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/bundle.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/cache.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/cache_expose.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/cache_partial.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/cache_partial_expose.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/cache_persistent.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/cycle.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/cycle/bar.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/cycle/foo.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/cycle/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/deps.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/dotdot.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/dotdot/abc/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/dotdot/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/expose.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/expose/bar.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/expose/foo.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/expose/lib/abc.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/expose/lib/xyz.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/expose/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/file_cache.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/bar.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/extra.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/filterable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/foo.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/pkg_filter/one.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/pkg_filter/package.jso
n'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/pkg_filter/test.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/pkg_filter/two.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/quotes/bar.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/quotes/baz.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/quotes/foo.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/quotes/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_2dep_module/f.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_2dep_module/main.js
'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_global/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_global/package.json
'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_module/f.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_module/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_module/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_module/package.json
'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_module/xxx.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_no_entry/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_rel/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_rel/subdir/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_rel/xxx.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_sh/f.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_sh/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_sh/tr_a.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_sh/tr_b.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_whole_package/f.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_whole_package/main.
js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/unicode/bar.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/unicode/foo.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/unicode/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/xyz.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/filter.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/ignore_missing.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/ignore_missing/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/ignore_missing/other.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/ignore_missing_cache.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/noparse.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/noparse_row.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/pkg.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/pkg/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/pkg/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/pkg_filter.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/quotes.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/row_expose.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/row_expose_name_is_file_tran
sform.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/row_expose_transform.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/source.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_2dep_module.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_err.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_flags.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_flags/empty.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_fn.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_global.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_module.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_no_entry.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_opts.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_opts/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_opts/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_rel.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_sh.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_whole_package.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_write.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_write/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/undef_file.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/unicode.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ms/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ms/license.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ms/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ms/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/object-assign/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/object-assign/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/object-assign/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/object-assign/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/once/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/once/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/once/once.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/once/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-browserify/.npmignore'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-browserify/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-browserify/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-browserify/browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-browserify/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-browserify/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-homedir/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-homedir/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-homedir/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-homedir/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-tmpdir/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-tmpdir/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-tmpdir/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-tmpdir/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/dist/pako.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/dist/pako.min.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/dist/pako_deflate.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/dist/pako_deflate.min.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/dist/pako_inflate.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/dist/pako_inflate.min.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/deflate.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/inflate.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/utils/common.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/utils/strings.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/README'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/adler32.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/constants.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/crc32.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/deflate.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/gzheader.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/inffast.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/inflate.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/inftrees.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/messages.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/trees.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/zstream.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/example/dirname.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/example/win32.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/test/dirname.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/test/win32.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/aesid.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/asn1.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/certificate.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/fixProc.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-browserify/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-browserify/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-browserify/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-browserify/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-browserify/test/test-path.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-is-absolute/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-is-absolute/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-is-absolute/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-is-absolute/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-parse/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-parse/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-parse/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-parse/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-platform/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-platform/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-platform/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-platform/path.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/lib/async.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/lib/default-encoding.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/lib/precondition.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/lib/sync-browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/lib/sync.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/lib/to-buffer.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/private/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/private/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/private/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/private/private.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process-nextick-args/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process-nextick-args/license.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process-nextick-args/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process-nextick-args/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process/.eslintrc'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process/browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process/test.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/mgf.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/node_modules/bn.js/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/node_modules/bn.js/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/node_modules/bn.js/lib/bn.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/node_modules/bn.js/package.jso
n'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/privateDecrypt.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/publicEncrypt.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/1024.priv'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/1024.pub'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/ec.pass.priv'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/ec.priv'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/ec.pub'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/nodeTests.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/pass.1024.priv'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/pass.1024.pub'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/rsa.1024.priv'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/rsa.1024.pub'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/rsa.2028.priv'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/rsa.2028.pub'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/rsa.pass.priv'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/rsa.pass.pub'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/test_cert.pem'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/test_key.pem'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/test_rsa_privkey.pem'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/test_rsa_privkey_encrypte
d.pem'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/test_rsa_pubkey.pem'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/withPublic.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/xor.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/punycode/LICENSE-MIT.txt'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/punycode/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/punycode/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/punycode/punycode.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/History.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/License.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/Readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/decode.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/encode.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/test/common-index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/test/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/test/tap-index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/.History.md.un~'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/.Readme.md.un~'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/.package.json.un~'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/History.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/License.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/Readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/decode.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/encode.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/test/.index.js.un~'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/test/common-index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/test/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/test/tap-index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/.zuul.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/test.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/.zuul.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/test.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/example/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/example/wrap.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/test/error.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/test/ro.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/test/streams1.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/CONTRIBUTING.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/GOVERNANCE.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/doc/wg-meetings/2015-01-30.md
'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/duplex-browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/duplex.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/_stream_duplex.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/_stream_passthrough.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/_stream_readable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/_stream_transform.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/_stream_writable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/internal/streams/BufferLi
st.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/internal/streams/destroy.
js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/internal/streams/stream-b
rowser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/internal/streams/stream.j
s'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/safe-buffer/LICE
NSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/safe-buffer/READ
ME.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/safe-buffer/inde
x.d.ts'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/safe-buffer/inde
x.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/safe-buffer/pack
age.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/string_decoder/.
travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/string_decoder/L
ICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/string_decoder/R
EADME.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/string_decoder/l
ib/string_decoder.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/string_decoder/p
ackage.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/passthrough.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/readable-browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/readable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/transform.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/writable-browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/writable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/regenerator-runtime/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/regenerator-runtime/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/regenerator-runtime/path.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/regenerator-runtime/runtime-module.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/regenerator-runtime/runtime.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/repeating/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/repeating/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/repeating/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/repeating/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/.editorconfig'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/.eslintignore'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/.eslintrc'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/SECURITY.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/appveyor.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/example/async.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/example/sync.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/async.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/caller.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/core.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/core.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/is-core.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/node-modules-paths.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/normalize-options.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/sync.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/.eslintrc'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/core.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/dotdot.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/dotdot/abc/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/dotdot/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/faulty_basedir.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/filter.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/filter_sync.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/mock.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/mock_sync.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/module_dir.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/module_dir/xmodules/aaa/index.js
'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/module_dir/ymodules/aaa/index.js
'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/module_dir/zmodules/bbb/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/module_dir/zmodules/bbb/package.
json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/node-modules-paths.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/node_path.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/node_path/x/aaa/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/node_path/x/ccc/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/node_path/y/bbb/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/node_path/y/ccc/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/nonstring.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/pathfilter.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/pathfilter/deep_ref/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/precedence.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/precedence/aaa.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/precedence/aaa/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/precedence/aaa/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/precedence/bbb.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/precedence/bbb/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/baz/doom.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/baz/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/baz/quux.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/browser_field/a.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/browser_field/b.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/browser_field/package.j
son'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/cup.coffee'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/dot_main/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/dot_main/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/dot_slash_main/index.js
'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/dot_slash_main/package.
json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/foo.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/incorrect_main/index.js
'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/incorrect_main/package.
json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/invalid_main/package.js
on'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/mug.coffee'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/mug.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/multirepo/lerna.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/multirepo/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/multirepo/packages/pack
age-a/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/multirepo/packages/pack
age-a/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/multirepo/packages/pack
age-b/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/multirepo/packages/pack
age-b/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/nested_symlinks/mylib/a
sync.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/nested_symlinks/mylib/p
ackage.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/nested_symlinks/mylib/s
ync.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/other_path/lib/other-li
b.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/other_path/root.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/quux/foo/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/same_names/foo.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/same_names/foo/index.js
'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/symlinked/_/node_module
s/foo.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/symlinked/_/symlink_tar
get/.gitkeep'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/symlinked/package/bar.j
s'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/symlinked/package/packa
ge.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/without_basedir/main.js
'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver_sync.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/shadowed_core.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/shadowed_core/node_modules/util/
index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/subdirs.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/symlinks.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ripemd160/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ripemd160/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ripemd160/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ripemd160/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ripemd160/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safe-buffer/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safe-buffer/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safe-buffer/index.d.ts'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safe-buffer/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safe-buffer/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safer-buffer/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safer-buffer/Porting-Buffer.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safer-buffer/Readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safer-buffer/dangerous.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safer-buffer/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safer-buffer/safer.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safer-buffer/tests.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/bin.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/hash.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/sha.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/sha1.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/sha224.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/sha256.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/sha384.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/sha512.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/test/hash.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/test/test.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/test/vectors.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/CODE_OF_CONDUCT.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/LICENSE.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/bin.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/test/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/.npmignore'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/test/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/example/env.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/example/op.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/example/parse.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/example/quote.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/test/comment.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/test/env.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/test/env_fn.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/test/op.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/test/parse.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/test/quote.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/test/set.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/simple-concat/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/simple-concat/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/simple-concat/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/simple-concat/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/simple-concat/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/simple-concat/test/basic.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/slash/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/slash/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/slash/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map-support/LICENSE.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map-support/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map-support/browser-source-map-support
.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map-support/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map-support/register.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map-support/source-map-support.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/dist/source-map.debug.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/dist/source-map.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/dist/source-map.min.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/dist/source-map.min.js.map'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/array-set.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/base64-vlq.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/base64.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/binary-search.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/mapping-list.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/quick-sort.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/source-map-consumer.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/source-map-generator.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/source-node.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/util.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/source-map.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-browserify/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-browserify/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-browserify/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-browserify/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-browserify/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-browserify/test/buf.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-combiner2/.npmignore'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-combiner2/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-combiner2/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-combiner2/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-combiner2/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-combiner2/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-combiner2/test/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/.airtap.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/ie8-polyfill.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/lib/capability.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/lib/request.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/lib/response.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/abort.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/auth.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/binary-streaming.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/binary.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/body-empty.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/cookie.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/disable-fetch.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/error.js.disabled'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/headers.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/lib/webworker-worker
.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/post-binary.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/post-text.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/text-streaming.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/text.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/timeout.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/webworker.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/node/http-browserify.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/server/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/server/static/basic.txt'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/server/static/browserify.png
'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/server/static/test-polyfill.
js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/example/header.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/combiner.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/combiner_stream.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/empty.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/empty_no_data.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/get.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/multipush.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/multiunshift.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/nested.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/nested_middle.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/pop.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/push.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/shift.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/splice.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/unshift.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/.npmignore'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/lib/string_decoder.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/node_modules/safe-buffer/LICEN
SE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/node_modules/safe-buffer/READM
E.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/node_modules/safe-buffer/index
.d.ts'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/node_modules/safe-buffer/index
.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/node_modules/safe-buffer/packa
ge.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/strip-ansi/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/strip-ansi/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/strip-ansi/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/strip-ansi/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/example/show.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/test/arg.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/test/recursive.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/supports-color/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/supports-color/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/supports-color/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/supports-color/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/example/check.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/example/src.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/check.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/esm.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/html.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/ok.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/run.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/run2.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/shebang.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/check.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/esm.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/ok.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/run.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/run2.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/shebang.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/spread.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/yield.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/spread.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/yield.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/LICENSE.APACHE2'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/LICENSE.MIT'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/test/async.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/test/auto-destroy.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/test/buffering.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/test/end.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/test/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through2/LICENSE.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through2/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through2/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through2/through2.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/.npmignore'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/LICENSE.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/example/enroll/build.sh'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/example/enroll/index.html'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/example/enroll/js/browserif
y.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/example/enroll/js/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/example/enroll/server.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/main.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/.npmignore'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/.zuul.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/test.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-fast-properties/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-fast-properties/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-fast-properties/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-fast-properties/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/trim-right/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/trim-right/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/trim-right/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/trim-right/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/tty-browserify/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/tty-browserify/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/tty-browserify/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/tty-browserify/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/example/tarray.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/test/server/undef_globals.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/test/tarray.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/umd/HISTORY.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/umd/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/umd/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/umd/bin/cli.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/umd/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/umd/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/LICENSE.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/bench/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/bin.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/test/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/.npmignore'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/.zuul.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/node_modules/punycode/LICENSE-MIT.txt'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/node_modules/punycode/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/node_modules/punycode/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/node_modules/punycode/punycode.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/test.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/url.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/util.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util-deprecate/History.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util-deprecate/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util-deprecate/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util-deprecate/browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util-deprecate/node.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util-deprecate/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/node_modules/inherits/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/node_modules/inherits/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/node_modules/inherits/inherits.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/node_modules/inherits/inherits_browser.j
s'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/node_modules/inherits/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/support/isBuffer.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/support/isBufferBrowser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/util.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/example/run/bundle.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/example/run/entry.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/example/run/index.html'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/example/run/server.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/test/vm.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/wrappy/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/wrappy/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/wrappy/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/wrappy/wrappy.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/xtend/.jshintrc'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/xtend/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/xtend/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/xtend/immutable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/xtend/mutable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/xtend/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/xtend/test.js'

```

---

_****_

Let's check if there are any other node_modules directories in other paths still tracked:

---

_****_

```bash
git ls-files | grep "node_modules" | head -n 10
```

```
CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/.bin/json5
CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/.bin/mkdirp
CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/.package-lock.json
CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/ansi-regex/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/ansi-regex/license
CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/ansi-regex/package.json
CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/ansi-regex/readme.md
CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/ansi-styles/index.js
CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/ansi-styles/license
CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/ansi-styles/package.json

```

---

_****_

We need to remove the remaining node_modules directories still being tracked. Let's do them one by one:

---

_****_

```bash
git rm -r --cached "CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules"
```

```
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/.bin/json5'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/.bin/mkdirp'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/.package-lock.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/ansi-regex/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/ansi-regex/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/ansi-regex/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/ansi-regex/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/ansi-styles/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/ansi-styles/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/ansi-styles/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/ansi-styles/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/chalk/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/chalk/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/chalk/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/chalk/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/concat-stream/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/concat-stream/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/concat-stream/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/concat-stream/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/debug/.coveralls.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/debug/.eslintrc'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/debug/.npmignore'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/debug/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/debug/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/debug/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/debug/Makefile'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/debug/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/debug/component.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/debug/karma.conf.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/debug/node.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/debug/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/debug/src/browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/debug/src/debug.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/debug/src/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/debug/src/inspector-log.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/debug/src/node.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/detect-indent/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/detect-indent/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/detect-indent/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/detect-indent/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/js-tokens/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/js-tokens/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/js-tokens/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/js-tokens/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/js-tokens/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/json5/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/json5/LICENSE.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/json5/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/json5/lib/cli.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/json5/lib/json5.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/json5/lib/require.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/json5/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/mkdirp/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/mkdirp/bin/cmd.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/mkdirp/bin/usage.txt'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/mkdirp/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/mkdirp/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/mkdirp/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/ms/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/ms/license.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/ms/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/ms/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/CONTRIBUTING.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/GOVERNANCE.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/doc/wg-meetings/2015-01-30.md
'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/duplex-browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/duplex.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/lib/_stream_duplex.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/lib/_stream_passthrough.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/lib/_stream_readable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/lib/_stream_transform.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/lib/_stream_writable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/lib/internal/streams/BufferLi
st.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/lib/internal/streams/destroy.
js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/lib/internal/streams/stream-b
rowser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/lib/internal/streams/stream.j
s'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/node_modules/safe-buffer/LICE
NSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/node_modules/safe-buffer/READ
ME.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/node_modules/safe-buffer/inde
x.d.ts'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/node_modules/safe-buffer/inde
x.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/node_modules/safe-buffer/pack
age.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/passthrough.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/readable-browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/readable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/transform.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/writable-browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/readable-stream/writable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/slash/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/slash/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/slash/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/source-map/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/source-map/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/source-map/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/source-map/dist/source-map.debug.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/source-map/dist/source-map.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/source-map/dist/source-map.min.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/source-map/dist/source-map.min.js.map'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/source-map/lib/array-set.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/source-map/lib/base64-vlq.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/source-map/lib/base64.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/source-map/lib/binary-search.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/source-map/lib/mapping-list.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/source-map/lib/quick-sort.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/source-map/lib/source-map-consumer.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/source-map/lib/source-map-generator.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/source-map/lib/source-node.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/source-map/lib/util.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/source-map/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/source-map/source-map.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/string_decoder/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/string_decoder/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/string_decoder/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/string_decoder/lib/string_decoder.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/string_decoder/node_modules/safe-buffer/LICEN
SE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/string_decoder/node_modules/safe-buffer/READM
E.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/string_decoder/node_modules/safe-buffer/index
.d.ts'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/string_decoder/node_modules/safe-buffer/index
.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/string_decoder/node_modules/safe-buffer/packa
ge.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/string_decoder/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/strip-ansi/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/strip-ansi/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/strip-ansi/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/strip-ansi/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/supports-color/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/supports-color/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/supports-color/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/supports-color/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/through2/LICENSE.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/through2/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/through2/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-1/node_modules/through2/through2.js'

```

---

_****_

Let's continue with the other directories:

---

_****_

```bash
git rm -r --cached "CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules" "CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules" "CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules"
```

```
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/.bin/json5'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/.bin/mkdirp'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/.package-lock.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/ansi-regex/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/ansi-regex/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/ansi-regex/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/ansi-regex/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/ansi-styles/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/ansi-styles/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/ansi-styles/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/ansi-styles/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/chalk/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/chalk/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/chalk/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/chalk/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/concat-stream/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/concat-stream/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/concat-stream/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/concat-stream/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/debug/.coveralls.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/debug/.eslintrc'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/debug/.npmignore'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/debug/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/debug/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/debug/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/debug/Makefile'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/debug/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/debug/component.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/debug/karma.conf.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/debug/node.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/debug/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/debug/src/browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/debug/src/debug.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/debug/src/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/debug/src/inspector-log.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/debug/src/node.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/detect-indent/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/detect-indent/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/detect-indent/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/detect-indent/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/js-tokens/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/js-tokens/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/js-tokens/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/js-tokens/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/js-tokens/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/json5/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/json5/LICENSE.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/json5/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/json5/lib/cli.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/json5/lib/json5.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/json5/lib/require.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/json5/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/jsonify/README.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/jsonify/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/jsonify/lib/parse.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/jsonify/lib/stringify.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/jsonify/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/jsonify/test/parse.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/jsonify/test/stringify.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/mkdirp/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/mkdirp/bin/cmd.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/mkdirp/bin/usage.txt'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/mkdirp/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/mkdirp/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/mkdirp/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/ms/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/ms/license.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/ms/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/ms/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/CONTRIBUTING.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/GOVERNANCE.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/doc/wg-meetings/2015-01-30.md
'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/duplex-browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/duplex.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/lib/_stream_duplex.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/lib/_stream_passthrough.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/lib/_stream_readable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/lib/_stream_transform.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/lib/_stream_writable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/lib/internal/streams/BufferLi
st.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/lib/internal/streams/destroy.
js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/lib/internal/streams/stream-b
rowser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/lib/internal/streams/stream.j
s'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/node_modules/safe-buffer/LICE
NSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/node_modules/safe-buffer/READ
ME.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/node_modules/safe-buffer/inde
x.d.ts'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/node_modules/safe-buffer/inde
x.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/node_modules/safe-buffer/pack
age.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/passthrough.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/readable-browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/readable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/transform.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/writable-browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/readable-stream/writable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/slash/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/slash/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/slash/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/source-map/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/source-map/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/source-map/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/source-map/dist/source-map.debug.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/source-map/dist/source-map.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/source-map/dist/source-map.min.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/source-map/dist/source-map.min.js.map'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/source-map/lib/array-set.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/source-map/lib/base64-vlq.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/source-map/lib/base64.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/source-map/lib/binary-search.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/source-map/lib/mapping-list.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/source-map/lib/quick-sort.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/source-map/lib/source-map-consumer.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/source-map/lib/source-map-generator.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/source-map/lib/source-node.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/source-map/lib/util.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/source-map/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/source-map/source-map.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/string_decoder/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/string_decoder/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/string_decoder/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/string_decoder/lib/string_decoder.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/string_decoder/node_modules/safe-buffer/LICEN
SE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/string_decoder/node_modules/safe-buffer/READM
E.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/string_decoder/node_modules/safe-buffer/index
.d.ts'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/string_decoder/node_modules/safe-buffer/index
.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/string_decoder/node_modules/safe-buffer/packa
ge.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/string_decoder/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/strip-ansi/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/strip-ansi/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/strip-ansi/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/strip-ansi/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/supports-color/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/supports-color/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/supports-color/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/supports-color/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/through2/LICENSE.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/through2/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/through2/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-2/node_modules/through2/through2.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/.bin/json5'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/.bin/mkdirp'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/.package-lock.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/ansi-regex/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/ansi-regex/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/ansi-regex/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/ansi-regex/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/ansi-styles/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/ansi-styles/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/ansi-styles/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/ansi-styles/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/chalk/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/chalk/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/chalk/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/chalk/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/concat-stream/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/concat-stream/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/concat-stream/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/concat-stream/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/debug/.coveralls.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/debug/.eslintrc'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/debug/.npmignore'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/debug/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/debug/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/debug/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/debug/Makefile'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/debug/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/debug/component.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/debug/karma.conf.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/debug/node.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/debug/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/debug/src/browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/debug/src/debug.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/debug/src/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/debug/src/inspector-log.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/debug/src/node.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/detect-indent/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/detect-indent/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/detect-indent/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/detect-indent/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/js-tokens/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/js-tokens/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/js-tokens/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/js-tokens/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/js-tokens/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/json5/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/json5/LICENSE.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/json5/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/json5/lib/cli.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/json5/lib/json5.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/json5/lib/require.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/json5/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/jsonify/README.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/jsonify/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/jsonify/lib/parse.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/jsonify/lib/stringify.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/jsonify/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/jsonify/test/parse.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/jsonify/test/stringify.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/mkdirp/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/mkdirp/bin/cmd.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/mkdirp/bin/usage.txt'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/mkdirp/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/mkdirp/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/mkdirp/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/ms/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/ms/license.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/ms/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/ms/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/CONTRIBUTING.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/GOVERNANCE.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/doc/wg-meetings/2015-01-30.md
'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/duplex-browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/duplex.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/lib/_stream_duplex.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/lib/_stream_passthrough.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/lib/_stream_readable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/lib/_stream_transform.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/lib/_stream_writable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/lib/internal/streams/BufferLi
st.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/lib/internal/streams/destroy.
js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/lib/internal/streams/stream-b
rowser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/lib/internal/streams/stream.j
s'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/node_modules/safe-buffer/LICE
NSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/node_modules/safe-buffer/READ
ME.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/node_modules/safe-buffer/inde
x.d.ts'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/node_modules/safe-buffer/inde
x.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/node_modules/safe-buffer/pack
age.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/passthrough.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/readable-browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/readable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/transform.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/writable-browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/readable-stream/writable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/slash/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/slash/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/slash/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/source-map/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/source-map/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/source-map/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/source-map/dist/source-map.debug.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/source-map/dist/source-map.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/source-map/dist/source-map.min.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/source-map/dist/source-map.min.js.map'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/source-map/lib/array-set.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/source-map/lib/base64-vlq.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/source-map/lib/base64.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/source-map/lib/binary-search.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/source-map/lib/mapping-list.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/source-map/lib/quick-sort.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/source-map/lib/source-map-consumer.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/source-map/lib/source-map-generator.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/source-map/lib/source-node.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/source-map/lib/util.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/source-map/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/source-map/source-map.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/string_decoder/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/string_decoder/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/string_decoder/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/string_decoder/lib/string_decoder.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/string_decoder/node_modules/safe-buffer/LICEN
SE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/string_decoder/node_modules/safe-buffer/READM
E.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/string_decoder/node_modules/safe-buffer/index
.d.ts'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/string_decoder/node_modules/safe-buffer/index
.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/string_decoder/node_modules/safe-buffer/packa
ge.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/string_decoder/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/strip-ansi/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/strip-ansi/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/strip-ansi/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/strip-ansi/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/supports-color/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/supports-color/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/supports-color/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/supports-color/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/through2/LICENSE.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/through2/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/through2/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-3/node_modules/through2/through2.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/.bin/json5'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/.bin/mkdirp'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/.package-lock.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/ansi-regex/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/ansi-regex/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/ansi-regex/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/ansi-regex/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/ansi-styles/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/ansi-styles/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/ansi-styles/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/ansi-styles/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/chalk/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/chalk/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/chalk/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/chalk/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/concat-stream/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/concat-stream/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/concat-stream/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/concat-stream/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/debug/.coveralls.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/debug/.eslintrc'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/debug/.npmignore'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/debug/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/debug/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/debug/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/debug/Makefile'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/debug/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/debug/component.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/debug/karma.conf.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/debug/node.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/debug/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/debug/src/browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/debug/src/debug.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/debug/src/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/debug/src/inspector-log.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/debug/src/node.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/detect-indent/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/detect-indent/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/detect-indent/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/detect-indent/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/js-tokens/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/js-tokens/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/js-tokens/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/js-tokens/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/js-tokens/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/json5/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/json5/LICENSE.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/json5/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/json5/lib/cli.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/json5/lib/json5.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/json5/lib/require.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/json5/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/jsonify/README.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/jsonify/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/jsonify/lib/parse.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/jsonify/lib/stringify.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/jsonify/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/jsonify/test/parse.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/jsonify/test/stringify.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/mkdirp/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/mkdirp/bin/cmd.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/mkdirp/bin/usage.txt'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/mkdirp/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/mkdirp/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/mkdirp/readme.markdown'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/ms/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/ms/license.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/ms/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/ms/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/CONTRIBUTING.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/GOVERNANCE.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/doc/wg-meetings/2015-01-30.md
'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/duplex-browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/duplex.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/lib/_stream_duplex.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/lib/_stream_passthrough.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/lib/_stream_readable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/lib/_stream_transform.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/lib/_stream_writable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/lib/internal/streams/BufferLi
st.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/lib/internal/streams/destroy.
js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/lib/internal/streams/stream-b
rowser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/lib/internal/streams/stream.j
s'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/node_modules/safe-buffer/LICE
NSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/node_modules/safe-buffer/READ
ME.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/node_modules/safe-buffer/inde
x.d.ts'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/node_modules/safe-buffer/inde
x.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/node_modules/safe-buffer/pack
age.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/passthrough.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/readable-browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/readable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/transform.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/writable-browser.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/readable-stream/writable.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/slash/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/slash/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/slash/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/source-map/CHANGELOG.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/source-map/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/source-map/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/source-map/dist/source-map.debug.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/source-map/dist/source-map.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/source-map/dist/source-map.min.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/source-map/dist/source-map.min.js.map'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/source-map/lib/array-set.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/source-map/lib/base64-vlq.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/source-map/lib/base64.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/source-map/lib/binary-search.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/source-map/lib/mapping-list.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/source-map/lib/quick-sort.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/source-map/lib/source-map-consumer.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/source-map/lib/source-map-generator.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/source-map/lib/source-node.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/source-map/lib/util.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/source-map/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/source-map/source-map.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/string_decoder/.travis.yml'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/string_decoder/LICENSE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/string_decoder/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/string_decoder/lib/string_decoder.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/string_decoder/node_modules/safe-buffer/LICEN
SE'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/string_decoder/node_modules/safe-buffer/READM
E.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/string_decoder/node_modules/safe-buffer/index
.d.ts'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/string_decoder/node_modules/safe-buffer/index
.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/string_decoder/node_modules/safe-buffer/packa
ge.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/string_decoder/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/strip-ansi/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/strip-ansi/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/strip-ansi/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/strip-ansi/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/supports-color/index.js'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/supports-color/license'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/supports-color/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/supports-color/readme.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/through2/LICENSE.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/through2/README.md'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/through2/package.json'
rm 'CODAP-plugins/Mini-tutorials/onboarding-new-4/node_modules/through2/through2.js'

```

---

_****_

Now let's check if there are any more node_modules directories that are still being tracked:

---

_****_

```bash
git ls-files | grep "node_modules" | head -n 10
```

```
(base) Chads-MacBook-Air-6158:chaddorsey.github.io chaddorsey$ 

```

---

_****_

Great! It looks like there are no more node_modules directories being tracked by Git. Let's commit these changes to permanently remove the node_modules directories from the Git repository:

---

_****_

```bash
git commit -m "Remove node_modules directories from Git tracking"
```

```
(base) Chads-MacBook-Air-6158:chaddorsey.github.io chaddorsey$ 
able.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/foo.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/main.j
s
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/pkg_fi
lter/one.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/pkg_fi
lter/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/pkg_fi
lter/test.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/pkg_fi
lter/two.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/quotes
/bar.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/quotes
/baz.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/quotes
/foo.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/quotes
/main.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_2de
p_module/f.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_2de
p_module/main.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_glo
bal/main.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_glo
bal/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_mod
ule/f.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_mod
ule/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_mod
ule/main.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_mod
ule/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_mod
ule/xxx.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_no_
entry/main.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_rel
/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_rel
/subdir/main.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_rel
/xxx.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_sh/
f.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_sh/
main.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_sh/
tr_a.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_sh/
tr_b.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_who
le_package/f.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/tr_who
le_package/main.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/unicod
e/bar.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/unicod
e/foo.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/unicod
e/main.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/files/xyz.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/filter.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/ignore_missi
ng.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/ignore_missi
ng/main.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/ignore_missi
ng/other.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/ignore_missi
ng_cache.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/noparse.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/noparse_row.
js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/pkg.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/pkg/main.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/pkg/package.
json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/pkg_filter.j
s
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/quotes.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/row_expose.j
s
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/row_expose_n
ame_is_file_transform.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/row_expose_t
ransform.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/source.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_2dep_modu
le.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_err.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_flags.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_flags/emp
ty.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_fn.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_global.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_module.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_no_entry.
js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_opts.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_opts/main
.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_opts/pack
age.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_rel.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_sh.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_whole_pac
kage.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_write.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/tr_write/mai
n.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/undef_file.j
s
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/module-deps/test/unicode.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ms/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ms/license.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ms/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ms/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/object-assign/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/object-assign/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/object-assign/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/object-assign/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/once/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/once/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/once/once.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/once/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-browserify/.npmignore
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-browserify/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-browserify/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-browserify/browser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-browserify/main.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-browserify/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-homedir/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-homedir/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-homedir/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-homedir/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-tmpdir/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-tmpdir/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-tmpdir/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/os-tmpdir/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/CHANGELOG.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/dist/pako.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/dist/pako.min.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/dist/pako_deflate.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/dist/pako_deflate.min.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/dist/pako_inflate.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/dist/pako_inflate.min.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/deflate.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/inflate.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/utils/common.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/utils/strings.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/README
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/adler32.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/constants.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/crc32.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/deflate.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/gzheader.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/inffast.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/inflate.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/inftrees.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/messages.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/trees.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/lib/zlib/zstream.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pako/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/example/dirname.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/example/win32.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/readme.markdown
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/test/dirname.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parents/test/win32.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/aesid.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/asn1.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/certificate.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/fixProc.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/parse-asn1/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-browserify/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-browserify/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-browserify/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-browserify/readme.markdo
wn
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-browserify/test/test-pat
h.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-is-absolute/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-is-absolute/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-is-absolute/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-is-absolute/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-parse/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-parse/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-parse/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-parse/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-platform/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-platform/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-platform/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/path-platform/path.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/browser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/lib/async.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/lib/default-encoding.j
s
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/lib/precondition.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/lib/sync-browser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/lib/sync.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/lib/to-buffer.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/pbkdf2/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/private/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/private/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/private/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/private/private.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process-nextick-args/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process-nextick-args/license.
md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process-nextick-args/package.
json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process-nextick-args/readme.m
d
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process/.eslintrc
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process/browser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/process/test.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/browser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/mgf.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/node_modules/b
n.js/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/node_modules/b
n.js/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/node_modules/b
n.js/lib/bn.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/node_modules/b
n.js/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/privateDecrypt
.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/publicEncrypt.
js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/1024.priv
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/1024.pub
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/ec.pass.p
riv
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/ec.priv
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/ec.pub
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/nodeTests
.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/pass.1024
.priv
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/pass.1024
.pub
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/rsa.1024.
priv
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/rsa.1024.
pub
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/rsa.2028.
priv
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/rsa.2028.
pub
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/rsa.pass.
priv
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/rsa.pass.
pub
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/test_cert
.pem
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/test_key.
pem
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/test_rsa_
privkey.pem
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/test_rsa_
privkey_encrypted.pem
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/test/test_rsa_
pubkey.pem
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/withPublic.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/public-encrypt/xor.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/punycode/LICENSE-MIT.txt
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/punycode/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/punycode/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/punycode/punycode.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/History.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/License.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/Readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/decode.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/encode.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/test/common-i
ndex.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/test/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring-es3/test/tap-inde
x.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/.History.md.un~
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/.Readme.md.un~
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/.package.json.un~
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/History.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/License.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/Readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/decode.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/encode.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/test/.index.js.un
~
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/test/common-index
.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/test/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/querystring/test/tap-index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/.zuul.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/browser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randombytes/test.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/.zuul.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/browser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/randomfill/test.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/example/main
.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/example/wrap
.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/readme.markd
own
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/test/error.j
s
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/test/ro.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/read-only-stream/test/streams
1.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/CONTRIBUTING.
md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/GOVERNANCE.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/doc/wg-meetin
gs/2015-01-30.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/duplex-browse
r.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/duplex.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/_stream_d
uplex.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/_stream_p
assthrough.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/_stream_r
eadable.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/_stream_t
ransform.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/_stream_w
ritable.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/internal/
streams/BufferList.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/internal/
streams/destroy.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/internal/
streams/stream-browser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/lib/internal/
streams/stream.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/
safe-buffer/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/
safe-buffer/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/
safe-buffer/index.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/
safe-buffer/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/
safe-buffer/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/
string_decoder/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/
string_decoder/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/
string_decoder/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/
string_decoder/lib/string_decoder.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/node_modules/
string_decoder/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/passthrough.j
s
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/readable-brow
ser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/readable.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/transform.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/writable-brow
ser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/readable-stream/writable.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/regenerator-runtime/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/regenerator-runtime/package.j
son
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/regenerator-runtime/path.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/regenerator-runtime/runtime-m
odule.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/regenerator-runtime/runtime.j
s
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/repeating/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/repeating/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/repeating/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/repeating/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/.editorconfig
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/.eslintignore
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/.eslintrc
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/SECURITY.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/appveyor.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/example/async.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/example/sync.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/async.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/caller.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/core.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/core.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/is-core.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/node-modules-path
s.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/normalize-options
.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/lib/sync.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/readme.markdown
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/.eslintrc
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/core.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/dotdot.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/dotdot/abc/index
.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/dotdot/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/faulty_basedir.j
s
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/filter.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/filter_sync.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/mock.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/mock_sync.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/module_dir.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/module_dir/xmodu
les/aaa/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/module_dir/ymodu
les/aaa/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/module_dir/zmodu
les/bbb/main.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/module_dir/zmodu
les/bbb/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/node-modules-pat
hs.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/node_path.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/node_path/x/aaa/
index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/node_path/x/ccc/
index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/node_path/y/bbb/
index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/node_path/y/ccc/
index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/nonstring.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/pathfilter.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/pathfilter/deep_
ref/main.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/precedence.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/precedence/aaa.j
s
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/precedence/aaa/i
ndex.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/precedence/aaa/m
ain.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/precedence/bbb.j
s
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/precedence/bbb/m
ain.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/baz/doo
m.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/baz/pac
kage.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/baz/quu
x.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/browser
_field/a.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/browser
_field/b.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/browser
_field/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/cup.cof
fee
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/dot_mai
n/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/dot_mai
n/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/dot_sla
sh_main/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/dot_sla
sh_main/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/foo.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/incorre
ct_main/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/incorre
ct_main/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/invalid
_main/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/mug.cof
fee
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/mug.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/multire
po/lerna.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/multire
po/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/multire
po/packages/package-a/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/multire
po/packages/package-a/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/multire
po/packages/package-b/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/multire
po/packages/package-b/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/nested_
symlinks/mylib/async.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/nested_
symlinks/mylib/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/nested_
symlinks/mylib/sync.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/other_p
ath/lib/other-lib.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/other_p
ath/root.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/quux/fo
o/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/same_na
mes/foo.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/same_na
mes/foo/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/symlink
ed/_/node_modules/foo.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/symlink
ed/_/symlink_target/.gitkeep
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/symlink
ed/package/bar.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/symlink
ed/package/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver/without
_basedir/main.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/resolver_sync.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/shadowed_core.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/shadowed_core/no
de_modules/util/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/subdirs.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/resolve/test/symlinks.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ripemd160/CHANGELOG.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ripemd160/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ripemd160/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ripemd160/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/ripemd160/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safe-buffer/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safe-buffer/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safe-buffer/index.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safe-buffer/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safe-buffer/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safer-buffer/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safer-buffer/Porting-Buffer.m
d
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safer-buffer/Readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safer-buffer/dangerous.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safer-buffer/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safer-buffer/safer.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/safer-buffer/tests.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/README.md
 delete mode 100755 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/bin.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/hash.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/sha.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/sha1.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/sha224.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/sha256.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/sha384.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/sha512.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/test/hash.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/test/test.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/sha.js/test/vectors.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/CHANGELOG.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/CODE_OF_CONDUCT
.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/LICENSE.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/README.md
 delete mode 100755 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/bin.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum-object/test/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/.npmignore
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/browser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shasum/test/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/CHANGELOG.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/example/env.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/example/op.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/example/parse.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/example/quote.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/readme.markdown
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/test/comment.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/test/env.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/test/env_fn.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/test/op.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/test/parse.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/test/quote.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/shell-quote/test/set.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/simple-concat/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/simple-concat/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/simple-concat/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/simple-concat/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/simple-concat/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/simple-concat/test/basic.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/slash/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/slash/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/slash/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map-support/LICENSE.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map-support/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map-support/browser-so
urce-map-support.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map-support/package.js
on
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map-support/register.j
s
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map-support/source-map
-support.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/CHANGELOG.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/dist/source-map.de
bug.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/dist/source-map.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/dist/source-map.mi
n.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/dist/source-map.mi
n.js.map
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/array-set.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/base64-vlq.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/base64.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/binary-search.
js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/mapping-list.j
s
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/quick-sort.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/source-map-con
sumer.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/source-map-gen
erator.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/source-node.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/lib/util.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/source-map/source-map.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-browserify/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-browserify/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-browserify/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-browserify/package.jso
n
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-browserify/readme.mark
down
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-browserify/test/buf.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-combiner2/.npmignore
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-combiner2/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-combiner2/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-combiner2/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-combiner2/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-combiner2/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-combiner2/test/index.j
s
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/.airtap.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/ie8-polyfill.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/lib/capability.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/lib/request.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/lib/response.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/abor
t.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/auth
.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/bina
ry-streaming.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/bina
ry.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/body
-empty.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/cook
ie.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/disa
ble-fetch.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/erro
r.js.disabled
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/head
ers.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/lib/
webworker-worker.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/pack
age.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/post
-binary.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/post
-text.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/text
-streaming.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/text
.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/time
out.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/browser/webw
orker.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/node/http-br
owserify.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/server/index
.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/server/stati
c/basic.txt
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/server/stati
c/browserify.png
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-http/test/server/stati
c/test-polyfill.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/example/header
.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/readme.markdow
n
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/combiner.
js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/combiner_
stream.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/empty.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/empty_no_
data.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/get.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/multipush
.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/multiunsh
ift.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/nested.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/nested_mi
ddle.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/pop.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/push.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/shift.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/splice.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/stream-splicer/test/unshift.j
s
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/.npmignore
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/lib/string_dec
oder.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/node_modules/s
afe-buffer/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/node_modules/s
afe-buffer/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/node_modules/s
afe-buffer/index.d.ts
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/node_modules/s
afe-buffer/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/node_modules/s
afe-buffer/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/string_decoder/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/strip-ansi/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/strip-ansi/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/strip-ansi/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/strip-ansi/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/example/show.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/readme.markdown
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/test/arg.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/subarg/test/recursive.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/supports-color/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/supports-color/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/supports-color/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/supports-color/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/example/check.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/example/src.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/readme.markdown
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/check.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/esm.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/html.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/ok.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/run.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/run2.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/shebang.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/che
ck.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/esm
.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/ok.
js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/run
.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/run
2.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/she
bang.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/spr
ead.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/sources/yie
ld.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/spread.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/syntax-error/test/yield.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/LICENSE.APACHE2
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/LICENSE.MIT
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/readme.markdown
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/test/async.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/test/auto-destroy.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/test/buffering.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/test/end.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through/test/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through2/LICENSE.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through2/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through2/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/through2/through2.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/.npmignore
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/CHANGELOG.m
d
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/LICENSE.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/README.md
 delete mode 100755 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/example/enr
oll/build.sh
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/example/enr
oll/index.html
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/example/enr
oll/js/browserify.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/example/enr
oll/js/main.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/example/enr
oll/server.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/main.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/timers-browserify/package.jso
n
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/.npmignore
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/.zuul.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-arraybuffer/test.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-fast-properties/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-fast-properties/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-fast-properties/package.js
on
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/to-fast-properties/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/trim-right/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/trim-right/license
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/trim-right/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/trim-right/readme.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/tty-browserify/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/tty-browserify/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/tty-browserify/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/tty-browserify/readme.markdow
n
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/example/tarray.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/readme.markdown
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/test/server/undef_
globals.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/typedarray/test/tarray.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/umd/HISTORY.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/umd/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/umd/README.md
 delete mode 100755 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/umd/bin/cli.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/umd/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/umd/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/.travi
s.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/CHANGE
LOG.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/LICENS
E.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/README
.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/bench/
index.js
 delete mode 100755 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/bin.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/index.
js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/packag
e.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/undeclared-identifiers/test/i
ndex.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/.npmignore
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/.travis.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/.zuul.yml
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/node_modules/punycode/LIC
ENSE-MIT.txt
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/node_modules/punycode/REA
DME.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/node_modules/punycode/pac
kage.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/node_modules/punycode/pun
ycode.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/test.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/url.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/url/util.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util-deprecate/History.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util-deprecate/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util-deprecate/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util-deprecate/browser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util-deprecate/node.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util-deprecate/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/node_modules/inherits/LI
CENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/node_modules/inherits/RE
ADME.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/node_modules/inherits/in
herits.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/node_modules/inherits/in
herits_browser.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/node_modules/inherits/pa
ckage.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/support/isBuffer.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/support/isBufferBrowser.
js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/util/util.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/example/run/bun
dle.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/example/run/ent
ry.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/example/run/ind
ex.html
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/example/run/ser
ver.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/index.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/readme.markdown
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/vm-browserify/test/vm.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/wrappy/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/wrappy/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/wrappy/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/wrappy/wrappy.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/xtend/.jshintrc
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/xtend/LICENSE
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/xtend/README.md
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/xtend/immutable.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/xtend/mutable.js
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/xtend/package.json
 delete mode 100644 CODAP-plugins/Mini-tutorials/onboarding-new-5/node_modules/xtend/test.js

```

---

_****_

Now let's update the `.gitignore` file to ensure that node_modules directories are properly excluded from Git tracking in the future:

---

_****_

Read file: undefined

---

_****_

I can see that your `.gitignore` file already has comprehensive rules for ignoring `node_modules` directories at various levels of nesting. These rules look very thorough and should prevent any future issues with tracking `node_modules` directories.

Let's verify that everything has been successfully committed and that there are no more `node_modules` directories being tracked:

---

_****_

```bash
git status | cat
```

```
On branch feature/attribute-selector-structure
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   .gitignore
        modified:   .specstory/history/2025-04-28_11-07-merge-current-branch-into-main-and-push.md

no changes added to commit (use "git add" and/or "git commit -a")

```

---

_****_

I see there are still some uncommitted changes, including modifications to the `.gitignore` file. Let's commit these changes to ensure everything is properly saved:

---

_****_

```bash
git add .gitignore
```

```
(base) Chads-MacBook-Air-6158:chaddorsey.github.io chaddorsey$ 

```

---

_****_

Let's commit the changes to the `.gitignore` file:

---

_****_

```bash
git commit -m "Update .gitignore to exclude node_modules directories"
```

```
[feature/attribute-selector-structure 10139436] Update .gitignore to exclude node_modules directories
 1 file changed, 11 insertions(+), 2 deletions(-)

```

---

_****_

Good! Now let's commit the deleted files from the node_modules directory:

---

_****_

```bash
git commit -m "Remove tracked node_modules files"
```

```
On branch feature/attribute-selector-structure
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   .specstory/history/2025-04-28_11-07-merge-current-branch-into-main-and-push.md

no changes added to commit (use "git add" and/or "git commit -a")

```

---

_****_

It looks like there are no changes staged for commit. Let's check what's happening with git status:

---

_****_

```bash
git status
```

```
On branch feature/attribute-selector-structure
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   .specstory/history/2025-04-28_11-07-merge-current-branch-into-main-and-push.md

no changes added to commit (use "git add" and/or "git commit -a")

```

---

_****_

Let's check if any node_modules files are still being tracked by git:

---

_****_

```bash
git ls-files | grep node_modules | head -n 10
```

```
(base) Chads-MacBook-Air-6158:chaddorsey.github.io chaddorsey$ 

```

---

_****_

It appears there are no node_modules files currently tracked by git. Let's check specifically in the CODAP-plugins/Mini-tutorials directory:

---

_****_

<details>
            <summary>Listed directory CODAP-plugins/Mini-tutorials • **19** results</summary>
        
| Name |
|-------|
| 📄 `.DS_Store` |
| 📁 `onboarding-new-5` |
| 📁 `node_modules` |
| 📁 `onboarding-new-4` |
| 📁 `onboarding-new-3` |
| 📁 `onboarding-new-2` |
| 📁 `onboarding-new-1` |
| 📁 `onboarding-documents` |
| 📄 `index.html` |
| 📄 `package-lock.json` |
| 📄 `.bash_profile` |
| 📄 `package.json` |
| 📁 `packages` |
| 📄 `lerna.json` |
| 📄 `package 2.json` |
| 📄 `README.md` |
| 📄 `.gitignore` |
| 📁 `Common` |
| 📁 `bin` |

</details>

---

_****_

Let's check the content of the .gitignore file to confirm it's set up correctly:

---

_****_

Read file: undefined

---

_****_

Now let's check the git status to see what changes are currently staged:

---

_****_

```bash
cd CODAP-plugins/Mini-tutorials && git status
```

```
On branch feature/attribute-selector-structure
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   ../../.specstory/history/2025-04-28_11-07-merge-current-branch-into-main-and-push.md

no changes added to commit (use "git add" and/or "git commit -a")

```

---

_****_

Let's update the `.gitignore` file to properly ignore node_modules:

---

_****_

```diff
  /.DS_Store
+ /node_modules
```

---

_****_

Now let's first reset the staging area to make sure we have a clean slate:

---

_****_

```bash
git reset
```

```
Unstaged changes after reset:
M       .specstory/history/2025-04-28_11-07-merge-current-branch-into-main-and-push.md
M       CODAP-plugins/Mini-tutorials/.gitignore

```

---

_****_

I'll commit the changes to the `.gitignore` file while making sure we're in the right directory:

---

_****_

```bash
cd /Users/chaddorsey/Dropbox/dev/github-pages/chaddorsey.github.io && git add CODAP-plugins/Mini-tutorials/.gitignore && git commit -m "Update .gitignore to properly exclude node_modules"
```

```
[feature/attribute-selector-structure c88f9429] Update .gitignore to properly exclude node_modules
 1 file changed, 2 insertions(+), 1 deletion(-)

```

---

_****_

Now let's remove the deleted `node_modules` files from Git tracking without removing the actual files (since they're already deleted):

---

_****_

```bash
git rm --cached -r CODAP-plugins/Mini-tutorials/node_modules/
```

```
fatal: pathspec 'CODAP-plugins/Mini-tutorials/node_modules/' did not match any files

```

---

_****_

It looks like Git doesn't recognize the deleted files as being tracked. Let's check the status of the repository to see what's currently staged:

---

_****_

```bash
git status
```

```
On branch feature/attribute-selector-structure
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   .specstory/history/2025-04-28_11-07-merge-current-branch-into-main-and-push.md

no changes added to commit (use "git add" and/or "git commit -a")

```

---

_****_

Let's see what was previously staged with `git add .` that might include those deleted files:

---

_****_

```bash
git diff --name-status --cached
```

```
(base) Chads-MacBook-Air-6158:chaddorsey.github.io chaddorsey$ 

```

---

_****_



Let's check if we can see the deleted files in the Git history:

---

_****_

```bash
git ls-files --deleted
```

```
(base) Chads-MacBook-Air-6158:chaddorsey.github.io chaddorsey$ 

```

---

_****_

Let's check if these files were actually tracked in Git at all:

---

_****_

```bash
git ls-files CODAP-plugins/Mini-tutorials/node_modules/
```

```
(base) Chads-MacBook-Air-6158:chaddorsey.github.io chaddorsey$ 

```

---

_****_

It seems that the `node_modules` files aren't actually tracked in Git. Let's check if there's a `.gitignore` file that's already excluding them:

---

_****_

```bash
find . -name ".gitignore" | xargs cat
```

```
/.DS_Store
/node_modules# Ignore large raw data files
assets/data/*/raw/
CODAP-plugins/CountyHealthSelect/assets/data/*/raw/
**/assets/data/*/raw/

# Specific large files
CODAP-plugins/CountyHealthSelect/assets/data/CountyHealth-All-Data.zip
.git.bak
..bfg-report
bfg.jar

# Node modules - ensure all node_modules directories are excluded
node_modules/
**/node_modules/
**/*/node_modules/
**/*/*/node_modules/
**/*/*/*/node_modules/
**/*/*/*/*/node_modules/
**/*/*/*/*/*/node_modules/
**/*/*/*/*/*/*/node_modules/

# Also exclude any paths that are too long or problematic

```

---

_****_

Let's also check the Git history to see if there were any recent operations involving these files:

---

_****_

Cancelled

---

_****_



---



---

