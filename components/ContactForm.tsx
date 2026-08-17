"use client";

import { useState } from "react";
import Icon from "./Icon";

type Status = "idle" | "sending" | "success" | "error";

// Port of the contact form in template-contact.php. Posts JSON to /api/contact.
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && json.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(json.error || "Sorry, something went wrong. Please call us or try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <div className="contact-form">
      <h3 className="h-md" style={{ marginBottom: "1.25rem" }}>
        Send us a message
      </h3>

      {status === "success" && (
        <p
          style={{
            background: "var(--gold-soft)",
            color: "var(--forest)",
            padding: "1rem 1.25rem",
            borderRadius: "var(--radius)",
            marginBottom: "1.25rem",
            fontWeight: 600,
          }}
        >
          Thank you! Your message has been sent. We&apos;ll be in touch shortly.
        </p>
      )}
      {status === "error" && (
        <p
          style={{
            background: "#fbe9e7",
            color: "#9a3412",
            padding: "1rem 1.25rem",
            borderRadius: "var(--radius)",
            marginBottom: "1.25rem",
            fontWeight: 600,
          }}
        >
          {error}
        </p>
      )}

      <form onSubmit={onSubmit} noValidate>
        {/* Honeypot — bots fill this hidden field. */}
        <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
          <label>
            Leave blank
            <input type="text" name="hp" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor="cf-name">Full Name *</label>
            <input type="text" id="cf-name" name="name" required />
          </div>
          <div className="field">
            <label htmlFor="cf-phone">Phone *</label>
            <input type="tel" id="cf-phone" name="phone" required />
          </div>
        </div>
        <div className="field">
          <label htmlFor="cf-email">Email Address *</label>
          <input type="email" id="cf-email" name="email" required />
        </div>
        <div className="field">
          <label htmlFor="cf-interest">I&apos;m interested in</label>
          <select id="cf-interest" name="interest" defaultValue="2 BHK Apartment">
            <option>2 BHK Apartment</option>
            <option>3 BHK Apartment</option>
            <option>Site Visit / Tour</option>
            <option>Brochure &amp; Pricing</option>
            <option>General Enquiry</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="cf-message">Message</label>
          <textarea
            id="cf-message"
            name="message"
            placeholder="Tell us what you're looking for..."
          ></textarea>
        </div>
        <button type="submit" className="btn btn--gold btn--block" disabled={status === "sending"}>
          {status === "sending" ? (
            "Sending…"
          ) : (
            <>
              Send Message <Icon name="arrow" size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
