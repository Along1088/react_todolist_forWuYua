import React, { Component } from 'react'

export default class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleChecked = () => {
    this.props.checkboxChange(this.props.index)
  }
  handleDelete = () => {
    this.props.handleDel(this.props.index)
  }
  handleEdit = (e) => {
    const value = e.target.innerText
    this.props.handleEdit(this.props.index, value)
  }
  render() {
    return (
      <div className="todo_item">
        <input
          type="checkbox"
          checked={this.props.checked}
          onChange={this.handleChecked}
        />
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={this.handleEdit}
          className={this.props.checked ? 'item_text_checked' : 'item_text'}
        >
          {this.props.content}
        </div>
        <button onClick={this.handleDelete}>删除</button>
      </div>
    )
  }
}
