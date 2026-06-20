import {
  Award,
  Bell,
  Calendar,
  CircleDollarSign,
  Sparkles,
} from "lucide-react";
import type { AppNotification, NotificationKind } from "@/types/notification";

const ICONS: Record<NotificationKind, React.ComponentType<{ size?: number }>> = {
  upgrade: Sparkles,
  badge: Award,
  event: Calendar,
  profit: CircleDollarSign,
  system: Bell,
};

export function NotificationItem({ n }: { n: AppNotification }) {
  const Icon = ICONS[n.kind];

  return (
    <div className="flex items-start gap-4 px-5 py-4 transition active:scale-[0.985] hover:bg-[var(--surface)]">
      {/* Left: Avatar + Unread Dot */}
      <div className="relative flex-shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] border border-[var(--border)]">
          <Icon size={20} />
        </div>
        {n.unread && (
          <span className="absolute -left-0.5 -top-0.5 h-3 w-3 rounded-full bg-blue-500 ring-2 ring-[var(--background)]" />
        )}
      </div>

      {/* Main Content */}
      <div className="min-w-0 flex-1">
        {/* Header: Sender + Time */}
        <div className="flex items-center justify-between">
          <div className="font-semibold text-[var(--text)]">{n.title}</div>
          <div className="text-xs text-[var(--muted)] whitespace-nowrap pl-2">
            {n.time}
          </div>
        </div>

        {/* Message Preview */}
        <div className="mt-0.5 text-[14px] leading-snug text-[var(--muted)] line-clamp-2">
          {n.message}
        </div>
      </div>

      {/* Right Chevron */}
      <div className="flex-shrink-0 self-center text-[var(--muted)] text-xl leading-none opacity-60">
        ›
      </div>
    </div>
  );
}
