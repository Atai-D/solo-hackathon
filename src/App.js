import { useEffect } from "react";
import "./App.css";
// import { useAutho } from "./contexts/AuthorizationContext";
import Routes from "./Routes/Routes";
import Footer from "./components/Footer/Footer";
import "./components/Footer/Footer.css";

function App() {
    // const { logged, changeLoggedUser } = useAutho();

    // useEffect(() => {
    //     let user = JSON.parse(localStorage.getItem("user"));
    //     if (user) {
    //         changeLoggedUser(user);
    //     } else {
    //         changeLoggedUser({ ...logged, isLogged: false });
    //     }
    // }, []);

    return (
        <div className="page-container">
            <div className="content-wrap">
                <Routes />
            </div>
            <Footer />
        </div>
    );
}

export default App;
