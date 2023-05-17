import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DataChallengeDetail from "./pages/DataChallengeDetail";
import MyDataChallenges from "./pages/MyDataChallenges";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route exact path="" element={<Home />} />
                <Route exact path="login" element={<Login />} />
                <Route exact path="signup" element={<Signup />} />
                <Route
                    exact
                    path="data-challenges"
                    element={<MyDataChallenges />}
                />
                <Route
                    exact
                    path="data-challenges/:id"
                    element={<DataChallengeDetail />}
                />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </Router>
    );
}

export default App;
