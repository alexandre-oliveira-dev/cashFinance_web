import {useContext} from "react";
import dayjs from "dayjs";
import {AuthContext} from "../auth.context";
import {DatePicker} from "antd";

export default function SelectMonth() {
  const {open, setOpen, setDate, date} = useContext(AuthContext);
  return (
    <div
      style={{
        flex: 1,
        display: !open ? "none" : "flex",
        flexDirection: "row",
        justifyContent: "center",
        zIndex: 100,
        width: "100%",
        height: "100%",
        alignItems: "center",
        position: "absolute",
      }}
    >
      <div
        onPointerDown={() => setOpen(false)}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      ></div>
      <div style={{width: "100%"}}>
        <DatePicker
          style={{width: "100%"}}
          //value={date || undefined}
          onChange={e => {
            setDate(dayjs(e).format("DD/MM/YYYY"));
            setOpen(false);
          }}
        ></DatePicker>
      </div>
    </div>
  );
}
