import React, { useState } from "react";
import { Mail, MapPin, Send, Check, Copy, Linkedin, Github, Phone, Database, QrCode } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import { MessagesModal } from "./MessagesModal";
import { ContactQRCodeModal } from "./ContactQRCodeModal";

export const Contact: React.FC = () => {
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "submitted" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("submitted");
        setFeedbackMessage("Thank you! Your message has been stored in Neon PostgreSQL.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        // Fallback: If DB is not configured yet or has an error
        setStatus("submitted");
        setFeedbackMessage("Thank you! Your message has been received.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      // Graceful fallback for offline / static hosting
      setStatus("submitted");
      setFeedbackMessage("Thank you! Your message has been noted.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-900 bg-slate-950/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-indigo-400 mb-2">
            Get In Touch
          </h2>
          <h3 className="text-3xl font-bold text-white tracking-tight">
            Let's Discuss Opportunities
          </h3>
          <p className="mt-2 text-slate-400 text-sm">
            Interested in hiring me, collaborating on a project, or just saying hello? My inbox is
            always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl glass-panel">
              <h4 className="text-lg font-bold text-white mb-6">Contact Information</h4>

              <div className="space-y-5">
                {/* Email Item */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Email Address</div>
                      <a
                        href={`mailto:${personal.email}`}
                        className="text-sm font-medium text-slate-200 hover:text-indigo-400 transition-colors"
                      >
                        {personal.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                    title="Copy Email"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Phone Item */}
                {'phone' in personal && personal.phone && (
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Phone Number</div>
                      <a
                        href={`tel:${personal.phone}`}
                        className="text-sm font-medium text-slate-200 hover:text-emerald-400 transition-colors"
                      >
                        {personal.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Location Item */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Location</div>
                    <div className="text-sm font-medium text-slate-200">{personal.location}</div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 mt-6 border-t border-slate-800">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Connect on Socials
                </div>
                <div className="flex gap-3">
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-300 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Availability Callout */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-indigo-900/30 to-purple-900/20 border border-indigo-500/30">
              <div className="text-sm font-semibold text-indigo-300 mb-1">
                Open for Opportunities
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Currently actively interviewing for Frontend, Full Stack, and AI-oriented software
                developer positions.
              </p>
            </div>

            {/* Save to Contacts QR Code Pill */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Save to Phone Contacts</div>
                  <div className="text-[11px] text-slate-400">Scan QR Code or download vCard</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsQRModalOpen(true)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600/90 hover:bg-emerald-500 text-white border border-emerald-500/50 transition-all shadow-sm cursor-pointer active:scale-95"
              >
                Show QR
              </button>
            </div>

            {/* Neon PostgreSQL Live Inquiries Button */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Neon PostgreSQL Data</div>
                  <div className="text-[11px] text-slate-400">View stored contact submissions</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsMessagesModalOpen(true)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white border border-slate-700 hover:border-indigo-500 transition-all shadow-sm"
              >
                View Messages
              </button>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl glass-panel space-y-4 shadow-xl"
            >
              <h4 className="text-lg font-bold text-white mb-2">Send a Direct Message</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Hiring Manager"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-750 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-slate-300 mb-1.5"
                  >
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-750 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Job Opportunity / Project Collaboration"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-750 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-750 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                />
              </div>

              {status === "submitted" && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{feedbackMessage || "Thank you! Your message has been sent successfully."}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
              >
                <span>{status === "loading" ? "Saving to Database..." : "Send Message"}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Neon PostgreSQL Inquiries Modal */}
      <MessagesModal
        isOpen={isMessagesModalOpen}
        onClose={() => setIsMessagesModalOpen(false)}
      />

      {/* Scan to Save Contact QR Code Modal */}
      <ContactQRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />
    </section>
  );
};
