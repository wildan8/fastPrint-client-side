import React from 'react';
import Navbar from "./navbar"
import DataTable from "./dataTable"

export default function index() {
    return (
        <div>
            <Navbar/>
            <div style={{ padding: "20px"}}>
            <DataTable/>
            </div>
        </div>
    )
    
}