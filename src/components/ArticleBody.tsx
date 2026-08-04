// Shared long-form article renderer: simple markdown-like parser (H2/H3
// headings, lists, blockquotes, code blocks, paragraphs, **bold**, raw <a>
// links). Originally built for blog posts; reused by the service-page
// long-form body so both content types get identical, tested rendering.
export function ArticleBody({ text }: { text: string }) {
  const cleanText = text.replace(/\\n/g, "\n");
  const blocks = cleanText.split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      {blocks.map((block, idx) => {
        const trimmed = block.trim();

        // Code block
        if (trimmed.startsWith("```") && trimmed.endsWith("```")) {
          const lines = trimmed.split("\n");
          const code = lines.slice(1, -1).join("\n");
          const lang = lines[0].replace("```", "").trim();
          return (
            <div key={idx} className="my-8 rounded-md bg-[#0a0a0c] border border-white/10 overflow-hidden">
              {lang && (
                <div className="bg-[#121218] px-4 py-2 border-b border-white/10 text-xs font-mono text-[#8e8f94] flex items-center">
                  {lang}
                </div>
              )}
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm font-mono text-[#d8d9dc] leading-relaxed">{code}</code>
              </pre>
            </div>
          );
        }
        // Markdown section headings become semantic article H2s.
        if (trimmed.startsWith("### ")) {
          return (
            <h2 key={idx} className="mt-12 mb-6 text-2xl font-display font-bold text-white tracking-tight">
              {trimmed.replace("### ", "")}
            </h2>
          );
        }
        // Sub-section headings become semantic article H3s.
        if (trimmed.startsWith("#### ")) {
          return (
            <h3 key={idx} className="mt-8 mb-4 text-xl font-display font-bold text-white tracking-tight">
              {trimmed.replace("#### ", "")}
            </h3>
          );
        }
        // Blockquote
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote key={idx} className="my-8 border-s-2 border-[#d8d9dc] bg-[#d8d9dc]/5 p-6 text-lg font-light italic leading-relaxed text-[#d8d9dc]">
              {trimmed.replace(/^>\s+/gm, "").replace(/\[!IMPORTANT\]/g, "").trim()}
            </blockquote>
          );
        }
        // Unordered list
        if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
          const items = trimmed.split("\n").filter((line) => line.trim().startsWith("* ") || line.trim().startsWith("- "));
          return (
            <ul key={idx} className="my-6 space-y-3 ps-5">
              {items.map((item, i) => {
                const cleanItem = item.trim().replace(/^[\*\-]\s+/, "");
                const formatted = cleanItem.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
                return (
                  <li key={i} className="text-base text-[#9494a0] leading-relaxed relative before:absolute before:-start-5 before:top-2 before:h-1.5 before:w-1.5 before:bg-[#d8d9dc]">
                    <span dangerouslySetInnerHTML={{ __html: formatted }} />
                  </li>
                );
              })}
            </ul>
          );
        }
        // Standard paragraph
        const formattedPara = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
        return (
          <p key={idx} className="mb-6 text-base sm:text-lg text-[#9494a0] font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedPara }} />
        );
      })}
    </>
  );
}
