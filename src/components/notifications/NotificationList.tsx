import type { AppNotification } from "@/types/notification";
import { NotificationItem } from "./NotificationItem";

export function NotificationList({ items }: { items: AppNotification[] }) {
  if (items.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground py-10">
        No notifications yet.
      </div>
    );
  }
  return (
    <div className="divide-y divide-border/40 w-full">
      {items.map((n) => (
        <NotificationItem key={n.id} notification={n} />
      ))}
    </div>
  );
}
