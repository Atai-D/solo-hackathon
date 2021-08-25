import "./App.css";
import Routes from "./Routes/Routes";
import Footer from "./components/Footer/Footer";
import "./components/Footer/Footer.css";

function App() {
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
