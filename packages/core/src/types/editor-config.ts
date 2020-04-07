interface IPluginConfig {
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

interface IToolbarConfig {
  options?: string;
  top?: ToolbarType;
  inline?: ToolbarType;
}

export interface IEditorConfig {
  plugins?: IPluginConfig;
  toolbar?: IToolbarConfig;
}
