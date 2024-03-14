

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
