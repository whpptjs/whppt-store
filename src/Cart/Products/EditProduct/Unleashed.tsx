import { toast, WhpptButton, WhpptCheckbox, WhpptSelect } from '@whppt/next';
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
  const [chosenProductId, setChosenProductId] = useState(product?.unleashed?._id);
  const [overrideFields, setOverrideFields] = useState({
    overrideProductCode: product?.unleashed?.overrideProductCode || false,
    overrideProductName: product?.unleashed?.overrideProductName || false,
    overrideProductIsActive: product?.unleashed?.overrideProductIsActive || false,
    overrideProductFamily: product?.unleashed?.overrideProductFamily || false,
  });

  useEffect(() => {
    if (!created) return setCreated(true);
    storeApi.product.listUnleashedProducts().then(setProducts).catch(setProductFetchError);
  }, [created, storeApi.product]);

  const chosenProduct = useMemo(() => products && products.find(p => p._id === chosenProductId), [chosenProductId, products]);

  const save = () => {
    const updatedProduct = {
      ...product,
      productCode: chosenProduct?.ProductCode || product.productCode,
      name: chosenProduct?.ProductDescription || product.name,
      isActive: chosenProduct ? (chosenProduct.IsSellable ? true : false) : product.isActive,
      family: chosenProduct?.ProductGroup?.GroupName || product.family,
      unleashed: {
        _id: chosenProductId || product?.unleashed?._id,
        overrideProductCode: overrideFields.overrideProductCode,
        overrideProductName: overrideFields.overrideProductName,
        overrideProductIsActive: overrideFields.overrideProductIsActive,
        overrideProductFamily: overrideFields.overrideProductFamily,
      },
    } as Product;

    const editPromise = storeApi.product.unleashedSetOnProduct({ product: updatedProduct }).then(() => {
      onChange(updatedProduct);
    });

    toast.promise(editPromise, {
      pending: 'Saving...',
      success: `Product Saved`,
      error: `Failed to Update Product 🤯`,
    });
  };

  return (
    <div>
      <div className="whppt-form--group">
        <h4 className="whppt-form__content--header">Configure how Unleaded updates this product</h4>
        <WhpptSelect
          id={'unleashedProductId'}
          label={'Search Unleashed'}
          value={chosenProduct}
          onChange={p => setChosenProductId(p._id)}
          items={products}
          error={productFetchError}
          getOptionLabel={option => option.ProductDescription}
        />
      </div>

      <div className="whppt-form__content--gap">
        <div>Select Fields below that are allowed to be overridden by Unleashed.</div>
        <WhpptCheckbox
          label={`Product Name: ${chosenProduct ? chosenProduct.ProductDescription : product.name}`}
          value={`${overrideFields.overrideProductName}`}
          onChange={() => setOverrideFields({ ...overrideFields, overrideProductName: !overrideFields.overrideProductName })}
        />
        <WhpptCheckbox
          label={`Product Code: ${chosenProduct ? chosenProduct.ProductCode : product.productCode}`}
          value={`${overrideFields.overrideProductCode}`}
          onChange={() => setOverrideFields({ ...overrideFields, overrideProductCode: !overrideFields.overrideProductCode })}
        />
        <WhpptCheckbox
          label={`Product Family: ${
            chosenProduct && chosenProduct.ProductGroup ? chosenProduct.ProductGroup.GroupName : product.productCode
          }`}
          value={`${overrideFields.overrideProductFamily}`}
          onChange={() => setOverrideFields({ ...overrideFields, overrideProductFamily: !overrideFields.overrideProductFamily })}
        />
        <WhpptCheckbox
          label={`Product Is Active: ${chosenProduct && chosenProduct.IsSellable ? 'Active' : 'Inactive'}`}
          value={`${overrideFields.overrideProductIsActive}`}
          onChange={() => setOverrideFields({ ...overrideFields, overrideProductIsActive: !overrideFields.overrideProductIsActive })}
        />
      </div>

      <div className="whppt-form__content--helper-text">*Values that are selected will auto updated when Unleashed is updated.</div>

      <div className="whppt-form__content--flex">
        <WhpptButton text="Save" icon="save" onClick={() => save()} />
      </div>
    </div>
  );
};
