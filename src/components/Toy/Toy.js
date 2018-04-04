import React, { Component } from "react";
import { DragSource } from "react-dnd";
import "./Toy.css";

const Types = {
  ITEM: 'toy'
};

const itemSource = {
  beginDrag(props) {
    const item = { toy: props.toy, id: props.id };
    return item;
  },
  endDrag(props, monitor, component) {
    const element = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      const item = { ...props.toy, id: props.id }
      return props.handleDropToy(item);
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Toy extends Component {
  render() {
    const { isDragging, connectDragSource } = this.props;
    const { toy } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    return connectDragSource(
      <div className="Toy" style={{ opacity }}>
        <h1>{toy.item}</h1>
      </div>
    );
  }
}

export default DragSource(Types.ITEM, itemSource, collect)(Toy);
