export type TNTabsOption = {
    id: string | number;
    name: string;
    secondaryText?: string;
    icon?: {
      name: string;
      color?: string;
    };
    disabled?: boolean;
  };