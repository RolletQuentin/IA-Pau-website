import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import { useAuthContext } from "./hooks/auth/useAuthContext";
import routes from "./utils/routes";

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
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminDataChallenges from "./pages/Admin/AdminDataChallenges";
import AdminRessources from "./pages/Admin/AdminRessources";
import AdminAddUser from "./pages/Admin/AdminAddUser";
import AdminModifyRessource from "./pages/Admin/AdminModifyRessource";
import AdminModifyDataChallenge from "./pages/Admin/AdminModifyDataChallenge";
import AdminModifyProject from "./pages/Admin/AdminModifyProject";
import AdminModifyUser from "./pages/Admin/AdminModifyUser";
import Footer from "./components/Footer";
import Analyseur from "./pages/Analyseur/Index";
import AdminAddGestionnaire from "./pages/Admin/AdminAddGestionnaire";

function App() {
    const { user, ready } = useAuthContext();
    return (
        <Router>
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Header />
                {ready && (
                    <Routes>
                        <Route exact path={routes.home} element={<Home />} />
                        <Route
                            exact
                            path={routes.login}
                            element={
                                user ? <Navigate to={routes.home} /> : <Login />
                            }
                        />
                        <Route
                            exact
                            path={routes.signup}
                            element={
                                user ? (
                                    <Navigate to={routes.home} />
                                ) : (
                                    <Signup />
                                )
                            }
                        />
                        <Route
                            exact
                            path={`${routes.profile}/:id`}
                            element={
                                !user ? (
                                    <Navigate to={routes.login} />
                                ) : (
                                    <Profile />
                                )
                            }
                        />
                        <Route
                            exact
                            path={`${routes.dataChallenge}/:id`}
                            element={<DataChallengeDetail />}
                        />
                        <Route
                            exact
                            path={routes.myDataChallenges}
                            element={<MyDataChallenges />}
                        />
                        <Route
                            exact
                            path={`${routes.myDataChallenges}/:id_equipe/:id_project`}
                            element={<DataChallengeRendu />}
                        />
                        <Route
                            exact
                            path={`${routes.teamView}/:id_team`}
                            element={<TeamView />}
                        />
                        <Route
                            exact
                            path={`${routes.MCQ}/:id_MCQ/:id_question`}
                            element={<MCQ />}
                        />
                        <Route
                            exact
                            path={`${routes.evaluateMCQ}/:id_MCQ/:id_team`}
                            element={<EvaluateMCQ />}
                        />
                        <Route
                            exact
                            path={`${routes.dataChallenge}/edit/:id_data_challenge`}
                            element={<DataChallengeEdition />}
                        />
                        <Route exact path={routes.admin} element={<Admin />} />
                        <Route
                            exact
                            path={routes.adminUsers}
                            element={<AdminUsers />}
                        />{" "}
                        <Route
                            exact
                            path={routes.adminDataChallenges}
                            element={<AdminDataChallenges />}
                        />{" "}
                        <Route
                            exact
                            path={routes.adminRessources}
                            element={<AdminRessources />}
                        />
                        <Route
                            exact
                            path={routes.addUser}
                            element={<AdminAddUser />}
                        />
                        <Route
                            exact
                            path={routes.modifyRessource}
                            element={<AdminModifyRessource />}
                        />
                        <Route
                            exact
                            path={routes.modifyRessource + `/:id`}
                            element={<AdminModifyRessource />}
                        />
                        <Route
                            exact
                            path={routes.modifyDataChallenge}
                            element={<AdminModifyDataChallenge />}
                        />
                        <Route
                            exact
                            path={routes.modifyDataChallenge + `/:id`}
                            element={<AdminModifyDataChallenge />}
                        />
                        <Route
                            exact
                            path={routes.analyseur}
                            element={<Analyseur />}
                        />
                        <Route
                            exact
                            path={routes.modifyProject + `/:idEvent`}
                            element={<AdminModifyProject />}
                        />
                        <Route
                            exact
                            path={routes.modifyProject + `/:idEvent/:idProject`}
                            element={<AdminModifyProject />}
                        />
                        <Route
                            exact
                            path={routes.modifyUser}
                            element={<AdminModifyUser />}
                        />
                        <Route
                            exact
                            path={routes.modifyUser + `/:id`}
                            element={<AdminModifyUser />}
                        />
                        <Route
                            exact
                            path={routes.addGestionnaire + `/:id_event`}
                            element={<AdminAddGestionnaire />}
                        />
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                )}
                <Footer />
            </div>
        </Router>
    );
}

export default App;
