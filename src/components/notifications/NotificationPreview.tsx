import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { NOTIFICATION_ICONS } from "@/config/constants";
import { useNotifications } from "@/hooks/useNotifications";

export function NotificationPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: notifications } = useNotifications();
  const notification = notifications?.find((n) => n.id === id);

  useEffect(() => {
    if (notification && notification.unread) {
      // Mark as read by updating the notification in the list
      // In a real app, this would call an API to update the backend
      notification.unread = false;
    }
  }, [notification]);

  if (!notification) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
        <div className="text-center text-sm text-muted-foreground">
          Notification not found.
        </div>
      </div>
    );
  }

  const Icon = NOTIFICATION_ICONS[notification.kind] ?? NOTIFICATION_ICONS.system;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header with back button and title */}
      <div className="flex items-center gap-4 px-4 py-4 border-b border-border/40">
        <button 
          onClick={() => navigate(-1)} 
          className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-semibold">Notification</span>
      </div>

      {/* Icon, Title, Time row */}
      <div className="flex items-start gap-4 px-4 py-5 border-b border-border/40">
        <div className="relative w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-muted-foreground" />
          {notification.unread && (
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-background" />
          )}
        </div>
        <div className="flex-1">
          <p className="font-bold text-foreground">{notification.title}</p>
          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
        </div>
      </div>

      {/* Message body */}
      <div className="flex-1 px-4 py-6 text-sm text-foreground leading-relaxed">
        {notification.message}
      </div>

      {/* Timestamp at bottom */}
      <div className="px-4 py-4 text-xs text-muted-foreground border-t border-border/40">
        {notification.time}
      </div>
    </div>
  );
}
