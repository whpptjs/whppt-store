import { useWhppt, WhpptButton, WhpptSelect, toast } from '@whppt/next';
import React, { FC, useEffect, useState } from 'react';
import { useWhpptStore } from '../../../Context';

import { Product, UnleashedProduct } from '../../../Api/Product';

export const AddNewUnleashedProduct: FC<{
  close: (product?: Product) => void;
  created: (product: Product) => void;
}> = ({ close, created }) => {
  const { storeApi } = useWhpptStore();
  const { domain } = useWhppt();

  const [init, setInit] = useState(false);
  const [products, setProducts] = useState<UnleashedProduct[]>([]);
  const [chosenProduct, setSetChosenProduct] = useState({} as UnleashedProduct);
  const [productFetchError, setProductFetchError] = useState('');
  const [saving, setSaving] = useState(false);

  const save = () => {
    setSaving(true);
    const _product = {
      productCode: chosenProduct?.ProductCode || 'Not set in Unleashed',
      name: chosenProduct?.ProductDescription || 'Not set in Unleashed',
      isActive: chosenProduct ? (chosenProduct.IsSellable ? true : false) : false,
      family: chosenProduct?.ProductGroup?.GroupName || 'Not set in Unleashed',
      unleashed: {
        _id: chosenProduct._id,
        overrideProductCode: true,
        overrideProductName: true,
        overrideProductIsActive: true,
        overrideProductFamily: true,
      },
    } as Product;

    const createPromise = storeApi.product
      .createProductFromUnleashed({ domainId: domain._id as string, product: _product })
      .then((product: Product) => {
        setSaving(false);
        created(product);
      });

    toast.promise(createPromise, {
      pending: 'Saving...',
      success: `Created Product`,
      error: `Failed to add Product 🤯`,
    });
  };

  useEffect(() => {
    if (!init) return setInit(true);
    storeApi.product.listUnleashedProducts().then(setProducts).catch(setProductFetchError);
  }, [init, storeApi.product]);

  return (
    <div className="whppt-form">
      <section className="whppt-form__actions">
        <div>
          <WhpptButton text="Cancel" onClick={() => close()} />
        </div>
      </section>
      <div className="whppt-form__content">
        <section className="whppt-form-section">
          <h4 className="whppt-form__content--header">Select a product from Unleashed</h4>
          <WhpptSelect
            id={'unleashedProductId'}
            label={'Search Unleashed'}
            value={chosenProduct}
            onChange={p => setSetChosenProduct(p)}
            items={products}
            error={productFetchError}
            getOptionLabel={option => option.ProductDescription}
          />

          <div className="whppt-form__content--gap">
            <div>Select Fields below that are allowed to be overridden by Unleashed.</div>
            <div>{`Product Name: ${(chosenProduct && chosenProduct.ProductDescription) || ''}`}</div>
            <div>{`Product Code: ${(chosenProduct && chosenProduct.ProductCode) || ''}`}</div>
            <div>{`Product Family: ${chosenProduct && chosenProduct.ProductGroup ? chosenProduct.ProductGroup.GroupName : ''}`}</div>
            <div>{`Product Is Active: ${chosenProduct && chosenProduct.IsSellable ? 'Active' : 'Inactive'}`}</div>
          </div>

          <div className="whppt-form__content--flex">
            <WhpptButton text="Save" icon="save" onClick={() => save()} />
            {saving && <div>Saving...</div>}
          </div>
        </section>
      </div>
    </div>
  );
};
