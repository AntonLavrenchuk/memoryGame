import React, {useState} from "react";
import "./style.css";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Game from "./components/Game";
/*
Выбор размера поля.
Начальная расстановка карт выполняется компьютером.
У каждого пользователя игры есть свой логин и пароль для входа.
Звуковое сопровождение игры:
  • если карты совпали, звучит один звук;
  • если карты не совпали, звучит другой звук.
Статистика:
  • время игры;
  • количество переворотов карт.
Выбор стилевого оформления игры:
  • темная тема;
  • светлая тема.
Таблица рекордов.
*/

export default function App() {
  const [isDark, changeTheme] = useState(false);

  const handler = function(e) {
    changeTheme(!isDark);
  }
  return (
    <div className="mainDiv" style={{ backgroundColor: (isDark ? "#323639" : "white"), color: (isDark ? "white" : "black"), height: "100%" }}>

    <button onClick={handler}>Change Theme</button>
      <Router>
        <div>
          <nav>
            <Link to="/Register">Register</Link>
            <Link to="/Play3x4">3 x 4</Link>
            <Link to="/Play4x5">4 x 5</Link>
            <Link to="/">Login</Link>
          </nav>
          <Switch>
            <Route path="/Register">
              <Register />
            </Route>
            <Route path="/Play4x5">
              <Game x={5} y={4}/>
            </Route>
            <Route path="/Play3x4">
              <Game x={4} y={3}/>
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
