// import "./App.css";
import Footer from "./components/helpers/Footer/Footer";
import Header from "./components/helpers/Header/Header";
import LandingPage from "./components/screens/LandingPage";
import { BrowserRouter, Route } from "react-router-dom";
import MyNotes from "./components/MyNotes/MyNotes";
import LoginScreen from "./components/screens/LoginPage/LoginScreen";
import RegisterPage from "./components/screens/RegisterPage/RegisterPage";
import CreateNote from "./components/screens/CreateNote/CreateNote";
import SingleNote from "./components/screens/SingleNote/SingleNote";
import { useState } from "react";
import ProfilePage from "./components/screens/ProfilePage/ProfilePage";
// import BasicLeaflet from "./components/Leaflet/BasicLeaflet";
// import Mapp from "./components/Leaflet/Mapp";
// import Random from "./components/Random_V1";
// import Tag from "./components/Tag_V1";
function App() {
  const [search, setSearch] = useState("");
  // console.log(search, "cek search func");
  return (
    <BrowserRouter basename='/'>
      <Header setSearch={setSearch} />
      <main>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/createnote" component={CreateNote} />
        <Route exact path="/note/:id" component={SingleNote} />
        <Route path="/mynotes" component={() => <MyNotes search={search} />} />
      </main>
      {/* <Footer /> */}
      {/* <h1> Random GIF Application</h1> */}
      {/* <div className="main-container">
        <Random />
        <Tag />
      </div> */}
      {/* <BasicLeaflet /> */}
      {/* <Mapp /> */}
    </BrowserRouter>
  );
}

export default App;
