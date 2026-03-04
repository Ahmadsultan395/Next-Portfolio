import { useContact } from "@/context/ContactContext";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  MessageCircle,
  Copy,
  Check,
} from "lucide-react";

export default function InfoGrid({ copied, copyEmail }: any) {
  const { contact } = useContact();

  const infoCards = [
    {
      id: "email",
      title: "Email",
      icon: Mail,
      gradient: "from-[var(--hero-image)] to-purple-500",
      content: `${contact?.email}`,
      glow: true,
      actions: ["sendEmail", "copyEmail"], // keys to decide JSX in component
    },
    {
      id: "phone",
      title: "Phone",
      icon: Phone,
      gradient: "from-purple-500 to-fuchsia-500",
      content: `${contact?.phone}`,
      actions: ["whatsapp"],
    },
    {
      id: "location",
      title: "Location",
      icon: MapPin,
      gradient: "from-cyan-400 to-sky-500",
      content: `${contact?.location}`,
      extra: `${contact?.locationNote}`,
    },
    {
      id: "social",
      title: "Social",
      icon: Github,
      gradient: "from-pink-500 to-rose-500",
      content: "Profiles & work",
      actions: ["github", "linkedin"],
    },
  ];
  return (
    <div className="info-grid grid sm:grid-cols-2 gap-6">
      {infoCards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            className="info-card relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-7 shadow-[0_0_10px_var(--hero-image)]"
          >
            {/* Glow */}
            {card.glow && (
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl bg-gradient-to-br from-[var(--hero-image)]/18 via-purple-500/10 to-transparent opacity-80" />
            )}

            <div className="relative">
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="mt-4 text-xl font-extrabold text-[var(--foreground)]">
                {card.title}
              </h3>

              <p className="mt-1 text-[15px] text-[var(--muted)] break-all">
                {card.content}
              </p>

              {card.extra && (
                <p className="mt-3 text-[15px] text-[var(--muted)]">
                  {card.extra}
                </p>
              )}

              {card.actions && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {card.actions.includes("sendEmail") && (
                    <a
                      href={`mailto:${card.content}`}
                      className="px-4 py-2 rounded-full bg-[var(--head-btn-border)]/35  border border-white/12 text-sm text-[var(--foreground)] hover:bg-[var(--head-btn-border)]/60  transition"
                    >
                      Send Email
                    </a>
                  )}
                  {card.actions.includes("copyEmail") && (
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--head-btn-border)]/35 border border-white/12 text-sm text-[var(--foreground)] hover:bg-[var(--head-btn-border)]/60 transition"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-[var(--hero-image)]" />{" "}
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" /> Copy
                        </>
                      )}
                    </button>
                  )}

                  {card.actions.includes("whatsapp") && (
                    <a
                      href="https://wa.me/1234567890"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--head-btn-border)]/35 border border-white/12 text-sm text-[var(--foreground)] hover:bg-[var(--head-btn-border)]/60 transition"
                    >
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </a>
                  )}

                  {card.actions.includes("github") && (
                    <a
                      href={`${contact?.github}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--head-btn-border)]/35 border border-white/12 text-sm text-[var(--foreground)] hover:bg-[var(--head-btn-border)]/60 transition"
                    >
                      <Github className="w-4 h-4" /> GitHub
                    </a>
                  )}

                  {card.actions.includes("linkedin") && (
                    <a
                      href={`${contact?.linkedin}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--head-btn-border)]/35 border-white/12 text-sm text-[var(--foreground)] hover:bg-[var(--head-btn-border)]/60 transition"
                    >
                      <Linkedin className="w-4 h-4" /> LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
