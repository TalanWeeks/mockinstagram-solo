import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { postsService } from '../services/PostsService'

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('', this.getAllPosts)
      .get('/:postId', this.getPostById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPost)
      .delete('/:postId', this.deletePost)
  }

  async getAllPosts(req, res, next) {
    try {
      const posts = await postsService.getAllPosts()
      res.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async getPostById(req, res, next) {
    try {
      const post = await postsService.getPostById(req.params.postId)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async createPost(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const post = await postsService.createPost(req.body)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async deletePost(req, res, next) {
    try {
      const post = await postsService.deletePost(req.params.postId, req.userInfo.id)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }
}
