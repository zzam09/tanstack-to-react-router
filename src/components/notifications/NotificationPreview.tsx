import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { NOTIFICATION_ICONS } from "@/config/constants";
import { useNotifications } from "@/hooks/useNotifications";

export function NotificationPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: notificationsData } = useNotifications();
  const notification = notificationsData?.find((n) => n.id === id);

  if (!notification) {
    return (
      <div className="p-6 text-center text-sm text-muted-foreground">
        Notification not found.
      </div>
    );
  }

  const Icon = NOTIFICATION_ICONS[notification.kind] ?? NOTIFICATION_ICONS.system;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex items-center gap-3 px-4 py-4 border-b border-border/40">
        <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-semibold">Notification</span>
      </div>

      <div className="flex items-center gap-3 px-4 py-5 border-b border-border/40">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold">{notification.title}</p>
          <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
        </div>
      </div>

      <div className="px-4 py-5 text-sm text-foreground leading-relaxed">
        {notification.message}
      </div>
    </div>
  );
}
