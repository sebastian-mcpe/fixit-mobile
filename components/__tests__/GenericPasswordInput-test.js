import React from "react";
import renderer from "react-test-renderer";

jest.mock("@gluestack-ui/config", () => ({
  config: {},
}));

jest.mock("@gluestack-ui/themed", () => ({
  GluestackUIProvider: ({ children }) => <div>{children}</div>,
  Input: ({ children, style }) => <div style={style}>{children}</div>,
  InputField: ({ onBlur, onChangeText, value, type, placeholder }) => (
    <input
      onBlur={onBlur}
      onChange={(e) => onChangeText(e.target.value)}
      value={value}
      type={type}
      placeholder={placeholder}
    />
  ), 
  InputSlot: ({ children, onPress }) => <div onClick={onPress}>{children}</div>,
}));

jest.mock("@expo/vector-icons/Ionicons", () => "Ionicons");

import GenericInput from "../GenericInput";

describe("GenericInput", () => {
  it("renders correctly with provided props", () => {
    const props = {
      content: "Enter text",
      onChange: jest.fn(),
      onBlur: jest.fn(),
      value: "Initial value",
      style: { borderWidth: 1, borderColor: "black" },
    };

    const tree = renderer.create(<GenericInput {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
