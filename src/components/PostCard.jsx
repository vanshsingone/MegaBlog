import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                {(() => {
                    const imageUrl = featuredImage && appwriteService.getFileView(featuredImage);
                    return imageUrl ? (
                        <img src={imageUrl} alt={title} className='rounded-xl' />
                    ) : (
                        <div className='w-full h-40 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-sm'>No image</div>
                    );
                })()}

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard