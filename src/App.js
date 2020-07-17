import React, { Component } from 'react'
import TodoItem from './TodoItem'
import { Layout, Input, List, message } from 'antd';
import './App.css'

const { Header, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      list: [
        {
          value: '点击这里可修改待办项！',
          completed: false,
        },
        {
          value: '做家务',
          completed: true,
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
  /* 监听键盘按下enter */
  handleAdd = () => {
    const { inputValue } = this.state
    if (!inputValue) {
      return message.warning('添加的待办项不能为空！', 0.1);
    }
    this.setState(
      {
        list: [...this.state.list, { value: inputValue, completed: false }],
        inputValue: '',
      },
      () => {
        this.saveList(this.state.list)
        message.success('添加成功！', 0.1);
      }
    )

  }
  /* 删除todoitem */
  handleDel = (index) => {
    let { list } = this.state
    list.splice(index, 1)
    this.setState(
      {
        list,
      },
      () => {
        this.saveList(list)
        message.success('删除成功！', 0.1)
      }

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
    if (value) {
      list[index].value = value
    } else {
      message.warning('修改失败，刷新后重试！', 2)
    }
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
      <Layout>
        <Header>
          <div className="header_wrap">
            <div className="header_title">ToDoList</div>
            <Input
              placeholder="添加ToDo 按enter确认"
              value={this.state.inputValue}
              onChange={this.handleInputChange}
              onPressEnter={this.handleAdd}
              size="small"
            />
          </div>
        </Header>
        <Content>
          <List dataSource={this.state.list} renderItem={(item, index) => (
            <List.Item>
              <TodoItem
                content={item.value}
                checked={item.completed}
                key={index}
                index={index}
                handleCheckChange={this.handleCheckChange}
                handleDel={this.handleDel}
                handleEdit={this.handleEdit}
              />
            </List.Item>
          )}>
          </List>
        </Content>
      </Layout>
    )
  }
}

export default App
