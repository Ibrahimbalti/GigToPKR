import { contactSchema } from "@/lib/validation";

const hits = new Map<string, { count: number; reset: number }>();

function clientAddress(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "local";
}

export async function POST(request: Request) {
  const address = clientAddress(request);
  const now = Date.now();
  const current = hits.get(address);
  if (!current || current.reset < now) {
    hits.set(address, { count: 1, reset: now + 10 * 60 * 1000 });
  } else if (current.count >= 5) {
    return Response.json(
      { ok: false, error: "Too many messages from this network. Try again later." },
      { status: 429 },
    );
  } else {
    current.count += 1;
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Send a JSON message." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Check the form and try again.";
    return Response.json({ ok: false, error: message }, { status: 400 });
  }

  if (parsed.data.website) {
    return Response.json({ ok: true });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return Response.json(
      {
        ok: false,
        error:
          "Email delivery is not connected yet. Set CONTACT_WEBHOOK_URL to an endpoint you control. This message was not stored.",
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: parsed.data.name,
        email: parsed.data.email,
        topic: parsed.data.topic,
        message: parsed.data.message,
        source: "gigtopkr-contact",
      }),
    });
    if (!response.ok) throw new Error("Webhook rejected the message");
  } catch {
    return Response.json(
      { ok: false, error: "The delivery service rejected the message. Nothing was stored on GigToPKR." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
