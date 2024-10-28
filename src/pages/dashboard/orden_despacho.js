import Head from "next/head";
import {
    Button, CircularProgress,
    Container, Divider, IconButton, MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField, Tooltip,
    Typography
} from "@mui/material";
import {Masonry} from "@mui/lab";
import {useState} from "react";
import {Block} from "../../sections/_examples/Block";
import {useSettingsContext} from "../../components/settings";
import DashboardLayout from "../../layouts/dashboard";
import {API_URL} from "../../routes/paths";

import Scrollbar from "../../components/scrollbar/Scrollbar";
import {TableHeadCustom} from "../../components/table";

const style = {
    '& > *': {my: '8px !important'},
};

import FormProvider, {
    RHFSelect,
    RHFTextField,
} from '../../components/hook-form';
import {useForm} from "react-hook-form";
import {PDFDownloadLink} from "@react-pdf/renderer";
import InvoicePDF from "../../sections/invoice/InvoicePDF";
import Iconify from "../../components/iconify";
import DespachoInvoicePDF from "../../sections/invoice/DespachoInvoicePDF";
import {HOST_API_KEY} from "../../config-global";
import DespachoOrdenAlbaranPDF from "../../sections/invoice/DespachoOrdenAlbaranPDF";

const OPTIONS = [
    {value: '9000', label: 'HT Miami'},
    {value: '7001', label: 'CNT'},

];

PageCinco.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const TABLE_HEAD = [
    {id: 'NUM_PEDIDO', label: 'NUM_PEDIDO'},
    {id: 'PROCEDENCIA', label: 'PROCEDENCIA', align: 'right'},
    {id: 'FECHA', label: 'FECHA', align: 'right'},
    {id: 'CONTACTO', label: 'CONTACTO', align: 'right'},
    {id: 'TEL_CONTACTO', label: 'TEL_CONTACTO', align: 'right'},
    {id: 'CANTIDAD', label: 'CANTIDAD', align: 'right'},
    {id: 'TOTAL', label: 'TOTAL', align: 'right'},
    {id: 'DESCRIPCION', label: 'DESCRIPCION', align: 'right'},

];

const TABLE_HEAD_DETALLE = [
    {id: 'NUM_PEDIDO', label: 'NUM_PEDIDO'},
    {id: 'PROCEDENCIA', label: 'PROCEDENCIA', align: 'right'},
    {id: 'ARTICULO', label: 'ARTICULO', align: 'right'},
    {id: 'CANTIDAD', label: 'CANTIDAD', align: 'right'},
    {id: 'DESCRIPCION', label: 'DESCRIPCION', align: 'right'},
];


export default function PageCinco() {
    const {themeStretch} = useSettingsContext();
    const [pedidoProveedorX, setPedidoProveedor] = useState('');
    const [procedencia, setProcedencia] = useState('');
    const [jsonDataDespacho, setJsonDataDespacho] = useState([]);
    const [jsonDataDespachoDetalle, setJsonDataDespachoDetalle] = useState([]);

    const defaultValues = {
        pedidoProveedorX: '',
        singleSelect: '',
    };

    const methods = useForm({
        defaultValues,
    });

    const {
        handleSubmit,
    } = methods;

    const onSubmit = async (dataAux) => {

        console.log('pedidoProveedorX: ', dataAux.pedidoProveedorX);
        console.log('procedencia: ', dataAux.singleSelect);

        const pedidoProveedor = dataAux.pedidoProveedorX;
        setPedidoProveedor(dataAux.pedidoProveedorX);
        const procedencia = dataAux.singleSelect;

        if (pedidoProveedor !== '' && procedencia !== ''){

            console.log(`${pedidoProveedor} ${procedencia}`);

            const url = `${HOST_API_KEY}/api/wms/reporte_despacho_pedido_proveedor_albaran?n_pedido=${pedidoProveedor}&procedencia=${procedencia}`;

            fetch(url)
                .then(response => response.json())
                .then(data => setJsonDataDespacho(data.data));

            const url_detalle = `${HOST_API_KEY}/api/wms/reporte_despacho_detalle_pedido_proveedor_albaran?n_pedido=${pedidoProveedor}&procedencia=${procedencia}`;

            fetch(url_detalle)
                .then(response => response.json())
                .then(data => setJsonDataDespachoDetalle(data.data));

        }else {
            alert("Todos los campos son obligatorios.")
        }

    };

    return (
        <>
            <Head>
                <title> Page Cinco | Minimal UI</title>
            </Head>


                <Typography variant="h3" component="h1" paragraph>
                    Despacho
                </Typography>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

                    <Block title="General" sx={style}>

                        <RHFTextField
                            name="pedidoProveedorX"
                            label="PEDIDO"
                        />

                        <RHFSelect name="singleSelect" label="PROCEDENCIA">
                            <MenuItem value="">None</MenuItem>
                            <Divider sx={{borderStyle: 'dashed'}}/>
                            {OPTIONS.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </RHFSelect>

                    </Block>

                    <Button fullWidth size="large" type="submit" variant="contained">
                        Buscar
                    </Button>

                </FormProvider>

            {jsonDataDespacho.length >=1 && jsonDataDespachoDetalle.length >=1  ? (
                <PDFDownloadLink
                    document={<DespachoOrdenAlbaranPDF invoice={jsonDataDespacho} invoice_detail={jsonDataDespachoDetalle}/>}
                    fileName={pedidoProveedorX}
                    style={{textDecoration: 'none'}}
                >
                    {({loading}) => (
                        <Tooltip title="Download">
                            <IconButton>
                                {loading ? (
                                    <CircularProgress size={24} color="inherit"/>
                                ) : (
                                    <Iconify icon="eva:download-fill"/>
                                )}
                            </IconButton>
                        </Tooltip>
                    )}
                </PDFDownloadLink>
            ) : null}

        </>

    );
}