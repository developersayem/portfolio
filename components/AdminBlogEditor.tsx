"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const GravityMarkdownEditor = dynamic(() => import("./GravityMarkdownEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full min-h-[400px] border rounded-md bg-muted/50 flex flex-col items-center justify-center text-muted-foreground gap-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
      Loading Editor...
    </div>
  ),
});

interface AdminBlogEditorProps {
  name: string;
  initialValue?: string;
}

export function AdminBlogEditor({
  name,
  initialValue = "",
}: AdminBlogEditorProps) {
  const [content, setContent] = useState(initialValue);

  return (
    <div className="h-full w-full overflow-hidden bg-background">
      <input type="hidden" name={name} value={content} />
      <GravityMarkdownEditor
        initialValue={initialValue}
        onChange={(val) => setContent(val)}
      />
    </div>
  );
}
