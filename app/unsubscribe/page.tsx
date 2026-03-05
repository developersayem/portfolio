"use client";

import { useState } from "react";
import {
  Mail,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { unsubscribe } from "@/lib/actions/newsletter-actions";
import Link from "next/link";
import { motion } from "framer-motion";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleUnsubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const result = await unsubscribe(email);
      if (result.success) {
        setStatus("success");
        setMessage(
          "You have been successfully unsubscribed from our newsletter.",
        );
        setEmail("");
      } else {
        setStatus("error");
        setMessage(
          result.error || "Something went wrong. Please check your email.",
        );
      }
    } catch (error) {
      setStatus("error");
      setMessage("Failed to unsubscribe. Please try again later.");
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-primary/5 blur-[160px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card border border-border p-8 rounded-2xl shadow-2xl relative z-10"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <h1 className="text-3xl font-bold font-display mb-2">Unsubscribe</h1>
        <p className="text-muted-foreground mb-8 text-sm">
          We're sorry to see you go. Enter your email below to unsubscribe from
          our newsletter.
        </p>

        {status === "success" ? (
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-xl text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <p className="text-emerald-500 font-medium">{message}</p>
            <Link
              href="/"
              className="block text-sm text-primary hover:underline"
            >
              Return to Website
            </Link>
          </div>
        ) : (
          <form onSubmit={handleUnsubscribe} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === "loading"}
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Unsubscribe Now"
              )}
            </button>

            {status === "error" && (
              <p className="text-xs text-destructive flex items-center gap-1 mt-2">
                <AlertCircle size={14} /> {message}
              </p>
            )}
          </form>
        )}
      </motion.div>
    </div>
  );
}
