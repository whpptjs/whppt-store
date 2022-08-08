import { useWhppt, WhpptButton, WhpptInput } from '@whppt/next';
import React, { FC, useState } from 'react';
import { Formik } from 'formik';
import { defaultProduct, validationSchemaNewProduct } from '../defaultProductValues';
import { Product } from '../../../Api/Product';
import { useWhpptStore } from '../../../Context';

export const AddNewBasicProduct: FC<{
  close: (product?: Product) => void;
  created: (product: Product) => void;
}> = ({ close, created }) => {
  const { storeApi } = useWhpptStore();

  const { domain } = useWhppt();
  const [loading, setLoading] = useState(false);
  const [product] = useState({
    _id: '',
    name: '',
    productCode: '',
    unleashed: {
      ...defaultProduct.unleashed,
    },
  } as Product);

  const submitForm = ({ values, resetForm }: { values: Product; resetForm: () => void }) => {
    setLoading(true);
    storeApi.product
      .create({ domainId: domain._id as string, product: values })
      .then((product: Product) => {
        resetForm();
        setLoading(false);
        created(product);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Formik
        initialValues={product}
        validationSchema={validationSchemaNewProduct}
        onSubmit={(values, { resetForm }) => submitForm({ values, resetForm })}>
        {({ handleSubmit, values, errors, handleChange }) => (
          <div className="whppt-form">
            <section className="whppt-form__actions">
              <div>
                <WhpptButton text="Cancel" onClick={() => close()} />
              </div>
            </section>
            <div className="whppt-form__content">
              <section className="whppt-form-section">
                <form onSubmit={handleSubmit}>
                  <h4 className="whppt-form__content--header">New Product</h4>
                  <WhpptInput
                    value={values.name}
                    onChangeEvent={handleChange}
                    id={'productName'}
                    label={'Product Name'}
                    info={''}
                    error={errors.name}
                    type={'text'}
                    name="name"
                  />
                  <WhpptInput
                    value={values.productCode}
                    onChangeEvent={handleChange}
                    id={'ProductCode'}
                    label={'Product Code'}
                    error={errors.productCode}
                    type={'text'}
                    name="productCode"
                  />
                  <div>
                    <WhpptButton text="Save" icon="save" onClick={() => handleSubmit()} />
                    {loading && <div>Saving...</div>}
                  </div>
                </form>
              </section>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};
