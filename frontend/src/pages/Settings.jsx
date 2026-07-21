import SettingsHeader from "../components/settings/SettingsHeader";
import NotificationSettings from "../components/settings/NotificationSettings";
import AIPreferences from "../components/settings/AIPreferences";
import BudgetPreferences from "../components/settings/BudgetPreferences";
import CurrencySettings from "../components/settings/CurrencySettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import ReceiptScannerSettings from "../components/settings/ReceiptScannerSettings";
import SMSImportSettings from "../components/settings/SMSImportSettings";
import BackupSettings from "../components/settings/BackupSettings";
import AboutSettings from "../components/settings/AboutSettings";

function Section({ title, children }) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          {title}
        </h2>
        <div className="mt-3 h-px bg-gray-200" />
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        {children}
      </div>
    </section>
  );
}

export default function Settings() {
  return (
    <div className="space-y-10">
      <SettingsHeader />

      <Section title="Account">
        <SecuritySettings />
        <CurrencySettings />
      </Section>

      <Section title="Finance">
        <BudgetPreferences />
        <SMSImportSettings />
        <ReceiptScannerSettings />
        <NotificationSettings />
      </Section>
      <AIPreferences />

      <Section title="System">
        <BackupSettings />
        <AboutSettings />
      </Section>
    </div>
  );
}