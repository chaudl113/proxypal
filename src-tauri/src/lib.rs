use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::State;

// Proxy status structure
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProxyStatus {
    pub running: bool,
    pub port: u16,
    pub endpoint: String,
}

impl Default for ProxyStatus {
    fn default() -> Self {
        Self {
            running: false,
            port: 8080,
            endpoint: "http://localhost:8080/v1".to_string(),
        }
    }
}

// Auth status for different providers
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AuthStatus {
    pub claude: bool,
    pub openai: bool,
    pub gemini: bool,
    pub qwen: bool,
}

impl Default for AuthStatus {
    fn default() -> Self {
        Self {
            claude: false,
            openai: false,
            gemini: false,
            qwen: false,
        }
    }
}

// App configuration
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AppConfig {
    pub port: u16,
    #[serde(rename = "autoStart")]
    pub auto_start: bool,
    #[serde(rename = "launchAtLogin")]
    pub launch_at_login: bool,
}

impl Default for AppConfig {
    fn default() -> Self {
        Self {
            port: 8080,
            auto_start: true,
            launch_at_login: false,
        }
    }
}

// App state
pub struct AppState {
    pub proxy_status: Mutex<ProxyStatus>,
    pub auth_status: Mutex<AuthStatus>,
    pub config: Mutex<AppConfig>,
}

impl Default for AppState {
    fn default() -> Self {
        Self {
            proxy_status: Mutex::new(ProxyStatus::default()),
            auth_status: Mutex::new(AuthStatus::default()),
            config: Mutex::new(AppConfig::default()),
        }
    }
}

// Tauri commands
#[tauri::command]
fn get_proxy_status(state: State<AppState>) -> ProxyStatus {
    state.proxy_status.lock().unwrap().clone()
}

#[tauri::command]
fn start_proxy(state: State<AppState>) -> Result<(), String> {
    let mut status = state.proxy_status.lock().unwrap();
    // TODO: Actually start the CLIProxyAPI process
    status.running = true;
    Ok(())
}

#[tauri::command]
fn stop_proxy(state: State<AppState>) -> Result<(), String> {
    let mut status = state.proxy_status.lock().unwrap();
    // TODO: Actually stop the CLIProxyAPI process
    status.running = false;
    Ok(())
}

#[tauri::command]
fn get_auth_status(state: State<AppState>) -> AuthStatus {
    state.auth_status.lock().unwrap().clone()
}

#[tauri::command]
fn open_oauth(provider: String) -> Result<(), String> {
    // TODO: Open OAuth URL in browser and handle callback
    println!("Opening OAuth for provider: {}", provider);
    Ok(())
}

#[tauri::command]
fn get_config(state: State<AppState>) -> AppConfig {
    state.config.lock().unwrap().clone()
}

#[tauri::command]
fn save_config(state: State<AppState>, config: AppConfig) -> Result<(), String> {
    let mut current_config = state.config.lock().unwrap();
    *current_config = config;
    // TODO: Persist config to file
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(AppState::default())
        .invoke_handler(tauri::generate_handler![
            get_proxy_status,
            start_proxy,
            stop_proxy,
            get_auth_status,
            open_oauth,
            get_config,
            save_config,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
