import {useForm, FormProvider} from 'react-hook-form';
import {
    Autocomplete,
    Box,
    Button,
    DialogActions,
    Divider,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Tooltip
} from "@mui/material";
import {RHFAutocomplete, RHFSelect, RHFTextField} from "../hook-form";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import React, {useEffect, useState} from "react";
import Iconify from "../iconify";
import {LoadingButton} from "@mui/lab";
import {API_URL} from "../../routes/paths";
import PropTypes from "prop-types";
import {HOST_API_KEY} from "../../config-global";
import {useAuthContext} from "../../auth/useAuthContext";

const OPTIONS = [
    {value: 1, label: 'Abierto'},
    {value: 0, label: 'Cerrado'},
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

const TIEMPO_ENTREGA = [
    {value: 0, label: '24 HORAS'},
    {value: 1, label: '48 HORAS'},
    {value: 2, label: '120 HORAS'},
    {value: 3, label: '8 DIAS'},
];

ActualizarDatos.propTypes = {
    onCancel: PropTypes.func,
};


function ActualizarDatos({initialData, dataCities, onCancel,}) {

    const {user} = useAuthContext();


    console.log("initialData: " + JSON.stringify(initialData));

    console.log("initialData.provincia: " + JSON.stringify(initialData.provincia));

    const provin = dataCities.find((prov) => prov.ID_CIUDAD == initialData.provincia);

    console.log("provin: " + JSON.stringify(provin));

    const methods = useForm({
        defaultValues: {
            open_smartflex: initialData.open_smartflex,
            cl_sap: initialData.cl_sap,
            almacen_sap: initialData.almacen_sap,
            estado: initialData.estado,
            regional: initialData.regional,
            cve: initialData.cve,
            canal: initialData.canal,
            descripcion_almacen: initialData.descripcion_almacen,
            direccion: initialData.direccion,
            provincia: provin,
            nombre_contacto: initialData.nombre_contacto,
            telefono_contacto: initialData.telefono_contacto,
            fecha_modificacion: initialData.fecha_modificacion,
            cl_sap_indirecto: initialData.cl_sap_indirecto,
            correo: initialData.correo,
            tiempo_entrega: initialData.tiempo_entrega,

        },
    });

    //1. Usuarion quien hizo la actualizacion.
    //2. Que campo modifico enviar por correo.
    //3. Puntos temporales || Fecha Inicio - Fecha de cierre.

    const {
        reset,
        handleSubmit,
    } = methods;


    //Actualizar un cliente
    const onSubmit = async (data) => {
        // data contiene los valores del formulario
        console.log("data_actualizar: " + JSON.stringify(data));
        console.log("selectedCityOrigen: " + JSON.stringify(selectedCityOrigen))
        console.log("selectedOption: "+ selectedOption)

        // const formattedFechaCreacion = new Date(data.fecha_creacion).toISOString().split('T')[0];
        // const formattedFechaCierre = new Date(data.fecha_cierre).toISOString().split('T')[0];

        const url = `${HOST_API_KEY}/api/logistica-nacional/cliente_cnt`;

        // Crear los datos del cliente a insertar
        const clienteData = {
            open_smartflex: data.open_smartflex,
            cl_sap: data.cl_sap,
            almacen_sap: data.almacen_sap,
            estado: Number(selectedOption),
            regional: data.regional,
            cve: Number(data.cve),
            canal: data.canal,
            descripcion_almacen: data.descripcion_almacen,
            direccion: data.direccion,
            provincia: `${data.provincia.ID_CIUDAD}`,
            nombre_contacto: data.nombre_contacto,
            telefono_contacto: data.telefono_contacto,
            cl_sap_indirecto: data.cl_sap_indirecto,
            correo: data.correo,
            tiempo_entrega: data.tiempo_entrega,
            user_update: user?.username,
            temp_loc_fecha_cierre: data.fecha_cierre,
            temp_loc_fecha_apertura: data.fecha_apertura,
        };

        console.log("clienteData: " + JSON.stringify(clienteData));

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
                    console.log('Actualizacion tuvo éxito (código 200).');
                    //alert("La actualización tuvo exito.");

                    onCancel();
                    reset();
                    // Puedes agregar más código aquí para realizar acciones específicas.

                } else {
                    console.log('Actualizacion no tuvo éxito (código ' + response.status + ').');
                }

            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    };

    const handleCloseModal = () => {
        // setSelectedEvent(null);
        console.log("Cancelar la actualización.")
        onCancel();
        reset();
    };


    const [selectedCityOrigen, setSelectedCityOrigen] = useState('');
    const handleCityChangeOrigen = (event, value) => {
        if (value) {
            console.log("Ciudad: " + JSON.stringify(value));
            setSelectedCityOrigen(value)
        }
    };

    const defaultValue = {
        ID_CIUDAD: 30,
        NOMBRE_CIUDAD: "BAHIA DE CARAQUEZ",
        NOMBRE_PROVINCIA: "MANABI"
    };

    const [selectedOption, setSelectedOption] = useState(initialData.estado);

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (

        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>

                <Stack spacing={3} sx={{px: 3}}>
                    <RHFTextField
                        name="cve"
                        label="CVE"
                        InputProps={{
                            type: 'number',
                            disabled: true // Aquí establecemos disabled en true para deshabilitar la edición
                        }}
                    />
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

                    <RHFSelect name="estado" label="ESTADO" value={selectedOption}
                               onChange={handleSelectChange}>
                        <MenuItem value="">Seleccionar...</MenuItem>
                        <Divider sx={{borderStyle: 'dashed'}}/>
                        {OPTIONS.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </RHFSelect>


                    {selectedOption === 2 && (
                        <div>
                            {/* Aquí coloca el texto que deseas mostrar cuando la opción temporal está seleccionada */}
                            {/*Temporal:*/}
                            <DesktopDatePicker
                                label="FECHA_CIERRE"
                                name="fecha_cierre"
                                value={methods.watch('fecha_cierre')}
                                minDate={new Date('2023-06-01')}
                                onChange={(newValue) => {
                                    methods.setValue('fecha_cierre', newValue);
                                }}
                                renderInput={(params) => <TextField fullWidth {...params} margin="normal"/>}
                            />

                            <DesktopDatePicker
                                label="FECHA_APERTURA"
                                name="fecha_apertura"
                                value={methods.watch('fecha_apertura')}
                                minDate={new Date('2023-06-01')}
                                onChange={(newValue) => {
                                    methods.setValue('fecha_apertura', newValue);
                                }}
                                renderInput={(params) => <TextField fullWidth {...params} margin="normal"/>}
                            />
                        </div>
                    )}

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

                    <RHFAutocomplete
                        name="provincia"
                        label="CIUDAD | PROVINCIA"
                        options={dataCities}
                        getOptionLabel={(option) => `${option.NOMBRE_CIUDAD} ${option.NOMBRE_PROVINCIA}`}
                    />

                    {/*<RHFSelect name="provincia" label="CIUDAD | PROVINCIA">*/}
                    {/*    <MenuItem value="">Seleccionar...</MenuItem>*/}
                    {/*    <Divider sx={{borderStyle: 'dashed'}}/>*/}
                    {/*    {dataCities.map((option) => (*/}
                    {/*        <MenuItem key={option.ID_CIUDAD} value={option.ID_CIUDAD}>*/}
                    {/*            {option.NOMBRE_CIUDAD}*/}
                    {/*        </MenuItem>*/}
                    {/*    ))}*/}
                    {/*</RHFSelect>*/}

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

                    <Button type="submit" variant="contained">
                        Actualizar
                    </Button>

                    <Button variant="contained" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                </DialogActions>
            </form>
        </FormProvider>
    );
}

export default ActualizarDatos;
