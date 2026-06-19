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
    <div className="flex flex-col gap-3">
      {rows.map((p) => (
        <div
          key={p.id}
          className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-5 animate-slide-up"
        >
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
                {p.date}
              </div>
              <div className="mt-1 text-base font-semibold text-[var(--text)]">
                {p.tier}
              </div>
            </div>
            <strong className="font-mono-data text-lg">{p.amount}</strong>
          </div>
          <div className="flex items-center justify-between border-t border-[var(--border)] pt-3 text-[11px]">
            <span className="font-mono-data text-[var(--muted)]">
              {p.reference}
            </span>
            <span
              className={`font-bold uppercase tracking-wider ${STATUS_COLOR[p.status]}`}
            >
              {p.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
