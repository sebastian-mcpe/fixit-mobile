import React from "react";
import renderer from "react-test-renderer";
import { TextInput } from "react-native";

jest.mock("@gluestack-ui/config", () => ({
  config: {},
}));

jest.mock("@gluestack-ui/themed", () => ({
  GluestackUIProvider: ({ children }) => <div>{children}</div>,
  Input: ({ children, style }) => <div style={style}>{children}</div>,
  InputField: "input",
}));

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
