import { IAvatarGroupItem } from "@/components/uikit/elements/avatar-group/typings";

export type TNChipsOption = {
  id: string | number;
  name: string;
  avatar?: IAvatarGroupItem;
  disabled?: boolean;
};
