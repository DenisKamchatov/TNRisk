import { InjectionKey } from 'vue';

export interface IDropdownItemData {
  id: symbol;
  filterkey: string;
  visible: boolean;
}

export type DropdownItemRegisterFn = (data: IDropdownItemData) => void;
export type DropdownItemUnregisterFn = (id: symbol) => void;

export const DropdownItemRegisterKey: InjectionKey<DropdownItemRegisterFn> = Symbol('DropdownItemRegisterFn');
export const DropdownItemUnregisterKey: InjectionKey<DropdownItemUnregisterFn> = Symbol('DropdownItemUnregisterFn');
