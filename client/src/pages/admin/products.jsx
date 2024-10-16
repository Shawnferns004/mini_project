import ProductImageUpload from "@/components/admin/image-upload";
import AdminProductTile from "@/components/admin/product-tile";
import CommonForm from "@/components/commom/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  subCategory: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const [currentEditedId, setCurrentEditedId] = useState(null)

  const [imageFile, setImageFile] = useState(null);

  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const [imageLoadingState, setImageLoadingState] = useState(false);
  console.log(formData);

  const { productList } = useSelector((state) => state.adminProducts);

  const dispatch = useDispatch();

  const { toast } = useToast();

  const onSubmit = (event) => {
    event.preventDefault();

    currentEditedId !== null ? 
    dispatch(editProduct({
      id: currentEditedId,
      formData
    })).then((data)=>{
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        setOpenCreateProductDialog(false);
        setFormData(initialFormData);
        setCurrentEditedId(null)
        toast({
          title: "Product updated successfully",
        });
      }
    }) : 
    dispatch(
      addNewProduct({
        ...formData,
        image: uploadedImageUrl,
      })
    ).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        setOpenCreateProductDialog(false);
        setImageFile(null);
        setFormData(initialFormData);
        toast({
          title: "Product added successfully",
        });
      }
    });
  };

  function handleDelete(getCurrentProductId) {
    console.log("Deleting Product ID:", getCurrentProductId); // Log the product ID
    dispatch(deleteProduct(getCurrentProductId)).then(data => {
        if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            toast({
                title: "Product deleted successfully",
            });
        } else {
            console.log("Delete failed:", data?.payload?.message); // Log any error messages
        }
    });
}

  const isFormValid = ()=>{
    return Object.keys(formData).map(key=> formData[key] !== '').every(item=> item)
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          productList && productList.length > 0 ?
          productList.map(productItem => <AdminProductTile 
            handleDelete={handleDelete}
            setFormData={setFormData} setOpenCreateProductDialog={setOpenCreateProductDialog} setCurrentEditedId={setCurrentEditedId} key={productItem._id} product={productItem} />) : null
        }
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setCurrentEditedId(null)
          setFormData(initialFormData)
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {
                currentEditedId !== null ? "Edit Product":"Add New Product"
              }
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            setUploadedImageUrl={setUploadedImageUrl} // Ensure this sets the correct URL
            uploadedImageUrl={uploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />

          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={
                currentEditedId !== null ? "Update Product" : "Add Product"
              }
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;
