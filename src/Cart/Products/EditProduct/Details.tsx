import { WhpptButton, WhpptInput, WhpptSelect, WhpptTextArea } from '@whppt/next';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Formik } from 'formik';
import { quantityUnitOfMeasure, bottleSizes, validationSchema, defaultProduct, isActiveStates } from '../defaultProductValues';
import { Product } from '../../../Api/Product';
import { useWhpptStore } from '../../../Context';

export const EditProductDetails: FC<{
  product: Product;
  name: string;
  onChange: Dispatch<SetStateAction<Product>>;
}> = ({ product, onChange }) => {
  const { storeApi } = useWhpptStore();

  const [loading, setLoading] = useState(false);
  const [productToEdit] = useState({ ...defaultProduct, ...product });

  const submitForm = ({ values }: { values: Product }) => {
    setLoading(true);
    storeApi.product
      .save({ product: values })
      .then(() => {
        setLoading(false);
        onChange({ ...product, ...values });
      })
      .catch(() => {
        //TODO error handle
        setLoading(false);
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
            <div className="whppt-form--flex-apart">
              <WhpptInput
                value={values.varietal}
                onChangeEvent={handleChange}
                id={'Varietal'}
                label={'Product Varietal'}
                error={errors.varietal}
                type={'text'}
                name="varietal"
              />
              <WhpptInput
                value={values.vintage}
                onChangeEvent={handleChange}
                id={'Vintage'}
                label={'Product vintage'}
                info={''}
                error={errors.vintage}
                type={'text'}
                name="vintage"
              />
            </div>
            <div className="whppt-form--flex-apart">
              <WhpptInput
                value={values.stockKeepingUnit}
                onChangeEvent={handleChange}
                id={'StockKeepingUnit'}
                label={'Product SKU'}
                error={errors.stockKeepingUnit}
                type={'text'}
                name="stockKeepingUnit"
              />
              <WhpptSelect
                id={'QuantityUnitOfMeasure'}
                name="quantityUnitOfMeasure"
                label={'Quantity Unit Of Measure'}
                onChange={e => setFieldValue('quantityUnitOfMeasure', e.quantityUnitOfMeasure)}
                items={quantityUnitOfMeasure}
                value={values}
                error={errors.quantityUnitOfMeasure}
                getOptionLabel={option => option.quantityUnitOfMeasure}
              />
            </div>
            <div className="whppt-form--flex-apart">
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
              <WhpptSelect
                id={'BottleSize'}
                label={'Bottle Size Volume'}
                name="bottleSize"
                onChange={e => setFieldValue('bottleSize', e.bottleSize)}
                items={bottleSizes}
                value={values}
                error={errors.bottleSize}
                getOptionLabel={option => option.bottleSize}
              />
            </div>
            <WhpptTextArea
              value={values.description}
              onChange={e => setFieldValue('description', e)}
              id={'Description'}
              label={'Product Description'}
              error={errors.description}
              name="description"
            />
            <div className="whppt-form__content--flex">
              <WhpptButton text="Save" icon="save" onClick={() => handleSubmit()} />
              {loading && <div>Saving...</div>}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
