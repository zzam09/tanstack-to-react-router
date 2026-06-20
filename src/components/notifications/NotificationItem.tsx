import { useNavigate } from "react-router-dom";
import type { AppNotification } from "@/types/notification";
import { NOTIFICATION_ICONS } from "@/config/constants";

const ICON_CLASS: Record<string, string> = {
  upgrade: "bg-[rgba(197,160,89,0.1)] text-[var(--gold)]",
  badge: "bg-[rgba(16,185,129,0.1)] text-[var(--success)]",
  event: "bg-[rgba(96,165,250,0.1)] text-[#60a5fa]",
  profit: "bg-[rgba(16,185,129,0.08)] text-[var(--success)]",
  system: "bg-white/5 text-[var(--muted)]",
};

export function NotificationItem({ notification }: { notification: AppNotification }) {
  const navigate = useNavigate();
  const Icon = NOTIFICATION_ICONS[notification.kind];
  
  return (
    <div
      onClick={() => navigate(`/notifications/${notification.id}`)}
      className={[
        "flex items-start gap-4 rounded-[20px] border bg-[var(--surface)] p-5 transition active:scale-[0.99] animate-slide-up cursor-pointer hover:bg-white/[0.04]",
        notification.unread
          ? "border-[var(--border-bright)] bg-white/[0.02]"
          : "border-[var(--border)]",
      ].join(" ")}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${ICON_CLASS[notification.kind]}`}
      >
        <Icon size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-[var(--text)]">
          {notification.title}
          {notification.unread && (
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />
          )}
        </div>
        <div className="mb-2 text-[13px] leading-[1.5] text-[var(--muted)]">
          {notification.message}
        </div>
        <div className="font-mono-data text-[11px] text-[var(--muted)] opacity-60">
          {notification.time}
        </div>
      </div>
    </div>
  );
}
