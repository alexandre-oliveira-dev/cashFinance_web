import Title from "../../components/title";
import {useContext} from "react";
import {List} from "../../components/list";
import Movimentation from "../../components/movimentation";
import {formater} from "../../common/priceFormater";
import {DatePicker} from "antd";
import {AuthContext} from "../../auth.context";
import "./style.css";
import dayjs from "dayjs";

function Home() {
  const {setOpen, saldo, setDate} = useContext(AuthContext);
  return (
    <div className="container">
      <div className="boxSaldo">
        <Title
          text={"Saldo atual"}
          style={{fontSize: 15, fontWeight: "normal", color: "#fff"}}
        ></Title>
        <Title
          text={formater({price: saldo})}
          style={{fontSize: 35, fontWeight: "bold", color: "#fff"}}
        ></Title>
      </div>
      <Movimentation></Movimentation>
      <DatePicker
        style={{width: "100%", marginTop: "20px"}}
        //value={date || undefined}
        onChange={e => {
          setDate(dayjs(e).format("DD/MM/YYYY"));
          setOpen(false);
        }}
      ></DatePicker>
      <div
        style={{
          marginTop: 30,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <List></List>
      </div>
    </div>
  );
}

export default Home;
