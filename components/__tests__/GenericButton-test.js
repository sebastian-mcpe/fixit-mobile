import React from 'react';
import renderer from 'react-test-renderer';
import { Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

jest.mock('@gluestack-ui/config', () => ({
  config: {}
}));

jest.mock('@gluestack-ui/themed', () => ({
  GluestackUIProvider: ({ children }) => <div>{children}</div>,
  Button: 'Button',
  ButtonText: 'ButtonText'
}));


import GenericButton from '../GenericButton'; 

describe('GenericButton', () => {
  it('renders correctly', () => {
    const onPressMock = jest.fn();
    const props = {
      content: 'Click me',
      color: '#00FF00',
      tintColor: '#FFFFFF',
      onPress: onPressMock,
      style: { padding: 10 },
      isDisabled: false
    };

    const tree = renderer.create(
      <GenericButton {...props} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
