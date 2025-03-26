import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Sheet } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import React, { useEffect } from "react";
import { useState } from "react";
import ProductImageUpload from "../admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import AdminProductTile from "./product-tile";
import {
  fetchAllProducts,
  addNewProduct,
} from "../../../store/admin/product-slice/index";
const initialFormData = {
  image: null,
  title: "",
  decription: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const products = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  function onSumbit(e) {
    e.preventDefault();
    dispatch(
      addNewProduct({
        ...formData,
        image: uploadedImageUrl,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        setOpenCreateProductsDialog(false);
        setImageFile(null);
        setFormData(initialFormData);
        toast.success("Product Added Successfully");
      }
    });
  }
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(productList, uploadedImageUrl, "productList");
  return (
    <>
      <div className="mb-5 flex justify-end w-full">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Products
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">

        {
        productList && productList.length > 0?
        productList.map((product) => (
          <AdminProductTile key={product._id} product={product} />
        )):null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => setOpenCreateProductsDialog(false)}
      >
        <SheetContent side="right" className="overflow-auto p-3">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
          />
          <div className="py-6 px-3">
            <CommonForm
              formControls={addProductFormElements}
              setFormData={setFormData}
              formData={formData}
              buttonText="Add Product"
              onSubmit={onSumbit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default products;
