import React from 'react';
import ReactDOM from 'react-dom';

const Board = React.createClass({
  render() {
    let className = 'board';
    if (this.props.selected) {
      className += ' selected';
    }
    return (
      <div className={className}>
        {this.props.index + 1}
      </div>
    );
  },
});

const BoardSwitcher = React.createClass({

  getInitialState() {
    return {
      clicks: 0,
    };
  },

  render() {
    const boards = [];
    for (let ii = 0; ii < this.props.numBoards; ii++) {
      const isSelected = ii === 0;
      boards.push(<Board index={ii} selected={isSelected} key={ii} />);
    }

    return (
      <div>
        <div className="boards">{boards}</div>
        <button onClick={this.theClick} >Toggle</button>
      </div>
    );
  },
});

ReactDOM.render(
  <BoardSwitcher numBoards={3} />,
  document.getElementById('container'),
);
