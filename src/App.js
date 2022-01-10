import React from 'react';
import { BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Login from './view/login';
import Page1 from './view/Page1';
 
class App extends React.Component {
render(){
  return(
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Login/>}></Route>
          <Route path="/Page1" element={<Page1/>} ></Route>
        </Routes>
      </div>
    </Router>
  )
}
}

export default App;
