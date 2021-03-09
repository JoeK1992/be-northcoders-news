const formatArticles = (articlesRawData) => {
  const articleData = articlesRawData.map((article) => {
    const articleClone = { ...article };
    const timestamp = new Date(articleClone.created_at);
    articleClone.created_at = timestamp;
    return articleClone;
  });
  return articleData;
};

const createReferenceObj = (commentsRawData, articlesRawData, key, value) => {
  const refObject = {};
  if (commentsRawData.length === 0 || articlesRawData.length === 0) {
    return refObject;
  } else {
    commentsRawData.forEach((element) => {
      const refKey = element[key];
      articlesRawData.forEach((article) => {
        if (article.title === refKey) {
          const refValue = article[value];
          refObject[refKey] = refValue;
        }
      });
    });
    return refObject;
  }
};

const formatComments = (commentsRawData, referenceObj) => {
  return [];
  console.log(commentsRawData);
};

module.exports = { formatArticles, formatComments, createReferenceObj };
