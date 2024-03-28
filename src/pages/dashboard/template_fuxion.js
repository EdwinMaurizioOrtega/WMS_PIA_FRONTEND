import React, {useCallback, useState} from 'react';
import Head from 'next/head';

// @mui
import {
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
    // radioGroup: '',
    // singleUpload: null,
    multiUpload: null
};

export default function PageFuxionTemplate() {

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

    const values = watch();

    const onSubmit = handleSubmit(async (data) => {
        try {

            reset();
            console.info('DATA', data);

            if (data.multiUpload != null
                && data.multiUpload.length === 2
                && data.radioGroup != null
                && data.corte != null
            ) {

                let url;

                if (data.radioGroup === "1") {
                    url = `${HOST_API_KEY}/api/fuxion/pedidos_delivery`;
                }

                if (data.radioGroup === "2") {
                    url = `${HOST_API_KEY}/api/fuxion/pedidos_consolidado`;
                }

                console.log("url: " + url);

                const formData = new FormData();
                formData.append(`corte`, data.corte);
                formData.append(`multiUpload`, data.multiUpload[0]);
                formData.append(`multiUpload`, data.multiUpload[1]);

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
                alert("Subir dos archivos.");
            }

        } catch (error) {
            console.error(error);
        }
    });

    const handleDropMultiFile = useCallback(
        (acceptedFiles) => {
            const files = values.multiUpload || [];

            const newFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );

            setValue('multiUpload', [...files, ...newFiles], {
                shouldValidate: true,
            });
        },
        [setValue, values.multiUpload]
    );

    return (
        <>
            <Head>
                <title> Plantillas</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>
                {isLoading ? (
                    // <h2>Cargando...</h2>
                    <LoadingScreen/>
                ) : (




                    <FormProvider methods={methods} onSubmit={onSubmit}>

                        <Block title="Archivos" sx={style}>

                            <RHFTextField
                                name="corte"
                                label="CORTE"
                            />

                            <RHFRadioGroup
                                row
                                name="radioGroup"
                                label="Tipo"
                                spacing={4}
                                options={[
                                    {value: '1', label: 'DELIVERY'},
                                    {value: '2', label: 'CONSOLIDADO'},
                                    {value: '3', label: 'ESPECIALES'},

                                ]}
                            />


                            {/*<RHFRadioGroup*/}
                            {/*    row*/}
                            {/*    name="radioGroup"*/}
                            {/*    label="Plantilla Pedidos"*/}
                            {/*    spacing={4}*/}
                            {/*    options={[*/}
                            {/*        {value: '1', label: 'BASE COMPLETA'},*/}
                            {/*        {value: '2', label: 'MECANIZADO'},*/}
                            {/*        // {value: '3', label: 'PEDIDOS_REABASTECIMIENTO'},*/}
                            {/*        // {value: '4', label: 'POP'},*/}
                            {/*    ]}*/}
                            {/*/>*/}

                            <Typography variant="subtitle1" component="div" gutterBottom>
                                (1) MECANIZADO + (2) BASE COMPLETA
                            </Typography>
                            <Block label="RHFUpload">
                                <RHFUpload
                                    multiple
                                    thumbnail
                                    name="multiUpload"
                                    maxSize={3145728}
                                    onDrop={handleDropMultiFile}
                                    onRemove={(inputFile) =>
                                        setValue(
                                            'multiUpload',
                                            values.multiUpload && values.multiUpload?.filter((file) => file !== inputFile),
                                            {shouldValidate: true}
                                        )
                                    }
                                    // onRemoveAll={() => setValue('multiUpload', [], { shouldValidate: true })}
                                    // onUpload={() => console.info('ON UPLOAD')}
                                />
                            </Block>


                            {/*<Typography variant="subtitle1" component="div" gutterBottom>*/}
                            {/*    BASE COMPLETA*/}
                            {/*</Typography>*/}
                            {/*<Block label="RHFUpload">*/}
                            {/*    <RHFUpload*/}
                            {/*        multiple*/}
                            {/*        thumbnail*/}
                            {/*        name="singleUpload1"*/}
                            {/*        maxSize={3145728}*/}
                            {/*        onDrop={handleDropSingleFile1}*/}
                            {/*        onDelete={() => setValue('singleUpload1', null, {shouldValidate: true})}*/}
                            {/*        onUpload={() => console.info('ON UPLOAD')}*/}

                            {/*    />*/}
                            {/*</Block>*/}
                            {/*<Typography variant="subtitle1" component="div" gutterBottom>*/}
                            {/*    MECANIZADO*/}
                            {/*</Typography>*/}
                            {/*<Block label="RHFUpload">*/}
                            {/*    <RHFUpload*/}
                            {/*        name="singleUpload2"*/}
                            {/*        maxSize={3145728}*/}
                            {/*        onDrop={handleDropSingleFile2}*/}
                            {/*        onDelete={() => setValue('singleUpload2', null, {shouldValidate: true})}*/}
                            {/*    />*/}
                            {/*</Block>*/}

                            <LoadingButton type="submit" variant="contained" loading={isLoading}>
                                Enviar
                            </LoadingButton>
                        </Block>
                    </FormProvider>
                )}
            </Container>
        </>

    );
}