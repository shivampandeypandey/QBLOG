import React from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import PostArticleService from "../../services/PostArticleService";
import AllPostsService from "../../services/AllPostsService";


const useStyles = makeStyles((theme) => ({
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      marginLeft:theme.spacing(2),
      backgroundColor:  '#84ffff'
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    }
  }));
  

  export default function NewArticleForm({loggedInUser,setAllArticles}){
    const classes = useStyles();
    const BlogTitle = React.useRef(null);
    const BlogContent = React.useRef(null);
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const data = {
            title: BlogTitle.current.value,
            content: BlogContent.current.value,
            author_id: loggedInUser.id,
            author_name: loggedInUser.name,
            created_at: new Date().toString(),
          };
        try{
            const response = await PostArticleService(data);
            if(response.success){
                const updatedArticles=await AllPostsService();
                setAllArticles(updatedArticles.data);
            }else{
                setErrorMessage("problem with your request try again later!!")
            }
        }catch(err){
            setErrorMessage("Invalid credentials")
            console.log(err)
        }

    }
    let err='';
  if(errorMessage){
    err=(
      <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
    )
  }

    return(
        <div>
            {err}
            <center><h3>Add a new blog post</h3></center>
            <form key={"newArticle"} className={classes.form}  onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="dense"
                    size="small"
                    required
                    fullWidth
                    id="title"
                    label="Blog title"
                    name="title"
                    inputRef={BlogTitle}
                />
                <TextField
                    variant="outlined"
                    margin="dense"
                    multiline
                    required
                    fullWidth
                    id="content"
                    label="Enter blog content"
                    name="content"
                    autoComplete="content"
                    inputRef={BlogContent}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    className={classes.submit}
                >
                    Post
                </Button>
            </form>
        </div>
    )

}