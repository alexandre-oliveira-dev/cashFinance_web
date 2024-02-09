import {collection, onSnapshot} from "firebase/firestore";
import {useContext, useEffect, useState} from "react";
import {db} from "../service/firebaseConnection";
import {AuthContext} from "../auth.context";
import {Table} from "antd";

interface DataProps {
  date?: string; // A data original como string
  desc?: string; // A descrição
  type?: string; // O tipo
  uid?: string; // O identificador único
  userEmail?: string; // O e-mail do usuário
  value?: string; // O valor como string (você pode querer mudar para um tipo numérico dependendo da aplicação)
}

function List() {
  const [data, setData] = useState<DataProps[]>([]);
  const {
    data: userEmail,
    setEntrada,
    setSaida,
    setSaldo,
    date,
  } = useContext(AuthContext);
  useEffect(() => {
    async function loadPosts() {
      onSnapshot(collection(db, "lancamentos"), snapshot => {
        const listaPost: DataProps[] = [];

        snapshot.forEach(doc => {
          listaPost.push({
            date: String(doc.data().date),
            desc: String(doc.data().desc),
            type: String(doc.data().type),
            value: String(doc.data().value),
            userEmail: String(doc.data().userEmail),
          });
        });
        setData(listaPost);
      });
    }

    loadPosts();
  }, []);

  console.log(
    data.filter(
      item => item?.userEmail === userEmail?.email && item.date === date
    )
  );

  const entradaValue = data
    .filter(
      item =>
        item?.userEmail === userEmail?.email &&
        item?.type === "entrada" &&
        item.date === date
    )
    .reduce((prev, curr) => prev + (Number(curr.value) || 0), 0);
  setEntrada(entradaValue);
  const saidaValue = data
    .filter(
      item =>
        item?.userEmail === userEmail?.email &&
        item?.type === "saida" &&
        item.date === date
    )
    .reduce((prev, curr) => prev + (Number(curr.value) || 0), 0);
  setSaida(saidaValue);
  const saldo = entradaValue - saidaValue;
  setSaldo(saldo);

  return (
    <Table
      columns={[
        {
          title: "Data",
          dataIndex: "date",
        },
        {
          title: "Descrição",
          dataIndex: "desc",
        },
        {
          title: "Tipo",
          dataIndex: "type",
        },
        {
          title: "Valor",
          dataIndex: "value",
        },
      ]}
      style={{width: "100%"}}
      dataSource={data.filter(
        item => item?.userEmail === userEmail?.email && item.date === date
      )}
    ></Table>
  );
}

export {List};
