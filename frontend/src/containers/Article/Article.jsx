import React, { useEffect, useState } from 'react';
import { axios } from '../../api/axios';
import ArticleComponent from '../../components/Article/Article';
import Footer from '../../components/Common/Footer';
import { withRouteParams } from '../../components/hoc/withRouteParams';

const Article = ({ params: { id } }) => {
  const [{ fetchedArticle, fetchingArticle, error, article }, setState] =
    useState({
      fetchedArticle: false,
      fetchingArticle: false,
      error: null,
      article: null,
    });

  const handleChange = (key, value) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const loadArticle = async () => {
    try {
      handleChange('fetchingArticle', true);

      const res = await axios.get(`/product/${id}`);
      const { data } = res;

      handleChange('fetchedArticle', true);
      handleChange('fetchingArticle', false);
      handleChange('article', data);
    } catch (err) {
      handleChange('fetchedArticle', true);
      handleChange('fetchingArticle', false);
      handleChange('fetchError', err.message);
      // window.location.reload();
    }
  };

  useEffect(() => {
    loadArticle();
  }, []);

  return (
    <>
      <ArticleComponent
        fetchedArticle={fetchedArticle}
        fetchingArticle={fetchingArticle}
        article={article}
        error={error}
        handleChange={handleChange}
      />
      <Footer />
    </>
  );
};

export default withRouteParams(Article);
