import { Http } from '@whppt/next';
import { ProductApi } from './Product';

// import { PageApi } from '../Page/Api';
// import { SiteApi } from '../Site/Api';
// import { SecurityApi } from '../Security/Api';

export type WhpptApi = {};
export type WhpptApiConstructor = () => WhpptApi;

const http = Http(process.env.NEXT_PUBLIC_BASE_API_URL || 'localhost:3000');

export const Api: WhpptApiConstructor = () => {
  return {
    product: ProductApi({ http }),
    // site: SiteApi({ http }),
    // page: PageApi({ http }),
    // security: SecurityApi({ http }),
  };
};
