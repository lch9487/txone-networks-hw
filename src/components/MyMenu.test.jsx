import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TonicProvider, colorStyle } from "@tonic-ui/react";
import MyMenu from "./MyMenu";

jest.mock("@tonic-ui/react", () => ({
  ...jest.requireActual("@tonic-ui/react"),
  useColorMode: () => ["dark"],
  useColorStyle: () => [
    {
      color: { primary: "", secondary: "" },
      background: { primary: "", secondary: "" },
    },
  ],
}));

const MyComponent = () => (
  <TonicProvider
    colorMode={{
      defaultValue: "dark", // One of: 'dark', 'light'
    }}
    colorStyle={{
      defaultValue: colorStyle, // Custom color style
    }}
    useCSSBaseline={true} // If `true`, apply CSS reset and base styles
  >
    <MyMenu />
  </TonicProvider>
);

describe("MyMenu", () => {
  it("should show button", () => {
    render(MyComponent());

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });

  it("should show menu list, when click button", () => {
    render(MyComponent());

    const button = screen.getByRole("button");

    act(() => {
      userEvent.click(button);
    });
    const menuItems = screen.getAllByRole("menuitem");

    expect(menuItems).toHaveLength(5);
  });
});
