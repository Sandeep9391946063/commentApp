import {Component} from 'react'

import {v4} from 'uuid'
import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsList: [],
  }

  deleteComment = commentId => {
    const {commentsList} = this.state

    this.setState(prevState => ({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    }))
  }

  toggleIsLiked = id => {
    this.setState({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    })
  }
  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }
  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialContainerBackgroundClassName = `initail-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      isLiked: false,
      initialClassName: initialContainerBackgroundClassName,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
    }))
  }
  onChangeCommentInput = event => {
    this.setState({
      commentInput: event.target.value,
    })
  }
  onChangeNameInput = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }
  render() {
    const {nameInput, commentInput, commentsList} = this.state
    return (
      <div className="background">
        <div className="comment-container">
          <h1 className="heading"> Comments </h1>
          <div className="comment-inputs">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="form-description">
                Say Something about 4.0 Technologies
              </p>
              <input
                className="name-input"
                type="text"
                placeholder="Your Name"
                onChange={this.onChangeNameInput}
              />
              <textarea
                className="comment-input"
                placeholder="Your Comment"
                rows="6"
                onChange={this.onChangeCommentInput}
              />
              <button type="button" className="btn">
                Add Comment
              </button>
            </form>
            <img
              className="image"
              alt="comments"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            />
          </div>
          <hr className="line" />
          <p className="paragraph">
            <span className="comments-count"> {commentsList.length}</span>
            Comments
          </p>
          <ul className="comment-list"> {this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
