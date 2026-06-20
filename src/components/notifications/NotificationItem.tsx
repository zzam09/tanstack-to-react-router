import { useNavigate } from "react-router-dom";
import { NOTIFICATION_ICONS } from "@/config/constants";
import type { AppNotification } from "@/types/notification";

export function NotificationItem({ notification }: { notification: AppNotification }) {
  const navigate = useNavigate();
  const Icon = NOTIFICATION_ICONS[notification.kind];

  return (
    <div
      onClick={() => navigate(`/notifications/${notification.id}`)}
      className="flex items-start gap-4 px-5 py-4 transition active:scale-[0.985] hover:bg-[var(--surface)] relative cursor-pointer"
    >
      {/* Left: Avatar + Unread Dot */}
      <div className="relative flex-shrink-0 pt-0.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] border border-[var(--border)]">
          <Icon className="w-5 h-5" />
        </div>
        {notification.unread && (
          <span className="absolute -left-0.5 -top-0.5 h-3 w-3 rounded-full bg-blue-500 ring-2 ring-[var(--background)]" />
        )}
      </div>

      {/* Main Content Area */}
      <div className="min-w-0 flex-1">
        {/* Header: Sender + Time (same line) */}
        <div className="flex items-center justify-between">
          <div className="font-semibold text-[var(--text)]">{notification.title}</div>
          <div className="text-xs text-[var(--muted)] whitespace-nowrap pl-3">
            {notification.time}
          </div>
        </div>

        {/* Message Preview */}
        <div className="mt-0.5 text-[14px] leading-snug text-[var(--muted)] line-clamp-2 pr-6">
          {notification.message}
        </div>

        {/* Divider line under message — does NOT cross avatar */}
        <div className="mt-3 -mr-5 border-t border-[var(--border)]" />
      </div>

      {/* Right Chevron */}
      <div className="flex-shrink-0 self-center text-[var(--muted)] text-xl leading-none opacity-60 pr-1">
        ›
      </div>
    </div>
  );
}
