import { WhpptButton, WhpptSelect } from '@whppt/next';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Formik } from 'formik';
import { validationSchema } from '../defaultProductValues';
import { Product } from '../../../Api/Product';
import { useWhpptStore } from '../../../Context';

export const EditProductUnleashed: FC<{
  product: Product;
  name: string;
  onChange: Dispatch<SetStateAction<Product>>;
}> = ({ product, onChange }) => {
  const { storeApi } = useWhpptStore();

  const [loading, setLoading] = useState(false);
  const [productToEdit] = useState(product);
  const [unleashedItems, setUnleashedItems] = useState([]);

  const submitForm = ({ values }: { values: Product }) => {
    setLoading(true);
    storeApi.product
      .unleashedSetOnProduct({ product: values })
      .then(() => {
        setLoading(false);
        onChange(values);
      })
      .catch(err => {
        console.log('🚀 ~ file: Unleashed.tsx ~ line 30 ~ submitForm ~ err', err);
        //TODO error handle
        setLoading(false);
      });
  };

  useEffect(() => {
    storeApi.product.listUnleashedProducts().then((_items: any) => {
      setUnleashedItems(_items);
    });
    // .catch(err => setError(err));
  }, [storeApi]);

  const unleashedProductSelected = (unleashedItem: any, callback: (name: string, val: string | boolean) => void) => {
    callback('unleashedProductId', unleashedItem._id);
    callback('productCode', unleashedItem.ProductCode);
    callback('name', unleashedItem.ProductDescription);
    callback('isActive', unleashedItem.IsSellable ? true : false);
    callback('family', unleashedItem.ProductGroup && unleashedItem.ProductGroup.GroupName ? unleashedItem.ProductGroup.GroupName : '');
  };

  return (
    <div>
      <Formik initialValues={productToEdit} validationSchema={validationSchema} onSubmit={values => submitForm({ values })}>
        {({ handleSubmit, setFieldValue, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <h4 className="whppt-form__content--header">Link Product to Unleashed</h4>
            <WhpptSelect
              id={'unleashedProductId'}
              label={'Search Unleashed'}
              onChange={e => {
                unleashedProductSelected(e, setFieldValue);
              }}
              items={unleashedItems}
              value={values.unleashedProductId}
              error={errors.unleashedProductId}
              textProp="ProductDescription"
              displayValue="ProductDescription"
              valueProp="_id"
              info="* Setting this will overwrite some exsisting values."
              name="quantityUnitOfMeasure"></WhpptSelect>
            <div className="whppt-form__content--gap">
              <div>Product Name: {values.name}</div>
              <div>Product Code: {values.productCode}</div>
              <div>Product Family: {values.family}</div>
              <div>Product is: {values.isActive ? 'Active' : 'Inactive'}</div>
            </div>

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
