import { getContacts, markContactAsRead } from "@/lib/actions/contact-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default async function AdminContactsPage() {
  const contacts = await getContacts();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Contact Messages</h2>

      <div className="grid gap-4">
        {contacts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">No messages yet.</p>
            </CardContent>
          </Card>
        ) : (
          contacts.map((contact: any) => (
            <Card
              key={contact._id}
              className={contact.isRead ? "opacity-70" : "border-primary/20"}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold">
                  {contact.subject}
                </CardTitle>
                {!contact.isRead && (
                  <form
                    action={async () => {
                      "use server";
                      await markContactAsRead(contact._id.toString());
                    }}
                  >
                    <Button variant="ghost" size="sm">
                      <Check className="mr-2 h-4 w-4" /> Mark as Read
                    </Button>
                  </form>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">{contact.name}</span>
                    <span className="text-muted-foreground">
                      ({contact.email})
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">
                    {contact.message}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
