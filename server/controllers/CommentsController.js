// @ts-ignore
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'
import BaseController from '../utils/BaseController'

export class CommentsController extends BaseController {
  constructor() {
    super('api/posts/comments')
    this.router
      .get('', this.getAllComments)
      .get('/:commentId', this.getCommentById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:commentId', this.deleteComment)
  }

  async getAllComments(req, res, next) {
    try {
      const comments = await commentsService.getAllComments(req.query)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async getCommentById(req, res, next) {
    try {
      const comment = await commentsService.getCommentById(req.params.commentId)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.createComment(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(req, res, next) {
    try {
      const comment = await commentsService.deleteComment(req.params.commnetId, req.params.userId)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }
}
