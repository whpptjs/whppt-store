import { WhpptButton, WhpptSelect } from '@whppt/next';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Product, UnleashedProduct } from '../../../Api/Product';
import { useWhpptStore } from '../../../Context';

export const EditProductUnleashed: FC<{
  product: Product;
  onChange: (product: Product) => void;
  name: string;
}> = ({ product, onChange }) => {
  const { storeApi } = useWhpptStore();

  const [created, setCreated] = useState(false);
  const [products, setProducts] = useState<UnleashedProduct[]>([]);
  const [productFetchError, setProductFetchError] = useState('');
  const [chosenProductId, setChosenProductId] = useState(product.unleashedProductId);
  const [saving, setSaving] = useState(false);
  // const [productToEdit] = useState(product);

  useEffect(() => {
    if (!created) return setCreated(true);
    storeApi.product.listUnleashedProducts().then(setProducts).catch(setProductFetchError);
  }, [created, storeApi.product]);

  const chosenProduct = useMemo(() => products && products.find(p => p._id === chosenProductId), [chosenProductId, products]);

  const save = () => {
    setSaving(true);
    const updatedProduct = {
      ...product,
      // conditionally check base on checkboxes
      productCode: chosenProduct?.ProductCode || product.productCode,
      name: chosenProduct?.ProductDescription,
      isActive: chosenProduct?.IsSellable ? true : false,
      family: chosenProduct?.ProductGroup || '',
      unleashed: {
        id: chosenProductId,
        // checkbox values
      },
    };
    storeApi.product
      .unleashedSetOnProduct({ product: updatedProduct })
      .then(() => {
        setSaving(false);
        onChange(updatedProduct);
      })
      .catch(err => {
        console.log('🚀 ~ file: Unleashed.tsx ~ line 30 ~ submitForm ~ err', err);
        //TODO error handle
        setSaving(false);
      });
  };

  return (
    <div>
      <h4 className="whppt-form__content--header">Configure how Unleaded updates this product</h4>
      <WhpptSelect
        id={'unleashedProductId'}
        label={'Search Unleashed'}
        value={chosenProduct}
        onChange={p => setChosenProductId(p._id)}
        items={products}
        getOptionLabel={option => option.ProductDescription}
      />

      <div className="whppt-form__content--gap">
        <div>Product Name: {chosenProduct?.ProductDescription}</div>
        <div>Product Code: {chosenProduct?.ProductCode}</div>
        <div>Product Family: {chosenProduct?.ProductGroup}</div>
        <div>Product is: {chosenProduct?.IsSellable ? 'Active' : 'Inactive'}</div>
      </div>

      <div className="whppt-form__content--flex">
        <WhpptButton text="Save" icon="save" onClick={() => save()} />
        {saving && <div>Saving...</div>}
      </div>
    </div>
  );
};
