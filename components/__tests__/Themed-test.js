import React from "react";
import renderer from "react-test-renderer";
import { Text as DefaultText, View as DefaultView } from "react-native";

jest.mock("../useColorScheme", () => ({
  useColorScheme: jest.fn(),
}));

jest.mock("@/constants/Colors", () => ({
  light: {
    text: "#000000",
    background: "#ffffff",
  },
  dark: {
    text: "#ffffff",
    background: "#000000",
  },
}));

import { Text, View } from "../Themed";
import { useColorScheme } from "../useColorScheme";

describe("Text and View components", () => {
  it("renders Text component with light theme color", () => {
    useColorScheme.mockReturnValue("light");
    
    const tree = renderer.create(
      <Text lightColor="#111111" darkColor="#222222">
        Light Theme Text
      </Text>
    ).toJSON();
    
    expect(tree).toMatchSnapshot();
    expect(tree.props.style).toContainEqual({ color: "#111111" });
  });

  it("renders Text component with dark theme color", () => {
    useColorScheme.mockReturnValue("dark");

    const tree = renderer.create(
      <Text lightColor="#111111" darkColor="#222222">
        Dark Theme Text
      </Text>
    ).toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree.props.style).toContainEqual({ color: "#222222" });
  });

  it("renders View component with light theme background color", () => {
    useColorScheme.mockReturnValue("light");

    const tree = renderer.create(
      <View lightColor="#cccccc" darkColor="#333333">
        <DefaultText>Light Theme View</DefaultText>
      </View>
    ).toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree.props.style).toContainEqual({ backgroundColor: "#cccccc" });
  });

  it("renders View component with dark theme background color", () => {
    useColorScheme.mockReturnValue("dark");

    const tree = renderer.create(
      <View lightColor="#cccccc" darkColor="#333333">
        <DefaultText>Dark Theme View</DefaultText>
      </View>
    ).toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree.props.style).toContainEqual({ backgroundColor: "#333333" });
  });
});
