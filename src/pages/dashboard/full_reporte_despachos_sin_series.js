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
    {field: 'TIPO_ANIDADO_ARTICULO', headerName: 'TIPO_ANIDADO_ARTICULO', width: 150},
    {field: 'GUIA_REMISION', headerName: 'GUIA_REMISION', width: 150},
    {field: 'FECHA', headerName: 'FECHA', width: 300},
    {field: 'BODEGA_OPEN', headerName: 'BODEGA_OPEN', width: 150},
    {field: 'COD_DIRECTO', headerName: 'COD_DIRECTO', width: 150},
    {field: 'ALMACEN_SAP', headerName: 'ALMACEN_SAP', width: 150},
    {field: 'BOD_SAP_ALM_SAP', headerName: 'BOD_SAP_ALM_SAP', width: 150},
    {field: 'DESCR_BODEGA', headerName: 'DESCR_BODEGA', width: 150},
    {field: 'ANIDADO_PESO_TOTAL', headerName: 'ANIDADO_PESO_TOTAL', width: 150},
    {field: 'ARTICULO_ANIDADO', headerName: 'ARTICULO_ANIDADO', width: 150},
    {field: 'ANIDADO_ARTICULO', headerName: 'ANIDADO_ARTICULO', width: 150},
    {field: 'TOTAL_DESPACHADO', headerName: 'TOTAL_DESPACHADO', width: 150},
    {field: 'PIA', headerName: 'PIA', width: 150},
    {field: 'ANIDADO_COD_SAP', headerName: 'ANIDADO_COD_SAP', width: 150},
    {field: 'PEDIDO_SAP', headerName: 'PEDIDO_SAP', width: 150},
    {field: 'PESO', headerName: 'PESO', width: 150},
    {field: 'COD_INTERNO', headerName: 'COD_INTERNO', width: 150},
    {field: 'ARTICULO', headerName: 'ARTICULO', width: 150},
    {field: 'COD_SAP', headerName: 'COD_SAP', width: 150},
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

FullReporteDespachosSinSeries.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function FullReporteDespachosSinSeries() {
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

        if (pickerCalendar.endDate !== null){

            console.log(`Inicio: ${fDatePersonalized_1(pickerCalendar.startDate)}`);
            console.log(`Final: ${fDatePersonalized_1(pickerCalendar.endDate)}`);
            console.log(`Prodedencia: ${procedencia}`);

            const fec_inicio = fDatePersonalized_1(pickerCalendar.startDate);
            const fec_fin = fDatePersonalized_1(pickerCalendar.endDate);

            const url = `${HOST_API_KEY}/api/wms/full_reporte_despachos_sin_series?fec_inicio=${fec_inicio}&fec_fin=${fec_fin}&proced=${procedencia}`;

            console.log(`url: ${url}`);

            const response = await fetch(url);

            if (response.ok) { // response.ok is true if the status code is in the range 200-299
                const data = await response.json();
                console.log(`data: ${JSON.stringify(data)}`);
                setJsonData(data.data);
            } else {
                console.error(`Error: ${response.status} ${response.statusText}`);
            }

        }else {
            alert("Todos los campos son obligatorios.")
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
                <title> Page Cuatro | Minimal UI</title>
            </Head>

            <Typography variant="h3" component="h1" paragraph>
                DESPACHOS SIN SERIES
            </Typography>

            <Block title="Rango Fechas Calendario">
                <Button variant="contained" onClick={pickerCalendar.onOpen}>
                    Click me!
                </Button>

                <Stack sx={{ typography: 'body2', mt: 3 }}>
                    <div>
                        <strong>Inicio:</strong> {fDate(pickerCalendar.startDate)}
                    </div>
                    <div>
                        <strong>Fin:</strong> {fDate(pickerCalendar.endDate)}
                    </div>
                </Stack>

                <DateRangePicker
                    variant="calendar"
                    open={pickerCalendar.open}
                    startDate={pickerCalendar.startDate}
                    endDate={pickerCalendar.endDate}
                    onChangeStartDate={pickerCalendar.onChangeStartDate}
                    onChangeEndDate={pickerCalendar.onChangeEndDate}
                    onClose={pickerCalendar.onClose}
                    isError={pickerCalendar.isError}
                />

                <Block>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">PROCEDENCIA</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={procedencia}
                            label="Age"
                            onChange={handleChange}
                        >
                            {/*<MenuItem value={9000}>HT miami</MenuItem>*/}
                            <MenuItem value={7001}>CNT</MenuItem>

                        </Select>
                    </FormControl>
                </Block>

                <Button variant="contained"

                        onClick={() => {
                            handleClick()
                        }}
                >BUSCAR</Button>
            </Block>

            <Container maxWidth={themeStretch ? false : 'xl'}>


                <Typography variant="h3" component="h1" paragraph>
                    Pedido.
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
