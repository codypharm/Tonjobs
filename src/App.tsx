import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { TransferTon } from "./components/TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import Landing from "./pages/Landing";
import Organization from "./pages/Organization";
import Contributor from "./pages/Contributor";
import Profile from "./pages/Profile";
import { createContext, useReducer } from "react";
import { initialState, reducer } from "./lib/reducer";

export const AuthContext = createContext<any>(null);

function App() {
  const { network } = useTonConnect();
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    // <StyledApp>
    //   <AppContainer>
    //     <FlexBoxCol>
    //       <FlexBoxRow>
    //         <TonConnectButton />
    //         <Button>
    //           {network
    //             ? network === CHAIN.MAINNET
    //               ? "mainnet"
    //               : "testnet"
    //             : "N/A"}
    //         </Button>
    //       </FlexBoxRow>
    //       <Counter />
    //       <TransferTon />
    //       <Jetton />
    //     </FlexBoxCol>
    //   </AppContainer>
    // </StyledApp>
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="/organization" element={<Organization />} />
            <Route path="/contributor" element={<Contributor />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
