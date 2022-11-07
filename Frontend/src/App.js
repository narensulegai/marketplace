import React from "react";
import "./App.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import EmployeeMain from "./components/EmployeeMain";
import CompanyMain from "./components/CompanyMain";
import Logout from "./components/Logout";
import { BuyerLanding } from "./components/BuyerLanding";

function App() {
  // useEffect(() => {
  //   window.addEventListener('hashchange', (event) => {
  //     console.log(event);
  //   });
  //   return () => {
  //   };
  // }, []);
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/buyer/:id" exact component={BuyerLanding} />

        <Route path="/company">
          <CompanyMain />
        </Route>
        <Route path="/buyer/:id">
          <EmployeeMain />
        </Route>
        <Route path="/companySignup" exact>
          <Signup type="company" />
        </Route>
        <Route path="/buyerSignup" exact>
          <Signup type="employee" />
        </Route>
        <Route path="/logout" exact>
          <Logout />
        </Route>
      </Switch>
    </HashRouter>
  );
}

App.propTypes = {};
export default App;
