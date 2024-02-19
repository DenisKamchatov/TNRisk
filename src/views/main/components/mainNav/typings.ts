export interface IMenucColumnData {
  title: string;
  href?: string;
  to?: string;
  items?: IMenuItemData[];
}

export interface IMenuItemData {
  title: string;
  subtitle?: string;
  href?: string;
  to?: string;
  icon?: string;
  badge?: number | string;
}
