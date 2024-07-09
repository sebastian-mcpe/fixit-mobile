import React from 'react';
import renderer from 'react-test-renderer';
import { Formik } from 'formik';

jest.mock('@gluestack-ui/config', () => ({
  config: {}
}));

jest.mock('@gluestack-ui/themed', () => ({
  GluestackUIProvider: ({ children }) => <div>{children}</div>,
  ErrorMessage: 'ErrorMessage'
}));

import { FormError } from '../FormError';

describe('FormError', () => {
  it('renders correctly', () => {
    const mockRef = React.createRef();

    const tree = renderer.create(
      <Formik initialValues={{ name: '' }} onSubmit={jest.fn()}>
        <FormError ref={mockRef} name="name" style={{ color: 'red' }} />
      </Formik>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
