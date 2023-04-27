// next
import Head from 'next/head';
import {
    Box,
    Button, CircularProgress,
    Container, IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField, Tooltip,
    Typography
} from '@mui/material';
// layouts
import {Masonry} from "@mui/lab";
import {useState} from "react";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import {DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport} from "@mui/x-data-grid";
import {useDemoData} from "@mui/x-data-grid-generator";
import DashboardLayout from '../../layouts/dashboard';
// components
import {useSettingsContext} from '../../components/settings';
import {Block} from "../../sections/_examples/Block";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import {TableHeadCustom} from "../../components/table";
import Image from "../../components/image";
import Iconify from "../../components/iconify";
import {API_URL} from "../../routes/paths"

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    {id: 'PEDIDO_PROV', label: 'PEDIDO_PROV'},
    {id: 'FEC_INGRESO', label: 'FEC_INGRESO', align: 'right'},
    {id: 'ESTATUS', label: 'ESTATUS', align: 'right'},
    {id: 'CLIENTE', label: 'CLIENTE', align: 'right'},
    {id: 'PROVEEDOR', label: 'PROVEEDOR', align: 'right'},
    {id: 'DATO1', label: 'EMBARCADOR', align: 'right'},
    {id: 'DATO2', label: 'NOMBRE CONDUCTOR', align: 'right'},
    {id: 'DATO3', label: 'DN', align: 'right'},
    // {id: 'DATO5', label: 'DATO5', align: 'right'},
    {id: 'FACTURA_FAB', label: 'FACTURA_FAB', align: 'right'},
    {id: 'BULTOS', label: 'NUM_BULTOS', align: 'right'},
    // {id: 'DATO4', label: 'DIMENSIONES', align: 'right'},
    {id: 'VAL2', label: 'VOLUMEN', align: 'right'},
    {id: 'PESO', label: 'PESO TOTAL', align: 'right'},
    {id: 'USUARIO', label: 'USUARIO', align: 'right'},

];

const TABLE_HEAD_CANTIDAD_DETALLE = [
    {id: 'PEDIDO_PROV', label: 'PEDIDO_PROV'},
    {id: 'ARTICULO', label: 'ARTICULO', align: 'right'},
    {id: 'DESCRIPCION', label: 'DESCRIPCION', align: 'right'},
    {id: 'CANTIDAD', label: 'CANTIDAD', align: 'right'},
];

const TABLE_HEAD_DETALLE = [
    {id: 'PEDIDO_PROV', label: 'PEDIDO_PROV'},
    {id: 'PROCEDENCIA', label: 'PROCEDENCIA', align: 'right'},
    {id: 'ARTICULO', label: 'ARTICULO', align: 'right'},
    {id: 'DESCRIPCION', label: 'DESCRIPCION', align: 'right'},
    {id: 'SERIE', label: 'SERIE', align: 'right'},
];


const columnsExample = [
    { field: 'PEDIDO_PROV', headerName: 'PEDIDO_PROV', width: 70 },
    { field: 'PROCEDENCIA', headerName: 'PROCEDENCIA', width: 130 },
    { field: 'ARTICULO', headerName: 'ARTICULO', width: 90 },
    { field: 'DESCRIPCION', headerName: 'DESCRIPCION', width: 90 },
    { field: 'SERIE', headerName: 'SERIE', width: 90 },
];


function CustomToolbar() {
    return (
        <GridToolbarContainer>

            <GridToolbarExport
                printOptions={{
                    hideFooter: false,

                }}

                />
        </GridToolbarContainer>
    );
}

const TABLE_HEAD_LISTA_IMAGENES = [

    {id: 'pedidoProveedor', label: 'pedidoProveedor', align: 'left'},
    {id: 'procedencia', label: 'procedencia', align: 'left'},
    {id: 'createdAt', label: 'createdAt', align: 'left'},
    {id: 'selectedFile', label: 'selectedFile', align: 'left'},
];

const style = {
    '& > *': {my: '8px !important'},
};

PageOne.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function PageOne() {
    const {themeStretch} = useSettingsContext();

    const [pedidoProveedor, setPedidoProveedor] = useState('');
    const [procedencia, setProcedencia] = useState('');
    const [jsonData, setJsonData] = useState([]);
    const [jsonDataDetalle, setJsonDataDetalle] = useState([]);
    const [jsonCantidadDataDetalle, setJsonCantidadDataDetalle] = useState([]);
    const [jsonDataListaImagenes, setJsonDataListaImagenes] = useState([]);

    const handleClick = () => {

        if (pedidoProveedor !== '' && procedencia !== ''){
            console.log(`${pedidoProveedor} ${procedencia}`);

            const url = `${API_URL}/api/wms/reporte_pedido_proveedor?n_pedido=${pedidoProveedor}&procedencia=${procedencia}`;

            fetch(url)
                .then(response => response.json())
                .then(data => setJsonData(data.data));

            const url_detalle = `${API_URL}/api/wms/reporte_detalle_pedido_proveedor?n_pedido=${pedidoProveedor}&procedencia=${procedencia}`;

            fetch(url_detalle)
                .then(response => response.json())
                .then(data => setJsonDataDetalle(data.data));

            const url_cantidad_detalle = `${API_URL}/api/wms/reporte_cantidad_detalle_pedido_proveedor?n_pedido=${pedidoProveedor}&procedencia=${procedencia}`;

            fetch(url_cantidad_detalle)
                .then(response => response.json())
                .then(data => setJsonCantidadDataDetalle(data.data));

            const url_lista_imagenes = `${API_URL}/api/mogo-db-wms/lista_imagenes?pedidoProveedor=${pedidoProveedor}&procedencia=${procedencia}`;

            fetch(url_lista_imagenes)
                .then(response => response.json())
                .then(data => setJsonDataListaImagenes(data.data));

        }else {
            alert("Todos los campos son obligatorios.")
        }

    };

    const [idCount, setIdCount] = useState(0);
    function getRowId(row) {
        if (!row.id) {
            setIdCount(idCount + 1);
            return idCount;
        }
        return row.id;
    }


    const { data, loading } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 4,
        maxColumns: 6,
    });

    return (
        <>
            <Head>
                <title> Page Cuatro | Minimal UI</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'xl'}>


                <Masonry columns={{xs: 1, md: 2}} spacing={3}>
                    <Block title="General" sx={style}>

                        <Typography variant="h3" component="h1" paragraph>
                            Número pedido proveedor.
                        </Typography>

                        <TextField type="text" className="form-control email" name="email" id="email2"
                                   placeholder="PEDIDO PROVEEDOR"
                                   value={pedidoProveedor}
                                   onChange={e => {
                                       setPedidoProveedor(e.currentTarget.value);
                                   }}
                        />

                        <TextField type="text" className="form-control email" name="email" id="email2"
                                   placeholder="PROCEDENCIA"
                                   value={procedencia}
                                   onChange={e => {
                                       setProcedencia(e.currentTarget.value);
                                   }}
                        />
                        <Button className="btn btn-dark"

                                onClick={() => {
                                    handleClick()
                                }}
                        >BUSCAR</Button>
                    </Block>
                </Masonry>

                <Typography variant="h3" component="h1" paragraph>
                    Pedido.
                </Typography>

                <TableContainer sx={{mt: 3, overflow: 'unset'}} id="tabla_cantidad">
                    <Scrollbar>
                        <Table sx={{minWidth: 800}}>
                            <TableHeadCustom headLabel={TABLE_HEAD}/>

                            <TableBody>
                                {jsonData.map((row, indexdos) => (
                                    <TableRow key={indexdos}>
                                        <TableCell>{row.PEDIDO_PROV}</TableCell>
                                        <TableCell align="right">{row.FEC_INGRESO}</TableCell>

                                        <TableCell align="right">{row.ESTATUS ==='N' ? 'NUEVO' : 'FINALIZADO'}</TableCell>
                                        <TableCell align="right">{row.CLIENTE}</TableCell>
                                        <TableCell align="right">{row.PROVEEDOR}</TableCell>
                                        <TableCell align="right">{row.DATO1}</TableCell>
                                        <TableCell align="right">{row.DATO2}</TableCell>
                                        <TableCell align="right">{row.DATO3}</TableCell>
                                        <TableCell align="right">{row.FACTURA_FAB}</TableCell>
                                        <TableCell align="right">{row.BULTOS}</TableCell>
                                        <TableCell align="right">{row.VAL2}</TableCell>
                                        <TableCell align="right">{row.PESO}</TableCell>
                                        <TableCell align="right">{row.USUARIO}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </TableContainer>

                <Typography variant="h3" component="h1" paragraph>
                    Resumen pedido
                </Typography>


                <Button  variant="contained">Generar PDF</Button>


                <TableContainer sx={{mt: 3, overflow: 'unset'}}>
                    <Scrollbar>
                        <Table sx={{minWidth: 800}}>
                            <TableHeadCustom headLabel={TABLE_HEAD_CANTIDAD_DETALLE}/>

                            <TableBody>
                                {jsonCantidadDataDetalle.map((row, indexuno) => (
                                    <TableRow key={indexuno}>
                                        <TableCell>{row.PEDIDO_PROV}</TableCell>
                                        <TableCell align="right">{row.ARTICULO}</TableCell>
                                        <TableCell align="right">{row.DESCRIPCION}</TableCell>
                                        <TableCell align="right">{row.CANTIDAD}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </TableContainer>

                <Typography variant="h3" component="h1" paragraph>
                    Detalle del pedido.
                </Typography>

                <Button  variant="contained">Exportar a EXCEL</Button>

                <TableContainer sx={{mt: 3, overflow: 'unset'}}>
                    <Scrollbar>
                        <Table sx={{minWidth: 800}}>
                            <TableHeadCustom headLabel={TABLE_HEAD_DETALLE}/>

                            <TableBody>
                                {jsonDataDetalle.map((row, indexuno) => (
                                    <TableRow key={indexuno}>
                                        <TableCell>{row.PEDIDO_PROV}</TableCell>
                                        <TableCell align="right">{row.PROCEDENCIA}</TableCell>
                                        <TableCell align="right">{row.ARTICULO}</TableCell>
                                        <TableCell align="right">{row.DESCRIPCION}</TableCell>
                                        <TableCell align="right">{row.SERIE}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </TableContainer>

                <Typography variant="h3" component="h1" paragraph>
                    Lista de imágenes.
                </Typography>

                <TableContainer sx={{mt: 3, overflow: 'unset'}}>
                    <Scrollbar>
                        <Table sx={{minWidth: 800}}>
                            <TableHeadCustom headLabel={TABLE_HEAD_LISTA_IMAGENES}/>

                            <TableBody>
                                {jsonDataListaImagenes.map((row) => (
                                    <TableRow key={row._id}>

                                        <TableCell>{row.pedidoProveedor}</TableCell>
                                        <TableCell >{row.procedencia}</TableCell>
                                        <TableCell >{row.createdAt}</TableCell>
                                        <TableCell >
                                            {row.selectedFile.map((imageData, index) => (
                                                <Image
                                                    key={index}
                                                    src={imageData}
                                                    src={`data:image/jpeg;base64,${ imageData}`}

                                                    sx={{ width: 500, height: 500 }}
                                                />
                                            ))}

                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </TableContainer>


            </Container>
        </>

    );
}
