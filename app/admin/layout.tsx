export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-root-layout">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .admin-root-layout, .admin-root-layout * {
          cursor: auto !important;
        }
        .admin-root-layout a, 
        .admin-root-layout a *,
        .admin-root-layout button,
        .admin-root-layout button *,
        .admin-root-layout [role="button"],
        .admin-root-layout [role="button"] * {
          cursor: pointer !important;
        }
        .admin-root-layout input,
        .admin-root-layout textarea,
        .admin-root-layout [contenteditable="true"] {
          cursor: text !important;
        }
        /* Specific override for checkboxes/radios if any */
        .admin-root-layout input[type="checkbox"],
        .admin-root-layout input[type="radio"] {
          cursor: pointer !important;
        }
      `,
        }}
      />
      {children}
    </div>
  );
}
