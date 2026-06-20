import { Award, Bell, Calendar, CircleDollarSign, Sparkles, CreditCard } from "lucide-react";
import type { NotificationKind } from "@/types/notification";

export const NOTIFICATION_ICONS: Record<NotificationKind, React.ComponentType<{ className?: string }>> = {
  upgrade: Sparkles,
  badge: Award,
  event: Calendar,
  profit: CircleDollarSign,
  system: Bell,
};

export const PAYMENT_ICON = CreditCard;

export const STATUS_COLOR: Record<string, string> = {
  Approved: "text-[var(--success)]",
  Pending: "text-[var(--pending)]",
  Rejected: "text-[#ef4444]",
};
