import React from 'react';
import './App.scss';
import {Matrix} from "./components/Matrix";
import {matrix} from "./const/square";

function App() {
  return (
    <div className="App">
      <Matrix matrix={matrix}/>
    </div>
  );
}

export default App;
