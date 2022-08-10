export type ProductField = {
  key: string;
  name: string;
  info?: string;
  type: 'text' | 'select';
  options?: any;
};

export type ProductSelectFieldOption = {
  value: string;
  label: string;
  [key: string]: any;
};

export type ProductSelectField = ProductField & {
  options: ProductSelectFieldOption[];
};

export const TextField = (key: string, name: string) => {
  const field: ProductField = {
    key,
    name,
    type: 'text',
  };

  return field;
};

export const SelectField = (key: string, name: string, options: ProductSelectFieldOption[]) => {
  const field: ProductSelectField = {
    key,
    name,
    type: 'select',
    options,
  };

  return field;
};
