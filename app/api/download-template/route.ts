import JSZip from "jszip";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { layout } = await req.json();

    const zip = new JSZip();
    /* const baseDir = path.join(process.cwd(), "template-base");

    function addFolderToZip(folderPath: string, zipFolder: JSZip) {
      const files = fs.readdirSync(folderPath);
      files.forEach((file) => {
        const fullPath = path.join(folderPath, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          const subFolder = zipFolder.folder(file)!;
          addFolderToZip(fullPath, subFolder);
        } else {
          zipFolder.file(file, fs.readFileSync(fullPath));
        }
      });
    }

    addFolderToZip(baseDir, zip); */

    zip.file("config/layout.json", JSON.stringify(layout, null, 2));

    // Professional README in Markdown style
    const readmeContent = `
# 🚀 NextFolio - Portfolio Deployment Guide

Congratulations on creating your custom layout in the demo site!  

---

## Step 1: Purchase Your Full Project

1. Click the button below or go to: [https://nextask.gumroad.com/l/nxtfolio](https://nextask.gumroad.com/l/nxtfolio)  
2. Complete your purchase to download the full NextFolio ZIP file.  
3. Extract the ZIP file locally.

---

## Step 2: Replace Your Custom Layout

1. Copy the **layout.json** you downloaded from the demo site.  
2. Replace the file /config/layout.json in the extracted ZIP project with your downloaded layout.json.

---

## Step 3: Deploy to Vercel

1. Create a new repository on GitHub, GitLab, or Bitbucket.  
2. Open a terminal in the project folder and run:

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <YOUR_REPO_URL>
git push -u origin main
\`\`\`

3. Go to [Vercel](https://vercel.com), click **New Project → Import Git Repository → Select your repo**.  
4. Vercel will automatically detect Next.js and deploy your site.  
5. Done! Your portfolio is now live at your Vercel URL.

---

## Optional: Environment Variables (Vercel Dashboard → Settings → Environment Variables)

| Variable | Description |
|----------|-------------|
| NEXT_PUBLIC_ENV | Set to \`production\` |
| SITE_URL | Your site URL (e.g., https://yourdomain.com) |
| MAILGUN_API_KEY | Mailgun API key (for contact forms) |
| MAILGUN_DOMAIN | Mailgun domain |

---

## Need Help?

For any questions or issues, contact: **nextask24@gmail.com** or **nxtasq@gmail.com**

Happy deploying! 🎉
`;



    zip.file("README.md", readmeContent.trim());

    // Generate ZIP as Node Buffer
    const buffer = await zip.generateAsync({ type: "nodebuffer" });
    const uint8Array = new Uint8Array(buffer);
    const blob = new Blob([uint8Array], { type: "application/zip" });

    return new Response(blob, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=nextfolio.zip",
      },
    });
  } catch (err) {
    console.error("Error generating ZIP:", err);
    return new Response(JSON.stringify({ error: "Failed to generate ZIP" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
