import {useForm, FormProvider} from 'react-hook-form';
import {Box, Button, DialogActions, Divider, IconButton, MenuItem, Stack, TextField, Tooltip} from "@mui/material";
import {RHFSelect, RHFTextField} from "../../components/hook-form";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import React from "react";
import Iconify from "../../components/iconify";
import {LoadingButton} from "@mui/lab";
import {API_URL} from "../../routes/paths";
import PropTypes from "prop-types";

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

ActualizarDatos.propTypes = {

    onCancel: PropTypes.func,

};


function ActualizarDatos({initialData, onCancel,}) {

    console.log("initialData: " + JSON.stringify(initialData)); // Print the 'CVE' value to the console

    const methods = useForm({
        defaultValues: {
            open_smartflex: initialData.open_smartflex,
            cl_sap: initialData.cl_sap,
            almacen_sap: initialData.almacen_sap,
            fecha_creacion: initialData.fecha_creacion,
            fecha_cierre: initialData.fecha_cierre,
            estado: initialData.estado,
            regional_canal: initialData.regional_canal,
            cve: initialData.cve,
        },
    });

    const {
        reset,
        handleSubmit,
    } = methods;

    const onSubmit = async (data) => {
        // data contiene los valores del formulario
        console.log("data: " + JSON.stringify(data));

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
            estado: Number(data.estado),
            regional_canal: data.regional_canal,
            cve: Number(data.cve),

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
