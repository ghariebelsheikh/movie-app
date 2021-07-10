import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.module.scss";
import FavoriteList from "./containers/FavoriteList/FavoriteList";
import Header from "./components/Header/Header";
import MovieList from "./containers/MovieList/MovieList";
import { MoviesContextProvider } from "./contexts/MoviesContext";

function App() {
  return (
    <MoviesContextProvider>
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <Switch>
            <Route
              exact
              path={"/"}
              render={() => {
                return <Redirect to="/movies" />;
              }}
            />
            <Route exact path={"/movies"} component={MovieList} />
            <Route exact path={"/favorites"} component={FavoriteList} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    </MoviesContextProvider>
  );
}

export default App;
