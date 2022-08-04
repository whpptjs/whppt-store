import * as Yup from 'yup';

export const quantityUnitOfMeasure = ['Bottle', 'Case of 6', 'Case of 12', '2 pack'] as string[];

export const bottleSizes = ['375ml', '500ml', '750ml', '1.5L', '3L', '5L', '6L', '9L', '18L'] as string[];

export const validationSchema = Yup.object().shape({
  name: Yup.string().max(255, 'Too Long').required('Required'),
  productCode: Yup.string().max(255, 'Too Long').required('Required'),
  description: Yup.string().max(255, 'Too Long').required('Required'),
  family: Yup.string().max(255, 'Too Long').required('Required'),
  stockKeepingUnit: Yup.string().max(255, 'Too Long').required('Required'),
  quantityUnitOfMeasure: Yup.string().required('Required'),
  varietal: Yup.string().max(255, 'Too Long').required('Required'),
  vintage: Yup.string().max(255, 'Too Long').required('Required'),
  bottleSize: Yup.string().required('Required'),
});

export const validationSchemaNewProduct = Yup.object().shape({
  name: Yup.string().max(255, 'Too Long').required('Required'),
  productCode: Yup.string().max(255, 'Too Long').required('Required'),
});

export const defaultProduct = {
  _id: '',
  name: '',
  productCode: '',
  description: '',
  family: '',
  stockKeepingUnit: '',
  quantityUnitOfMeasure: '',
  varietal: '',
  vintage: '',
  bottleSize: '',
  isActive: false,
};
