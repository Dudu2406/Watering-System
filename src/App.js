import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./views/login_page";
import { RegisterPage } from "./views/register_page";

function App() {
  return (
    <body>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
        </Routes>
      </div>
    </body>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
