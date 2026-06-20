import type { PaymentRecord } from "@/types/payment";

const STATUS_COLOR: Record<PaymentRecord["status"], string> = {
  Approved: "text-[var(--success)]",
  Pending: "text-[var(--pending)]",
  Rejected: "text-[#ef4444]",
};

export function PaymentTable({ rows }: { rows: PaymentRecord[] }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-10 text-center text-sm text-[var(--muted)]">
        No payment history yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-[var(--border)]">
      {rows.map((p) => (
        <div
          key={p.id}
          className="flex items-start gap-4 px-5 py-4 transition active:scale-[0.985] hover:bg-[var(--surface)]"
        >
          {/* Left: Icon / Avatar-style placeholder */}
          <div className="relative flex-shrink-0 pt-0.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] border border-[var(--border)]">
              💰
            </div>
          </div>

          {/* Main Content */}
          <div className="min-w-0 flex-1">
            {/* Header: Tier + Amount */}
            <div className="flex items-center justify-between">
              <div className="font-semibold text-[var(--text)]">{p.tier}</div>
              <strong className="font-mono-data text-base">{p.amount}</strong>
            </div>

            {/* Date + Reference */}
            <div className="mt-0.5 text-[13px] text-[var(--muted)]">
              {p.date} • {p.reference}
            </div>

            {/* Status */}
            <div className={`mt-1 text-xs font-bold uppercase tracking-wider ${STATUS_COLOR[p.status]}`}>
              {p.status}
            </div>

            {/* Divider line under content — does NOT cross avatar */}
            <div className="mt-3 -mr-5 border-t border-[var(--border)]" />
          </div>

          {/* Right Chevron */}
          <div className="flex-shrink-0 self-center text-[var(--muted)] text-xl leading-none opacity-60 pr-1">
            ›
          </div>
        </div>
      ))}
    </div>
  );
}
