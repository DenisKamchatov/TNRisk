

export interface TNSelectProps<T extends ITnSelectItem = ITnSelectItem> {
  options: ITnSelectItem[];
  excludedSearchOptions?: ITnSelectItem[],
  label?: string;
  floatingLabel?: string;
  placeholder?: string;
  isMultiple?: boolean;

  icon?: string;
  clearable?: boolean;
  block?: boolean;

  error?: boolean;
  description?: string;
  hideDetails?: boolean;
  allowEmptySearch?: boolean;

  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  loading?: boolean;

  search?: boolean | SearchFunctionType;
  searchPlaceholder?: string;
  emptySearchResultText?: string;

  scrollable?: boolean;
}

export type SearchFunctionType = (value: string) => Promise<ITnSelectItem[]>;

export interface ITnSelectItem<T = any> {
  /**
   * Unique identifier
   */
  id: number | string | symbol;
  /**
   * Label of the item
   */
  label: string;
  /**
   * Is disanled element
   */
  disabled?: boolean;
  /**
   * Some additional data
   */
  data?: T;
};
