import { getSubscribers } from "@/lib/actions/newsletter-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import DeleteSubscriberButton from "@/components/admin/DeleteSubscriberButton";

export default async function SubscribersPage() {
  const subscribers = await getSubscribers();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-display">Subscribers</h1>
      </div>

      <div className="grid gap-4">
        {subscribers.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-10 text-muted-foreground">
              <Mail className="h-10 w-10 mb-2 opacity-20" />
              <p>No subscribers found</p>
            </CardContent>
          </Card>
        ) : (
          subscribers.map((subscriber: any) => (
            <div
              key={subscriber._id}
              className="p-5 flex items-center justify-between bg-card border border-border rounded-lg group hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{subscriber.email}</p>
                  <p className="text-xs text-muted-foreground">
                    Subscribed on{" "}
                    {new Date(subscriber.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <DeleteSubscriberButton id={subscriber._id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
