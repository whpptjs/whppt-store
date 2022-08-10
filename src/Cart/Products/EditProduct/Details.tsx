import { toast, WhpptButton, WhpptInput, WhpptSelect, WhpptTextArea } from '@whppt/next';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Formik } from 'formik';
import { validationSchema, defaultProduct, isActiveStates } from '../defaultProductValues';
import { Product } from '../../../Api/Product';
import { useWhpptStore } from '../../../Context';
import { RenderProductFields } from '../../../Fields/RenderInputFields';

export const EditProductDetails: FC<{
  product: Product;
  name: string;
  onChange: Dispatch<SetStateAction<Product>>;
}> = ({ product, onChange }) => {
  const { storeApi } = useWhpptStore();

  const [productToEdit] = useState({ ...defaultProduct, ...product });

  const submitForm = ({ values }: { values: Product }) => {
    const editPromise = storeApi.product.save({ product: values }).then(() => {
      onChange({ ...product, ...values });
    });

    toast.promise(editPromise, {
      pending: 'Saving...',
      success: `Product Saved`,
      error: `Failed to Update Product 🤯`,
    });
  };

  return (
    <div className="whppt-form__content--full-height ">
      <Formik initialValues={productToEdit} validationSchema={validationSchema} onSubmit={values => submitForm({ values })}>
        {({ handleSubmit, setFieldValue, values, errors, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <h4 className="whppt-form__content--header">Edit Product</h4>
            <WhpptInput
              value={values.name}
              onChangeEvent={handleChange}
              id={'productName'}
              label={'Product Name'}
              info={''}
              error={errors.name}
              type={'text'}
              name="name"
            />
            <div className="whppt-form--flex-apart">
              <WhpptInput
                value={values.productCode}
                onChangeEvent={handleChange}
                id={'ProductCode'}
                label={'Product Code'}
                error={errors.productCode}
                type={'text'}
                name="productCode"
              />
              <WhpptInput
                value={values.family}
                onChangeEvent={handleChange}
                id={'Family'}
                label={'Product Family'}
                error={errors.family}
                type={'text'}
                name="family"
              />
            </div>
            <WhpptSelect
              id={'IsActive'}
              label={'Product Active'}
              onChange={e => {
                setFieldValue('isActive', e.isActive);
              }}
              items={isActiveStates}
              value={values}
              name="isActive"
              error={errors.isActive}
              getOptionLabel={option => (option.isActive ? 'Active' : 'Inactive')}
            />
            <WhpptTextArea
              value={values.description}
              onChange={e => setFieldValue('description', e)}
              id={'Description'}
              label={'Product Description'}
              error={errors.description}
              name="description"
            />
            <RenderProductFields values={values} errors={errors} onChange={setFieldValue} />

            <div className="whppt-form__content--flex">
              <WhpptButton text="Save" icon="save" onClick={() => handleSubmit()} />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
