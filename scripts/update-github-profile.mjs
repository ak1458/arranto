import { execSync } from "node:child_process";

async function updateProfileReadme() {
  console.log("=== UPDATING GITHUB PROFILE README (ak1458/ak1458) ===");

  const token = execSync("gh auth token").toString().trim();
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "Arranto-Agent",
    "Content-Type": "application/json",
  };

  // 1. Get current README
  const getRes = await fetch("https://api.github.com/repos/ak1458/ak1458/readme", { headers });
  if (!getRes.ok) {
    throw new Error(`Failed to get README: ${getRes.status} ${await getRes.text()}`);
  }
  const getJson = await getRes.json();
  const currentContent = Buffer.from(getJson.content, "base64").toString("utf8");
  const sha = getJson.sha;

  console.log(`Current README sha: ${sha}`);

  // 2. Perform updates
  let newContent = currentContent;

  // Replace portfolio badges and links
  newContent = newContent.replace(
    /https:\/\/smilefotilo\.com\/portfolio/g,
    "https://arranto.com"
  );
  newContent = newContent.replace(
    /Portfolio-smilefotilo\.com/g,
    "Arranto-arranto.com"
  );
  newContent = newContent.replace(
    /\[smilefotilo\.com\/portfolio\]\(https:\/\/smilefotilo\.com\/portfolio\)/g,
    "[arranto.com](https://arranto.com)"
  );

  // Update hero subheader & about text
  newContent = newContent.replace(
    `<strong>Full-Stack Developer & AI Architect</strong>`,
    `<strong>Founder @ Arranto · Full-Stack Developer & AI Architect</strong>`
  );

  // Add LinkedIn company in badges
  if (!newContent.includes("linkedin.com/company/arranto")) {
    newContent = newContent.replace(
      `<a href="https://linkedin.com/in/ashrafkamal14"><img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>`,
      `<a href="https://linkedin.com/in/ashrafkamal14"><img src="https://img.shields.io/badge/LinkedIn-Profile-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>\n  <a href="https://linkedin.com/company/arranto"><img src="https://img.shields.io/badge/Arranto-Company_Page-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="Arranto LinkedIn" /></a>`
    );
  }

  // Update Connect With Me section
  if (!newContent.includes("[Arranto Studio](https://arranto.com)")) {
    newContent = newContent.replace(
      `* 🌐 **Portfolio**: [arranto.com](https://arranto.com)`,
      `* 🌐 **Studio / Portfolio**: [Arranto Studio](https://arranto.com)\n* 🏢 **Company Page**: [Arranto on LinkedIn](https://www.linkedin.com/company/arranto)\n* 💼 **LinkedIn**: [Ashraf Kamal](https://linkedin.com/in/ashrafkamal14)`
    );
  }

  // 3. Push update via GitHub API
  const newBase64 = Buffer.from(newContent).toString("base64");
  const putRes = await fetch("https://api.github.com/repos/ak1458/ak1458/contents/README.md", {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message: "docs: update profile README with Arranto studio link and LinkedIn company page",
      content: newBase64,
      sha: sha,
    }),
  });

  if (!putRes.ok) {
    throw new Error(`Failed to update README: ${putRes.status} ${await putRes.text()}`);
  }

  console.log("\n✅ Successfully updated ak1458/ak1458 profile README on GitHub!");
}

updateProfileReadme().catch((err) => {
  console.error("Failed to update profile README:", err);
});
