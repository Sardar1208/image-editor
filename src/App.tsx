import { createContext, useEffect, useRef, useState } from "react";
import "./App.css";
import { initWasm } from "./utils/utility_functions.js";
import Editor from "./components/high_level/Editor.js";
import ControlPanel from "./components/high_level/ControlPanel.js";
import { ImageState } from "./types/T_ImageState.js";
import { Provider } from "react-redux";
import store from "./store.js";

export const ImageContext = createContext<{
  state: ImageState;
  setState: React.Dispatch<React.SetStateAction<ImageState>>;
} | null>(null);

export const CanvasContext: any = createContext(null);

function App() {
  const [state, setState] = useState<ImageState>({
    originalImage: null,
    currentImage: null,
    snapshots: [],
  });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    initWasm();
  }, []);

  return (
    <Provider store={store}>
      <CanvasContext.Provider value={canvasRef}>
        <ImageContext.Provider value={{ state, setState }}>
          <div className="main_grid">
            <Editor />
            <ControlPanel />
          </div>
        </ImageContext.Provider>
      </CanvasContext.Provider>
    </Provider>
  );
}

export default App;
