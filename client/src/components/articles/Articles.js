import React from 'react';
import DeleteBlogService from '../../services/DeleteBlogService';
import AllPostsService from '../../services/AllPostsService';
import DeleteIcon from '@material-ui/icons/Delete';
import './Articles.css'

const Article = ({title,setAllArticles, content, author_id, author_name, id,created_at,currentUser}) => {
    const [blogId,setBlogId]=React.useState(id);
    //console.log(author_id,currentUser.id,author_id===currentUser.id)

    async function deleteBlog(id){
        const data=await DeleteBlogService(id);
        // console.log(author_id===currentUser.id)
        if(data.success){
            const response = await AllPostsService();
            setAllArticles(response.data);
        }
    }

    const removeBlog= async()=>{
        try{
            await deleteBlog(id);
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div class="card article">
            <div class="card-header">{title}</div>
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p>{content}</p>
                    <footer class="blockquote-footer">Written by <cite title="Source Title"><b>{author_name}</b></cite></footer>
                </blockquote>
            </div> 
                 {currentUser?.id === author_id && 
                 <button onClick={()=>removeBlog()}>
                    <DeleteIcon color="error"/>    
                </button>}
      </div>
    )
}
export default Article