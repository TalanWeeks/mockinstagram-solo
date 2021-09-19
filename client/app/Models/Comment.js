export class Comment {
  constructor(commentData) {
    this.id = commentData.id
    this.description = commentData.description
    this.postId = commentData.postId
  }

  get commentTemplate() {
    return /* html */`
        <div class="row">
    <div class="col-md-12">
      <div class="card">
        <p>'${this.description}'</p>
        <i class="mdi mdi-delete mdi-16px text-danger selectable"
        onclick="app.commentController.removeComment('${this.id}')"></i>
      </div>
    </div>
  </div>
    `
  }
}
