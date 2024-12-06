import { useContext, useRef } from "react";
import "./editor.css";
import { CanvasContext, ImageContext } from "../App";
import { drawImageToCanvas } from "../utils/utility_functions";
import UploadButton from "./UploadButton";
import ValueController from "./valueController";
import { setOriginalImage } from "../utils/image_state_manager";

export default function Editor() {

    const canvasRef: React.MutableRefObject<HTMLCanvasElement | null> = useContext(CanvasContext);
    const editorRef = useRef<any>(null);
    const imageState = useContext(ImageContext);

    // const [scale, setScale] = useState(1);

    // useEffect(() => {
    //     let canvas = canvasRef.current;
    //     if (canvas == null) {
    //         return;
    //     }

    //     console.log("here");
    //     let ctx = canvas.getContext("2d")!;
    // }, [scale]);


    function onImageSelect(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files == null) {
            alert("No file selected");
            return;
        }
        console.log(event.target.files);
        const file = event.target.files[0];

        const image = new Image();
        image.src = URL.createObjectURL(file);
        setOriginalImage(imageState?.setState!, null, image);

        image.onload = () => {
            drawImageToCanvas(100, canvasRef, image, editorRef);
            const canvas = canvasRef.current!;
            const ctx = canvas.getContext("2d")!;
            const imageData = ctx.getImageData(0, 0, image.width, image.height);
            setOriginalImage(imageState?.setState!, imageData, image);
        }
    }

    return (
        <div className="editor_main">
            {imageState?.state.originalImage == null ? <div className="editor_empty">
                <span style={{ fontSize: "25px", marginBottom: "10px" }}>Select an image and start editing</span>
                <UploadButton onImageSelect={onImageSelect} />
            </div> : (
                <div style={{ border: "0px solid red", width: "100%", height: "90%", margin: "20px", display: "flex", justifyContent: "center", alignItems: "center" }} ref={editorRef}>
                    <canvas ref={canvasRef} style={{
                        border: "2px solid #000",
                    }}>

                    </canvas>
                </div>
            )}

            <div style={{ position: "absolute", bottom: 20, right: 20 }}>
                <ValueController
                    minValue={-150}
                    maxValue={150}
                    initialValue={100}
                    onChange={(value) => drawImageToCanvas(value, canvasRef, imageState!.state.originalImage!.imageElement!, editorRef)}
                />
            </div>
        </div>
    )
}

// TODO - add a navigator on top of the editor screen with edit, start new, export etc options
// TODO - when no image is selected, editor should go full screen with animation
// TODO - error handling