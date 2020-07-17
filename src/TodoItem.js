import React from 'react'
import PropTypes from 'prop-types'
import { Button, Checkbox, Popconfirm, message } from 'antd';

const TodoItem = (props) => {
  return (
    <>
      <Checkbox
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
      <Popconfirm
        title="确定要删除吗?"
        onConfirm={() => props.handleDel(props.index)}
        onCancel={() => message.info('已取消操作！', 0.1)}
        okText="Yes"
        cancelText="No">
        <Button danger type="primary">删除</Button>
      </Popconfirm>

    </>
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
