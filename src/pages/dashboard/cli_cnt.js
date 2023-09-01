// next
import Head from 'next/head';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogTitle,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
// layouts
import {DesktopDatePicker} from '@mui/x-date-pickers';
import React, {useEffect, useState} from "react";
import {DataGrid, GridToolbar,} from "@mui/x-data-grid";
import {useForm} from 'react-hook-form';

import FormProvider, {RHFSelect, RHFTextField,} from '../../components/hook-form';

import DashboardLayout from '../../layouts/dashboard';
// components
import {useSettingsContext} from '../../components/settings';
import {API_URL} from "../../routes/paths";
import Iconify from "../../components/iconify";
import {LoadingButton} from "@mui/lab";
import merge from "lodash/merge";
import ActualizarDatos from "../../components/cnt-form/cntform";

// ----------------------------------------------------------------------

const OPTIONS = [
    {value: 0, label: 'Cerrado'},
    {value: 1, label: 'Abierto'},
    {value: 2, label: 'Temporal'},

];

const REGIONAL_CANAL = [
    {value: "INDIRECTO", label: 'INDIRECTO'},
    {value: "REGIONAL 1", label: 'REGIONAL 1'},
    {value: "REGIONAL 2", label: 'REGIONAL 2'},
    {value: "REGIONAL 3", label: 'REGIONAL 3'},
    {value: "REGIONAL 4", label: 'REGIONAL 4'},
    {value: "REGIONAL 5", label: 'REGIONAL 5'},
    {value: "REGIONAL 6", label: 'REGIONAL 6'},
    {value: "REGIONAL 7", label: 'REGIONAL 7'},
    {value: "REGIONAL 8", label: 'REGIONAL 8'},

];

PageCliCnt.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function PageCliCnt() {
    const {themeStretch} = useSettingsContext();

    const [selectedEvent, setSelectedEvent] = useState(null);

    const getInitialValues = () => {

        const initialEvent = {
            open_smartflex: '',
            cl_sap: '',
            almacen_sap: '',
            fecha_creacion: null,
            fecha_cierre: null,
            estado: '',
            regional_canal: ''
        };

        console.log("initialEvent: " + initialEvent);
        return initialEvent;
    };

    const methods = useForm({
        defaultValues: getInitialValues(),

    });

    const {
        reset,
        handleSubmit,
    } = methods;

    const [jsonData, setJsonData] = useState([]);


    useEffect(() => {
        fetchDataInit();
    }, []); // El segundo argumento [] asegura que el efecto solo se ejecute una vez al montar el componente

    const fetchDataInit = async () => {
        try {
            const url = `${API_URL}/api/logistica-nacional/clientes_cnt`;
            const response = await fetch(url);
            const data = await response.json();
            setJsonData(data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const onSubmit = async (data) => {


        // Aquí puedes enviar los datos a través de una solicitud, por ejemplo.
        console.log(data);

        const formattedFechaCreacion = new Date(data.fecha_creacion).toISOString().split('T')[0];
        const formattedFechaCierre = new Date(data.fecha_cierre).toISOString().split('T')[0];

        const url = `${API_URL}/api/logistica-nacional/cliente_cnt`;

        // Crear los datos del cliente a insertar
        const clienteData = {
            open_smartflex: Number(data.open_smartflex),
            cl_sap: data.cl_sap,
            almacen_sap: Number(data.almacen_sap),
            fecha_creacion: formattedFechaCreacion,
            fecha_cierre: formattedFechaCierre,
            estado: data.estado,
            regional_canal: data.regional_canal
        };

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // Convertir los datos del cliente a JSON
        const raw = JSON.stringify(clienteData);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => {

                if (response.status === 200) {

                    // El estado de respuesta es 200, ejecuta tu código aquí
                    console.log('La solicitud tuvo éxito (código 200).');
                    // Puedes agregar más código aquí para realizar acciones específicas.

                    //Listamos nuevamente todos los registros
                    fetchDataInit();

                    //Cerrar el Modal
                    handleCloseModal();

                    //Riniciamos los valores
                    reset();

                } else {
                    console.log('La solicitud no tuvo éxito (código ' + response.status + ').');
                }

            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });

    }

    // Definir un contador autoincremental
    let counter = 0;

    // Función para generar un identificador único para cada fila
    const getRowId = (row) => {
        counter += 1;
        return counter;
    };

    const [openForm, setOpenForm] = useState(false);
    const [openFormUpdate, setOpenFormUpdate] = useState(false);

    const handleOpenModal = () => {
        setOpenForm(true);
    };

    const handleCloseModal = () => {
        setOpenForm(false);
        setSelectedEvent(null);
    };

    const handleOpenModalUpdate = () => {
        setOpenFormUpdate(true);
    };

    const handleCloseModalUpdate = () => {
        setOpenFormUpdate(false);
        setSelectedEvent(null);
        fetchDataInit();
    };

    const TABLE_HEAD = [

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

                const handleDeleteByCVE = () => {
                    console.log(params.row.cve); // Print the 'CVE' value to the console

                    const url = `${API_URL}/api/logistica-nacional/cliente_cnt`;

                    // Crear los datos del cliente a insertar
                    const clienteData = {
                        cve: Number(params.row.cve)
                    };

                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    // Convertir los datos del cliente a JSON
                    const raw = JSON.stringify(clienteData);

                    var requestOptions = {
                        method: 'DELETE',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    fetch(url, requestOptions)
                        .then(response => {

                            if (response.status === 200) {
                                // El estado de respuesta es 200, ejecuta tu código aquí
                                console.log('La solicitud tuvo éxito (código 200).');
                                console.log('Registro eliminado exitosamente.');
                                // Puedes agregar más código aquí para realizar acciones específicas.

                                fetchDataInit();

                            } else {
                                console.log('La solicitud no tuvo éxito (código ' + response.status + ').');
                            }

                        })
                        .catch(error => {
                            console.error('Error en la solicitud:', error);
                        });

                    handleClose();
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
                            <MenuItem onClick={handleDeleteByCVE}>Eliminar</MenuItem>
                            <MenuItem onClick={handleUpdateByCVE}>Editar</MenuItem>

                        </Menu>
                    </div>
                );
            },
        },
        {field: 'cve', headerName: 'CVE', width: 150},
        {field: 'open_smartflex', headerName: 'OPEN_SMARTFLEX', width: 150},
        {field: 'cl_sap', headerName: 'CL_SAP', width: 300},
        {field: 'almacen_sap', headerName: 'ALMACEN_SAP', width: 150},
        {field: 'fecha_creacion', headerName: 'FECHA_CREACION', width: 150},
        {field: 'fecha_cierre', headerName: 'FECHA_CIERRE', width: 150},
        {field: 'estado', headerName: 'ESTADO', width: 150},
        {field: 'regional_canal', headerName: 'REGIONAL_CANAL', width: 150},

    ];

    return (
        <>
            <Head>
                <title> Page Cuatro | Minimal UI</title>
            </Head>

            <Typography variant="h3" component="h1" paragraph>
                CLIENTES CNT
            </Typography>

            <Container maxWidth={themeStretch ? false : 'xl'}>

                <Dialog fullWidth maxWidth="xs" open={openFormUpdate} onClose={handleCloseModalUpdate}>
                    <DialogTitle>Añadir registro</DialogTitle>
                {selectedEvent && <ActualizarDatos
                    initialData={selectedEvent}
                    onCancel={handleCloseModalUpdate}
                />}
                </Dialog>

            </Container>

            <Container maxWidth={themeStretch ? false : 'xl'}>

                <Typography variant="h3" component="h1" paragraph>
                    DETALLE.
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<Iconify icon="eva:plus-fill"/>}
                    onClick={handleOpenModal}
                >
                    Nuevo Registro
                </Button>

                <Box sx={{height: 720}}>
                    <DataGrid
                        rows={jsonData}
                        columns={TABLE_HEAD}
                        getRowId={getRowId}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                    />

                </Box>

            </Container>

            <Dialog fullWidth maxWidth="xs" open={openForm} onClose={handleCloseModal}>
                <DialogTitle>Añadir registro</DialogTitle>

                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

                    <Stack spacing={3} sx={{px: 3}}>

                        <RHFTextField
                            name="open_smartflex"
                            label="OPEN_SMARTFLEX"
                            InputProps={{
                                type: 'number',
                            }}
                        />

                        <RHFTextField
                            name="cl_sap"
                            label="CL_SAP"
                        />

                        <RHFTextField
                            name="almacen_sap"
                            label="ALMACEN_SAP"
                            InputProps={{
                                type: 'number',
                            }}
                        />

                        <DesktopDatePicker
                            label="FECHA_CREACION"
                            name="fecha_creacion"
                            value={methods.watch('fecha_creacion')}
                            minDate={new Date('2017-01-01')}
                            onChange={(newValue) => {
                                methods.setValue('fecha_creacion', newValue);
                            }}
                            renderInput={(params) => <TextField fullWidth {...params} margin="normal"/>}
                        />

                        <DesktopDatePicker
                            label="FECHA_CIERRE"
                            name="fecha_cierre"
                            value={methods.watch('fecha_cierre')}
                            minDate={new Date('2017-01-01')}
                            onChange={(newValue) => {
                                methods.setValue('fecha_cierre', newValue);
                            }}
                            renderInput={(params) => <TextField fullWidth {...params} margin="normal"/>}
                        />

                        <RHFSelect name="estado" label="ESTADO">
                            <MenuItem value="">Seleccionar...</MenuItem>
                            <Divider sx={{borderStyle: 'dashed'}}/>
                            {OPTIONS.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </RHFSelect>

                        <RHFSelect name="regional_canal" label="REGIONAL_CANAL">
                            <MenuItem value="">Seleccionar...</MenuItem>
                            <Divider sx={{borderStyle: 'dashed'}}/>
                            {REGIONAL_CANAL.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </RHFSelect>

                    </Stack>

                    <DialogActions>

                        <Box sx={{flexGrow: 1}}/>

                        <Button variant="outlined" color="inherit" onClick={handleCloseModal}>
                            Cancelar
                        </Button>

                        <LoadingButton type="submit" variant="contained">
                           Agregar
                        </LoadingButton>

                    </DialogActions>

                </FormProvider>

            </Dialog>

        </>
    );
}