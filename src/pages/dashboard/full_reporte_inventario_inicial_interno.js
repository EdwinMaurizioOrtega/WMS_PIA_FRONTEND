// next
import Head from 'next/head';
import {
    Box, Button,
    Container, FormControl, InputLabel, MenuItem, Select, Stack,
    Typography
} from '@mui/material';
// layouts
import React, {useState} from "react";
import {DataGrid, GridToolbarContainer, GridToolbarExport} from "@mui/x-data-grid";
import {useForm} from 'react-hook-form';
import DashboardLayout from '../../layouts/dashboard';
// components
import {useSettingsContext} from '../../components/settings';
import {Block} from "../../sections/_examples/Block";
import {fDate, fDatePersonalized_1} from "../../utils/formatTime";
import DateRangePicker, {useDateRangePicker} from "../../components/date-range-picker";
import {HOST_API_KEY} from "../../config-global";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {field: 'COD_OPEN', headerName: 'COD_OPEN', width: 150},
    {field: 'COD_SAP', headerName: 'COD_SAP', width: 150},
    {field: 'DESCRIPCION', headerName: 'DESCRIPCION', width: 300},
    {field: 'CANTIDAD', headerName: 'CANTIDAD', width: 150},
    {field: 'TIPO', headerName: 'TIPO', width: 150},
    {field: 'PROPIEDAD', headerName: 'PROPIEDAD', width: 150},
    {field: 'ESTADO', headerName: 'ESTADO', width: 150},
    {field: 'DESCR_UBICACION', headerName: 'DESCR_UBICACION', width: 150},
    {field: 'TECNOLOGIA', headerName: 'TECNOLOGIA', width: 150},
    {field: 'MARCA', headerName: 'MARCA', width: 150},
    {field: 'GAMA', headerName: 'GAMA', width: 150},
    {field: 'UBICACION', headerName: 'UBICACION', width: 150},
    {field: 'COD_PIA', headerName: 'COD_PIA', width: 150},
    {field: 'TIPO_ARTICULO', headerName: 'TIPO_ARTICULO', width: 150},
];

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport
            />
        </GridToolbarContainer>
    );
}

FullReporteInventarioInicialInterno.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function FullReporteInventarioInicialInterno() {
    const {themeStretch} = useSettingsContext();

    const pickerCalendar = useDateRangePicker(new Date(), null);
    const [procedencia, setProcedencia] = React.useState('');


    const defaultValues = {
        pedidoProveedorX: '',
        singleSelect: '',
    };

    const methods = useForm({
        defaultValues,
    });

    const handleChange = (event) => {
        setProcedencia(event.target.value);
    };

    const {
        handleSubmit,
    } = methods;

    const [jsonData, setJsonData] = useState([]);
    const [jsonCantidadDataDetalle, setJsonCantidadDataDetalle] = useState([]);

    const handleClick = async () => {

            const url = `${HOST_API_KEY}/api/wms/full_reporte_inventario_inicial_interno`;

            console.log(`url: ${url}`);

            const response = await fetch(url);

            if (response.ok) { // response.ok is true if the status code is in the range 200-299
                const data = await response.json();
                console.log(`data: ${JSON.stringify(data)}`);
                setJsonData(data.data);
            } else {
                console.error(`Error: ${response.status} ${response.statusText}`);
            }



    };

    // Definir un contador autoincremental
    let counter = 0;

// Función para generar un identificador único para cada fila
    const getRowId = (row) => {
        counter += 1;
        return counter;
    };

    return (
        <>
            <Head>
                <title> INVENTARIO INICIAL BODEGA</title>
            </Head>

            <Typography variant="h3" component="h1" paragraph>
                INVENTARIO INICIAL BODEGA
            </Typography>

            <Block title="INVENTARIO INICIAL BODEGA">
                <Button variant="contained"
                        onClick={() => {
                            handleClick()
                        }}
                >BUSCAR</Button>
            </Block>

            <Container maxWidth={themeStretch ? false : 'xl'}>


                <Typography variant="h3" component="h1" paragraph>
                    Reporte.
                </Typography>

                <Box sx={{height: 720}}>
                    <DataGrid
                        rows={jsonData}
                        columns={TABLE_HEAD}
                        getRowId={getRowId}
                        components={{
                            Toolbar: CustomToolbar,
                        }}
                    />

                </Box>

            </Container>
        </>

    );
}
