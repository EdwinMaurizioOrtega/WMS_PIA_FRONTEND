import React, {useCallback, useEffect, useRef, useState} from 'react';
import Head from 'next/head';

// @mui
import {
    Box, Button, Card,
    CardContent, CardHeader, CircularProgress,
    Container, Divider, Grid, IconButton, Menu, MenuItem, TextField, Tooltip
} from '@mui/material';

import {useSettingsContext} from "../../components/settings";
import DashboardLayout from "../../layouts/dashboard";
import {HOST_API_KEY} from "../../config-global";
import {
    DataGrid, GridActionsCellItem,
    GridToolbarColumnsButton,
    GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton,
    GridToolbarQuickFilter
} from "@mui/x-data-grid";
import EmptyContent from "../../components/empty-content";
import Iconify from "../../components/iconify";
import {PDFDownloadLink, Text} from "@react-pdf/renderer";
import EtiquetasPDF from "../../sections/invoice/EtiquetasPDF";
import Barcode from "react-barcode";
import {useReactToPrint} from "react-to-print";
import styles from "../../sections/invoice/InvoiceStyle";
import ConfirmDialog from "../../components/confirm-dialog";
import MenuPopover from "../../components/menu-popover";


FuxionReporteDespachosTemplate.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function FuxionReporteDespachosTemplate() {

    const {themeStretch} = useSettingsContext();

    const [jsonData, setJsonData] = useState([]);

    const [openPriceUnit, setOpenPriceUnit] = useState(false);

    const [valueNew, setValueNew] = useState('');


    useEffect(() => {
        fetchDataInit();
    }, []); // El segundo argumento [] asegura que el efecto solo se ejecute una vez al montar el componente

    async function fetchDataInit() {
        try {
            const url = `${HOST_API_KEY}/api/fuxion/reporte_despachos`;
            const response = await fetch(url);
            const data = await response.json();
            setJsonData(data.data);

            console.log("dataClientes: " + JSON.stringify(data.data));

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleViewRow = (row) => {
        console.log("Datos de la fila: " + JSON.stringify(row));
    };

    const handleDownloadClick = async (id) => {
        // Your method or logic to execute after the download icon is clicked
        console.log('Download icon clicked!');
        console.log("Número de orden: " + id);

    }

    const [openPopover, setOpenPopover] = useState(null);

    const [selected, setSelected] = useState(false);

    const handleOpenPopover = (event, rowData) => {
        setOpenPopover(event.currentTarget);

        console.log("ID seleccionado:", rowData);
        setSelected(rowData);
    };

    const handleOpenPriceUnit = () => {
        setOpenPriceUnit(true);
    };

    const handleClosePopover = () => {
        setOpenPopover(null);
    };

    const handleClosePriceUnit = () => {
        setOpenPriceUnit(false);
    };

    const handleChange = (event) => {
        setValueNew(event.target.value);
        // console.log(`Nuevo precio unitario ${valueNew}`);
    };


    const handleChangePriceUnit = async () => {

        console.log("ID: " + selected.id);
        console.log("JSON Pedido: " + JSON.stringify(selected.row.NUM_PEDIDO));
        console.log("valueNew: " + valueNew);

        const url = `${HOST_API_KEY}/api/fuxion/update_kg_orden`;

        // Crear los datos del cliente a insertar
        const clienteData = {
            num_orden: `${selected.row.NUM_PEDIDO}`,
            peso: `${valueNew}`,
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

        handleClosePriceUnit();
    }

    const TABLE_HEAD = [



        {
            type: 'actions',
            field: 'actions',
            headerName: ' ',
            align: 'right',
            headerAlign: 'right',
            width: 80,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            getActions: (params) => [

                <BarcodeComponent key={params.row.id} value={params.row} />,

            ],
        },



        {
            field: 'action',
            headerName: ' ',
            width: 80,
            align: 'right',
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => {



                return (
                    <div>

                        <IconButton color={openPopover ? 'inherit' : 'default'}
                                    onClick={(event) => handleOpenPopover(event, params)}>
                            <Iconify icon="eva:more-vertical-fill"/>
                        </IconButton>
                    </div>
                )

            },
        },

        {
            field: 'id',
            hide: true,
        },

        {
            field: 'FECHA_FORMATEADA',
            headerName: 'FECHA',
            width: 200
        },
        {
            field: 'COURIER',
            headerName: 'COURIER',
            width: 200,
        },
        {
            field: 'DESCRIPCION',
            headerName: 'TIPO',
            width: 200,
        },
        {
            field: 'NUM_PEDIDO',
            headerName: 'ORDEN',
            width: 200,
        },
        {
            field: 'GUIA',
            headerName: 'GUIA',
            width: 200,
        },
        {
            field: 'PESO',
            headerName: 'PESO',
            width: 200,
        },
        {
            field: 'RESPONSABLE',
            headerName: 'RESPONSABLE',
            width: 200,
        },
        {
            field: 'ESTATUS',
            headerName: 'ESTATUS',
            width: 200,
        },

    ];


    return (
        <>
            <Head>
                <title> FUXION</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>

                <div className="flex">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <Card>
                                <CardHeader title="Fuxion Reporte Despachos"/>

                                <CardContent>
                                    <Box sx={{height: 720}}>
                                        <DataGrid
                                            rows={jsonData}
                                            columns={TABLE_HEAD}
                                            pagination
                                            slots={{
                                                toolbar: CustomToolbar,
                                                noRowsOverlay: () => <EmptyContent title="No Data"/>,
                                                noResultsOverlay: () => <EmptyContent title="No results found"/>,
                                            }}
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </Container>


            <MenuPopover
                open={openPopover}
                onClose={handleClosePopover}
                arrow="right-top"
                sx={{width: 160}}
            >
                <MenuItem
                    onClick={() => {
                        handleOpenPriceUnit();
                        handleClosePopover();
                    }}
                >
                    <Iconify icon="eva:edit-fill"/>
                    Peso.
                </MenuItem>

                {/*<Divider sx={{borderStyle: 'dashed'}}/>*/}

            </MenuPopover>


            <ConfirmDialog
                open={openPriceUnit}
                onClose={handleClosePriceUnit}
                title="Nuevo peso para el pedido."
                content={`¿Estás seguro de que quieres actualizar el peso KG? `}
                action={
                    <>
                        <TextField
                            label="Nuevo KG."
                            value={valueNew}
                            onChange={handleChange}
                        />
                        <Button variant="contained" color="error" onClick={() => {
                            handleChangePriceUnit();
                        }}
                        >
                            Guardar
                        </Button>
                    </>
                }
            />
        </>

    );
}

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarQuickFilter/>
            <Box sx={{flexGrow: 1}}/>
            <GridToolbarColumnsButton/>
            <GridToolbarFilterButton/>
            <GridToolbarDensitySelector/>
            <GridToolbarExport/>
        </GridToolbarContainer>
    );
}


const BarcodeComponent = ({value}) => {
    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div ref={componentRef} onClick={handlePrint}>
            <div style={{display: 'inline-block', textAlign: 'center'}}>
                <p style={{fontSize: '12px', margin: '10px 0'}}>&nbsp;</p>
                <p style={{fontSize: '12px'}}>Fecha: {obtenerFecha(value.FECHA_FORMATEADA)}</p>
                <p style={{fontSize: '12px'}}>Courier: {value.COURIER}</p>
                <p style={{fontSize: '12px'}}>Tipo: {value.DESCRIPCION}</p>
                <p style={{fontSize: '12px'}}>Guia: {value.GUIA}</p>
                <p style={{fontSize: '12px'}}>Peso (KG): {value.PESO}</p>
                <p style={{fontSize: '12px'}}>Peso (KG): {value.NUM_PEDIDO}</p>
                {/*<Barcode style={{fontSize: '12px'}} value={value.NUM_PEDIDO}/>*/}
            </div>
        </div>
    );
};

function obtenerFecha(fechaCompleta) {
    return fechaCompleta.split(' ')[0];
}
