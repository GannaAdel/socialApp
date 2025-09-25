'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import { Box, Button, Grid, TextField } from '@mui/material';
import { Post } from '@/Interfaces/PostInterface';
import Image from 'next/image';
import Link from 'next/link';
import CommentCard from '../CommentCard/CommentCard';
import CreateComment from '../CreateComment/CreateComment';
import { useDispatch } from 'react-redux';
import { deleteComment, updateComment } from '@/lib/commentSlice';
import { store } from '@/lib/store';
import toast from 'react-hot-toast';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function PostCard({ currentPost, showAllComments = false }: { currentPost: Post, showAllComments: boolean }) {
  const [expanded, setExpanded] = React.useState(false);
  const [commentValue, setcommentValue] = React.useState(currentPost.comments);
  let dispatch= useDispatch< typeof store.dispatch>()

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  function handleDelete(id:string):void{
    const prev= [...commentValue]
    setcommentValue(commentValue.filter((comm)=> comm._id !== id));
   try {
     dispatch(deleteComment(id))
  } catch (err) {
    setcommentValue(prev);
    toast.error(`you are not allowed to delete others' comment`)
  }

}


  function handleUpdate({ commentId, commContent }: { commentId: string; commContent: string }){
    const prev= [...commentValue]

    try {
    setcommentValue(commentValue.map((comm)=> comm._id === commentId ? { ...comm, content: commContent } : comm));
   
     dispatch(updateComment({commentId, commContent}))
  } catch (err) {
    setcommentValue(prev);
    toast.error(`you are not allowed to update others' comment`)
  }
  }

  function handleCreateComment(newComment:any){
   return setcommentValue([newComment, ...commentValue])
   
    
  }

  return <>
    <Grid container spacing={2}>
      <Grid size={3}>

      </Grid>
      <Grid size={6} sx={{ my: '20px' }}>

        <Card sx={{ width: '100%' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                <Image src={currentPost?.user?.photo} alt={currentPost.user.name} width={100} height={100} />
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={currentPost.user.name}
            subheader={currentPost.createdAt}
          />
          <CardContent>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {currentPost.body}
            </Typography>
          </CardContent>
          {currentPost.image ? <CardMedia
            component="img"
            height="194"
            image={currentPost.image}
            alt="Paella dish"
          /> : ''}

          <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton aria-label="comment">
              <CommentIcon />
            </IconButton>
          </CardActions>

          <CreateComment postId={currentPost._id} 
          onAdd={handleCreateComment}
          />

          {commentValue.length > 0 && !showAllComments ?<>
            <CommentCard currentComment={commentValue[0]} Delete={handleDelete} Update={handleUpdate}  />
            <Button  sx={{ my: '30px', px:'10px' }}>
              <Link href={`/PostDetails/${currentPost?._id}`}>show more comments</Link>
            </Button>
           </> : ''
          }

          {commentValue.length >= 1 && showAllComments ?
            commentValue.map((comment) => {
              return <CommentCard currentComment={comment} Delete={handleDelete} Update={handleUpdate} key={comment._id} />
            })
            : ''}

       

        </Card>
      </Grid>
      <Grid size={3}>

      </Grid>

    </Grid>


  </>
}
