import React from "react";
import { Header } from "./component/Header";
import { Footer } from "./component/Footer";
import { Allroutes } from "./component/Allroutes";
import { UserContext } from "./component/constant";
import { useState } from "react";
function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setaccount] = useState(null);

  const [state, setState] = useState("CONNECT WALLET");

  const [balance, setbalance] = useState("0");

  return (
    <UserContext.Provider
      value={{
        provider,
        setProvider,
        signer,
        setSigner,
        contract,
        setContract,
        account,
        setaccount,
        state,
        setState,
        balance,
        setbalance,
      }}
    >
      <Header />
      <Allroutes />
      <Footer />
    </UserContext.Provider>
  );
}

export default App;
