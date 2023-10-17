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
import {RHFSelect, RHFTextField} from "../hook-form";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import React, {useEffect, useState} from "react";
import Iconify from "../iconify";
import {LoadingButton} from "@mui/lab";
import {API_URL} from "../../routes/paths";
import PropTypes from "prop-types";
import {HOST_API_KEY} from "../../config-global";

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

const TIEMPO_ENTREGA = [
    {value: 0, label: '24 HORAS'},
    {value: 1, label: '48 HORAS'},
    {value: 2, label: '120 HORAS'},
    {value: 3, label: '8 DIAS'},
];

ActualizarDatos.propTypes = {

    onCancel: PropTypes.func,

};


function ActualizarDatos({initialData, onCancel,}) {

    console.log("initialData: " + JSON.stringify(initialData)); // Print the 'CVE' value to the console

    const initialDataParsed = JSON.parse(initialData.provincia);


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
            provincia: initialDataParsed.provincia,
            nombre_contacto: initialData.nombre_contacto,
            telefono_contacto: initialData.telefono_contacto,
            fecha_modificacion: initialData.fecha_modificacion,
            cl_sap_indirecto: initialData.cl_sap_indirecto,
            correo: initialData.correo,
            tiempo_entrega: initialData.tiempo_entrega,

        },
    });

    const {
        reset,
        handleSubmit,
    } = methods;


    //Actualizar un cliente
    const onSubmit = async (data) => {
        // data contiene los valores del formulario
        console.log("data: " + JSON.stringify(data));
        console.log("selectedCityOrigen: "+ JSON.stringify(selectedCityOrigen))

        // const formattedFechaCreacion = new Date(data.fecha_creacion).toISOString().split('T')[0];
        // const formattedFechaCierre = new Date(data.fecha_cierre).toISOString().split('T')[0];

        const url = `${HOST_API_KEY}/api/logistica-nacional/cliente_cnt`;

        // Crear los datos del cliente a insertar
        const clienteData = {
            open_smartflex: Number(data.open_smartflex),
            cl_sap: data.cl_sap,
            almacen_sap: Number(data.almacen_sap),
            estado: Number(data.estado),
            regional: data.regional,
            cve: Number(data.cve),
            canal: data.canal,
            descripcion_almacen: data.descripcion_almacen,
            direccion: data.direccion,
            provincia: JSON.stringify(selectedCityOrigen),
            nombre_contacto: data.nombre_contacto,
            telefono_contacto: data.telefono_contacto,
            cl_sap_indirecto: data.cl_sap_indirecto,
            correo: data.correo,
            tiempo_entrega: data.tiempo_entrega,
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

                    {/*<label>{initialDataParsed.provincia} {initialDataParsed.descripcioncanton} {initialDataParsed.descripcionparroquia}</label>*/}

                    <Autocomplete
                        fullWidth
                        options={dataCities}
                        getOptionLabel={(option) => `${option.provincia} ${option.descripcioncanton} ${option.descripcionparroquia}`}
                        renderInput={(params) => <TextField {...params} label="CIUDAD || CANTON || PARROQUIA"/>}
                        onChange={(event, value) => {
                            handleCityChangeOrigen(event, value);
                        }}
                        value={initialDataParsed}
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
