import "./App.scss";
import { Container } from "react-bootstrap";
import ApolloProvider from "./ApolloProvider";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Register from "./pages/Register";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import { MessageProvider } from "./context/message";
import { AuthProvider } from "./context/auth";
import DynamicRoute from './util/DynamicRoute'

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <MessageProvider>
        <BrowserRouter>
          <Container className="pt-5">
            <Switch>
              <DynamicRoute path="/" component={Home} exact authenticated />
              <DynamicRoute path="/register" component={Register} guest/>
              <DynamicRoute path="/login" component={Login} guest/>
            </Switch>
          </Container>
        </BrowserRouter>
        </MessageProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
