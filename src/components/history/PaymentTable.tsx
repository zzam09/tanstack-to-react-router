import { useNavigate } from "react-router-dom";
import type { PaymentRecord } from "@/types/payment";
import { PAYMENT_ICON, STATUS_COLOR } from "@/config/constants";

export function PaymentTable({ rows }: { rows: PaymentRecord[] }) {
  const navigate = useNavigate();

  if (rows.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground py-10">
        No payment history yet.
      </div>
    );
  }

  const Icon = PAYMENT_ICON;

  return (
    <div className="w-full">
      {rows.map((p) => (
        <div key={p.id} className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => navigate(`/history/${p.id}`)}>
          <div className="shrink-0 mt-0.5">
            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
              <Icon className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium truncate">{p.tier}</span>
              <span className={`text-sm font-semibold shrink-0 ${STATUS_COLOR[p.status] ?? "text-foreground"}`}>
                {p.amount}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{p.date}</p>
            <div className="mt-3 border-t border-border/40" />
          </div>
          <div className="shrink-0 text-muted-foreground text-lg leading-none mt-1">›</div>
        </div>
      ))}
    </div>
  );
}
