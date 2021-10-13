import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import GlogbalStyle from './globalStyle/globalStyle'
import Info from './page/info'
import Mypage from './page/mypage'
import Posts from './page/posts'
import Recipe from './page/recipe'
import Search from './page/search'
import Signup from './page/signup'
import Write from './page/write'
import Update from './component/updateComponent'
import Redirect from './component/kakao/redirect'
import NavbarComponent from './component/navbarComponent'
import FooterComponent from './component/footerComponent';

function App() {
  return (
    <div>
      <GlogbalStyle />
      <Router>
        <NavbarComponent />    
        <Switch>
          <Route exact path="/" component={Info} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/mypage/:id" component={Mypage} />
          <Route exact path="/write" component={Write} />
          <Route exact path="/recipe" component={Recipe} />
          <Route exact path="/update/:id" component={Update} />
          <Route exact path="/search/:id" component={Search} />
          <Route exact path="/recipe/:id" component={Posts} />
          <Route exact path="/oauth/kakao" component={Redirect}/>
        </Switch>
      </Router>
      <FooterComponent />
    </div>
  )
}

export default App
