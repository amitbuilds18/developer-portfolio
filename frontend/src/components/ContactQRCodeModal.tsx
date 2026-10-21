import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { X, QrCode, Download, Check, Smartphone, Sparkles } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

interface ContactQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactQRCodeModal: React.FC<ContactQRCodeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [downloaded, setDownloaded] = useState(false);

  const { personal } = portfolioData;

  // Standard vCard 3.0 payload format recognized by iOS and Android cameras
  const vCardString = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Ray;Amit;Kumar;;",
    `FN:${personal.name}`,
    `ORG:${personal.role}`,
    "TITLE:Full Stack & AI Developer",
    `TEL;TYPE=CELL;TYPE=VOICE:${personal.phone}`,
    `EMAIL;TYPE=INTERNET:${personal.email}`,
    `URL:${personal.linkedin}`,
    `NOTE:${personal.about}`,
    "END:VCARD",
  ].join("\n");

  useEffect(() => {
    QRCode.toDataURL(vCardString, {
      width: 320,
      margin: 2,
      color: {
        dark: "#090d16",
        light: "#ffffff",
      },
      errorCorrectionLevel: "M",
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("Error generating contact QR code:", err));
  }, [vCardString]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const handleDownloadVCard = () => {
    const blob = new Blob([vCardString], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${personal.name.replace(/\s+/g, "_")}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-750 rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Scan to Save Contact
              </h3>
              <p className="text-[11px] text-slate-400">Instant vCard for iOS & Android</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col items-center text-center space-y-5 bg-slate-950">
          {/* QR Code Container */}
          <div className="relative p-3 bg-white rounded-2xl shadow-2xl border-4 border-slate-800 group">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt={`Contact QR Code for ${personal.name}`}
                className="w-56 h-56 rounded-xl"
              />
            ) : (
              <div className="w-56 h-56 flex items-center justify-center text-slate-500 font-mono text-xs">
                Generating QR...
              </div>
            )}
          </div>

          {/* Guide Note */}
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <Smartphone className="w-4 h-4" />
              <span>Open Phone Camera & Scan</span>
            </div>
            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
              Automatically creates a contact entry with Amit's phone number, email, role, and LinkedIn.
            </p>
          </div>

          {/* Direct vCard Download Button */}
          <div className="w-full pt-3 border-t border-slate-850 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleDownloadVCard}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all active:scale-95 cursor-pointer"
            >
              {downloaded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Contact Card Saved (.vcf)</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download .VCF Card</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
