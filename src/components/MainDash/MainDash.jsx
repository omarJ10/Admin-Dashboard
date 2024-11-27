import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import PaymentTable from "../RequestPayComponents/RequestPayList/RequestList";
import "./MainDash.css";
import RequestBalanceTable from "../RequestBalanceComponents/RequestBalanceTable";
const MainDash = () => {
  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      
      <Table />
      <PaymentTable/>
      

    </div>
  );
};

export default MainDash;
