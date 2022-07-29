import { WhpptHttp } from '@whppt/next/types/Api/Http';

export type Product = {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  productCode: string;

  //   family: string;
  //   stockKeepingUnit: string;
  //   quantityUnitOfMeasure: string;
  //   varietal: string;
  //   vintage: string;
  //   bottleSize: string;
  //   unleashedProductId: string;
};
export type ProductList = {
  products: Product[];
  total: number;
};

export type ProductApi = {
  list: ({ domainId, limit, currentPage }: { domainId: string; limit: number; currentPage: number }) => Promise<ProductList>;
  save: ({ domainId, product }: { domainId: string; product: Product }) => Promise<Product>;
};
export type AppApiConstructor = ({ http }: { http: WhpptHttp }) => ProductApi;

export const ProductApi: AppApiConstructor = ({ http }) => {
  return {
    list({ domainId, limit, currentPage }) {
      return http.secure.getJson<ProductList>({
        path: `/api/product/list?domainId=${domainId}&limit=${limit}&currentPage=${currentPage - 1}`,
      });
    },
    save({ domainId, product }) {
      return http.secure.postJson<{ domainId: string; product: Product }, Product>({
        path: `/api/product/save`,
        data: {
          domainId,
          product,
        },
      });
    },
  };
};
