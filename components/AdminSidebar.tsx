"use client";

import * as React from "react";
import {
  BookOpen,
  LayoutDashboard,
  MessageSquare,
  FolderKanban,
  Settings,
  LogOut,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { usePathname, useRouter } from "next/navigation";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Blogs",
      url: "/admin/blogs",
      icon: BookOpen,
    },
    {
      title: "Projects",
      url: "/admin/projects",
      icon: FolderKanban,
    },
    {
      title: "Messages",
      url: "/admin/contacts",
      icon: MessageSquare,
    },
    {
      title: "Subscribers",
      url: "/admin/subscribers",
      icon: Users,
    },
  ],
};

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* Expanded state */}
        <div className="group-data-[collapsible=icon]:hidden flex items-center gap-2 px-2 py-2">
          <div className="flex h-full w-full items-center justify-start rounded-full bg-primary text-primary-foreground p-1 gap-2">
            <div className="w-10 h-10 rounded-full bg-black text-white flex justify-center items-center shrink-0">
              <span>SM</span>
            </div>
            <div className="flex flex-col gap-0.5 leading-none overflow-hidden pr-2">
              <span className="font-extrabold truncate text-sm">
                Sayem Molla
              </span>
              <span className="text-xs text-primary-foreground/70 truncate">
                Admin Portal
              </span>
            </div>
          </div>
        </div>

        {/* Collapsed (icon-only) state */}
        <div className="hidden group-data-[collapsible=icon]:flex justify-center items-center py-3">
          <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex justify-center items-center">
            <span>SM</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => {
                const isActive =
                  item.url === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                    >
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Settings"
              isActive={pathname === "/admin/settings"}
            >
              <a href="/admin/settings">
                <Settings />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              onClick={handleLogout}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
