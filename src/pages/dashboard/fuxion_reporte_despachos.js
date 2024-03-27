import React, { useEffect, useState} from 'react';
import Head from 'next/head';

// @mui
import {
    Box, Card,
    CardContent, CardHeader,
    Container, Grid
} from '@mui/material';

import {useSettingsContext} from "../../components/settings";
import DashboardLayout from "../../layouts/dashboard";
import {HOST_API_KEY} from "../../config-global";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton,
    GridToolbarQuickFilter
} from "@mui/x-data-grid";
import EmptyContent from "../../components/empty-content";

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


    const TABLE_HEAD = [

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