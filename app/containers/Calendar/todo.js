import React, { Component } from 'react';
//import "./todo.css"

export class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.setState({
      items: this.state.items.concat({
        id: this.state.items.length,
        name: this.state.value,
        done: false,
      }),
      value: '',
    });
    this.textInput.value = '';
    var date = this.props.value.getDate() + "" + (this.props.value.getMonth() + 1) + "" + this.props.value.getFullYear();
    localStorage.setItem(
      date,
      JSON.stringify(this.state.items),
    );
    console.log(this.state.items);
    event.preventDefault();
  }

  componentDidMount() {
    var date = this.props.value.getDate() + "" + (this.props.value.getMonth() + 1) + "" + this.props.value.getFullYear();
    console.log(date);
    var toDos = JSON.parse(localStorage.getItem(date));
    console.log(toDos);
    this.setState({
      items: toDos ? toDos : [],
    });
    console.log('component');
  }

  componentWillReceiveProps(newProps) {
    var date = newProps.value.getDate() + "" + (newProps.value.getMonth() + 1) + "" + newProps.value.getFullYear();
    var toDos = JSON.parse(localStorage.getItem(date));
    console.log(toDos);
    this.setState({
      items: toDos ? toDos : [],
    });
  }

  // completeCheck() {
  //     var itemList = document.querySelectorAll("#list > button");
  //     for (var i = 0; i < itemList.length; i++) {
  //         itemList[i].style.border = "1px solid #66ff33";
  //     }
  //     console.log(itemList[0]);
  // }

  render() {
    return (
      <div className="mainWrap">
        <div className="header">
          <p>{this.props.value.toString()}</p>
          <ul>
            {this.state.items ? this.state.items.map(item => (
              <li id="list" key={item.id}>
                <button onClick={this.completeCheck}>{item.name}</button>
              </li>
            )) : <div></div>}
          </ul>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Today's Task"
              onChange={this.handleChange}
              ref={input => (this.textInput = input)}
            />
            <button type="submit" disabled={!this.state.value}>
              {' '}
              Add Task{' '}
            </button>
          </form>
        </div>
      </div>
    );
  }
}
