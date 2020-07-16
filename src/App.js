import React, { Component } from 'react'
import TodoItem from './TodoItem'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: 'learn JavaScript',
      list: [
        {
          value: '学英语',
          completed: true,
        },
        {
          value: '做家务',
          completed: false,
        },
        {
          value: '打游戏',
          completed: false,
        },
      ],
    }
  }
  /* 组件挂载后 */
  componentDidMount() {
    const list = JSON.parse(window.localStorage.getItem('list'))
    if (!list) {
      this.saveList(this.state.list)
      return
    }
    this.setState({
      list,
    })
  }
  /* 监听输入框变化 */
  handleInputChange = (e) => {
    const inputValue = e.target.value
    this.setState({
      inputValue,
    })
  }
  /* 监听键盘按下 */
  handleAdd = (e) => {
    const event = window.event || e
    const code = event.keyCode
    const { inputValue } = this.state
    if (code === 13) {
      /* 按下enter则进行添加操作 */
      this.setState(
        {
          list: [...this.state.list, { value: inputValue, completed: false }],
          inputValue: '',
        },
        () => this.saveList(this.state.list)
      )
    }
  }
  /* 删除todoitem */
  handleDel = (index) => {
    let { list } = this.state
    list.splice(index, 1)
    this.setState(
      {
        list,
      },
      () => this.saveList(list)
    )
  }
  /* 复选框变化 */
  handleCheckChange = (index) => {
    let { list } = this.state
    list[index].completed = !list[index].completed
    this.setState(
      {
        list,
      },
      () => this.saveList(list)
    )
  }
  /* 修改todo文本 */
  handleEdit = (index, value) => {
    let { list } = this.state
    list[index].value = value
    this.setState(
      {
        list,
      },
      () => this.saveList(list)
    )
  }
  /* 保存到localStorage */
  saveList = (val) => {
    window.localStorage.setItem('list', JSON.stringify(val))
  }
  render() {
    return (
      <div className="App">
        <div className="todolist_header">
          <div className="todolist_title">ToDoList</div>
          <div className="todolist_input_wrap">
            <input
              type="text"
              placeholder="添加ToDo"
              value={this.state.inputValue}
              onChange={this.handleInputChange}
              onKeyUp={this.handleAdd}
            />
          </div>
        </div>
        <div className="todolist_body">
          <div className="todo_item_wrap">
            {this.state.list.map((item, index) => {
              return (
                <TodoItem
                  content={item.value}
                  checked={item.completed}
                  key={index}
                  index={index}
                  handleCheckChange={this.handleCheckChange}
                  handleDel={this.handleDel}
                  handleEdit={this.handleEdit}
                />
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default App
