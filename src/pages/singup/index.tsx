import {useState} from "react";
import "./style.css";
import Title from "../../components/title";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../service/firebaseConnection";
import {toast} from "react-toastify";
import {Button, Input} from "antd";

export default function Singup() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function HandleLoginSession({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    if (!email || !password) {
      toast.info("Preencha todos os campos");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(() => {
        toast.success("Cadastrado com sucesso!");
        window.location.href = "Singin";
      });
    } catch (error) {
      toast.error("Tente novamente mais tarde");
    }
  }
  return (
    <div className="container-singup">
      <div style={{display: "flex", flexDirection: "row"}}>
        <Title
          text={"Cash"}
          style={{color: "#fff", fontSize: 40, fontWeight: "bold"}}
        ></Title>
        <Title
          text={"Finance"}
          style={{color: "#612F74", fontSize: 40, fontWeight: "bold"}}
        ></Title>
      </div>
      <Title
        text={"Seja bem vindo(a)"}
        style={{color: "#fff", fontSize: 15, fontWeight: "normal"}}
      ></Title>
      <Input
        onChange={e => {
          setEmail(e.target.value);
        }}
        className="input"
        placeholder="Digite seu email"
      ></Input>
      <Input
        onChange={e => {
          setSenha(e.target.value);
        }}
        className="input"
        placeholder="Digite sua senha "
      ></Input>
      <Button
        onClick={() => HandleLoginSession({email, password: senha})}
        className="btn"
      >
        <Title
          text={"Cadastrar"}
          style={{color: "#fff", fontSize: 20, fontWeight: "bold"}}
        ></Title>
      </Button>
      <Button onClick={() => (window.location.href = "Singin")}>
        <Title
          text={"Já possui cadastro?, Login"}
          style={{color: "#fff", fontSize: 15, fontWeight: "normal"}}
        ></Title>
      </Button>
    </div>
  );
}
