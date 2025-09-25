export interface initState{
 isLoading: boolean,
 allPosts: null | Post[],
 isError: boolean,
 singlePost : null | Post
}
export interface initCommentState{
//  isLoading: boolean,
//  allComments: null | Comment[],
//  isError: boolean,
 singleComment : null | Comment
}



export interface Post {
  _id: string
  body?: string
  user: User
  createdAt: string
  comments: Comment[]
  id: string
  image?: string
}

export interface User {
  _id: string
  name: string
  photo: string
}

export interface Comment {
  _id: string
  content?: string
  commentCreator: CommentCreator
  post: string
  createdAt: string
}

export interface CommentCreator {
  _id: string
  name: string
  photo: string
}
