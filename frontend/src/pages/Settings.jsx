import SettingsHeader from "../components/settings/SettingsHeader";
import NotificationSettings from "../components/settings/NotificationSettings";
import AIPreferences from "../components/settings/AIPreferences";
import BudgetPreferences from "../components/settings/BudgetPreferences";
import CurrencySettings from "../components/settings/CurrencySettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import ReceiptScannerSettings from "../components/settings/ReceiptScannerSettings";
import AboutSettings from "../components/settings/AboutSettings";

import PageTransition from "../components/animations/PageTransition";
import FadeCard from "../components/animations/FadeCard";

function Section({
  title,
  description,
  children,
}) {
  return (
    <section className="space-y-5">

      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}

        <div className="mt-4 h-px bg-slate-200 dark:bg-slate-700" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {children}
      </div>

    </section>
  );
}

export default function Settings() {
  return (
    <PageTransition>

      <div className="mx-auto w-full max-w-[1500px] space-y-10">

        <SettingsHeader />

        <FadeCard delay={0.05}>
          <Section
            title="Account & Security"
            description="Manage account protection and your preferred currency."
          >
            <SecuritySettings />
            <CurrencySettings />
          </Section>
        </FadeCard>

        <FadeCard delay={0.10}>
          <Section
            title="Finance Preferences"
            description="Control budget alerts, receipt scanning, notifications, and AI behavior."
          >
            <BudgetPreferences />
            <ReceiptScannerSettings />
            <NotificationSettings />
            <AIPreferences />
          </Section>
        </FadeCard>

        <FadeCard delay={0.15}>
          <Section
            title="About"
            description="Application information and current PaisaTrack details."
          >
            <div className="xl:col-span-2">
              <AboutSettings />
            </div>
          </Section>
        </FadeCard>

      </div>

    </PageTransition>
  );
}