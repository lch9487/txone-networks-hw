import "./App.css";
import { TonicProvider, colorStyle } from "@tonic-ui/react";
import MyMenu from "./components/MyMenu";

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
