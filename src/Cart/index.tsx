import { useWhppt, WhpptTab, WhpptTabs } from '@whppt/next';
import React, { FC } from 'react';
import { CartGeneral } from './General';
import { ProductsSettings } from './Products';

export const CartSettings: FC = () => {
  const { settingsPanel, changeSettingsPanelActiveTab } = useWhppt();
  const tabs: Array<WhpptTab> = [
    { name: 'generals', label: 'General' },
    { name: 'general', label: 'Products' },
    // { name: 'products', label: 'Products' },
  ];

  return (
    <div>
      <WhpptTabs tabs={tabs} selectTab={changeSettingsPanelActiveTab} selectedTab={settingsPanel.activeTab} />
      <WhpptTab selectedTab={settingsPanel.activeTab}>
        <CartGeneral name="generals" label="General" />
        <ProductsSettings name="general" label="Products" />
        {/* <ProductsSettings name="products" label="Products" /> */}
      </WhpptTab>
    </div>
  );
};
