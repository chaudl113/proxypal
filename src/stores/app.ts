import { createSignal, createRoot } from "solid-js";
import type { ProxyStatus, AuthStatus, AppConfig } from "../lib/tauri";

function createAppStore() {
  // Proxy state
  const [proxyStatus, setProxyStatus] = createSignal<ProxyStatus>({
    running: false,
    port: 8080,
    endpoint: "http://localhost:8080/v1",
  });

  // Auth state
  const [authStatus, setAuthStatus] = createSignal<AuthStatus>({
    claude: false,
    openai: false,
    gemini: false,
    qwen: false,
  });

  // Config
  const [config, setConfig] = createSignal<AppConfig>({
    port: 8080,
    autoStart: true,
    launchAtLogin: false,
  });

  // UI state
  const [currentPage, setCurrentPage] = createSignal<
    "welcome" | "dashboard" | "settings"
  >("welcome");
  const [isLoading, setIsLoading] = createSignal(false);

  return {
    // Proxy
    proxyStatus,
    setProxyStatus,

    // Auth
    authStatus,
    setAuthStatus,

    // Config
    config,
    setConfig,

    // UI
    currentPage,
    setCurrentPage,
    isLoading,
    setIsLoading,
  };
}

export const appStore = createRoot(createAppStore);
