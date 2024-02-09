import Title from "../../components/title";
import {useContext, useState} from "react";
import SelectMonth from "../../components/selectMonth";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../service/firebaseConnection";
import {AuthContext} from "../../auth.context";
import {toast} from "react-toastify";
import {Button, DatePicker, Input} from "antd";
import "./style.css";
import dayjs from "dayjs";

export default function Realeases() {
  const [realeaseType, setRealeaseType] = useState(false);
  const [desc, setDesc] = useState("");
  const [value, setValue] = useState("");
  const {setOpen, data, date, setDate} = useContext(AuthContext);

  async function HandleCreateRealease() {
    if (!desc || !value || !date)
      return toast.info("Preencha todos os campos!");

    await addDoc(collection(db, "lancamentos"), {
      uid: Math.random() * 100,
      userEmail: data?.email,
      desc,
      value: Number(value) / 100,
      date,
      type: realeaseType ? "saida" : "entrada",
    })
      .then(() => {
        setDesc("");
        setValue("");
        setDate("");
        toast.success("Lançamento registrado com sucesso!");
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#121212",
        justifyContent: "center",
      }}
    >
      <Title
        text={"O que você precisa lançar hoje?"}
        style={{
          color: "#fff",
          fontSize: 25,
          fontWeight: "bolder",
        }}
      ></Title>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 20,
        }}
      >
        <input
          type="range"
          //value={realeaseType}
          onChange={e => setRealeaseType(Boolean(e.target.value))}
        ></input>
        {realeaseType ? (
          <Title
            text={"Saida"}
            style={{
              color: "red",
              padding: 5,
              backgroundColor: "#f4796b",
              fontSize: 15,
              fontWeight: "bold",
              transition: "0.3s ease-in",
              borderRadius: 5,
            }}
          ></Title>
        ) : (
          <Title
            text={"Entrada"}
            style={{
              color: "green",
              padding: 5,
              background: "#0afb3a",
              fontSize: 15,
              fontWeight: "bold",
              transition: "0.3s ease-in",
              borderRadius: 5,
            }}
          ></Title>
        )}
      </div>

      <div
        style={{
          width: "100%",
          padding: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
        }}
      >
        <Title text={"Descrição"} style={{fontSize: 17, color: "#fff"}}></Title>
        <Input
          value={desc}
          onChange={e => setDesc(e.target.value)}
          className="input"
          placeholder="Digite aqui"
        ></Input>
        <Title text={"Valor R$"} style={{fontSize: 17, color: "#fff"}}></Title>
        {/*  <MaskInput
          value={value}
          mask={moneyMask}
          style={styles.input}
          placeholder={"R$"}
          onChange={(_masked, unmasked) => setValue(unmasked)}
        ></MaskInput> */}
        <Title text={"Data"} style={{fontSize: 17, color: "#fff"}}></Title>
        <DatePicker
          style={{width: "100%", marginTop: "20px"}}
          //value={date || undefined}
          onChange={e => {
            setDate(dayjs(e).format("DD/MM/YYYY"));
            setOpen(false);
          }}
        ></DatePicker>

        <Button
          style={{
            width: "100%",
            height: 30,
            backgroundColor: "#612F74",
            border: 0,
          }}
          onClick={HandleCreateRealease}
        >
          <Title text={"Salvar"} style={{fontSize: 17, color: "#fff"}}></Title>
        </Button>
      </div>
      <SelectMonth></SelectMonth>
    </div>
  );
}
