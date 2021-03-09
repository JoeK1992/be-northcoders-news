const formatArticles = (articlesRawData) => {
  const articleData = articlesRawData.map((article) => {
    const articleClone = { ...article };
    const timestamp = new Date(articleClone.created_at);
    articleClone.created_at = timestamp;
    return articleClone;
  });
  return articleData;
};

const createReferenceObj = (usersRawData, ArticlesRawData, commentsRawData) => {
  return {};

  // output
  // {author: user.username,
  // article_id: articles.article_id}

  // author for comments that references users username
  // article id which references articles article id
};

const formatComments = (commentsRawData) => {
  return [];
};

module.exports = { formatArticles, formatComments, createReferenceObj };
