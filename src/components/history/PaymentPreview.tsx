import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { useRef } from "react";
import { PAYMENT_ICON, STATUS_COLOR } from "@/config/constants";
import { useHistory } from "@/hooks/useHistory";

export function PaymentPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const receiptRef = useRef<HTMLDivElement>(null);
  const { data: paymentsData } = useHistory();
  const payment = paymentsData?.find((p) => p.id === id);

  if (!payment) {
    return (
      <div className="p-6 text-center text-sm text-muted-foreground">
        Payment not found.
      </div>
    );
  }

  const Icon = PAYMENT_ICON;

  const handleDownload = async () => {
    if (!receiptRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(receiptRef.current);
    const link = document.createElement("a");
    link.download = `receipt-${payment.id}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleShare = async () => {
    if (!receiptRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(receiptRef.current);
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], `receipt-${payment.id}.png`, { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file] });
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex items-center gap-3 px-4 py-4 border-b border-border/40">
        <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-semibold">Receipt</span>
      </div>

      <div ref={receiptRef} className="flex-1">
        <div className="flex items-center gap-3 px-4 py-5 border-b border-border/40">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold">{payment.tier}</p>
            <p className="text-xs text-muted-foreground">{payment.date}</p>
          </div>
        </div>

        <div className="divide-y divide-border/40">
          {[
            { label: "Amount", value: payment.amount, colored: true },
            { label: "Status", value: payment.status },
            { label: "Date", value: payment.date },
            { label: "Reference", value: payment.reference },
          ].map(({ label, value, colored }) => (
            <div key={label} className="flex items-center justify-between px-4 py-3">
              <span className="text-xs text-muted-foreground">{label}</span>
              <span className={`text-sm font-medium ${colored ? (STATUS_COLOR[payment.status] ?? "text-foreground") : "text-foreground"}`}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 px-4 py-5 border-t border-border/40">
        <button onClick={handleDownload} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-muted text-sm font-medium hover:bg-muted/70 transition-colors">
          <Download className="w-4 h-4" /> Download
        </button>
        <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-muted text-sm font-medium hover:bg-muted/70 transition-colors">
          <Share2 className="w-4 h-4" /> Share
        </button>
      </div>
    </div>
  );
}
