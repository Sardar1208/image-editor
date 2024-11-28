import { useContext } from "react";
import { CanvasContext, ImageContext } from "../App";
import PropertyWithSlider from "../components/slider";
import { tune_image, useWorker } from "../effects/image_adjustments";


function TuneImageScreen() {
    const canvasRef: React.MutableRefObject<HTMLCanvasElement | null> = useContext(CanvasContext);
    const imageState = useContext(ImageContext);

    const WebWorker = useWorker();

    return (
        <div className="adjustments">
            <PropertyWithSlider onChange={(brightness) => tune_image(canvasRef, imageState?.state!, imageState?.setState!, "brightness", brightness, WebWorker)} label="Brightness" />
            <PropertyWithSlider onChange={(contrast) => tune_image(canvasRef, imageState?.state!, imageState?.setState!, "contrast", contrast, WebWorker)} label="Contrast" />
            <PropertyWithSlider onChange={(saturation) => tune_image(canvasRef, imageState?.state!, imageState?.setState!, "saturation", saturation, WebWorker)} label="Saturation" />
            <PropertyWithSlider onChange={(shadow) => tune_image(canvasRef, imageState?.state!, imageState?.setState!, "shadow", shadow, WebWorker)} label="Shadows" />
            <PropertyWithSlider onChange={(temperature) => tune_image(canvasRef, imageState?.state!, imageState?.setState!, "temperature", temperature, WebWorker)} label="Temperature" />
            <PropertyWithSlider onChange={(tint) => tune_image(canvasRef, imageState?.state!, imageState?.setState!, "tint", tint, WebWorker)} label="Tint" />
            <PropertyWithSlider onChange={(vibrance) => tune_image(canvasRef, imageState?.state!, imageState?.setState!, "vibrance", vibrance, WebWorker)} label="Vibrance" />
            <PropertyWithSlider onChange={(highlights) => tune_image(canvasRef, imageState?.state!, imageState?.setState!, "highlights", highlights, WebWorker)} label="Highlights" />
        </div>
    );
}

export default TuneImageScreen;