import { useContext } from "react";
import { CanvasContext, ImageContext } from "../App";
import { useWorker } from "../effects/image_adjustments";
import EffectTile from "../components/EffectTile";
import greyScale from "../effects/greyscale";
import edgeDetect from "../effects/edgeDetect";


function FiltersScreen() {
    const canvasRef: React.MutableRefObject<HTMLCanvasElement | null> = useContext(CanvasContext);
    const imageState = useContext(ImageContext);

    const WebWorker = useWorker();

    return (
        <div className="adjustments">
            <div className="adjustment_item">
                <EffectTile title="Greyscale" onClick={() => {
                    greyScale(canvasRef, imageState?.state.originalImage?.imageElement!);
                }} />
            </div>
            <div className="adjustment_item">
                <EffectTile title="Edge" onClick={() => {
                    edgeDetect(canvasRef, imageState?.state.originalImage?.imageElement!);
                }} />
            </div>
        </div>
    );
}

export default FiltersScreen;