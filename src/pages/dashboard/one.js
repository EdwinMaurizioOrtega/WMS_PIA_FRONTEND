// next
import Head from 'next/head';
import {
    Backdrop,
    Box, Button, CircularProgress,
    Container, Divider, Grid, IconButton, MenuItem, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from '@mui/material';
// layouts
import {LoadingButton, Masonry} from "@mui/lab";
import {useState} from "react";
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

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'PEDIDO_PROV', label: 'PEDIDO_PROV'},
    {id: 'FEC_INGRESO', label: 'FEC_INGRESO', align: 'right'},
    {id: 'ESTATUS', label: 'ESTATUS', align: 'right'},
    {id: 'CLIENTE', label: 'CLIENTE', align: 'right'},
    {id: 'PROVEEDOR', label: 'PROVEEDOR', align: 'right'},
    {id: 'DATO1', label: 'EMBARCADOR', align: 'right'},
    {id: 'DATO2', label: 'NOMBRE CONDUCTOR', align: 'right'},
    {id: 'DATO3', label: 'DN', align: 'right'},
    // {id: 'DATO5', label: 'DATO5', align: 'right'},
    {id: 'FACTURA_FAB', label: 'FACTURA_FAB', align: 'right'},
    {id: 'BULTOS', label: 'NUM_BULTOS', align: 'right'},
    // {id: 'DATO4', label: 'DIMENSIONES', align: 'right'},
    // {id: 'VAL2', label: 'VOLUMEN', align: 'right'},
    {id: 'PESO', label: 'PESO TOTAL', align: 'right'},
    {id: 'USUARIO', label: 'USUARIO', align: 'right'},

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
    {value: '7001', label: '7001'},

];

PageOne.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------


export default function PageOne() {
    const {themeStretch} = useSettingsContext();

    const defaultValues = {
        pedidoProveedorX: '',
        singleSelect: '',
    };

    const methods = useForm({
        defaultValues,
    });

    const {
        handleSubmit,
    } = methods;

    const [jsonData, setJsonData] = useState([]);
    const [jsonDataDetalle, setJsonDataDetalle] = useState([]);
    const [jsonCantidadDataDetalle, setJsonCantidadDataDetalle] = useState([]);
    const [jsonDataListaImagenes, setJsonDataListaImagenes] = useState([]);

    const onSubmit = async (dataAux) => {

        console.log('pedidoProveedorX: ', dataAux.pedidoProveedorX);
        console.log('procedencia: ', dataAux.singleSelect);

        const pedidoProveedor = dataAux.pedidoProveedorX;
        const procedencia = dataAux.singleSelect;

        if (pedidoProveedor !== '' && procedencia !== '') {

            console.log('pedidoProveedor: ', pedidoProveedor);
            console.log('procedencia: ', procedencia);

            const url = `${API_URL}/api/wms/reporte_pedido_proveedor?n_pedido=${pedidoProveedor}&procedencia=${procedencia}`;
            fetch(url)
                .then(response => response.json())
                .then(data => setJsonData(data.data));

            const url_detalle = `${API_URL}/api/wms/reporte_detalle_pedido_proveedor?n_pedido=${pedidoProveedor}&procedencia=${procedencia}`;
            fetch(url_detalle)
                .then(response => response.json())
                .then(data => setJsonDataDetalle(data.data));

            const url_cantidad_detalle = `${API_URL}/api/wms/reporte_cantidad_detalle_pedido_proveedor?n_pedido=${pedidoProveedor}&procedencia=${procedencia}`;
            fetch(url_cantidad_detalle)
                .then(response => response.json())
                .then(data => setJsonCantidadDataDetalle(data.data));

            const url_lista_imagenes = `${API_URL}/api/mogo-db-wms/lista_imagenes?pedidoProveedor=${pedidoProveedor}&procedencia=${procedencia}`;
            fetch(url_lista_imagenes)
                .then(response => response.json())
                .then(data => setJsonDataListaImagenes(data.data));

        } else {
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
                PEDIDO PROVEEDOR
            </Typography>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>


                <Block>
                    <RHFTextField
                        name="pedidoProveedorX"
                        label="PEDIDO PROVEEDOR"
                    />
                </Block>

                <Block label="RHFSelect">
                    <RHFSelect name="singleSelect" label="PROCEDENCIA">
                        <MenuItem value="">None</MenuItem>
                        <Divider sx={{borderStyle: 'dashed'}}/>
                        {OPTIONS.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </RHFSelect>
                </Block>

                <Button fullWidth size="large" type="submit" variant="contained">
                    Buscar
                </Button>

            </FormProvider>


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

                                        <TableCell
                                            align="right">{row.ESTATUS === 'N' ? 'NUEVO' : 'FINALIZADO'}</TableCell>
                                        <TableCell align="right">{row.CLIENTE}</TableCell>
                                        <TableCell align="right">{row.PROVEEDOR}</TableCell>
                                        <TableCell align="right">{row.DATO1}</TableCell>
                                        <TableCell align="right">{row.DATO2}</TableCell>
                                        <TableCell align="right">{row.DATO3}</TableCell>
                                        <TableCell align="right">{row.FACTURA_FAB}</TableCell>
                                        <TableCell align="right">{row.BULTOS}</TableCell>
                                        <TableCell align="right">{row.PESO}</TableCell>
                                        <TableCell align="right">{row.USUARIO}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </TableContainer>

                <Typography variant="h3" component="h1" paragraph>
                    Resumen pedido
                </Typography>

                <Box sx={{height: 720}}>
                    <DataGrid
                        rows={jsonCantidadDataDetalle}
                        columns={TABLE_HEAD_CANTIDAD_DETALLE}
                        getRowId={getRowId}
                        components={{
                            Toolbar: CustomToolbar,
                        }}
                    />

                </Box>

                <Typography variant="h3" component="h1" paragraph>
                    Detalle del pedido.
                </Typography>

                <Box sx={{height: 720}}>
                    <DataGrid
                        rows={jsonDataDetalle}
                        columns={TABLE_HEAD_DETALLE}
                        getRowId={(row) => row.SERIE}
                        components={{
                            Toolbar: CustomToolbar,
                        }}
                    />

                </Box>

                <Typography variant="h3" component="h1" paragraph>
                    Lista de imágenes.
                </Typography>

                <TableContainer sx={{mt: 3, overflow: 'unset'}}>
                    <Scrollbar>
                        <Table sx={{minWidth: 800}}>
                            <TableHeadCustom headLabel={TABLE_HEAD_LISTA_IMAGENES}/>

                            <TableBody>
                                {jsonDataListaImagenes.map((row) => (
                                    <TableRow key={row._id}>

                                        <TableCell>{row.pedidoProveedor}</TableCell>
                                        <TableCell>{row.procedencia}</TableCell>
                                        <TableCell>{row.createdAt}</TableCell>
                                        <TableCell>
                                            {row.selectedFile.map((imageData, index) => (
                                                <Image
                                                    key={index}
                                                    src={imageData}
                                                    src={`data:image/jpeg;base64,${imageData}`}

                                                    sx={{width: 500, height: 500}}
                                                />
                                            ))}

                                        </TableCell>

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
