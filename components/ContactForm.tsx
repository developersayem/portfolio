"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-card/40 backdrop-blur-xl border border-primary/20"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="font-display text-2xl font-bold mb-3">Message Sent!</h3>
        <p className="text-muted-foreground mb-8">
          Thank you for reaching out. I'll get back to you as soon as possible.
        </p>
        <Button
          onClick={() => setIsSuccess(false)}
          variant="outline"
          className="rounded-full px-8"
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-5 md:p-6 rounded-3xl bg-card/30 backdrop-blur-xl border border-border/50 shadow-2xl relative overflow-hidden group"
    >
      {/* Decorative glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />

      <form onSubmit={handleSubmit} className="space-y-6 relative">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium ml-1">
              Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              required
              className="rounded-full bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300 h-12 px-6"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium ml-1">
              Phone Number (Optional)
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+8801XXXXXXXXX"
              className="rounded-full bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300 h-12 w-full px-6"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium ml-1">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            required
            className="rounded-full bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300 h-12 px-6"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="text-sm font-medium ml-1">
            Subject
          </Label>
          <Input
            id="subject"
            placeholder="Project Inquiry"
            required
            className="rounded-full bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300 h-12 px-6"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium ml-1">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Tell me about your project..."
            required
            className="rounded-[2rem] bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300 min-h-[150px] resize-none px-6 py-4"
          />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex items-center gap-2 text-destructive text-sm"
          >
            <AlertCircle size={16} />
            {error}
          </motion.div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 rounded-full bg-primary text-primary-foreground font-bold text-base glow-green hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send
                size={18}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
