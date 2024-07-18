import React, {useCallback, useState} from 'react';
import Head from 'next/head';

// @mui
import {
    Container,
} from '@mui/material';

import {useSettingsContext} from "../../components/settings";
import DashboardLayout from "../../layouts/dashboard";
import {Block} from "../../sections/_examples/Block";
import FormProvider, {RHFRadioGroup, RHFUpload} from "../../components/hook-form";
import {HOST_API_KEY} from "../../config-global";
import {useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import LoadingScreen from "../../components/loading-screen";

PageTemplate.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const style = {
    '& > *': {my: '8px !important'},
};

export const defaultValues = {
    radioGroup: '',
    singleUpload: null,
};

export default function PageTemplate() {

    const {themeStretch} = useSettingsContext();

    const [isLoading, setIsLoading] = useState(false); // Nuevo estado para controlar la carga

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

    const handleDropSingleFile = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            const newFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });

            if (newFile) {
                setValue('singleUpload', newFile, {shouldValidate: true});
            }
        },
        [setValue]
    );

    const onSubmit = handleSubmit(async (data) => {
        try {

            reset();
            console.info('DATA', data);

            if ( data.singleUpload != null) {

                let url = `${HOST_API_KEY}/api/logistica-nacional/bulk_upload_of_guides`;;


                console.log("url: " + url);

                const formData = new FormData();
                formData.append(`fileCNT`, data.singleUpload);

                setIsLoading(true); // Activar indicador de carga

                fetch(url, {
                    method: 'POST',
                    body: formData
                })
                    .then(response => {
                        setIsLoading(false); // Desactivar indicador de carga
                        if (response.ok) {
                            // Verificar el código de estado de la respuesta
                            if (response.status === 200) {
                                return response.json(); // Si se espera una respuesta JSON
                            } else {
                                throw new Error('El código de estado de la respuesta no es 200.');
                            }
                        } else {
                            throw new Error('La respuesta de la red no fue exitosa.');
                        }
                    })
                    .then(data => {
                        // Manejar aquí los datos de respuesta exitosos
                        console.log("Body: " + JSON.stringify(data));
                        alert("Respuesta: " + JSON.stringify(data));
                    })
                    .catch(error => {
                        // Manejar errores aquí
                        console.error('Error:', error);
                    });

            } else {
                alert("VERIFICAR EL TIPO DE PLANTILLA Y EL ARCHIVO CARGADO.");
            }

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
                {isLoading ? (
                    // <h2>Cargando...</h2>
                    <LoadingScreen />
                ) : (
                    <FormProvider methods={methods} onSubmit={onSubmit}>
                        <Block title="General" sx={style}>

                            <Block label="RHFUpload">
                                <RHFUpload
                                    name="singleUpload"
                                    maxSize={3145728}
                                    onDrop={handleDropSingleFile}
                                    onDelete={() => setValue('singleUpload', null, {shouldValidate: true})}
                                />
                            </Block>

                            <LoadingButton type="submit" variant="contained" loading={isLoading}>
                                VALIDAR
                            </LoadingButton>
                        </Block>
                    </FormProvider>
                )}
            </Container>
        </>

    );
}