import { IAvatarGroupItem } from "@/components/uikit/avatar-group/typings";

export type TNChipsOption = {
  id: string | number;
  name: string;
  avatar?: IAvatarGroupItem;
  disabled?: boolean;
};
