import React, {  Suspense } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";


//Homepage
const Homepage = React.lazy(()=> import("./pages/Homepage/Homepage"));


function App() {

 

  return (
    
    <>
    <Suspense >
      <Router>
        <Routes>

          <Route exact path="/" element={<Homepage />} />

        </Routes>
      </Router>
    </Suspense>
    </>
  );
}

export default App;
