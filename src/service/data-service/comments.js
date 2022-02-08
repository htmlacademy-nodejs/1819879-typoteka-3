'use strict';

const {randomUUID} = require(`crypto`);

class CommentsService {
  findAll(article) {
    return article.comments;
  }

  create(article, text) {
    const newComment = {
      id: randomUUID(),
      text
    };

    article.comments.push(newComment);
    return newComment;
  }

  delete(article, commentId) {
    const oldComment = article.comments.find((comment) => comment.id === commentId);

    if (oldComment) {
      article.comments = article.comments.filter((comment) => comment.id !== commentId);
      return oldComment;
    }

    return null;
  }
}

module.exports = CommentsService;
