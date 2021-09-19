import { ProxyState } from '../AppState.js'

export class Post {
  constructor(postData) {
    this.id = postData.id
    this.title = postData.title
    this.img = postData.img
    this.description = postData.description
  }

  get postTemplate() {
    return /* html */ `
      <div class="col-md-3 m-5">
        <div class="card  my-2 card-border" >
          <div class="card-header d-flex justify-content-between p-0">           
          <button class="btn btn-info" onclick="app.postsController.deletePost('${this.id}')">X</button>
          </div>
              <div class="card-body card-custom p-0">
              <img class="img-fluid text-center img-custom" src="${this.img}" alt=":(" >                
              </div>
              <div class="container-fluid  card-footer">
                <div class="row">
                  <div class="col">                  
                    <title>"${this.title}"</title>
                  </div>
                </div>
                <div class="row text-center">
                  <div class="col-2">
                    <!-- add on click to add a like to this post -->
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/169px-Heart_coraz%C3%B3n.svg.png" class="selectable" selectable onclick="app.postsController.addLikes()" height="45" alt="">                    
                  </div>
                  <div class="col-8">
                    <span>"${this.description}"</span>
                  </div>
                  <div class="col-2">
                    <!-- add on click to add a comment to this post -->
                    <img src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX13068803.jpg" class="selectable" onclick="app.postsController.toggleCommentsForm('${this.id}')" height="45" alt="">
                  </div>
                </div>
                <div class="row my-2 ">
                <div id="comments-${this.id}">
                  ${this.comments}
                </div>
                </div>
              </div>
            </div>
            <form class="visually-hidden" onsubmit="app.commentsController.createComment('${this.id}')" id="commentForm-${this.id}">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label for="description" class="text-light">Comment:</label>
                  <input type="text" class='form-control' name="description" id="description" minlength="3">
                </div> 
                <div class="button-group"> 
                  <button type="reset" class="btn btn-secondary">Reset</button>
                  <button type="submit" class="btn btn-primary">Post</button>
                </div>
              </div>
            </div>
            </form>
          </div>
    `
  }

  get comments() {
    let template = ''
    const comments = ProxyState.comments.filter(c => c.postId === this.id)
    // eslint-disable-next-line no-console
    console.log('post comments', comments)
    comments.forEach(c => { template += `<div>${c.description}</div>` })
    return template
  }
}
