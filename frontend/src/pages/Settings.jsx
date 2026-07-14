import SettingsHeader from "../components/settings/SettingsHeader";
import AppearanceSettings from "../components/settings/AppearanceSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import AIPreferences from "../components/settings/AIPreferences";
import BudgetPreferences from "../components/settings/BudgetPreferences";
import CurrencySettings from "../components/settings/CurrencySettings";
import SecuritySettings from "../components/settings/SecuritySettings";

export default function Settings() {

  return (

    <div className="space-y-8">

      <SettingsHeader />

      <div className="grid xl:grid-cols-2 gap-8">

        <AppearanceSettings />

        <NotificationSettings />

        <AIPreferences />

        <BudgetPreferences />

        <CurrencySettings />

        <SecuritySettings />

      </div>

    </div>

  );

}