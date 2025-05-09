import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
}) {
  const inputRef = useRef(null);
  console.log(isEditMode)

  function handleImageFileChange(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }
  function handleDragOver(e) {
    e.preventDefault();
  }
  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  }
  function handleRemoveFile() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  async function uploadImagetoCloudinary() {
    setImageLoadingState(true);
    try {
      const data = new FormData();
      data.append("my_file", imageFile);

      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data, // Pass the FormData object directly
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the correct content type
          },
        }
      );

      console.log(response);
      if (response.data && response.data.success) {
        console.log("Upload successful:", response.data.result?.secure_url);
        setUploadedImageUrl(response.data.result?.secure_url);
        setImageLoadingState(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
  useEffect(() => {
    if (imageFile !== null) {
      uploadImagetoCloudinary();
    }
  }, [imageFile]);
  return (
    <div className="w-full max-w-md mx-auto">
      <label className="text-lg font-semibold mb-2 block ">Upload Image</label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${isEditMode?'opacity-60':''} border-2 border-dashed rounded-lg p-4 mt-4`}
      >
        <Input
          type="file"
          id="image-upload"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label htmlFor="image-upload"
            className={`flex flex-col items-center justify-center h-32 cursor-pointer`}>
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & Drop or click to upload Image</span>
          </Label>
        ) : 
        imageLoadingState ? 
        <Skeleton className='h-10 bg-gray-200' /> :
        (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2 " />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveFile}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
export default ProductImageUpload;
