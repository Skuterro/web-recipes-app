import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./Scroll";

import { HomePage } from "../pages/HomePage";
import { RecipesPage } from "../pages/RecipesPage";
import { CreateRecipePage } from "../pages/CreateRecipePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage} from "../pages/RegisterPage"
import { UserProfile } from "../pages/UserProfile";

export const Routing = () => {
  return (
		<Router>
			<ScrollToTop/>
			<Routes>
				<Route path="/" Component={HomePage}/>
				<Route path="/recipes" Component={RecipesPage}/>
				<Route path="/recipes/create" Component={CreateRecipePage}/>
				<Route path="/login" Component={LoginPage}/>
				<Route path="/register" Component={RegisterPage}/>
				<Route path="profile" Component={UserProfile}/>
			</Routes>
		</Router>
  );
};