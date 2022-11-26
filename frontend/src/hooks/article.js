import { useEffect, useState } from 'react';
import { FetchArticle } from '../actions/FetchArticle';

export const useArticle = id => {
  const [{ 
      fetchedArticle, 
      fetchingArticle, 
      error, 
      article, 
      imgIndex 
    }, 
    setState
  ] =
  useState({
    fetchedArticle: false,
    fetchingArticle: false,
    error: null,
    article: null,
    imgIndex: 0,
  });

  const loadArticle = async () => {
    try {
      setState(prev => ({...prev, fetchingArticle: true}));
      const { err, data: article } = await FetchArticle(id);
      if (err) {
        console.error(err);
        return;
      }
      
      setState(prev => ({
        ...prev, 
        fetchedArticle: true,
        fetchingArticle: false,
        article,
      }));
    } catch (err) {
      setState(prev => ({
        ...prev, 
        fetchedArticle: true,
        fetchingArticle: false,
        fetchError: err.message,
      }));
      // window.location.reload();
    }
  };

  const setImgIndex = idx => setState(prev => ({...prev, imgIndex: idx}));

  useEffect(() => {
    loadArticle();
  }, []);

  return {
    fetchedArticle,
    fetchingArticle,
    error,
    article,
    loadArticle,
    imgIndex,
    setImgIndex
  };
};