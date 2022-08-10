import { WhpptInput, WhpptSelect } from '@whppt/next';
import React from 'react';
import { FC } from 'react';
import { ProductSelectFieldOption } from '.';

import { useWhpptStore } from '../Context';

export const RenderProductFields: FC<{
  values: any;
  errors: any;
  onChange: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}> = ({ values, errors, onChange }) => {
  const { productFields } = useWhpptStore();
  return (
    <div className="whppt-form--flex-apart">
      {productFields.map(field => {
        if (field.type === 'text')
          return (
            <WhpptInput
              value={values[field.key]}
              onChange={(e: string) => onChange(field.name, e)}
              id={field.key}
              key={field.key}
              label={field.name}
              info={field.info}
              error={errors[field.key]}
              type={'text'}
              name={field.key}
            />
          );
        if (field.type === 'select')
          return (
            <WhpptSelect
              key={field.key}
              id={field.key}
              label={field.name}
              name={field.key}
              onChange={(e: ProductSelectFieldOption) => onChange(field.key, e[field.key] || e.value)}
              items={field.options}
              value={values}
              error={errors[field.key]}
              getOptionLabel={(option: ProductSelectFieldOption) => option[field.key] || option.label}
            />
          );
      })}
    </div>
  );
};
