import { useWhppt, WhpptButton, WhpptTab } from '@whppt/next';
import React, { FC, useEffect, useState } from 'react';
import { useWhpptStore } from '../../Context';
import { AddNewProduct } from './NewProduct';
import { ProductTable } from './Table';
import { Product } from '../../Api/Product';
import { EditProduct } from './EditProduct';

export const ProductsSettings: FC<WhpptTab> = () => {
  const { domain } = useWhppt();
  const { storeApi } = useWhpptStore();
  const [addNewProduct, setAddNewProduct] = useState(false);
  const [editProduct, setEditProduct] = useState({} as Product);
  const [search, setSearch] = useState('');

  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([] as Product[]);
  const [limit, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const close = (product?: Product) => {
    setAddNewProduct(false);
    setEditProduct({} as Product);
    if (product) setItems([product, ...items]);
  };
  const newItemSavedNowEdit = (product: Product) => {
    setAddNewProduct(false);
    setEditProduct({} as Product);
    setItems([product, ...items]);
  };

  useEffect(() => {
    storeApi.product
      .list({ domainId: domain._id as string, limit, currentPage, search })
      .then(({ products, total }: { products: Product[]; total: number }) => {
        setItems(products);
        setTotal(total);
      });
  }, [limit, currentPage, storeApi.product, domain._id, search]);

  return (
    <div>
      {addNewProduct ? (
        <AddNewProduct close={i => close(i)} created={i => newItemSavedNowEdit(i)} />
      ) : editProduct && editProduct._id ? (
        <EditProduct product={editProduct} onChange={setEditProduct} close={close} />
      ) : (
        <ProductTable
          items={items}
          total={total}
          currentPage={currentPage}
          limit={limit}
          setPerPage={setPerPage}
          setCurrentPage={setCurrentPage}
          setEditProduct={setEditProduct}
          search={search}
          setSearch={setSearch}>
          <div>
            <WhpptButton text="Add New Product" icon="plus" onClick={() => setAddNewProduct(true)} />
          </div>
        </ProductTable>
      )}
    </div>
  );
};
