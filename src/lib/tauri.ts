import { invoke } from "@tauri-apps/api/core";

// Proxy management
export async function startProxy(): Promise<void> {
  return invoke("start_proxy");
}

export async function stopProxy(): Promise<void> {
  return invoke("stop_proxy");
}

export interface ProxyStatus {
  running: boolean;
  port: number;
  endpoint: string;
}

export async function getProxyStatus(): Promise<ProxyStatus> {
  return invoke("get_proxy_status");
}

// OAuth management
export type Provider = "claude" | "openai" | "gemini" | "qwen";

export async function openOAuth(provider: Provider): Promise<void> {
  return invoke("open_oauth", { provider });
}

export interface AuthStatus {
  claude: boolean;
  openai: boolean;
  gemini: boolean;
  qwen: boolean;
}

export async function getAuthStatus(): Promise<AuthStatus> {
  return invoke("get_auth_status");
}

// Config
export interface AppConfig {
  port: number;
  autoStart: boolean;
  launchAtLogin: boolean;
}

export async function getConfig(): Promise<AppConfig> {
  return invoke("get_config");
}

export async function saveConfig(config: AppConfig): Promise<void> {
  return invoke("save_config", { config });
}
