import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./Scroll";

import { HomePage } from "../pages/HomePage";
import { RecipesPage } from "../pages/RecipesPage";
import { CreateRecipePage } from "../pages/CreateRecipePage";

export const Routing = () => {
  return (
		<Router>
			<ScrollToTop/>
			<Routes>
				<Route path="/" Component={HomePage}/>
				<Route path="/recipes" Component={RecipesPage}/>
				<Route path="/recipes/create" Component={CreateRecipePage}/>
			</Routes>
		</Router>
  );
};