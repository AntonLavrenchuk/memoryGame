import React from "react";
import "./../style.css";
import getImages from './Images';

import soundEqual from '../sounds/equal.mp3';
import soundNotEqual from '../sounds/notEqual.mp3';
import Timer from "./Timer";

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      field: [],
      moves: 0,
    };
    this.upturned     = 0;
    this.currentCells = [];
    this.field        = [];
    this.soundNotEqual= new Audio(soundNotEqual);
    this.soundEqual   = new Audio(soundEqual);
  }
  componentDidMount() {
    this.fillField();
  }

  isEqual(x1, y1, x2, y2) {
    return this.field[y1][x1].imgNum === this.field[y2][x2].imgNum;
  }

  fillField() {
    var tempField = [];
    for(let i = 2; i < this.props.x * this.props.y + 2; ++i) {
      tempField.push({ state: "hidden", imgNum: Math.floor(i / 2), img: getImages()[0] });
    }

    var shuffle = require('shuffle-array');

    shuffle(tempField);

    for (let y = 0; y < this.props.y; y++) {
      this.field.push([]);
      for (let x = 0; x < this.props.x; x++) {
        this.field[y].push(tempField[ y * this.props.x + x ]);
      }
    }
    
    this.setState({ field: this.field });
  }

  handleClick(x, y) {
    if (this.field[y][x].state === "hidden") {
      this.addCurrentCell(x, y);
    }
  }

  addCurrentCell(x, y) {
    if (this.currentCells.length < 2) {
      this.upturnCell(x, y);
      this.currentCells.push({ x: x, y: y });
    } else {
      if (
        !this.isEqual(
          this.currentCells[0].x,
          this.currentCells[0].y,
          this.currentCells[1].x,
          this.currentCells[1].y
        )
      ) {
        this.hideCurrentCells();
      }
      this.currentCells = [];
    }
    if (this.currentCells.length == 2) {
      this.setState({ moves: this.state.moves + 1 });
      if (
        this.isEqual(
          this.currentCells[0].x,
          this.currentCells[0].y,
          this.currentCells[1].x,
          this.currentCells[1].y
          ) 
          ) {
            this.soundEqual.play();
            this.upturned += 2;
          } else {
            this.soundNotEqual.play();
          }
    }
  }

  hideCell(x, y) {
    this.field[y][x].state = "hidden";
    this.field[y][x].img = getImages()[0];
    this.setState({ field: this.field });
  }

  upturnCell(x, y) {
    this.field[y][x].state = "upturned";
    this.field[y][x].img = getImages()[this.field[y][x].imgNum];
    this.setState({ field: this.field });
  }

  hideCurrentCells() {
    for (let i = 0; i < 2; ++i) {
      this.hideCell(
        this.currentCells[i].x,
        this.currentCells[i].y,
      );
    }
  }

  render() {
    return (
      <>
      <div className="start" onClick={()=>{window.location.reload()}}>
        Start
      </div>
      <Timer isStop={this.upturned >= this.props.x * this.props.y}/>
        <h2>Moves: {this.state.moves}</h2>
        <div style={{ display: "inline-block" }}>
          {this.state.field.map((arr, y) => {
            return (
              <div key={y}>
                {arr.map((el, x) => {
                  return (
                    <div
                      className={el.state}
                      onClick={() => {
                        this.handleClick(x, y);
                      }}
                      style={{backgroundImage: `url("${el.img}")`}}
                      key={y * this.props.x + x}
                    >
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
