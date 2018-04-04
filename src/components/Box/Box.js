import React, { Component } from "react";
import { DropTarget } from "react-dnd";
import Toy from "../Toy/Toy";
import "./Box.css";

const Types = {
  ITEM: "toy"
};

/*const boxTarget = {
  drop(props, monitor) {
    props.handleDropToy(monitor.getItem())
  }
};*/

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class Box extends Component {
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = "white";
    let message = 'Drag a Toy Here'

    if (isActive) {
      backgroundColor = "darkgreen";
      message = 'Release to Drop'
    } else if (canDrop) {
      backgroundColor = "darkkhaki";
    }

    let border = {
      borderColor: 'gray'
    }

    if (this.props.isCorrect === 'correct') {
      border.borderColor = 'green'
      border.borderRadius = '50%'
      border.backgroundColor = 'green'
      message = 'Correct'
    } else if (this.props.isCorrect === 'incorrect') {
      border.borderColor = 'red'
      border.borderRadius = '50%'
      border.backgroundColor = 'red'
      message = 'Incorrect'
    }

    const toys =
      this.props.toys.length === 0
        ? ""
        : this.props.toys.map(toy => {
          return <Toy toy={toy} />;
        });

    return connectDropTarget(
      <div className="Box" style={{ backgroundColor, ...border }}>
        {message}
        {toys}
      </div>
    );
  }
}

export default DropTarget(Types.ITEM, {}, collect)(Box);
