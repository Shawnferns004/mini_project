import { filterOptions } from '@/config'
import React from 'react'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'

const ProductFilter = () => {
  return (
    <div className='bg-background rounded-lg shadow-sm'>
        <div className="p-4 border-b">
            <div className="text-lg font-extrabold">Filters</div>
        </div>
        <div className="p-4 space-y-4">
            {
                Object.keys(filterOptions).map(keyItem => 
            <>
                <div className="">
                    <h3 className="text-lg font-bold">{keyItem}</h3>
                    <div className="grid gap-2 mt-2">
                        {
                            filterOptions[keyItem].map(option =>
                                <Label className='flex items-center gap-2 font-medium'>
                                    <Checkbox />
                                    {option.label}
                                </Label>
                            )
                        }
                    </div>
                </div>
                <Separator />
            </>)
            }
        </div>
    </div>
  )
}

export default ProductFilter