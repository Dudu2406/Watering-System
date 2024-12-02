import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./views/login_page";
import { RegisterPage } from "./views/register_page";
import { Dashboard } from "./views/dashboard";

function App() {
  return (
    <body>
      <div className="App">
        {/* routes */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </div>
    </body>

  );
}

export default App;
