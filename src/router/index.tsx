import {Route, Routes} from "react-router-dom";
import Home from "../pages/home";
import Singup from "../pages/singup";
import Singin from "../pages/singin";
import Realeases from "../pages/realeases";

export default function RouterApp() {
  return (
    <Routes>
      <Route Component={Home} path="/"></Route>
      <Route Component={Singup} path="/Singup"></Route>
      <Route Component={Singin} path="/Singin"></Route>
      <Route Component={Realeases} path="/realeases"></Route>
    </Routes>
  );
}
