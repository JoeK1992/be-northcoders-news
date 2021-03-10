const formatArticles = (articlesRawData) => {
  const articleData = articlesRawData.map((article) => {
    const articleClone = { ...article };
    const timestamp = new Date(articleClone.created_at);
    articleClone.created_at = timestamp;
    return articleClone;
  });
  return articleData;
};

const createReferenceObj = (array, key, value) => {
  const refObject = {};
  if (array.length === 0) {
    return refObject;
  } else {
    array.forEach((element) => {
      const refKey = element[key];
      const refValue = element[value];
      refObject[refKey] = refValue;
    });

    return refObject;
  }
};

const formatComments = (commentsRawData, referenceObj) => {
  const formattedComments = commentsRawData.map((comment) => {
    const clonedComment = { ...comment };
    const key = clonedComment.belongs_to;
    const article_id = referenceObj[key];
    clonedComment.article_id = article_id;
    delete clonedComment.belongs_to;
    clonedComment.author = clonedComment.created_by;
    delete clonedComment.created_by;
    clonedComment.created_at = new Date(clonedComment.created_at);
    return clonedComment;
  });

  return formattedComments;

  // if (commentsRawData.length === 0) return [];
  // const key = commentsRawData[0].belongs_to;
  // const value = referenceObj[key];

  // commentsRawData[0].article_id = value;
  // delete commentsRawData[0].belongs_to;
  // commentsRawData[0].author = commentsRawData[0].created_by;
  // delete commentsRawData[0].created_by;
  // commentsRawData[0].created_at = new Date(commentsRawData[0].created_at);

  // return commentsRawData;
};

module.exports = { formatArticles, formatComments, createReferenceObj };
