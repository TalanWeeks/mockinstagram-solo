import { ProxyState } from '../AppState.js'
import { postsService } from '../Services/PostsService.js'
import { logger } from '../Utils/Logger.js'

function _drawPosts() {
  let template = ''
  // eslint-disable-next-line no-return-assign
  ProxyState.posts.forEach(p => template += p.postTemplate)
  document.getElementById('posts').innerHTML = template
}

export class PostsController {
  constructor() {
    ProxyState.on('posts', _drawPosts)
    ProxyState.on('comments', _drawPosts)
    this.getAllPosts()
  }

  async getAllPosts() {
    try {
      await postsService.getAllPosts()
    } catch (error) {
      logger.log('⚠ GET ALL POST', error)
    }
  }

  togglePostForm() {
    document.getElementById('postForm').classList.toggle('visually-hidden')
  }

  toggleCommentsForm(postId) {
    document.getElementById('commentForm-' + postId).classList.toggle('visually-hidden')
  }

  async addPosts() {
    // eslint-disable-next-line no-undef
    event.preventDefault()
    /**
     * @type {HTMLFormElement}
     */
    // @ts-ignore
    // eslint-disable-next-line no-undef
    const form = event.target
    const postData = {
      // @ts-ignore
      title: form.title.value,
      // @ts-ignore
      img: form.img.value,
      // @ts-ignore
      description: form.description.value
    }
    try {
      await postsService.addPosts(postData)
    } catch (error) {
      logger.log('⚠ Add Post', error)
    }
    // @ts-ignore
    form.reset()
  }

  async deletePost(postId) {
    try {
      postsService.deletePost(postId)
    } catch (error) {
      logger.log(error)
    }
  }
}
