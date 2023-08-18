// next
import Head from 'next/head';
import {
    Backdrop,
    Box, Button, CircularProgress,
    Container, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow, Tooltip,
    Typography
} from '@mui/material';
// layouts
import {LoadingButton, Masonry} from "@mui/lab";
import React, {useState} from "react";
import {DataGrid, GridToolbarContainer, GridToolbarExport} from "@mui/x-data-grid";
import {useForm} from 'react-hook-form';

import {yupResolver} from "@hookform/resolvers/yup";

import FormProvider, {
    RHFSelect,
    RHFTextField,
} from '../../components/hook-form';

import DashboardLayout from '../../layouts/dashboard';
// components
import {useSettingsContext} from '../../components/settings';
import {Block} from "../../sections/_examples/Block";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import {TableHeadCustom} from "../../components/table";
import Image from "../../components/image";
import {FormSchema} from "../../sections/_examples/extra/form/schema";
import {API_URL} from "../../routes/paths";

import {PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';

import InvoicePDF from '../../sections/invoice/InvoicePDF';
import Iconify from "../../components/iconify";
import {fDate, fDatePersonalized_1} from "../../utils/formatTime";
import DateRangePicker, {useDateRangePicker} from "../../components/date-range-picker";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'PEDIDO_PROV', label: 'PEDIDO_PROV'},
    {id: 'FEC_INGRESO', label: 'FEC_INGRESO', align: 'right'},
    {id: 'ESTATUS', label: 'ESTATUS', align: 'right'},
    {id: 'CLIENTE', label: 'CLIENTE', align: 'right'},
    {id: 'PROVEEDOR', label: 'PROVEEDOR', align: 'right'},
    {id: 'DATO1', label: 'EMBARCADOR', align: 'right'},
    {id: 'DATO2', label: 'NOMBRE CONDUCTOR', align: 'right'},
    // {id: 'DATO3', label: 'DN', align: 'right'},
    // {id: 'DATO5', label: 'DATO5', align: 'right'},
    // {id: 'FACTURA_FAB', label: 'FACTURA_FAB', align: 'right'},
    {id: 'BULTOS', label: 'NUM_BULTOS', align: 'right'},
    // {id: 'DATO4', label: 'DIMENSIONES', align: 'right'},
    // {id: 'VAL2', label: 'VOLUMEN', align: 'right'},
    {id: 'PESO', label: 'PESO TOTAL', align: 'right'},
    {id: 'DATO4', label: 'DIMENSIONES', align: 'right'},
    // {id: 'USUARIO', label: 'USUARIO', align: 'right'},
    {id: 'DESCRIPCION_V2', label: 'DESCRIPCION', align: 'right'},
    {id: 'CANTIDAD', label: 'CANTIDAD', align: 'right'},
    {id: 'DN', label: 'DN', align: 'right'},

];

const TABLE_HEAD_CANTIDAD_DETALLE = [
    {field: 'PEDIDO_PROV', headerName: 'PEDIDO_PROV', width: 150},
    {field: 'ARTICULO', headerName: 'ARTICULO', width: 150},
    {field: 'DESCRIPCION', headerName: 'DESCRIPCION', width: 300},
    {field: 'CANTIDAD', headerName: 'CANTIDAD', width: 150},
];

const TABLE_HEAD_DETALLE = [
    {field: 'PEDIDO_PROV', headerName: 'PEDIDO_PROV', width: 150},
    {field: 'PROCEDENCIA', headerName: 'PROCEDENCIA', width: 150},
    {field: 'ARTICULO', headerName: 'ARTICULO', width: 150},
    {field: 'DESCRIPCION', headerName: 'DESCRIPCION', width: 300},
    {field: 'SERIE', headerName: 'SERIE', width: 150},
];


function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport
            />
        </GridToolbarContainer>
    );
}

const TABLE_HEAD_LISTA_IMAGENES = [

    {id: 'pedidoProveedor', label: 'pedidoProveedor', align: 'left'},
    {id: 'procedencia', label: 'procedencia', align: 'left'},
    {id: 'createdAt', label: 'createdAt', align: 'left'},
    {id: 'selectedFile', label: 'selectedFile', align: 'left'},
];

const style = {
    '& > *': {my: '8px !important'},
};

const OPTIONS = [
    {value: '9000', label: 'HT miami'},
    {value: '7001', label: 'CNT'},

];

PageSix.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------


export default function PageSix() {
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

    const handleClick = async (dataAux) => {

        if (pickerCalendar.endDate !== null){

            console.log(`Inicio: ${fDatePersonalized_1(pickerCalendar.startDate)}`);
            console.log(`Final: ${fDatePersonalized_1(pickerCalendar.endDate)}`);
            console.log(`Prodedencia: ${procedencia}`);

            const fec_inicio = fDatePersonalized_1(pickerCalendar.startDate);
            const fec_fin = fDatePersonalized_1(pickerCalendar.endDate);

            const url = `${API_URL}/api/wms/reporte_pedido_proveedor_filtro_fecha?fec_inicio=${fec_inicio}&fec_fin=${fec_fin}&proced=${procedencia}`;

            fetch(url)
                .then(response => response.json())
                .then(data => setJsonData(data.data));
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
                PEDIDO PROVEEDOR FILTRO FECHAS
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
                            <MenuItem value={9000}>HT miami</MenuItem>
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

                <TableContainer sx={{mt: 3, overflow: 'unset'}} id="tabla_cantidad">
                    <Scrollbar>
                        <Table sx={{minWidth: 800}}>
                            <TableHeadCustom headLabel={TABLE_HEAD}/>

                            <TableBody>
                                {jsonData.map((row, indexdos) => (
                                    <TableRow key={indexdos}>
                                        <TableCell>{row.PEDIDO_PROV}</TableCell>
                                        <TableCell align="right">{row.FEC_INGRESO}</TableCell>
                                        <TableCell align="right">{row.FEC_ALTA}</TableCell>

                                        <TableCell
                                            align="right">{row.ESTATUS === 'N' ? 'NUEVO' : 'FINALIZADO'}</TableCell>
                                        <TableCell align="right">{row.CLIENTE}</TableCell>
                                        <TableCell align="right">{row.PROVEEDOR}</TableCell>
                                        <TableCell align="right">{row.DATO1}</TableCell>
                                        <TableCell align="right">{row.DATO2}</TableCell>
                                        {/*<TableCell align="right">{row.DATO3}</TableCell>*/}
                                        {/*<TableCell align="right">{row.FACTURA_FAB}</TableCell>*/}
                                        <TableCell align="right">{row.BULTOS}</TableCell>
                                        <TableCell align="right">{row.PESO}</TableCell>
                                        <TableCell align="right">{row.DATO4}</TableCell>
                                        {/*<TableCell align="right">{row.USUARIO}</TableCell>*/}
                                        <TableCell align="right">{row.DESCRIPCION_V2}</TableCell>
                                        <TableCell align="right">{row.CANTIDAD}</TableCell>
                                        <TableCell align="right">{row.DATA_DET1}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </TableContainer>


            </Container>
        </>

    );
}
