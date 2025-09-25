'use client'
import { store } from '@/lib/store';
import React, { use } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSinglePost } from '@/lib/postSlice';
import Loading from '@/app/components/Loading/Loading';
import PostCard from '@/app/components/PostCard/PostCard';

export default function PostDetails({ params }: { params: Promise<{ id: string }> }) {
    let { id } = use(params)
    console.log(id);
    let dispatch = useDispatch<typeof store.dispatch>()

    let {singlePost , isLoading}= useSelector((state:ReturnType<typeof store.getState>)=>{return state.postReducer})


    useEffect(() => {
        dispatch(getSinglePost(id))
    }, [])
    return <>

    {singlePost? <PostCard currentPost={singlePost} key={singlePost._id} showAllComments={true}  />: <Loading/>}

    </>
}
