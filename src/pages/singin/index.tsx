import "../singup/style.css";
import {useContext, useState} from "react";
import Title from "../../components/title";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../service/firebaseConnection";
import {AuthContext} from "../../auth.context";
import {toast} from "react-toastify";
import {Button, Input} from "antd";

export default function Singin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const {setHasLogin} = useContext(AuthContext);

  async function HandleLoginSession({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    if (!email || !password) {
      toast.error("Preencha todos os campos!");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password).then(user => {
        localStorage.setItem(
          "@currentSession",
          JSON.stringify({
            uid: user?.user?.uid,
            email: user?.user.email,
          })
        );
        toast.success(`Seja bem vido(a) ${user.user.email}`);
        setHasLogin(true);
      });
    } catch (error) {
      toast.error("Email ou senha inválidos ou usuário não cadastrado");
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
          text={"Entrar"}
          style={{color: "#fff", fontSize: 20, fontWeight: "bold"}}
        ></Title>
      </Button>
      <Button onClick={() => (window.location.href = "Singup")}>
        <Title
          text={"Não possui cadastro?, cadastre-se"}
          style={{color: "#fff", fontSize: 15, fontWeight: "normal"}}
        ></Title>
      </Button>
    </div>
  );
}
