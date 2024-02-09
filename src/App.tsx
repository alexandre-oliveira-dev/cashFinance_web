import {BrowserRouter} from "react-router-dom";
import "./App.css";
import RouterApp from "./router";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import {AuthProvider} from "./auth.context";
import NavBar from "./components/navbar";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RouterApp></RouterApp>
        <ToastContainer></ToastContainer>
        <NavBar></NavBar>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
