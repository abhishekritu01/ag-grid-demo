
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


import 'ag-grid-enterprise';

import { useState, useRef, useEffect, useMemo, useCallback, Component } from 'react';


const PushComp = p => {
    const onAt = useCallback(() => window.alert('Push'));
    return (
        <>
            <button onClick={onAt}>Push</button>
            {p.value}
        </>);
}

class PullComp extends Component {
    render() {
        return (
            <>
                <button onClick={() => window.alert('Pull')}>Pull</button>
                {this.props.value}
            </>);
    }
}

const EnterpriseGrid = () => {

    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        // { field: 'athlete', rowGroup: true },
        // { field: 'athlete', cellRenderer: simpleComponent },
        // { field: 'age', cellRenderer: null },


        { field: 'athlete', cellRenderer: p => <><b>Age is: </b>{p.value}</> },
        { field: 'age', cellRenderer: null },
        { field: 'country', },
        {
            field: 'year',
            cellRendererSelector: p => {
                if (p.value == 2000) {
                    return { component: PushComp, params: {} };
                }
                if (p.value == 2004) {
                    return { component: PullComp };
                }
            }
        },
        { field: 'date' },
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
    }), []);

    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then(result => result.json())
            .then(rowData => setRowData(rowData))
    }, []);

    return (
        <div className="ag-theme-alpine-dark" style={{ height: 1000, width: 2000 }}>
            <AgGridReact ref={gridRef}
                rowGroupPanelShow='always'
                rowData={rowData}
                animateRows={true}
                enableRangeSelection={true}
                enableCharts={true}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
            />
        </div>
    );
}

export default EnterpriseGrid