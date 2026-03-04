import { AdminSidebar } from "@/components/AdminSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="admin-layout">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .admin-layout, .admin-layout * {
          cursor: auto !important;
        }
        .admin-layout a, 
        .admin-layout a *,
        .admin-layout button,
        .admin-layout button *,
        .admin-layout [role="button"],
        .admin-layout [role="button"] * {
          cursor: pointer !important;
        }
        .admin-layout input,
        .admin-layout textarea,
        .admin-layout [contenteditable="true"] {
          cursor: text !important;
        }
        /* Specific override for checkboxes/radios if any */
        .admin-layout input[type="checkbox"],
        .admin-layout input[type="radio"] {
          cursor: pointer !important;
        }
      `,
        }}
      />
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-medium">Dashboard</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 md:pt-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
