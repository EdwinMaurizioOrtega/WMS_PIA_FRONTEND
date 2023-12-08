import React, {useCallback, useEffect, useState} from 'react';
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
    TableCell, Link, Button, Box
} from '@mui/material';


import {useSettingsContext} from "../../components/settings";
import DashboardLayout from "../../layouts/dashboard";
import {Block} from "../../sections/_examples/Block";
import {Upload} from "../../components/upload";
import {API_URL} from "../../routes/paths"
import FormProvider, {RHFRadioGroup, RHFUpload} from "../../components/hook-form";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import {TableHeadCustom} from "../../components/table";
import {HOST_API_KEY} from "../../config-global";
import {useForm} from "react-hook-form";
import {LoadingButton} from "@mui/lab";
import Iconify from "../../components/iconify";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";

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

    const TABLE_HEAD = [
        {field: 'cve', headerName: 'CVE'},
        {field: 'open_smartflex', headerName: 'OPEN_SMARTFLEX'},
    ];

    // Definir un contador autoincremental
    let counter = 0;

    // Función para generar un identificador único para cada fila
    const getRowId = (row) => {
        counter += 1;
        return counter;
    };

    useEffect(() => {
        fetchDataInit();
    }, []); // El segundo argumento [] asegura que el efecto solo se ejecute una vez al montar el componente

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

    const [jsonData, setJsonData] = useState([]);



    return (
        <>
            <Head>
                <title> Consolidado</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>

                <Typography variant="h3" component="h1" paragraph>
                    DETALLE CONSOLIDADO.
                </Typography>

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

        </>

    );
}