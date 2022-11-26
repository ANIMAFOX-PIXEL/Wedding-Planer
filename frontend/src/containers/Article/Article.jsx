import React from 'react';

import ArticleComponent from '../../components/Article/Article';
import Footer from '../../components/Common/Footer';
import Navigation from '../../components/Navigation/Navigation';
import { withRouteParams } from '../../components/hoc/withRouteParams';

import { useArticle } from '../../hooks/article';
import { PlannerFindOrCreate } from '../../actions/PlannerFindOrCreate';
import { AddProductToCart } from '../../actions/AddProductToCart';
import { useNavigate } from 'react-router-dom';

const Article = ({ params: { id } }) => {
  const navigate = useNavigate();
  const {
    fetchedArticle,
    fetchingArticle,
    error,
    article,
    imgIndex,
    setImgIndex,
  } = useArticle(id);

  const handleRedirectToPlanner = async () => {
    const { err, data: planner } = await PlannerFindOrCreate();
    if (err) {
      console.error(err);
      return;
    }

    console.log(planner);

    const { err: addErr } = await AddProductToCart(planner._id, article._id);
    if (addErr) {
      console.error(addErr);
      alert(addErr.message);
      return;
    }

    navigate('/planner');
  };

  return (
    <>
      <Navigation />
      <ArticleComponent
        fetchedArticle={fetchedArticle}
        fetchingArticle={fetchingArticle}
        article={article}
        error={error}
        imgIndex={imgIndex}
        setImgIndex={setImgIndex}
        handleRedirectToPlanner={handleRedirectToPlanner}
      />
      <Footer />
    </>
  );
};

export default withRouteParams(Article);
