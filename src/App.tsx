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

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

function App() {
  const { network } = useTonConnect();

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

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
