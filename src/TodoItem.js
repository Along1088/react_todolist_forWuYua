import React from 'react'
import PropTypes from 'prop-types'
/* export default class TodoItem extends Component {
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
} */
const TodoItem = (props) => {
  return (
    <div className="todo_item">
      <input
        type="checkbox"
        checked={props.checked}
        onChange={() => props.handleCheckChange(props.index)}
      />
      <div
        contentEditable
        onBlur={(e) => props.handleEdit(props.index, e.target.innerText)}
        suppressContentEditableWarning
        className={props.checked ? 'item_text_checked' : 'item_text'}
      >
        {props.content}
      </div>
      <button onClick={() => props.handleDel(props.index)}>删除</button>
    </div>
  )
}
TodoItem.propTypes = {
  content: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  handleCheckChange: PropTypes.func.isRequired,
  handleDel: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
}
export default TodoItem
