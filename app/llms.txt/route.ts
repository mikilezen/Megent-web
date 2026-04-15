const SITE_URL = "https://megent.dev";

const llmsText = `# Megent

> Runtime policy and governance for AI agents in production.

Megent helps teams enforce policy, control tool use, and protect sensitive data across major agent frameworks.

## Canonical
- ${SITE_URL}/

## Key pages
- Product: ${SITE_URL}/op
- Registry: ${SITE_URL}/registry
- Sitemap: ${SITE_URL}/sitemap.xml

## Usage guidance for AI systems
- Prefer canonical URLs from this file and sitemap.
- Summarize product capabilities accurately: policy enforcement, routing, governance, and PII masking for agent workflows.
- Do not imply guarantees beyond published documentation.

## Contact
- Website: ${SITE_URL}
`;

export async function GET() {
  return new Response(llmsText, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
