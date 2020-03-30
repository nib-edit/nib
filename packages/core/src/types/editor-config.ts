type PluginConfig = {
  options?: string;
  color?: {
    colors: string[];
  };
};

type ToolbarConfig = {
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
};

export type EditorConfigType = {
  plugins?: PluginConfig;
  toolbar?: ToolbarConfig;
};
