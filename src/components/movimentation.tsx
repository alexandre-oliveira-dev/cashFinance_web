import Title from "./title";
import {useContext} from "react";
import {formater} from "../common/priceFormater";
import {AuthContext} from "../auth.context";
import "./style.css";

export default function Movimentation() {
  const {saida, entrada} = useContext(AuthContext);

  return (
    <div style={{width: "100%"}}>
      <div className="containerMovimentation">
        <div className="box">
          <Title
            text={"Entradas"}
            style={{
              color: "#612F74",
              margin: 10,
              fontSize: 20,
              fontWeight: "bold",
            }}
          ></Title>
          <span className="textSaldo">{formater({price: entrada})}</span>
        </div>
        <div className="box">
          <Title
            text={"Saídas"}
            style={{
              color: "#bb0b0b",
              margin: 10,
              fontSize: 20,
              fontWeight: "bold",
            }}
          ></Title>

          <span className="textSaldo">{formater({price: saida})}</span>
        </div>
      </div>
    </div>
  );
}
