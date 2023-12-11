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

ActualizarConsolidado.propTypes = {
    onCancel: PropTypes.func,
};


function ActualizarConsolidado({initialData, onCancel,}) {

    const {user} = useAuthContext();

    console.log("initialData: " + JSON.stringify(initialData));

    const methods = useForm({
        defaultValues: {
            pedido: initialData.PEDIDO,
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

        // const url = `${HOST_API_KEY}/api/logistica-nacional/cliente_cnt`;
        //
        // // Crear los datos del cliente a insertar
        // const clienteData = {
        //     pedido: data.pedido,
        // };
        //
        // console.log("clienteData: " + JSON.stringify(clienteData));
        //
        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        //
        // // Convertir los datos del cliente a JSON
        // const raw = JSON.stringify(clienteData);
        //
        // var requestOptions = {
        //     method: 'PUT',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };
        //
        // fetch(url, requestOptions)
        //     .then(response => {
        //
        //         if (response.status === 200) {
        //
        //             // El estado de respuesta es 200, ejecuta tu código aquí
        //             console.log('Actualizacion tuvo éxito (código 200).');
        //             //alert("La actualización tuvo exito.");
        //
        //             onCancel();
        //             reset();
        //             // Puedes agregar más código aquí para realizar acciones específicas.
        //
        //         } else {
        //             console.log('Actualizacion no tuvo éxito (código ' + response.status + ').');
        //         }
        //
        //     })
        //     .catch(error => {
        //         console.error('Error en la solicitud:', error);
        //     });
    };

    const handleCloseModal = () => {
        // setSelectedEvent(null);
        console.log("Cancelar la actualización.")
        onCancel();
        reset();
    };


    const [selectedOption, setSelectedOption] = useState(initialData.estado);

    return (

        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>

                <Stack spacing={3} sx={{px: 3}}>

                    <RHFTextField
                        name="pedido"
                        label="PEDIDO"
                    />

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

export default ActualizarConsolidado;
