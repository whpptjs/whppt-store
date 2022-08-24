import { WhpptButton, WhpptTab, WhpptTabs } from '@whppt/next';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Product } from '../../../Api/Product';
import { EditProductDetails } from './Details';
import { EditProductUnleashed } from './Unleashed';
import { EditProductImage } from './Image';

export const EditProduct: FC<{
  close: () => void;
  onChange: Dispatch<SetStateAction<Product>>;
  product: Product;
}> = ({ close, product, onChange }) => {
  const [tab, setTab] = useState('details');

  const tabs: Array<WhpptTab> = [
    { name: 'details', label: 'Details' },
    { name: 'unleashed', label: 'Unleashed' },
    { name: 'image', label: 'Image' },
  ];
  return (
    <div className="whppt-form">
      <section className="whppt-form__actions">
        <div>
          <WhpptButton text="Cancel" onClick={() => close()} />
        </div>
      </section>
      <div className="whppt-form__content">
        <section className="whppt-form-section">
          <WhpptTabs tabs={tabs} selectTab={setTab} selectedTab={tab} />
          <WhpptTab selectedTab={tab}>
            <EditProductDetails onChange={onChange} product={product} name="details" />
            <EditProductUnleashed onChange={onChange} product={product} name="unleashed" />
            <EditProductImage onChange={onChange} product={product} name="image" />
          </WhpptTab>
        </section>
      </div>
    </div>
  );
};
