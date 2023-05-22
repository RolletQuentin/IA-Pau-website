import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DataChallengeDetail from "./pages/DataChallengeDetail";
import MyDataChallenges from "./pages/MyDataChallenges";
import DataChallengeRendu from "./pages/DataChallengeRendu";
import TeamView from "./pages/TeamView";
import Profile from "./pages/Profile";
import MCQ from "./pages/MCQ";
import EvaluateMCQ from "./pages/EvaluateMCQ";
import DataChallengeEdition from "./pages/DataChallengeEdition";
import Admin from "./pages/Admin";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route exact path="" element={<Home />} />

                <Route exact path="login" element={<Login />} />
                <Route exact path="signup" element={<Signup />} />

                <Route exact path="profile/:id_profile" element={<Profile />} />

                <Route
                    exact
                    path="data-challenges/:id"
                    element={<DataChallengeDetail />}
                />
                <Route
                    exact
                    path="my-data-challenges"
                    element={<MyDataChallenges />}
                />
                <Route
                    exact
                    path="my-data-challenges/:id_equipe/:id_data_challenge"
                    element={<DataChallengeRendu />}
                />

                <Route exact path="team-view/:id_team" element={<TeamView />} />

                <Route
                    exact
                    path="MCQ/:id_MCQ/:id_question"
                    element={<MCQ />}
                />
                <Route
                    exact
                    path="evaluate_MCQ/:id_MCQ/:id_team"
                    element={<EvaluateMCQ />}
                />

                <Route
                    exact
                    path="data-challenges/edit/:id_data_challenge"
                    element={<DataChallengeEdition />}
                />

                <Route exact path="admin" element={<Admin />} />

                <Route path="*" element={<Error404 />} />
            </Routes>
        </Router>
    );
}

export default App;
