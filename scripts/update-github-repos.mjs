import { execSync } from "node:child_process";

async function updateRepos() {
  console.log("=== UPDATING TOP GITHUB REPOSITORIES (HOMEPAGE & README BACKLINKS) ===");

  const token = execSync("gh auth token").toString().trim();
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "Arranto-Agent",
    "Content-Type": "application/json",
  };

  // 1. Update repo homepage URL for key repos
  const repoUpdates = [
    { repo: "arranto", homepage: "https://arranto.com" },
    { repo: "fatooralite", homepage: "https://arranto.com/en/work/fatoora-lite" },
    { repo: "pulsekart-web-nextjs", homepage: "https://arranto.com/en/work/pulsekart" },
    { repo: "sovereign-vault", homepage: "https://arranto.com/en/work/sovereign-vault" },
    { repo: "smile-fotilo-web-nextjs", homepage: "https://arranto.com" },
    { repo: "kapdafactory-web-nextjs", homepage: "https://arranto.com/en/work" },
    { repo: "carfax-for-boats", homepage: "https://arranto.com/en/work" },
    { repo: "tuition-mandi-pwa", homepage: "https://arranto.com/en/work" }
  ];

  for (const item of repoUpdates) {
    try {
      const res = await fetch(`https://api.github.com/repos/ak1458/${item.repo}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ homepage: item.homepage }),
      });
      if (res.ok) {
        console.log(`✅ [HOMEPAGE SET] ak1458/${item.repo} -> ${item.homepage}`);
      } else {
        console.log(`⚠️ [HOMEPAGE SKIP] ak1458/${item.repo} -> Status ${res.status}`);
      }
    } catch (e) {
      console.error(`❌ Error on ${item.repo}:`, e.message);
    }
  }

  // 2. Add "Built by Arranto" banner to top public repository READMEs if missing
  const reposForReadme = [
    { repo: "fatooralite", path: "https://arranto.com/en/work/fatoora-lite" },
    { repo: "sovereign-vault", path: "https://arranto.com/en/work/sovereign-vault" },
    { repo: "pulsekart-web-nextjs", path: "https://arranto.com/en/work/pulsekart" },
    { repo: "smile-fotilo-web-nextjs", path: "https://arranto.com" },
  ];

  for (const item of reposForReadme) {
    try {
      const getRes = await fetch(`https://api.github.com/repos/ak1458/${item.repo}/readme`, { headers });
      if (!getRes.ok) continue;
      const getJson = await getRes.json();
      const content = Buffer.from(getJson.content, "base64").toString("utf8");

      if (content.includes("arranto.com")) {
        console.log(`ℹ️ [README ALREADY HAS BACKLINK] ak1458/${item.repo}`);
        continue;
      }

      // Add clean backlink badge & footer link
      const banner = `> **Engineered & Maintained by [Arranto](https://arranto.com)** — Custom Software & AI Systems Studio.\n\n`;
      const updatedContent = banner + content;
      const newBase64 = Buffer.from(updatedContent).toString("base64");

      const putRes = await fetch(`https://api.github.com/repos/ak1458/${item.repo}/contents/README.md`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          message: "docs: add Arranto studio backlink and attribution",
          content: newBase64,
          sha: getJson.sha,
        }),
      });

      if (putRes.ok) {
        console.log(`✅ [README BACKLINK ADDED] ak1458/${item.repo}`);
      }
    } catch (e) {
      console.error(`❌ Error updating README on ${item.repo}:`, e.message);
    }
  }

  console.log("\n✅ All GitHub repository links & authority updates complete!");
}

updateRepos().catch(console.error);
