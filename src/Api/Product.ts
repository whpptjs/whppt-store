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
  unleashed: {
    _id: string;
    overrideProductCode: boolean;
    overrideProductName: boolean;
    overrideProductIsActive: boolean;
    overrideProductFamily: boolean;
  };
};

export type UnleashedProductGroup = {
  Guid: string;
  GroupName: string;
};
export type UnleashedUnitOfMeasure = {
  Guid: string;
  Name: string;
  Obsolete: boolean;
};

export type UnleashedProduct = {
  _id: string;
  DefaultSellPrice: number; // always be in cents
  MinimumSellPrice: number; // always be in cents,
  Height: { value: number; unitOfMeasure: UnleashedUnitOfMeasure }; // cm
  PackSize: { value: number; unitOfMeasure: UnleashedUnitOfMeasure }; // mm2
  Width: { value: number; unitOfMeasure: UnleashedUnitOfMeasure }; // mm
  Weight: { value: number; unitOfMeasure: UnleashedUnitOfMeasure }; // g
  ProductGroup: UnleashedProductGroup;
  IsAssembledProduct: boolean;
  IsComponent: boolean;
  IsSellable: boolean;
  NeverDiminishing: boolean;
  Notes: string;
  Obsolete: boolean;
  ProductCode: string;
  ProductDescription: string;
  TaxableSales: boolean;
  UnitOfMeasure: string; // bottles
  XeroSalesTaxCode: string;
  XeroSalesTaxRate: number;
  XeroTaxCode: string;
  XeroTaxRate: number;
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
  createProductFromUnleashed: ({ domainId, product }: { domainId: string; product: Product }) => Promise<Product>;
  save: ({ product }: { product: Product }) => Promise<Product>;
  unleashedSetOnProduct: ({ product }: { product: Product }) => Promise<Product>;
  listUnleashedProducts: () => Promise<UnleashedProduct[]>;
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
      return http.secure.getJson<UnleashedProduct[]>({
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
    createProductFromUnleashed({ domainId, product }) {
      return http.secure.postJson<Product, Product>({
        path: `/api/product/createProductFromUnleashed`,
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
