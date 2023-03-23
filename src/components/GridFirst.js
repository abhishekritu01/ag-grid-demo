
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';




const GridFirst = () => {

  // const rowData = [
  //   { make: "Toyota", model: "Celica", price: 35000 },
  //   { make: "Ford", model: "Mondeo", price: 32000 },
  //   { make: "Porsche", model: "Boxster", price: 72000 },
  //   { make: "Honda", model: "creta", price: 72000 },
  // ]

  
  // const columnDefs = [
  //   { field: 'make' },
  //   { field: 'model' },
  //   { field: 'price' },

  // ]

  // const [rowData] = useState([
  //   { make: "Toyota", model: "Celica", price: 35000 },
  //   { make: "Ford", model: "Mondeo", price: 32000 },
  //   { make: "Porsche", model: "Boxster", price: 72000 },
  //   { make: "Honda", model: "creta", price: 72000 },
  // ]);

  const [rowData, setRowData] = useState()

  const gridRef = useRef(); // Optional - for accessing Grid's API



  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: 'make', filter: true, },
    { field: 'model', filter: true, },
    { field: 'price' }
  ]);


  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true
  }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback(event => {
    console.log('cellClicked', event);
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback(e => {
    gridRef.current.api.deselectAll();
  }, []);


  // Example load data from server
  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
      .then(result => result.json())
      .then(rowData => setRowData(rowData))
  }, []);


  return (
    <div>

      {/* Example using Grid's API */}
      <button onClick={buttonListener}>Push Me</button>
      <div className="ag-theme-alpine " style={{ height: 500, width: 500 }}>
    
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API

          rowData={rowData} // Row Data for Rows

          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties

          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection='multiple' // Options - allows click selection of rows

          onCellClicked={cellClickedListener} // Optional - registering for Grid Event

        />
      </div>
    </div>

  )
}

export default GridFirst