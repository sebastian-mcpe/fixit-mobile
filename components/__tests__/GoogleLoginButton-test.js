import React from 'react';
import renderer from 'react-test-renderer';
import { TouchableOpacity, Image } from 'react-native';

jest.mock('@gluestack-ui/themed', () => ({
  Button: ({ children, style, onPress }) => (
    <button style={style} onClick={onPress}>
      {children}
    </button>
  ),
  HStack: ({ children, flexDirection, alignItems, justifyContent }) => (
    <div style={{ display: 'flex', flexDirection, alignItems, justifyContent }}>
      {children}
    </div>
  ),
  ButtonText: ({ children, style }) => <span style={style}>{children}</span>,
}));

import GoogleLoginButton from '../GoogleButton';

describe('GoogleLoginButton', () => {
  it('renders correctly with the provided styles and structure', () => {
    const tree = renderer.create(<GoogleLoginButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onPress when button is clicked', () => {
    const onPressMock = jest.fn();
    const instance = renderer.create(<GoogleLoginButton onPress={onPressMock} />).root;

    const button = instance.findByType('button');
    button.props.onClick();
    expect(onPressMock).toHaveBeenCalled();
  });

  it('contains an Image with correct styles', () => {
    const instance = renderer.create(<GoogleLoginButton />).root;

    const image = instance.findByType(Image);
    expect(image.props.style).toMatchObject({
      width: 24,
      height: 24,
      marginRight: 10,
    });
  });

  it('contains ButtonText with correct styles and text', () => {
    const instance = renderer.create(<GoogleLoginButton />).root;

    const buttonText = instance.findByType('span');
    expect(buttonText.props.style).toMatchObject({
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
    });
    expect(buttonText.children).toContain('Login with Google');
  });
});
