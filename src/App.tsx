import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import MyList from "./components/MyList";
import TodosContextProvider from "./context/TodosContext";
import constants from "./models/constants";

import classes from "./styles.module.css";
const routes = {
  home: '/',
  myList: '/mylist'
}

enum Routes {
  home = '/',
  myList ='/mylist'
}

const myRoute: Routes = Routes.home

const App: React.FC = () => {
  return (
    <div className="App">
  
      <div className={classes.navbarContainer}>
      <Link to={Routes.home} className={classes.navbarLink}>Dashboard</Link>
      <Link to={Routes.myList} className={classes.navbarLink}>MyList</Link>
      </div>
      <TodosContextProvider>
        
        <Switch>
          <Route exact path={Routes.home}>
            <Dashboard />
          </Route>

          <Route exact path={Routes.myList}>
            <MyList />
          </Route>
        </Switch>
        
      </TodosContextProvider>


    </div>
  );
};

export default App;
