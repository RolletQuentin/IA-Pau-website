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
import NavbarOffset from "./components/NavbarOffset";
import Invitations from "./pages/Invitations.js/Index";

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
                <NavbarOffset/>
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
                            element={
                                <DataChallengeDetail />
                            }
                        />
                        <Route
                            exact
                            path={routes.myDataChallenges}
                            element={
                                user && (user.role == "Etudiant" || user.role == "Gestionnaire")?(
                                    <MyDataChallenges />
                                ) : ( <Navigate to={routes.login}/>)  
                        }
                        />
                        <Route
                            exact
                            path={`${routes.myDataChallenges}/:id_equipe/:id_project`}
                            element={
                                user && (user.role == "Etudiant" || user.role == "Gestionnaire")?(
                                    <DataChallengeRendu/>
                                ) :( <Navigate to={routes.login}/>)
                                }
                        />
                        <Route
                            exact
                            path={`${routes.teamView}/:id_team`}
                            element={
                                user && (user.role == "Etudiant" || user.role == "Administrateur")?
                                (<TeamView/>
                                ):( <Navigate to={routes.login}/>)
                            
                            }
                        />
                        <Route
                            exact
                            path={`${routes.MCQ}/:id_MCQ/:id_question`}
                            element={
                                user?
                                (<MCQ/>
                                ):( <Navigate to={routes.login}/>)
                            }
                        />
                        <Route
                            exact
                            path={`${routes.evaluateMCQ}/:id_MCQ/:id_team`}
                            element={
                            user && (user.role == "Administrateur" || user.role == "Gestionnaire")?
                                (<EvaluateMCQ />
                                ):( <Navigate to={routes.login}/>)
                            }
                        />
                        <Route
                            exact
                            path={`${routes.dataChallenge}/edit/:id_data_challenge`}
                            element={
                                user && (user.role == "Administrateur" || user.role == "Gestionnaire")?
                                (<DataChallengeEdition />
                                ):( <Navigate to={routes.login}/>)
                            }
                                
                        />
                        <Route exact path={routes.admin} element={<Admin />} />
                        <Route
                            exact
                            path={routes.adminUsers}
                            element={
                                user && (user.role == "Administrateur")?
                                (<AdminUsers />) : (<Navigate to={routes.login}/>)
                            }
                        />{" "}
                        <Route
                            exact
                            path={routes.adminDataChallenges}
                            element={
                                user && (user.role == "Administrateur")?
                                (<AdminDataChallenges/>
                                ):(<Navigate to={routes.login}/>)
                            }
                        />{" "}
                        <Route
                            exact
                            path={routes.adminRessources}
                            element={
                                user && (user.role == "Administrateur")?
                                (<AdminRessources />
                                ):(<Navigate to={routes.login}/>)
                        }
                        />
                        <Route
                            exact
                            path={routes.addUser}
                            element={
                                user && (user.role == "Administrateur")?
                                (<AdminAddUser/>
                                ):(<Navigate to={routes.login}/>) 
                        }
                        />
                        <Route
                            exact
                            path={routes.addUser + "/:id"}
                            element={<AdminAddUser />}
                        />
                        <Route
                            exact
                            path={routes.modifyRessource}
                            element={
                                user && (user.role == "Administrateur" || user.role == "Gestionnaire")?
                                (<AdminModifyRessource/>
                                ):(<Navigate to={routes.login}/>) 
                            }
                        />
                        <Route
                            exact
                            path={routes.modifyRessource + `/:id`}
                            element={
                            
                                user && (user.role == "Administrateur" || user.role == "Gestionnaire")?
                                (<AdminModifyRessource/>
                                ):(<Navigate to={routes.login}/>) 
                        }
                        />
                        <Route
                            exact
                            path={routes.modifyDataChallenge}
                            element={
                            
                                user && (user.role == "Administrateur")?
                                (<AdminModifyDataChallenge/>
                                ):(<Navigate to={routes.login}/>) 
                            
                            }
                        />
                        <Route
                            exact
                            path={routes.modifyDataChallenge + `/:id`}
                            element={
                                user && (user.role == "Administrateur")?
                                (<AdminModifyDataChallenge/>
                                ):(<Navigate to={routes.login}/>) 
                            }
                        />
                        <Route
                            exact
                            path={routes.analyseur}
                            element={
                            <Analyseur />
                           }
                        />
                        <Route
                            exact
                            path={routes.modifyProject + `/:idEvent`}
                            element={
                                user && (user.role == "Administrateur")?
                                (<AdminModifyProject />
                                ):(<Navigate to={routes.login}/>) 
                            
                        }
                        />
                        <Route
                            exact
                            path={routes.modifyProject + `/:idEvent/:idProject`}
                            element={
                                user && (user.role == "Administrateur")?
                                (<AdminModifyProject />
                                ):(<Navigate to={routes.login}/>)
                        }
                        />
                        <Route
                            exact
                            path={routes.modifyUser}
                            element={
                                user && (user.role == "Administrateur")?
                                (<AdminModifyUser />
                                ):(<Navigate to={routes.login}/>)
                            }
                        />
                        <Route
                            exact
                            path={routes.modifyUser + `/:id`}
                            element={
                                user && (user.role == "Administrateur")?
                                (<AdminModifyUser />
                                ):(<Navigate to={routes.login}/>)
                            }
                        />
                        <Route
                            exact
                            path={routes.addGestionnaire + `/:id_event`}
                            element={
                                user && (user.role == "Administrateur")?
                                (<AdminAddGestionnaire />
                                ):(<Navigate to={routes.login}/>)
                            }
                        />
                        <Route
                            exact
                            path={routes.invitations}
                            element={!user ? <Navigate to={routes.login}/> : ( user.role === "Etudiant" ? <Invitations /> : <Navigate to={routes.home}/>)}
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
