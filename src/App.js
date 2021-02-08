
import './App.scss';
import {Container} from 'react-bootstrap'
import ApolloProvider from './ApolloProvider'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
function App() {
  
  return (
    <ApolloProvider>
      <BrowserRouter>
     <Container className="pt-5">
       <Switch>
      <Route path="/" component={Home} exact/>
     <Route path="/register" component={Register}/>
     <Route path="/login" component={Login}/>
     </Switch>
    </Container>
    </BrowserRouter>
   </ApolloProvider>
  );
}

export default App;
