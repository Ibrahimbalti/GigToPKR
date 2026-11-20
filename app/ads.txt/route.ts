export const dynamic = "force-static";

export function GET() {
  const client = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "").trim();
  const pubId = client.replace(/^ca-/, "");
  const body = pubId.startsWith("pub-")
    ? `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`
    : "# Configure NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX to populate ads.txt\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
