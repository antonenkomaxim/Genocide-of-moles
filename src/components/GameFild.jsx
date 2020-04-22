import React from 'react';
import { connect } from "react-redux";




class GameFild extends React.Component {

  constructor() {
    super();
    this.state = {
      score: 0,
      failed: 0,
      lvl: 1,
      molesLifetime: 4000,
      cards: (new Array(6)).fill("hole")
    };
  }


  //создаем игровые плитки
  createMosaic = () => {
    let holes = [];
    for (let i = 0; i < 6; i++) {
      holes.push(<div
        className={this.state.cards[i]}
        id={i}
        key={i}
        onClick={this.onMosaicClick}>
      </div>);
    }
    return holes;
  }

  //создаем поле Победа
  сreateWinMosaic = () => {
    //стопим интервал чтоб он не перезапускал игру
    clearInterval(this.state.interval);
    return (
      <div className="game-over"><h1>Победа!</h1></div>
    );
  }

  //создаем поле GameOver
  createGameOverMosaic = () => {
    //стопим интервал чтоб он не перезапускал игру
    clearInterval(this.state.interval);
    return (
      <div className="game-over"><h1>Конец игры!</h1></div>
    );
  }

  //увеличиваем лвл и уменьшаем время хода кажые 10 очков
  lvlUp = () => {
    let newLvl = Math.floor((10 + this.state.score) / 10);
    let newMolesLifetime = 4000;
    this.props.onAddLvl(newLvl);
    this.setState({ lvl: newLvl });
    if (newLvl > 1) {
      newMolesLifetime -= (newLvl * 350) - 350;
    }
    this.props.onAddTime(newMolesLifetime);
    this.setState({ molesLifetime: newMolesLifetime });
  }

  //затераем крота и рисуем в новом месте
  setRandomHole = () => {
    let random = Math.floor(Math.random() * 6);
    let newCards = [...this.state.cards];
    for (let i = 0; i < newCards.length; i++) {
      newCards[i] = "hole";
    }
    newCards[random] = "hole active";
    this.setState({
      cards: newCards
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setRandomHole();
      let interval = setInterval(() => {
        //увеличиваем количччество ошибок если проспали
        let newFailes = this.state.failed;
        ++newFailes;
        this.props.onAddFail(newFailes);
        this.setState({ failed: newFailes });
        this.setRandomHole();
      }, 4000);
      this.setState({ interval: interval });
    }, 200);
  }


  //назначаем класс active другому <div>
  onMosaicClick = () => {
    let newScore = this.state.score;
    let newFailes = this.state.failed;
    clearInterval(this.state.interval);
    //останавливаем игру на 40 мс и затераем крота
    setTimeout(() => {
      let newCards = [...this.state.cards];
      for (let i = 0; i < newCards.length; i++) {
        newCards[i] = "hole";
      }
      this.setState({
        cards: newCards
      });

      //перекрашиваем <div> в цвет по умолчанию
      for (let i = 0; i < 6; i++) {
        let elem = document.getElementById(i);

        elem.style.backgroundColor = "rgb(240, 162, 73)";
      }

      //с задержкой в 20мс запускаем новый интервал
      setTimeout(() => {
        this.setRandomHole();
        let interval = setInterval(() => {
          //увеличиваем количччество ошибок если проспали
          let newFailes = this.state.failed;
          ++newFailes;
          this.props.onAddFail(newFailes);
          this.setState({ failed: newFailes });
          this.setRandomHole();
        }, this.state.molesLifetime);
        this.setState({ interval: interval });

      }, 200);
    }, 400);

    //Считаем ошибки и очки
    if (event.target.className === "hole active") {
      ++newScore;
      event.target.style.backgroundColor = "forestgreen";
      this.props.onAddScore(newScore);
      this.setState({ score: newScore });
    } else {
      ++newFailes;
      event.target.style.backgroundColor = "maroon";
      this.props.onAddFail(newFailes);
      this.setState({ failed: newFailes });
    }
    this.lvlUp();
  }

  //игра в процессе ли окончена
  gameStatus = () => {
    if (this.state.score === 100) {
      return this.сreateWinMosaic();
    }

    return (
      this.state.failed >= 3 ? this.createGameOverMosaic() : this.createMosaic()
    )
  }


  render() {
    return (
      <div className="start">
        {this.gameStatus()}
      </div>
    );
  }
};


export default connect(
  state => ({
    points: state.points,
    fails: state.fails,
    lvl: state.lvl,
    time: state.time
  }),
  dispatch => ({
    onAddScore: (points) => {
      dispatch({ type: "ADD_SCORE", payload: { points: points } })
    },
    onAddFail: (fails) => {
      dispatch({ type: "ADD_FAIL", payload: { fails: fails } })
    },
    onAddLvl: (lvl) => {
      dispatch({ type: "ADD_LVL", payload: { lvl: lvl } })
    },
    onAddTime: (time) => {
      dispatch({ type: "ADD_TIME", payload: { time: time } })
    }
  })
)(GameFild);
