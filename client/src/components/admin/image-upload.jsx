import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { CircleOff, DeleteIcon, File, Ghost, Image, Trash2, UploadCloudIcon } from 'lucide-react'
import { Button } from '../ui/button'
import axios from 'axios'
import { Skeleton } from '../ui/skeleton'

const ProductImageUpload = ({imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl, setImageLoadingState,imageLoadingState, isEditMode }) => {

    const inputRef = useRef()

    const handleImageFileChange = (event)=>{
        const selectFile = event.target.files?.[0]
        if (selectFile) {
            setImageFile(selectFile)
        }
    }


    const handleDragOver = (event) =>{
        event.preventDefault()
    }
    
    
    const handleDrop = (event) =>{
        event.preventDefault()
        const droppedFile = event.dataTransfer.files?.[0]
        if (droppedFile) {
            setImageFile(droppedFile)
        }
        
    }
    const handleRemoveImage = (event) =>{
        setImageFile(null)
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    const uploadImageToCloudinary = async () => {
        try {
            setImageLoadingState(true);
            const data = new FormData();
            data.append('my_file', imageFile);  
    
            const response = await axios.post('http://localhost:5000/api/admin/products/upload-image', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',  
                },
            });
    
            console.log(response.data.result);
    
            if (response.data?.success) {
                setUploadedImageUrl(response.data.result);  
            }
    
            console.log(response.data.url)
            setImageLoadingState(false);  
        } catch (error) {
            console.error("Error uploading image:", error.message);
            setImageLoadingState(false);  
        }
    };
    

    useEffect(()=>{
        if (imageFile!==null) {
            uploadImageToCloudinary()
        }
    },[imageFile])

  return (
    <div className='w-full max-w-md mx-auto mt-4'>
        <Label className='text-lg font-semibold mb-2 block'>Upload Image</Label>
        <div onDragOver={handleDragOver} onDrop={handleDrop} className={`${isEditMode ? 'opacity-60': ''} border-2 border-dashed rounded-lg p-4`}>
            <Input id='image-upload' type='file' 
            ref={inputRef}
            className='hidden'
            onChange={handleImageFileChange}
            disabled={isEditMode}
             />
             {
                !imageFile ?
                <Label htmlFor='image-upload' className={`${isEditMode ? 'cursor-not-allowed' : ''} flex flex-col items-center justify-center h-32 cursor-pointer`} >
                    {
                        isEditMode ? <CircleOff className='w-10 h-10 text-muted-foreground mb-2' /> :<UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2' />
                    }
                    {
                        isEditMode ? <span>Can't edit image</span>:<span>Drag and drop or click to upload image</span>
                    }
                </Label> : 
                imageLoadingState ? 
                <Skeleton className='h-10 bg-gray-100' /> :
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Image className='w-8 h-8 text-primary mr-2' />
                    </div>
                    <p className='text-sm font-medium'>{imageFile.name}</p>
                    <Button variant='ghost' size='icon' className='text-muted-foreground hover:text-foreground' onClick={handleRemoveImage} >
                        <Trash2 className='w-4 h-4' />
                        <span className='sr-only'>Remove file</span>
                    </Button>
                </div>
             }
        </div>
    </div>
  )
}

export default ProductImageUpload