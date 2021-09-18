import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class PostsService {
  async getPostById(postId) {
    const post = await dbContext.Posts.findById(postId).populate('creator')
    if (!post) {
      throw new BadRequest('post not found')
    }
    return post
  }

  async getAllPosts(query) {
    const posts = await dbContext.Posts.find(query)
    return posts
  }

  async createPost(postData) {
    const post = await dbContext.Posts.create(postData)
    return post
  }

  async deletePost(postId, userId) {
    const post = await this.getPostById(postId)
    if (userId !== post.creatorId.toString()) {
      throw new Forbidden('you dont have permission to delete this')
    }
    await post.remove()
    return post
  }
}

export const postsService = new PostsService()
