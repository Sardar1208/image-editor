import { useRef } from "react";
import Button from "./Button";

interface UploadButtonProps {
    onImageSelect: (arg0: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function UploadButton({onImageSelect}: UploadButtonProps) {
    const fileInputRef: any = useRef(null);

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <input type="file"
                accept='image/*'
                onChange={onImageSelect}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />
            <Button text="Get Started!" color="lightGreen" onClick={handleClick} />
        </>
    )
}