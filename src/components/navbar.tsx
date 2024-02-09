import {signOut} from "firebase/auth";
import {auth} from "../service/firebaseConnection";
import {Button, Image} from "antd";
import {toast} from "react-toastify";
import "./style.css";

export default function NavBar() {
  const buttons = [
    {
      key: "inicio",
      title: "Inicio",
      function: () => (window.location.href = "/"),
      icon: (
        <Image
          preview={false}
          src={
            "https://img.icons8.com/fluency-systems-regular/25/ffffff/home--v1.png"
          }
        ></Image>
      ),
    },
    {
      key: "realeases",
      title: "Lançamentos",
      function: () => (window.location.href = "/realeases"),
      icon: (
        <Image
          preview={false}
          src={"https://img.icons8.com/sf-regular-filled/25/ffffff/list.png"}
        ></Image>
      ),
    },
    {
      key: "sair",
      title: "",
      function: async () => {
        await signOut(auth)
          .then(() => {
            localStorage.removeItem("@currentSession");
            toast.success("Saindo ...");
          })
          .catch(err => console.log(err));
      },
      icon: (
        <Image
          preview={false}
          src={"https://img.icons8.com/ios/25/ffffff/exit--v1.png"}
        ></Image>
      ),
    },
  ];

  return (
    <div
      style={{
        background: "#612F74",
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 10,
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {buttons.map(i => {
        return (
          <Button
            style={{background: "none", border: 0}}
            onClick={() => i?.function()}
            key={i.key}
          >
            {i.icon}
          </Button>
        );
      })}
    </div>
  );
}
