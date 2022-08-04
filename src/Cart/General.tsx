import { WhpptButton, WhpptTab } from '@whppt/next';
import React, { FC, useState } from 'react';
import { useWhpptStore } from '../Context';

export const CartGeneral: FC<WhpptTab> = () => {
  const { storeApi } = useWhpptStore();
  const [unleashedLoading, setUnleashedLoading] = useState(false as boolean);
  const [unleashedMessage, setUnleashedMessage] = useState('' as string);
  const updateUnleashed = () => {
    setUnleashedLoading(true);
    setUnleashedMessage('');
    storeApi.product
      .updateUnleashedProducts()
      .then(() => {
        setUnleashedLoading(false);
        setUnleashedMessage('Update Complete');
      })
      .catch(() => {
        setUnleashedLoading(false);
        setUnleashedMessage('Update Failed');
      });
  };
  return (
    <div className="whppt-form">
      <section className="whppt-form__actions"></section>
      <div className="whppt-form__content">
        <section className="whppt-form-section">
          <h4 className="whppt-form__content--header">Unleashed Products</h4>
          <p className="whppt-form__content--info">Updating unleashed is a resource intentsive process that can take up to a minute.</p>
          <div className="whppt-form__content--flex">
            <div>
              <WhpptButton text="Update" onClick={() => updateUnleashed()} />
            </div>
            {unleashedLoading && <div>Loading Please Wait...</div>}
            {unleashedMessage && <div>{unleashedMessage}</div>}
          </div>
        </section>
      </div>
    </div>
  );
};
