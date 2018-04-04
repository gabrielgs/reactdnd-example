import React, { Component } from "react";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

import Toy from "./components/Toy/Toy";
import Box from "./components/Box/Box";
import "./App.css";

class App extends Component {
  state = {
    toys: [
      { item: "Knite", answer: "correct" },
      { item: "Robot", answer: "incorrect" },
      { item: "Soccer", answer: "incorrect" },
      { item: "Trex", answer: "incorrect" }
    ],
    utensils: ["Fish", "Spoon", "Knife"],
    toysInBox: [],
    isCorrect: null
  };

  handleDropToy = item => {
    const currentState = this.state.toys;
    const newState = currentState.filter(toyName => {
      return toyName.item !== item.item;
    });

    /*const currentStateBox = this.state.toysInBox
    currentStateBox.push(toy)*/

    let answer = item.answer === "correct" ? "correct" : "incorrect";

    this.setState({
      toys: newState,
      //toysInBox: currentStateBox
      isCorrect: answer
    });
  };

  render() {
    const toys = this.state.toys.map((toy, index) => {
      return (
        <Toy
          toy={toy}
          id={index}
          key={index}
          handleDropToy={toy => this.handleDropToy(toy)}
        />
      );
    });
    return (
      <div className="App">
        <div>{toys}</div>
        <Box toys={this.state.toysInBox} isCorrect={this.state.isCorrect} />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
