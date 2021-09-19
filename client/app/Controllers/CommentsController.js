/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
import { ProxyState } from '../AppState.js'
import { commentsService } from '../Services/CommentsService.js'
import { logger } from '../Utils/Logger.js'

function _drawComment() {
  let template = ''
  ProxyState.comments.forEach(c => template += c.commentTemplate)
  // document.getElementById('comments').innerHTML = template
}

export class CommentsController {
  constructor() {
    // ProxyState.on('comments', _drawComment)
    this.getAllComments()
  }

  async getAllComments() {
    try {
      commentsService.getAllComments()
    } catch (error) {
      logger.log(error)
    }
  }

  async addComment(commentData) {
    try {
      await commentsService.addComment(commentData)
    } catch (error) {
      logger.log(error)
    }
  }

  async createComment(postId) {
    // @ts-ignore
    event.preventDefault()
    const form = event.target
    const commentData = {
      // @ts-ignore
      description: form.description.value,
      postId: postId
    }
    try {
      await commentsService.addComment(commentData)
    } catch (error) {
      logger.log(error)
    }
    // @ts-ignore
    form.reset()
    _drawComment()
  }

  async removeComment(id) {
    try {
      await commentsService.removeComment(id)
    } catch (error) {
      logger.log(error)
    }
  }
}
