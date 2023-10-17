// next
import Head from 'next/head';
import {
    Autocomplete,
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
import {HOST_API_KEY} from "../../config-global";

// ----------------------------------------------------------------------

const OPTIONS = [
    {value: 0, label: 'Cerrado'},
    {value: 1, label: 'Abierto'},
    {value: 2, label: 'Temporal'},

];

const TIEMPO_ENTREGA = [
    {value: '0', label: '24 HORAS'},
    {value: '1', label: '48 HORAS'},
    {value: '2', label: '120 HORAS'},
    {value: '3', label: '8 DIAS'},
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
            regional: '',
            canal: '',
            descripcion_almacen: '',
            direccion: '',
            provincia: '',
            ciudad: '',
            nombre_contacto: '',
            telefono_contacto: '',
            fecha_modificacion: '',
            cl_sap_indirecto: '',
            correo: '',
            tiempo_entrega: '',
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
    }, [jsonData]); // El segundo argumento [] asegura que el efecto solo se ejecute una vez al montar el componente

    const fetchDataInit = async () => {
        try {
            const url = `${HOST_API_KEY}/api/logistica-nacional/clientes_cnt`;
            const response = await fetch(url);
            const data = await response.json();
            setJsonData(data.data);

            console.log("dataClientes: "+ JSON.stringify(data.data));

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const onSubmit = async (data) => {

        // Aquí puedes enviar los datos a través de una solicitud, por ejemplo.
        console.log(data);

        const formattedFechaCreacion = new Date(data.fecha_creacion).toISOString().split('T')[0];
        const formattedFechaCierre = new Date(data.fecha_cierre).toISOString().split('T')[0];

        const url = `${HOST_API_KEY}/api/logistica-nacional/cliente_cnt`;

        // Crear los datos del cliente a insertar
        const clienteData = {
            open_smartflex: Number(data.open_smartflex),
            cl_sap: data.cl_sap,
            almacen_sap: Number(data.almacen_sap),
            estado: data.estado,
            regional: data.regional,
            canal: data.canal,
            descripcion_almacen: data.descripcion_almacen,
            direccion: data.direccion,
            provincia: JSON.stringify(selectedCityOrigen),
            nombre_contacto: data.nombre_contacto,
            telefono_contacto: data.telefono_contacto,
            cl_sap_indirecto: data.cl_sap_indirecto,
            correo: data.correo,
            tiempo_entrega: data.tiempo_entrega
        };

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // Convertir los datos del cliente a JSON
        const raw = JSON.stringify(clienteData);

        console.log("raw: "+raw);

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

                    const url = `${HOST_API_KEY}/api/logistica-nacional/cliente_cnt`;

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

                const handleCerrarLocalByCVE = () => {
                    console.log(params.row.cve); // Print the 'CVE' value to the console

                    const url = `${HOST_API_KEY}/api/logistica-nacional/close_local_cnt`;

                    // Crear los datos del cliente a insertar
                    const clienteData = {
                        cve: Number(params.row.cve)
                    };

                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    // Convertir los datos del cliente a JSON
                    const raw = JSON.stringify(clienteData);

                    var requestOptions = {
                        method: 'PUT',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    fetch(url, requestOptions)
                        .then(response => {

                            if (response.status === 200) {
                                // El estado de respuesta es 200, ejecuta tu código aquí
                                console.log('La solicitud tuvo éxito (código 200).');
                                console.log('Fecha de cierre se ha registrado correctamente.');
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

                            <MenuItem onClick={handleUpdateByCVE}>Editar</MenuItem>
                            <MenuItem onClick={handleDeleteByCVE}>Eliminar</MenuItem>
                            <MenuItem onClick={handleCerrarLocalByCVE}>Cerrar Local</MenuItem>

                        </Menu>
                    </div>
                );
            },
        },

        {field: 'cve', headerName: 'CVE'},
        {field: 'open_smartflex', headerName: 'OPEN_SMARTFLEX'},
        {field: 'cl_sap', headerName: 'CL_SAP'},
        {field: 'almacen_sap', headerName: 'ALMACEN_SAP'},
        {field: 'fecha_creacion', headerName: 'FECHA_CREACION'},
        {field: 'estado', headerName: 'ESTADO'},
        {field: 'regional', headerName: 'REGIONAL'},
        {field: 'canal', headerName: 'CANAL'},
        {field: 'descripcion_almacen', headerName: 'DESCRIPCION_ALMACEN'},
        {field: 'direccion', headerName: 'DIRECCION'},
        {field: 'provincia', headerName: 'PROVINCIA', renderCell: (params) => {
                // Intenta analizar la cadena JSON en un objeto
                let provinciaObj = {};
                try {
                    provinciaObj = JSON.parse(params.row.provincia);
                } catch (error) {
                    console.error('Error al analizar el JSON de la provincia', error);
                }

                // Accede al valor específico dentro del objeto JSON
                const valorEspecifico = provinciaObj && provinciaObj.provincia + " " + provinciaObj.descripcioncanton + " " + provinciaObj.descripcionparroquia; // (Ejemplo: Supongamos que el objeto tiene una propiedad 'nombre')

                return valorEspecifico;
            }},
        // {field: 'ciudad', headerName: 'CIUDAD'},
        {field: 'nombre_contacto', headerName: 'NOMBRE_CONTACTO'},
        {field: 'telefono_contacto', headerName: 'TELEFONO_CONTACTO'},
        {field: 'fecha_modificacion', headerName: 'FECHA_MODIFICACION'},
        {field: 'fecha_cierre', headerName: 'FECHA_CIERRE'},
        {field: 'cl_sap_indirecto', headerName: 'CL_SAP_INDIRECTO'},
        {field: 'correo', headerName: 'CORREO'},
        {field: 'tiempo_entrega', headerName: 'TIEMPO_ENTREGA'},

    ];

    const [dataCities, setDataCities] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`${HOST_API_KEY}/api/logistica-nacional/parroquias`);
                const result = await response.json();
                setDataCities(result.data);
                console.log("Parroquias: "+ JSON.stringify(result.data));
            } catch (error) {
                console.log('error', error);
            }
        };

        fetchData();

        // Si necesitas hacer algo al desmontar el componente, puedes retornar una función desde useEffect
        return () => {
            // Por ejemplo, limpiar intervalos, cancelar solicitudes, etc.
        };
    }, []); // El segundo argumento es un array de dependencias, en este caso, está vacío para que se ejecute solo una vez

    const [selectedCityOrigen, setSelectedCityOrigen] = useState('');
    const handleCityChangeOrigen = (event, value) => {
        if (value) {
            console.log("Ciudad: "+ JSON.stringify(value));
            setSelectedCityOrigen(value)
        }
    };

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
                    <DialogTitle>Actualizar registro</DialogTitle>
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
                        // columns={TABLE_HEAD}
                        getRowId={getRowId}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        columns={TABLE_HEAD}
                        pagination
                        pageSize={100} // Aquí puedes especificar el número de elementos por página
                        disableVirtualization
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

                        {/*<DesktopDatePicker*/}
                        {/*    label="FECHA_CREACION"*/}
                        {/*    name="fecha_creacion"*/}
                        {/*    value={methods.watch('fecha_creacion')}*/}
                        {/*    minDate={new Date('2017-01-01')}*/}
                        {/*    onChange={(newValue) => {*/}
                        {/*        methods.setValue('fecha_creacion', newValue);*/}
                        {/*    }}*/}
                        {/*    renderInput={(params) => <TextField fullWidth {...params} margin="normal"/>}*/}
                        {/*/>*/}

                        {/*<DesktopDatePicker*/}
                        {/*    label="FECHA_CIERRE"*/}
                        {/*    name="fecha_cierre"*/}
                        {/*    value={methods.watch('fecha_cierre')}*/}
                        {/*    minDate={new Date('2017-01-01')}*/}
                        {/*    onChange={(newValue) => {*/}
                        {/*        methods.setValue('fecha_cierre', newValue);*/}
                        {/*    }}*/}
                        {/*    renderInput={(params) => <TextField fullWidth {...params} margin="normal"/>}*/}
                        {/*/>*/}

                        <RHFSelect name="estado" label="ESTADO">
                            <MenuItem value="">Seleccionar...</MenuItem>
                            <Divider sx={{borderStyle: 'dashed'}}/>
                            {OPTIONS.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </RHFSelect>

                        <RHFSelect name="regional" label="REGIONAL">
                            <MenuItem value="">Seleccionar...</MenuItem>
                            <Divider sx={{borderStyle: 'dashed'}}/>
                            {REGIONAL_CANAL.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </RHFSelect>

                        <RHFTextField
                            name="canal"
                            label="CANAL"
                        />
                        <RHFTextField
                            name="descripcion_almacen"
                            label="DESCRIPCION_ALMACEN"
                        />
                        <RHFTextField
                            name="direccion"
                            label="DIRECCION"
                        />
                        <Autocomplete
                            fullWidth
                            options={dataCities}
                            getOptionLabel={(option) => `${option.provincia} ${option.descripcioncanton} ${option.descripcionparroquia}`}
                            renderInput={(params) => <TextField {...params} label="CIUDAD || CANTON || PARROQUIA"/>}
                            onChange={(event, value) => {
                                handleCityChangeOrigen(event, value);
                            }}
                            sx={{mb: 2}}
                        />

                        <RHFTextField
                            name="nombre_contacto"
                            label="NOMBRE_CONTACTO"
                        />
                        <RHFTextField
                            name="telefono_contacto"
                            label="TELEFONO_CONTACTO"
                        />

                        <RHFTextField
                            name="cl_sap_indirecto"
                            label="CL_SAP_INDIRECTO"
                        />
                        <RHFTextField
                            name="correo"
                            label="CORREO"
                        />

                        <RHFSelect name="tiempo_entrega" label="TIEMPO_ENTREGA">
                            <MenuItem value="">Seleccionar...</MenuItem>
                            <Divider sx={{borderStyle: 'dashed'}}/>
                            {TIEMPO_ENTREGA.map((option) => (
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