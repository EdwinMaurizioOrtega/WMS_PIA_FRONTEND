import React, {useEffect, useState} from 'react';
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

FuxionReporteInventariosTemplate.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function FuxionReporteInventariosTemplate() {

    const {themeStretch} = useSettingsContext();

    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        async function fetchDataInit() {
            try {
                const url = `${HOST_API_KEY}/api/fuxion/reporte_inventarios`;
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
            field: 'NOM_PRODUCTO',
            headerName: 'NOM_PRODUCTO',
            width: 200
        },
        {
            field: 'CANTIDAD',
            headerName: 'CANTIDAD',
            width: 200,
        },
        {
            field: 'OBS',
            headerName: 'LOTE',
            width: 200,
        },
        {
            field: 'NOTAS',
            headerName: 'FECHA_VENC.',
            width: 200,
        },
        {
            field: 'ALMACEN',
            headerName: 'ALMACEN',
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
                                <CardHeader title="Fuxion Reporte Inventarios"/>

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