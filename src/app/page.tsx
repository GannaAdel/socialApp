'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/lib/store";
import { useEffect } from "react";
import { getAllPosts } from "@/lib/postSlice";
import { Post } from "@/Interfaces/PostInterface";
import Loading from "./components/Loading/Loading";
import PostCard from "./components/PostCard/PostCard";
import CreatePost from "./components/CreatePost/CreatePost";

export default function Home() {
  let { allPosts, isLoading } = useSelector((state: ReturnType<typeof store.getState>) => { return state.postReducer })
  let dispatch = useDispatch<typeof store.dispatch>()

  useEffect(() => {
    dispatch(getAllPosts())
  }, [])
  return <>
  <CreatePost/>

    {isLoading ? <Loading /> : (allPosts?.map((post: Post) => {
      return <PostCard showAllComments={false} currentPost={post} key={post._id} />
    }))
    }


  </>
}
