export interface ParsedNews {
  firstHalf: string;
  secondHalf: string;
  images: string[];
}

export function parseNewsContent(html: string): ParsedNews {
  if (!html) {
    return { firstHalf: "", secondHalf: "", images: [] };
  }

  // Guard for SSR/SSG/Server Components where DOMParser is not available in Node.js
  if (typeof window === "undefined" || typeof DOMParser === "undefined") {
    const images: string[] = [];
    const imgRegex = /<img\b[^>]*?\bsrc=["']([^"']+)["'][^>]*>/gi;
    let match: RegExpExecArray | null;
    while ((match = imgRegex.exec(html)) !== null) {
      images.push(match[1]);
    }

    const pRegex = /<p\b[^>]*>[\s\S]*?<\/p>/gi;
    const paragraphs = html.match(pRegex) || [];
    const totalParagraphs = paragraphs.length;

    let firstHalf = "";
    let secondHalf = "";

    if (totalParagraphs > 0) {
      const mid = Math.ceil(totalParagraphs / 2);
      firstHalf = paragraphs.slice(0, mid).join("");
      secondHalf = paragraphs.slice(mid).join("");
    } else {
      const bodyMatch = /<body\b[^>]*>([\s\S]*?)<\/body>/i.exec(html);
      firstHalf = bodyMatch ? bodyMatch[1] : html;
    }

    return { firstHalf, secondHalf, images: images.slice(0, 2) };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const images: string[] = [];

  // Extract all img src attributes
  doc.querySelectorAll("img").forEach((img) => {
    const src = img.getAttribute("src");
    if (src) images.push(src);
  });

  // Get all paragraph elements
  const paragraphs = doc.querySelectorAll("p");
  const totalParagraphs = paragraphs.length;

  let firstHalf = "";
  let secondHalf = "";

  if (totalParagraphs > 0) {
    const mid = Math.ceil(totalParagraphs / 2);
    for (let i = 0; i < mid; i++) {
      firstHalf += paragraphs[i].outerHTML;
    }
    for (let i = mid; i < totalParagraphs; i++) {
      secondHalf += paragraphs[i].outerHTML;
    }
  } else {
    // If no paragraphs found, use the entire body content as firstHalf
    firstHalf = doc.body.innerHTML;
  }

  return { firstHalf, secondHalf, images: images.slice(0, 2) };
}
