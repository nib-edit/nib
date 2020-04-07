interface PluginConfig {
  options?: string;
  color?: {
    colors: string[];
  };
}

type ToolbarType = {
  options?: string;
  block?: { options?: string; grouped?: boolean };
  inline?: { options?: string };
} & {
  [prop: string]: any;
};

interface ToolbarConfig {
  options?: string;
  top?: ToolbarType;
  inline?: ToolbarType;
}

export interface EditorConfig {
  plugins?: PluginConfig;
  toolbar?: ToolbarConfig;
}
