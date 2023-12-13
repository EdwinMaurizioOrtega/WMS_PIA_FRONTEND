import React, {useCallback, useEffect, useState} from 'react';
import Head from 'next/head';

// @mui
import {
    TextField,

    Container,
    Typography,
    CardHeader,
    FormControlLabel,
    Switch,
    CardContent,
    Card,
    MenuItem,
    Divider,
    Select,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell, Link, Button, Box, IconButton, Menu, Dialog, DialogTitle
} from '@mui/material';


import {useSettingsContext} from "../../components/settings";
import DashboardLayout from "../../layouts/dashboard";
import {Block} from "../../sections/_examples/Block";
import {Upload} from "../../components/upload";
import {API_URL} from "../../routes/paths"
import FormProvider, {RHFRadioGroup, RHFUpload} from "../../components/hook-form";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import {TableHeadCustom} from "../../components/table";
import {HOST_API_KEY} from "../../config-global";
import {useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import Iconify from "../../components/iconify";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import ActualizarDatos from "../../components/cnt-form/cntform";
import ActualizarConsolidado from "../../components/cnt-form/actualizarconsolidado";

PageTemplate.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const style = {
    '& > *': {my: '8px !important'},
};

export const defaultValues = {

    //
    radioGroup: '',
    //
    singleUpload: null,

};

export default function PageTemplate() {

    const {themeStretch} = useSettingsContext();

    const [selectedEvent, setSelectedEvent] = useState(null);

    const [openFormUpdate, setOpenFormUpdate] = useState(false);

    const [dataCities, setDataCities] = useState([]);

    const handleOpenModalUpdate = () => {
        setOpenFormUpdate(true);
    };

    const TABLE_HEAD = [
        {field: 'ID', headerName: 'ID'},
        {field: 'FECHA', headerName: 'FECHA'},
        {field: 'PEDIDO_TRASLADO', headerName: 'PEDIDO_TRASLADO'},
        {field: 'CENTRO_SUMINISTRADOR', headerName: 'CENTRO_SUMINISTRADOR'},
        {field: 'ALMACEN_EMISOR', headerName: 'ALMACEN_EMISOR'},
        {field: 'MATERIAL', headerName: 'MATERIAL'},
        {field: 'DESCRIPCION_MATERIAL', headerName: 'DESCRIPCION_MATERIAL'},
        {field: 'CANTIDAD', headerName: 'CANTIDAD'},
        {field: 'CENTRO', headerName: 'CENTRO'},
        {field: 'DESCRIPCION_CENTRO', headerName: 'DESCRIPCION_CENTRO'},
        {field: 'CIUDAD', headerName: 'CIUDAD'},
        {field: 'GUIA_COURIER', headerName: 'GUIA_COURIER'},
        {field: 'ALMACEN_RECEPTOR', headerName: 'ALMACEN_RECEPTOR'},
        {field: 'COURIER', headerName: 'COURIER'},
        {field: 'CANAL', headerName: 'CANAL'},
        {field: 'COD_CLIENTE', headerName: 'COD_CLIENTE'},
        {field: 'OBSERVACION', headerName: 'OBSERVACION'},
        {field: 'CATEGORIA', headerName: 'CATEGORIA'},
        {field: 'ARTICULO', headerName: 'ARTICULO'},
        {field: 'ALMACEN', headerName: 'ALMACEN'},
        {field: 'PEDIDO', headerName: 'PEDIDO'},

        {
            field: 'action',
            headerName: ' ',
            width: 80,
            align: 'right',
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const [anchorEl, setAnchorEl] = React.useState(null);

                const handleClick = (event) => {
                    setAnchorEl(event.currentTarget);
                };

                const handleClose = () => {
                    setAnchorEl(null);
                };

                const handleUpdateByCVE = () => {

                    console.log("data: " + JSON.stringify(params.row)); // Print the 'CVE' value to the console

                    handleClose();

                    setSelectedEvent(params.row);
                    handleOpenModalUpdate();

                };

                return (
                    <div>
                        <IconButton onClick={handleClick}>
                            <Iconify icon="eva:more-vertical-fill"/>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >

                            <MenuItem onClick={handleUpdateByCVE}>Editar</MenuItem>


                        </Menu>
                    </div>
                );
            },
        },

    ];

    // Definir un contador autoincremental
    let counter = 0;

    // Función para generar un identificador único para cada fila
    const getRowId = (row) => {
        counter += 1;
        return counter;
    };

    useEffect(() => {
        fetchDataInit();
    }, []); // El segundo argumento [] asegura que el efecto solo se ejecute una vez al montar el componente

    const fetchDataInit = async () => {
        try {
            const url = `${HOST_API_KEY}/api/plantilla/consolidado`;
            const response = await fetch(url);
            const data = await response.json();
            setJsonData(data.data);

            console.log("dataClientes: "+ JSON.stringify(data.data));

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [jsonData, setJsonData] = useState([]);

    const handleCloseModalUpdate = () => {
        setOpenFormUpdate(false);
        setSelectedEvent(null);
        fetchDataInit();
    };

    return (
        <>
            <Head>
                <title> Consolidado</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>

                <Typography variant="h3" component="h1" paragraph>
                    DETALLE CONSOLIDADO.
                </Typography>

                <Box sx={{height: 720}}>
                    <DataGrid
                        rows={jsonData}
                        columns={TABLE_HEAD}
                        getRowId={getRowId}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        pagination
                        pageSize={100} // Aquí puedes especificar el número de elementos por página
                        disableVirtualization
                    />
                </Box>
            </Container>

            <Container maxWidth={themeStretch ? false : 'xl'}>

                <Dialog fullWidth maxWidth="xs" open={openFormUpdate} onClose={handleCloseModalUpdate}>
                    <DialogTitle>Actualizar registro</DialogTitle>
                    {selectedEvent &&
                        <ActualizarConsolidado initialData={selectedEvent} onCancel={handleCloseModalUpdate}/>
                    }
                </Dialog>

            </Container>
        </>

    );
}