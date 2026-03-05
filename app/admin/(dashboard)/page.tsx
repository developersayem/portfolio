import { getDashboardStats } from "@/lib/actions/dashboard-actions";
import {
  BookOpen,
  FolderKanban,
  MessageSquare,
  Users,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const { stats, latestMessages } = await getDashboardStats();

  const statCards = [
    {
      title: "Total Blogs",
      value: stats.blogs,
      icon: BookOpen,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      link: "/admin/blogs",
    },
    {
      title: "Total Projects",
      value: stats.projects,
      icon: FolderKanban,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      link: "/admin/projects",
    },
    {
      title: "Messages",
      value: stats.messages,
      icon: MessageSquare,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      link: "/admin/contacts",
    },
    {
      title: "Subscribers",
      value: stats.subscribers,
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10",
      link: "/admin/subscribers",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between group hover:border-primary/40 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-xl ${card.bg} ${card.color}`}>
                <card.icon size={20} />
              </div>
              <Link
                href={card.link}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary"
              >
                <ArrowUpRight size={18} />
              </Link>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                {card.title}
              </p>
              <p className="text-3xl font-bold font-display">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-bold text-lg">Latest Messages</h3>
            <Link
              href="/admin/contacts"
              className="text-xs text-primary hover:underline font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {latestMessages.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No messages yet.
              </p>
            ) : (
              latestMessages.map((msg: any) => (
                <div
                  key={msg._id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border/50"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary">
                      {msg.name[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate capitalize">
                      {msg.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate italic">
                      {msg.subject}
                    </p>
                  </div>
                  <div className="text-[10px] text-muted-foreground whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-center items-center text-center space-y-4 bg-muted/20">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <Users size={32} />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl">
              Grow Your Audience
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Your newsletter currently has {stats.subscribers} active
              subscribers. Keep creating great content!
            </p>
          </div>
          <Link
            href="/admin/subscribers"
            className="px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Manage Subscribers
          </Link>
        </div>
      </div>
    </div>
  );
}
