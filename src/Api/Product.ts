import { WhpptHttp } from '@whppt/next/types/Api/Http';

export type Product = {
  _id: string;
  domainId: string;
  name: string;
  productCode: string;
  description: string;
  family: string;
  stockKeepingUnit: string;
  quantityUnitOfMeasure: string;
  varietal: string;
  vintage: string;
  bottleSize: string;
  isActive: boolean;
  unleashedProductId: string;
};
export type ProductList = {
  products: Product[];
  total: number;
};

export type ProductApi = {
  list: ({
    domainId,
    limit,
    currentPage,
    search,
  }: {
    domainId: string;
    limit: number;
    currentPage: number;
    search: string;
  }) => Promise<ProductList>;
  create: ({ domainId, product }: { domainId: string; product: Product }) => Promise<Product>;
  save: ({ product }: { product: Product }) => Promise<Product>;
  unleashedSetOnProduct: ({ product }: { product: Product }) => Promise<Product>;
  listUnleashedProducts: () => Promise<Product[]>;
  updateUnleashedProducts: () => Promise<{}>;
};
export type AppApiConstructor = ({ http }: { http: WhpptHttp }) => ProductApi;

export const ProductApi: AppApiConstructor = ({ http }) => {
  return {
    list({ domainId, limit, currentPage, search }) {
      return http.secure.getJson<ProductList>({
        path: `/api/product/list?domainId=${domainId}&limit=${limit}&currentPage=${currentPage - 1}&search=${search}`,
      });
    },
    listUnleashedProducts() {
      return http.secure.getJson<Product[]>({
        path: `/api/unleashed/list`,
      });
    },
    updateUnleashedProducts() {
      return http.secure.getJson({
        path: `/api/unleashed/updateListFromUnleashed`,
      });
    },
    create({ domainId, product }) {
      return http.secure.postJson<Product, Product>({
        path: `/api/product/create`,
        data: {
          ...product,
          domainId: product.domainId || domainId,
        },
      });
    },
    save({ product }) {
      return http.secure.postJson<Product, Product>({
        path: `/api/product/changeDetails`,
        data: {
          ...product,
        },
      });
    },
    unleashedSetOnProduct({ product }) {
      return http.secure.postJson<Product, Product>({
        path: `/api/product/linkToUnleashed`,
        data: {
          ...product,
        },
      });
    },
  };
};
