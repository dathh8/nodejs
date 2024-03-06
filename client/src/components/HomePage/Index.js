import Header from "../Header/Header";
import { Outlet, Link } from "react-router-dom";
const Index = () => {

    return(
        <>
          <Header/>
          <main> <Outlet /></main>
        </>
      )
}

export default Index;