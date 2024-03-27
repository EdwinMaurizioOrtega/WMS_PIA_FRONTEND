import React, {useCallback, useState} from 'react';
import Head from 'next/head';

// @mui
import {
    Button,
    Container, Typography,
} from '@mui/material';

import {useSettingsContext} from "../../components/settings";
import DashboardLayout from "../../layouts/dashboard";
import {Block} from "../../sections/_examples/Block";
import FormProvider, {RHFRadioGroup, RHFTextField, RHFUpload} from "../../components/hook-form";
import {HOST_API_KEY} from "../../config-global";
import {useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import LoadingScreen from "../../components/loading-screen";
import {Label} from "@mui/icons-material";

PageFuxionTemplate.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const style = {
    '& > *': {my: '8px !important'},
};

export const defaultValues = {
    n_pedido: '',
    n_guia: ''

};

export default function PageFuxionTemplate() {

    const {themeStretch} = useSettingsContext();

    const methods = useForm({
        // resolver: yupResolver(FormSchema),
        defaultValues,
    });

    const {
        watch,
        reset,
        control,
        setValue,
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const onSubmitGuia = handleSubmit(async (data) => {
        try {

            reset();
            console.info('DATA', data);

            const url = `${HOST_API_KEY}/api/fuxion/update_guia_pdf`;

            // Crear los datos del cliente a insertar
            const clienteData = {
                n_pedido: data.n_pedido,
                num_guia: data.n_guia,
                url_guia: 'hola_hola',
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

                        //Riniciamos los valores
                        reset();

                    } else {
                        console.log('La solicitud no tuvo éxito (código ' + response.status + ').');
                    }

                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                });


        } catch (error) {
            console.error(error);
        }

    });

    return (
        <>
            <Head>
                <title> Plantillas</title>
            </Head>


            <Container maxWidth={themeStretch ? false : 'xl'}>

                    <FormProvider methods={methods} onSubmit={onSubmitGuia}>

                        <Block title="Actualizar Guia CWMS" sx={style}>

                            <RHFTextField
                                name="n_pedido"
                                label="Número de Pedido"
                            />

                            <RHFTextField
                                name="n_guia"
                                label="Número de guia"
                            />

                            <Button type="submit" variant="contained" >
                                Actualizar
                            </Button>
                        </Block>
                    </FormProvider>

            </Container>
        </>

    );
}