export default function AdminDashboard() {
  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      <div className="aspect-video rounded-xl bg-muted/50 p-6 flex flex-col justify-between">
        <h3 className="text-sm font-medium text-muted-foreground uppercase">
          Total Blogs
        </h3>
        <p className="text-3xl font-bold">0</p>
      </div>
      <div className="aspect-video rounded-xl bg-muted/50 p-6 flex flex-col justify-between">
        <h3 className="text-sm font-medium text-muted-foreground uppercase">
          Total Projects
        </h3>
        <p className="text-3xl font-bold">0</p>
      </div>
      <div className="aspect-video rounded-xl bg-muted/50 p-6 flex flex-col justify-between">
        <h3 className="text-sm font-medium text-muted-foreground uppercase">
          Messages
        </h3>
        <p className="text-3xl font-bold">0</p>
      </div>
    </div>
  );
}
