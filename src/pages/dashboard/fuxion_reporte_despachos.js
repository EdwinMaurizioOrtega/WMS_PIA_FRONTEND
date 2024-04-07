import React, {useCallback, useEffect, useRef, useState} from 'react';
import Head from 'next/head';

// @mui
import {
    Box, Card,
    CardContent, CardHeader, CircularProgress,
    Container, Grid, IconButton, Tooltip
} from '@mui/material';

import {useSettingsContext} from "../../components/settings";
import DashboardLayout from "../../layouts/dashboard";
import {HOST_API_KEY} from "../../config-global";
import {
    DataGrid, GridActionsCellItem,
    GridToolbarColumnsButton,
    GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton,
    GridToolbarQuickFilter
} from "@mui/x-data-grid";
import EmptyContent from "../../components/empty-content";
import Iconify from "../../components/iconify";
import {PDFDownloadLink, Text} from "@react-pdf/renderer";
import EtiquetasPDF from "../../sections/invoice/EtiquetasPDF";
import Barcode from "react-barcode";
import {useReactToPrint} from "react-to-print";
import styles from "../../sections/invoice/InvoiceStyle";

FuxionReporteDespachosTemplate.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function FuxionReporteDespachosTemplate() {

    const {themeStretch} = useSettingsContext();

    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        async function fetchDataInit() {
            try {
                const url = `${HOST_API_KEY}/api/fuxion/reporte_despachos`;
                const response = await fetch(url);
                const data = await response.json();
                setJsonData(data.data);

                console.log("dataClientes: " + JSON.stringify(data.data));

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDataInit();
    }, []); // El segundo argumento [] asegura que el efecto solo se ejecute una vez al montar el componente


    const handleViewRow = (row) => {
        console.log("Datos de la fila: " + JSON.stringify(row));
    };

    const handleDownloadClick = async (id) => {
        // Your method or logic to execute after the download icon is clicked
        console.log('Download icon clicked!');
        console.log("Número de orden: " + id);

    }

    const TABLE_HEAD = [


        {
            type: 'actions',
            field: 'actions',
            headerName: ' ',
            align: 'right',
            headerAlign: 'right',
            width: 80,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            getActions: (params) => [

                <BarcodeComponent key={params.row.id} value={params.row} />,

            ],
        },

        {
            field: 'id',
            hide: true,
        },

        {
            field: 'FECHA_FORMATEADA',
            headerName: 'FECHA',
            width: 200
        },
        {
            field: 'COURIER',
            headerName: 'COURIER',
            width: 200,
        },
        {
            field: 'DESCRIPCION',
            headerName: 'TIPO',
            width: 200,
        },
        {
            field: 'NUM_PEDIDO',
            headerName: 'ORDEN',
            width: 200,
        },
        {
            field: 'GUIA',
            headerName: 'GUIA',
            width: 200,
        },
        {
            field: 'PESO',
            headerName: 'PESO',
            width: 200,
        },
        {
            field: 'RESPONSABLE',
            headerName: 'RESPONSABLE',
            width: 200,
        },
        {
            field: 'ESTATUS',
            headerName: 'ESTATUS',
            width: 200,
        },

    ];




    return (
        <>
            <Head>
                <title> FUXION</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>

                <div className="flex">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <Card>
                                <CardHeader title="Fuxion Reporte Despachos"/>

                                <CardContent>
                                    <Box sx={{height: 720}}>
                                        <DataGrid
                                            rows={jsonData}
                                            columns={TABLE_HEAD}
                                            pagination
                                            slots={{
                                                toolbar: CustomToolbar,
                                                noRowsOverlay: () => <EmptyContent title="No Data"/>,
                                                noResultsOverlay: () => <EmptyContent title="No results found"/>,
                                            }}
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>

    );
}

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarQuickFilter/>
            <Box sx={{flexGrow: 1}}/>
            <GridToolbarColumnsButton/>
            <GridToolbarFilterButton/>
            <GridToolbarDensitySelector/>
            <GridToolbarExport/>
        </GridToolbarContainer>
    );
}


const BarcodeComponent = ({value}) => {
    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div ref={componentRef} onClick={handlePrint}>
            <div style={{display: 'inline-block', textAlign: 'center'}}>
                <p>FUXION</p>
                <p>INFORMACIÓN DEL DESPACHO</p>
                <p>Fecha: {value.FECHA_FORMATEADA}</p>
                <p>Courier: {value.COURIER}</p>
                <p>Tipo: {value.DESCRIPCION}</p>
                <Barcode value={value.NUM_PEDIDO}/>
                <p>Guia: {value.GUIA}</p>
                <p>Peso (KG): {value.PESO}</p>
            </div>
        </div>
    );
};