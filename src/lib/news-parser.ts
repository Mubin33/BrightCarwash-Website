interface ParsedNews {
    firstHalf: string;
    secondHalf: string;
    images: string[];
}

export function parseNewsContent(html: string): ParsedNews {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const images: string[] = [];

    // Extract all img src attributes
    doc.querySelectorAll('img').forEach((img) => {
        const src = img.getAttribute('src');
        if (src) images.push(src);
    });

    // Get all paragraph elements
    const paragraphs = doc.querySelectorAll('p');
    const totalParagraphs = paragraphs.length;

    let firstHalf = '';
    let secondHalf = '';

    if (totalParagraphs <= 2) {
        // 1-2 paragraphs: split evenly
        const mid = Math.ceil(totalParagraphs / 2);
        for (let i = 0; i < mid; i++) {
            firstHalf += paragraphs[i].outerHTML;
        }
        for (let i = mid; i < totalParagraphs; i++) {
            secondHalf += paragraphs[i].outerHTML;
        }
    } else {
        // 3+ paragraphs: first half = first ceil(n/2), second half = rest
        const mid = Math.ceil(totalParagraphs / 2);
        for (let i = 0; i < mid; i++) {
            firstHalf += paragraphs[i].outerHTML;
        }
        for (let i = mid; i < totalParagraphs; i++) {
            secondHalf += paragraphs[i].outerHTML;
        }
    }

    // If no paragraphs found, use the entire body content as firstHalf
    if (!firstHalf && !secondHalf) {
        firstHalf = doc.body.innerHTML;
    }

    return { firstHalf, secondHalf, images: images.slice(0, 2) };
}