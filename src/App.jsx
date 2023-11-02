import React from "react";
import Index from "./Pages";
import ChoosenPokemon from "./Pages/choosenPokemon";

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/pokemon/:id" element={<ChoosenPokemon/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;