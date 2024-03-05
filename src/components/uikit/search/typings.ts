export enum MessageCellStatus {
  Default,
  Waiting,
  Sent,
  Read,
  Warning
}
export interface ICellDataItem {
  title: string;
  subtitle?: string;
  leftIcon?: string;
  id: string;
  rightIcons?: string[];
  rightIconsAlignment?: "top" | "center";
  checked?: boolean;
  radiobutton?: boolean;
  checkbox?: boolean;
  tumbler?: boolean;
  userPicture?: {
    text?: string;
    image?: string;
    icon?: string;
    square?: boolean;
    status?: boolean;
  };
  disabled?: boolean | string[];
  enabled?: boolean;
  chat?: {
    time: Date;
    status: MessageCellStatus;
    pinned: boolean;
    notification: number;
    body: string;
    muted: boolean;
    verified: boolean;
  };
}
