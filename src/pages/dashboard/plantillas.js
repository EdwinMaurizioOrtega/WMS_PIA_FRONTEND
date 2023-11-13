import React, {useCallback, useState} from 'react';
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
    TableCell, Link, Button
} from '@mui/material';


import {useSettingsContext} from "../../components/settings";
import DashboardLayout from "../../layouts/dashboard";
import {Block} from "../../sections/_examples/Block";
import {Upload} from "../../components/upload";
import {API_URL} from "../../routes/paths"
import FormProvider, { RHFRadioGroup, RHFUpload } from "../../components/hook-form";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import {TableHeadCustom} from "../../components/table";
import {HOST_API_KEY} from "../../config-global";
import {useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";

const OPTIONS = [
    {value: '9000', label: 'HT Miami'},
    {value: '7001', label: 'CNT'},

];

const TABLE_HEAD_LISTA_IMAGENES = [

    {id: 'ulr', label: 'URL', align: 'left'},
    {id: 'opciones', label: 'Opciones', align: 'left'},

];

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
        formState: { isSubmitting },
    } = methods;

    const handleDropSingleFile = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            const newFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });

            if (newFile) {
                setValue('singleUpload', newFile, { shouldValidate: true });
            }
        },
        [setValue]
    );

    const onSubmit = handleSubmit(async (data) => {
        try {
            //await new Promise((resolve) => setTimeout(resolve, 3000));
            reset();
            console.info('DATA', data);






        } catch (error) {
            console.error(error);
        }
    });

    return (
        <>
            <Head>
                <title> Page Cuatro | Minimal UI</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>

                <FormProvider methods={methods} onSubmit={onSubmit}>

                    <Block title="General" sx={style}>

                        <RHFRadioGroup
                            row
                            name="radioGroup"
                            label="Plantilla Pedidos"
                            spacing={4}
                            options={[
                                {value: '1', label: 'PEDIDOS_PUNTUALES'},
                                {value: '2', label: 'PEDIDOS_INDIRECTOS'},
                                {value: '3', label: 'PEDIDOS_REABASTECIMIENTO'},
                                {value: '4', label: 'POP'},
                            ]}
                        />

                        <Block label="RHFUpload">
                            <RHFUpload
                                name="singleUpload"
                                maxSize={3145728}
                                onDrop={handleDropSingleFile}
                                onDelete={() => setValue('singleUpload', null, { shouldValidate: true })}
                            />
                        </Block>

                        <LoadingButton type="submit" variant="contained">
                            VALIDAR
                        </LoadingButton>

                    </Block>
                </FormProvider>

            </Container>
        </>

    );
}