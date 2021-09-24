import React, { useEffect, useState } from 'react';
import AllPostsService from '../../services/AllPostsService';
import Article from '../articles/Articles';
import NewArticleForm from '../newArticleForm/NewArticleForm';

export default function Home({loggedInUser}) {

    const [allArticles, setAllArticles] = useState([]);

    useEffect(()=>{
        AllArticles();
    },[]);

    const AllArticles = async () =>{
        if(loggedInUser){
            const response = await AllPostsService();
            setAllArticles(response.data);
        }
    }

    return (
        <div className="home">
            <NewArticleForm  loggedInUser={loggedInUser} setAllArticles={setAllArticles}/>
            <div className="articles">
                {allArticles.map(article => <Article setAllArticles={setAllArticles} key={article.id} currentUser={loggedInUser} {...article}/>)}
            </div> 
        </div>
    )
}