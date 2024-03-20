import { ITnSelectItem, TNSelectProps } from "@/components/uikit/elements/select/typings";

export interface TNMultiSelectProps<T extends ITnSelectItem> extends TNSelectProps {
  modelValue: T[];
}
