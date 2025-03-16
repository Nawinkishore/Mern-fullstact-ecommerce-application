import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Sheet } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import React from "react";
import { useState } from "react";
import ProductImageUpload from '../admin-view/image-upload'
const initialFormData = {
  image : null,
  title :'',
  decription:'',
  category : '',
  brand : '',
  price :'',
  salePrice : '',
  totalStock : '',
}
const products = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  function onSumbit(){

  }
  return (
    <>
      <div className="mb-5 flex justify-end w-full">
        <Button onClick={()=>setOpenCreateProductsDialog(true)}>Add New Products</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet open={openCreateProductsDialog} onOpenChange={()=>
        setOpenCreateProductsDialog(false)
        
      }
      
      >
        <SheetContent side="right" className='overflow-auto p-3'>
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload />
          <div className="py-6 px-3">
            <CommonForm
            formControls={addProductFormElements}
            formData={formData}
            buttonText='Add Product'
            onSubmit={onSumbit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default products;
