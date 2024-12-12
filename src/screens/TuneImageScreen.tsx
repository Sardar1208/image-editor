import { useContext } from "react";
import { CanvasContext, ImageContext } from "../App";
import PropertyWithSlider from "../components/slider";
import { tune_image, useWorker } from "../processes/tune_image_processor";
import { M_AdjustmentType } from "../types/T_ProcessTypes";

function TuneImageScreen() {
  const canvasRef: React.MutableRefObject<HTMLCanvasElement | null> =
    useContext(CanvasContext);
  const imageState = useContext(ImageContext);

  const WebWorker = useWorker();

  return (
    <div className="adjustments">
      {Object.entries(M_AdjustmentType).map(([key, adjustmentType]) => {
        return (
          <PropertyWithSlider
            onChange={(value) =>
              tune_image(
                canvasRef,
                adjustmentType,
                value,
                WebWorker,
                imageState?.state,
                imageState?.setState
              )
            }
            label={key}
            adjustmentType={adjustmentType}
          />
        );
      })}
    </div>
  );
}

export default TuneImageScreen;
