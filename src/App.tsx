import { Match, Switch } from "solid-js";
import { WelcomePage, DashboardPage, SettingsPage } from "./pages";
import { appStore } from "./stores/app";

function App() {
  const { currentPage } = appStore;

  return (
    <Switch fallback={<WelcomePage />}>
      <Match when={currentPage() === "welcome"}>
        <WelcomePage />
      </Match>
      <Match when={currentPage() === "dashboard"}>
        <DashboardPage />
      </Match>
      <Match when={currentPage() === "settings"}>
        <SettingsPage />
      </Match>
    </Switch>
  );
}

export default App;
