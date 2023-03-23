import './App.css';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


import 'ag-grid-enterprise';

import { useState, useRef, useEffect, useMemo, memo } from 'react';

import MyFilter from '../src/components/YearFilter';
import { HelloComp, GoodbyeComp } from '../src/components/comps';


const MyComp = params => {
  const renderCountRef = useRef(1);
  return (
    <><b>({renderCountRef.current++})</b> {params.value}</>
  );
};


const MyIcon = () => {
  return (
    <img src="https://d1yk6z6emsz7qy.cloudfront.net/static/images/loading.gif" className="my-spinner" />
  )
};


function App() {

  const components = useMemo(() => ({
    aaa: HelloComp,
    bbb: GoodbyeComp
  }), []);

  const gridRef = useRef();
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    // { field: 'athlete', rowGroup: true },
    // { field: 'athlete', cellRenderer: simpleComponent },
    // { field: 'age', cellRenderer: null },
    // { field: 'athlete' },
    // { field: 'age' },
    // { field: 'country' },
    // { field: 'year' },
    // { field: 'date' },
    // { field: 'sport' },
    // { field: 'gold' },
    // { field: 'silver' },
    // { field: 'bronze' },
    // { field: 'total' }


    { field: 'athlete', filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'age', filter: 'agNumberColumnFilter', filterParams: { debounceMs: 2000 }, floatingFilter: true },
    {
      field: 'year',
      filter: MyFilter,  //custom filter
      filterParams: {
        title: 'Year Filter',
        values: [2000, 2004, 2006]
      },
      floatingFilter: true
    },
    { field: 'country', filter: 'agMultiColumnFilter' },
    { field: 'date', filter: 'agDateColumnFilter', floatingFilter: true },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' }
  ]);



  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    enableRowGroup: true,
    // cellRenderer: simpleComponent
    // cellRenderer: memo(MyComp),
    // floatingFilter: true,
    filterParams: {
      debounceMs: 2000,
      buttons: ['apply', 'clear', 'cancel', 'reset']
    }
  }), []);

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then(result => result.json())
      .then(rowData => setRowData(rowData))
  }, []);

  return (
    <div className="ag-theme-alpine-dark fullscreen" style={{ height: 900 }} >
      <AgGridReact ref={gridRef}

        noRowsOverlayComponent={HelloComp}
        noRowsOverlayComponentParams=
        {{ name: 'Abhishek No Rows' }}


        loadingOverlayComponent={GoodbyeComp}
        loadingOverlayComponentParams=
        {{ name: 'Rachel Loading' }}

        statusBar={{
          statusPanels: [
            {
              statusPanel: HelloComp,
              statusPanelParams: { name: 'Peter' },
            },
            {
              statusPanel: GoodbyeComp,
              statusPanelParams: { name: 'Paul' },
            }
          ]
        }}

        sideBar={{
          toolPanels: [
            {
              id: '3',
              labelDefault: 'Columns',
              toolPanel: 'agColumnsToolPanel',
            },
            {
              id: '1',
              labelDefault: 'Custom 1',
              toolPanel: HelloComp,
              toolPanelParams: { name: 'Summer' }
            },
            {
              id: '2',
              labelDefault: 'Custom 2',
              toolPanel: GoodbyeComp,
              toolPanelParams: { name: 'Winter' }
            }
          ]
        }}

        components={components}

        rowGroupPanelShow='always'
        rowData={rowData}
        animateRows={true}
        enableRangeSelection={true}
        enableCharts={true}
        pagination={true}
        // pivotPanelShow={'always'}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
      />

    </div>
  );
}

export default App;