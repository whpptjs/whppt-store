import { WhpptInput, WhpptTable } from '@whppt/next';

import { Product } from '../../Api/Product';
import React, { Dispatch, FC, ReactElement, SetStateAction } from 'react';

export const ProductTable: FC<{
  children: ReactElement | ReactElement[];
  items: Product[];
  total: number;
  currentPage: number;
  limit: number;
  search: string;
  setPerPage: Dispatch<SetStateAction<number>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setEditProduct: Dispatch<SetStateAction<Product>>;
  setSearch: Dispatch<SetStateAction<string>>;
}> = ({ children, items, total, limit, currentPage, setPerPage, setCurrentPage, setEditProduct, search, setSearch }) => {
  const headers = [
    { text: 'Name', value: 'name' },
    { text: 'Code', value: 'productCode' },
  ] as any;

  // const [errorState, setError] = useState<Error>();
  // const [searchProducts, setSearchProducts] = useState('');

  return (
    <div className="whppt-form">
      <section className="whppt-form__actions">{children}</section>
      <div className="whppt-form__content">
        <section className="whppt-form-section">
          <WhpptInput
            id={'Filter'}
            placeholder={'Name / Code'}
            label={'Search'}
            value={search}
            onChange={setSearch}
            info={'Search products by name or code'}
            type="text"
          />

          <WhpptTable
            dense={true}
            items={items}
            total={total}
            headers={headers}
            hideFooters={false}
            hideHeaders={false}
            page={currentPage}
            perPage={limit}
            height={''}
            fixedHeader={false}
            setCurrentPage={setCurrentPage}
            setPerPage={setPerPage}
            actions={[
              {
                icon: 'edit',
                info: 'Edit Product',
                action: (_product: Product) => {
                  setEditProduct(_product);
                },
              },
            ]}
          />
        </section>
      </div>
    </div>
  );
};
