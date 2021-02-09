import "./App.scss";
import { Container } from "react-bootstrap";
import ApolloProvider from "./ApolloProvider";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";

import { AuthProvider } from "./context/auth";
import DynamicRoute from './util/DynamicRoute'

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <BrowserRouter>
          <Container className="pt-5">
            <Switch>
              <DynamicRoute path="/" component={Home} exact authenticated />
              <DynamicRoute path="/register" component={Register} guest/>
              <DynamicRoute path="/login" component={Login} guest/>
            </Switch>
          </Container>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
