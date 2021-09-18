import { dbContext } from '../db/DbContext'
import { Forbidden } from '../utils/Errors'

class CommentsService {
  async getAllComments(query) {
    const comment = dbContext.Comments.find(query)
    return comment
  }

  async getCommentById(commentId) {
    const comment = dbContext.Comments.findById(commentId).populate('creator', 'name picture')
    return comment
  }

  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    return comment
  }

  async deleteComment(commentId, userId) {
    const comment = await this.getCommentById(commentId)
    if (userId !== comment.creatorId.toString()) {
      throw new Forbidden('You dont have permissions to delete this')
    }
    await comment.remove()
    return comment
  }
}

export const commentsService = new CommentsService()
