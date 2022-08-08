import * as Yup from 'yup';

export const quantityUnitOfMeasure = [
  { quantityUnitOfMeasure: 'Bottle' },
  { quantityUnitOfMeasure: 'Case of 6' },
  { quantityUnitOfMeasure: 'Case of 12' },
  { quantityUnitOfMeasure: '2 pack' },
] as {
  quantityUnitOfMeasure: string;
}[];
export const isActiveStates = [{ isActive: true }, { isActive: false }] as {
  isActive: boolean;
}[];

export const bottleSizes = [
  { bottleSize: '375ml' },
  { bottleSize: '500ml' },
  { bottleSize: '750ml' },
  { bottleSize: '1.5L' },
  { bottleSize: '3L' },
  { bottleSize: '5L' },
  { bottleSize: '6L' },
  { bottleSize: '9L' },
  { bottleSize: '18L' },
] as { bottleSize: string }[];

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
  unleashed: {
    overrideProductCode: false,
    overrideProductName: false,
    overrideProductIsActive: false,
    overrideProductFamily: false,
  },
};
