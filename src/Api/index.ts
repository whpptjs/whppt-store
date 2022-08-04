import { Http } from '@whppt/next';
import { ProductApi } from './Product';

export type WhpptApi = { product: ProductApi };
export type WhpptApiConstructor = () => WhpptApi;

const http = Http(process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:3000');

export const Api: WhpptApiConstructor = () => {
  return {
    product: ProductApi({ http }),
  };
};
