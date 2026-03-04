interface Feature {
  icon: string;
  text: string;
}

interface AuthBrandingProps {
  title: string;
  highlightText: string;
  description: string;
  features?: Feature[];
  showStats?: boolean;
}

export default function SignupBranding({
  title,
  highlightText,
  description,
  features,
  showStats = false,
}: AuthBrandingProps) {
  return (
    <div className="side-content hidden lg:block space-y-8">
      <div className="relative">
        <h1 className="text-6xl font-black text-[var(--foreground)] leading-tight">
          {title}
          <span className="text-[var(--hero-image)]"> {highlightText}</span>
        </h1>
        <div className="absolute -bottom-2 left-0 w-32 h-2 bg-gradient-to-r from-purple-500 to-[var(--hero-image)] rounded-full" />
      </div>

      <p className="text-xl text-[var(--muted)] max-w-md leading-relaxed">
        {description}
      </p>

      {showStats && (
        <div className="grid grid-cols-3 gap-6 pt-8">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-[var(--hero-image)]">
              2K+
            </div>
            <div className="text-sm text-[var(--muted)]">Active Users</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-purple-500">98%</div>
            <div className="text-sm text-[var(--muted)]">Satisfaction</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-[var(--hero-image)]">
              50+
            </div>
            <div className="text-sm text-[var(--muted)]">Countries</div>
          </div>
        </div>
      )}

      {/* Features List */}
      {features && (
        <div className="space-y-4 pt-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-[var(--card-bg)]/30 backdrop-blur-sm border border-[var(--hero-image)]/10 rounded-xl hover:border-[var(--hero-image)]/30 transition-all"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[var(--hero-image)] to-purple-500 rounded-xl">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <span className="text-[var(--foreground)] font-medium">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Floating Elements */}
      <div className="relative pt-12">
        <div className="absolute top-0 right-10 w-20 h-20 bg-purple-500/20 rounded-2xl animate-bounce-slow backdrop-blur-sm" />
        <div
          className="absolute top-20 left-20 w-16 h-16 bg-[var(--hero-image)]/20 rounded-full animate-bounce-slow backdrop-blur-sm"
          style={{ animationDelay: "1s" }}
        />
      </div>
    </div>
  );
}
