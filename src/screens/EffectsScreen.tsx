import { useContext } from "react";
import { CanvasContext, ImageContext } from "../App";
import { useWorker } from "../processes/tune_image_processor";
import EffectTile from "../components/EffectTile";
import gaussianBlur from "../processes/gaussianBlur";


function EffectsScreen() {
    const canvasRef: React.MutableRefObject<HTMLCanvasElement | null> = useContext(CanvasContext);
    const imageState = useContext(ImageContext);

    const WebWorker = useWorker();

    return (
        <div className="adjustments">
            <div className="adjustment_item">
                <EffectTile title="Gaussian blur" onClick={() => {
                    gaussianBlur(canvasRef, imageState?.state.originalImage?.imageElement!);
                }} />
            </div>
        </div>
    );
}

export default EffectsScreen;