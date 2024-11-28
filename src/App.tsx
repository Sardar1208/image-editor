import { createContext, useEffect, useRef, useState } from 'react'
import './App.css'
import { initWasm } from './utils/utility_functions.js';
import Editor from './components/Editor.js';
import ControlPanel from './components/ControlPanel.js';
import { ImageState } from './types/image_adjustments.js';

export const ImageContext = createContext<{
  state: ImageState;
  setState: React.Dispatch<React.SetStateAction<ImageState>>;
} | null>(null);

export const CanvasContext: any = createContext(null);

function App() {

  const [state, setState] = useState<ImageState>({ originalImage: null, snapshots: [] });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    initWasm();
  }, [])

  return (
    <CanvasContext.Provider value={canvasRef}>
      <ImageContext.Provider value={{ state, setState }}>
        <div className='main_grid'>
          <Editor />
          <ControlPanel />
        </div>
      </ImageContext.Provider>
    </CanvasContext.Provider>
  )
}

export default App;
