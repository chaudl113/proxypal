import { Button } from "../components/ui";
import { StatusIndicator } from "../components/StatusIndicator";
import { ApiEndpoint } from "../components/ApiEndpoint";
import { ProviderCard } from "../components/ProviderCard";
import { appStore } from "../stores/app";
import type { Provider } from "../lib/tauri";

const providers = [
  { name: "Claude", provider: "claude" as Provider, icon: "🟠" },
  { name: "ChatGPT", provider: "openai" as Provider, icon: "🟢" },
  { name: "Gemini", provider: "gemini" as Provider, icon: "🔵" },
  { name: "Qwen", provider: "qwen" as Provider, icon: "🟣" },
];

export function DashboardPage() {
  const { proxyStatus, setProxyStatus, authStatus, setCurrentPage } = appStore;

  const toggleProxy = () => {
    setProxyStatus((prev) => ({
      ...prev,
      running: !prev.running,
    }));
    // TODO: Call Tauri command to start/stop proxy
  };

  const handleConnect = async (provider: Provider) => {
    // TODO: Implement OAuth flow
    console.log("Connecting to", provider);
  };

  const connectedProviders = () => {
    const status = authStatus();
    return providers.filter((p) => status[p.provider]);
  };

  const disconnectedProviders = () => {
    const status = authStatus();
    return providers.filter((p) => !status[p.provider]);
  };

  return (
    <div class="min-h-screen flex flex-col">
      {/* Header */}
      <header class="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <span class="text-white text-xl">⚡</span>
            </div>
            <div>
              <h1 class="font-bold text-lg text-gray-900 dark:text-gray-100">
                ProxyPal
              </h1>
              <p class="text-xs text-gray-500 dark:text-gray-400">Dashboard</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <StatusIndicator
              running={proxyStatus().running}
              onToggle={toggleProxy}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage("settings")}
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main class="flex-1 p-6 overflow-y-auto">
        <div class="max-w-3xl mx-auto space-y-6">
          {/* API Endpoint */}
          <ApiEndpoint
            endpoint={proxyStatus().endpoint}
            running={proxyStatus().running}
          />

          {/* Connected accounts */}
          {connectedProviders().length > 0 && (
            <div>
              <h2 class="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">
                Connected Accounts
              </h2>
              <div class="grid grid-cols-2 gap-3">
                {connectedProviders().map((provider) => (
                  <div class="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                    <span class="text-xl">{provider.icon}</span>
                    <span class="font-medium text-green-800 dark:text-green-300">
                      {provider.name}
                    </span>
                    <svg
                      class="w-4 h-4 ml-auto text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add more accounts */}
          {disconnectedProviders().length > 0 && (
            <div>
              <h2 class="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">
                Add More Accounts
              </h2>
              <div class="grid grid-cols-2 gap-3">
                {disconnectedProviders().map((provider) => (
                  <button
                    class="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-brand-500 transition-colors"
                    onClick={() => handleConnect(provider.provider)}
                  >
                    <span class="text-xl">{provider.icon}</span>
                    <span class="font-medium text-gray-700 dark:text-gray-300">
                      {provider.name}
                    </span>
                    <svg
                      class="w-4 h-4 ml-auto text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick setup guides */}
          <div>
            <h2 class="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">
              Quick Setup
            </h2>
            <div class="grid grid-cols-3 gap-3">
              {["Cursor", "Cline", "Continue"].map((tool) => (
                <button class="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-brand-500 transition-colors text-center">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {tool}
                  </span>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    View setup
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
