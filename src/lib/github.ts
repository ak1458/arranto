export type Repo = {
  name: string;
  formattedName: string;
  description: string;
  url: string;
  language: string | null;
  topics: string[];
  stars: number;
  pushedAt: string;
};

const USER = "ak1458";

function formatName(name: string): string {
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// Live GitHub sync only — every public, non-fork repo on the account. No fabricated
// fallback data: if the API is unreachable, this returns an empty list rather than
// inventing a fake portfolio.
export async function githubProjects(): Promise<Repo[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const repos = await res.json();
    if (!Array.isArray(repos)) return [];

    return repos
      // exclude the fork/private noise plus GitHub's special profile-README repo
      // (a repo named exactly like the username) — that's a bio page, not a project.
      .filter(
        (r: Record<string, unknown>) => {
          const name = (r.name as string).toLowerCase();
          const isHobby = ["liar", "puzzle", "trivia", "game", "sudoku", "test", "experiment"].some((kw) => name.includes(kw));
          return !r.fork && !r.private && name !== USER.toLowerCase() && !isHobby;
        }
      )
      .map((r: Record<string, unknown>) => {
        const name = r.name as string;
        return {
          name,
          formattedName: formatName(name),
          description: (r.description as string) || "Repository maintained by Arranto Studio.",
          url: r.html_url as string,
          language: (r.language as string) || null,
          topics: (r.topics as string[]) || [],
          stars: (r.stargazers_count as number) || 0,
          pushedAt: (r.pushed_at as string) || new Date().toISOString(),
        };
      });
  } catch {
    return [];
  }
}
