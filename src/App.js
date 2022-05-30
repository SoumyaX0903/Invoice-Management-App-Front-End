import { useState, useEffect } from "react";
import { Table } from "./Table";
import {Header} from "./Static_Components/Header";
import {Footer} from "./Static_Components/Footer";
import {GridHeading} from "./Static_Components/Heading";
import "./index.css";
export const App = () => {
  return (
    <>
    <Header/>
    <GridHeading/>
    <Table/>
    <Footer/>
    </>
  )
}
