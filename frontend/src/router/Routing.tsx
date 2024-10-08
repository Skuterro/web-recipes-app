import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./Scroll";

import { HomePage } from "../pages/HomePage";
import { RecipesPage } from "../pages/RecipesPage";

export const Routing = () => {
  return (
		<Router>
			<ScrollToTop/>
			<Routes>
				<Route path="/" Component={HomePage}/>
				<Route path="/recipes" Component={RecipesPage}/>
			</Routes>
		</Router>
  );
};