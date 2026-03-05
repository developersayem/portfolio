"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteSubscription } from "@/lib/actions/newsletter-actions";
import { useRouter } from "next/navigation";

export default function DeleteSubscriberButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;

    setLoading(true);
    try {
      const result = await deleteSubscription(id);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || "Failed to delete subscriber");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
}
