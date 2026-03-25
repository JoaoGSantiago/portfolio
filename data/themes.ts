export interface Theme {
  name: string;
  label: string;
  description: string;
}

export const THEMES: Record<string, Theme> = {
  github: {
    name: "github",
    label: "GitHub Dark",
    description: "GitHub's dark color scheme (default)",
  },
  dracula: {
    name: "dracula",
    label: "Dracula",
    description: "The famous vampire-inspired dark theme",
  },
  gruvbox: {
    name: "gruvbox",
    label: "Gruvbox",
    description: "Warm retro amber tones on dark brown",
  },
  rosepine: {
    name: "rosepine",
    label: "Rosé Pine",
    description: "Soho vibes for the late-night coder",
  },
  catppuccin: {
    name: "catppuccin",
    label: "Catppuccin Mocha",
    description: "Soothing pastel dark theme",
  },
};

export const DEFAULT_THEME = "github";
