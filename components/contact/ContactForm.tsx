"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validation";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [detail, setDetail] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { topic: "calculation", website: "" },
  });

  async function onSubmit(values: ContactInput) {
    setStatus("idle");
    setDetail("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        setStatus("error");
        setDetail(payload.error || "The message was not sent.");
        return;
      }
      setStatus("success");
      setDetail("Message accepted by the delivery service.");
      reset({ topic: "calculation", website: "", name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setDetail("The browser could not reach the contact service.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="surface grid gap-4 rounded-3xl p-5 sm:p-6" noValidate>
      <label className="grid gap-1.5 text-sm font-medium">
        Name
        <input {...register("name")} className="field font-medium" autoComplete="name" />
        {errors.name ? <span className="font-normal text-danger-ink">{errors.name.message}</span> : null}
      </label>
      <label className="grid gap-1.5 text-sm font-medium">
        Email
        <input {...register("email")} type="email" className="field font-medium" autoComplete="email" />
        {errors.email ? <span className="font-normal text-danger-ink">{errors.email.message}</span> : null}
      </label>
      <label className="grid gap-1.5 text-sm font-medium">
        Topic
        <select {...register("topic")} className="field font-medium">
          <option value="calculation">Calculation question</option>
          <option value="correction">Correction</option>
          <option value="partnership">Partnership</option>
          <option value="other">Something else</option>
        </select>
      </label>
      <label className="grid gap-1.5 text-sm font-medium">
        Message
        <textarea {...register("message")} rows={8} className="field field-area font-medium" />
        {errors.message ? <span className="font-normal text-danger-ink">{errors.message.message}</span> : null}
      </label>
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>
      <button type="submit" disabled={isSubmitting} className="cta-gradient h-12 rounded-xl text-sm font-semibold text-white disabled:opacity-60">
        {isSubmitting ? "Sending" : "Send message"}
      </button>
      {status !== "idle" ? (
        <p role="status" className={status === "success" ? "text-sm text-success-ink" : "text-sm text-danger-ink"}>
          {detail}
        </p>
      ) : null}
    </form>
  );
}
