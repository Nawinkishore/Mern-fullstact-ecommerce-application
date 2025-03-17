import { Input } from "@/components/ui/input";
import { useRef } from "react";

function ProductImageUpload({file,setFile,uploadedImageUrl,setUploadedImageUrl}){
    const inputRef = useRef(null);
    function handleImageFileChange(event){
        console.log(event.target.files);
    }
    return (
        <div className="w-full max-w-md mx-auto">
            <label className="text-lg font-semibold mb-2 block">Upload Image</label>
            <div>
                <Input type='file' id="image-upload" className='' ref={inputRef} onChange={handleImageFileChange} />
            </div>
        </div>
    )
}
export default ProductImageUpload; 