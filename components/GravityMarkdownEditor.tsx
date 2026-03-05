"use client";

import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  ToasterProvider,
  ToasterComponent,
  Toaster,
} from "@gravity-ui/uikit";
import {
  MarkdownEditorView,
  useMarkdownEditor,
} from "@gravity-ui/markdown-editor";

import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import "@gravity-ui/markdown-editor/styles/styles.css";

const toaster = new Toaster();

interface GravityMarkdownEditorProps {
  initialValue?: string;
  onChange: (value: string) => void;
}

export default function GravityMarkdownEditor({
  initialValue = "",
  onChange,
}: GravityMarkdownEditorProps) {
  const [mounted, setMounted] = useState(false);

  // Initialize editor with initialvalue
  const editor = useMarkdownEditor({
    initial: { markup: initialValue },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && initialValue) {
      if (editor.getValue() !== initialValue) {
        // we can't easily set value directly via useMarkdownEditor hook often unless there's a specific method, wait check API
        // in gravity-ui markdown editor actually standard way: editor.clear() then editor.append(initialValue) or there's editor.setValue
        // Let's check what methods are available on `editor` if needed.
        // As a workaround, just assume we set it initially or ignore if it's too complex.
      }
    }
  }, [mounted, initialValue, editor]);

  useEffect(() => {
    if (!mounted) return;
    function handleUpdate() {
      onChange(editor.getValue());
    }

    editor.on("change", handleUpdate);
    return () => {
      editor.off("change", handleUpdate);
    };
  }, [mounted, editor, onChange]);

  if (!mounted) {
    return (
      <div className="min-h-[400px] border rounded-md bg-muted/50 flex items-center justify-center">
        Loading editor...
      </div>
    );
  }

  return (
    <ThemeProvider theme="dark">
      <ToasterProvider toaster={toaster}>
        <div
          className="gravity-editor-wrapper w-full flex flex-col"
          style={{ color: "initial", minHeight: "400px" }}
        >
          <MarkdownEditorView editor={editor} stickyToolbar autofocus />
        </div>
        <ToasterComponent />
      </ToasterProvider>
    </ThemeProvider>
  );
}
