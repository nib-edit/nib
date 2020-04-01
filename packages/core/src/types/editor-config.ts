interface PluginConfig {
  options?: string;
  color?: {
    colors: string[];
  };
}

interface ToolbarConfig {
  options?: string;
  top?: {
    options?: string;
    block?: { options?: string; grouped?: boolean };
    inline?: { options?: string };
  };
  inline?: {
    options?: string;
    block?: { options?: string };
    inline?: { options?: string };
  };
}

export interface EditorConfig {
  plugins?: PluginConfig;
  toolbar?: ToolbarConfig;
}
