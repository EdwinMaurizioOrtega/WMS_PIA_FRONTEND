import Head from "next/head";
import {
    Button,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
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
    const [pedidoProveedor, setPedidoProveedor] = useState('');
    const [procedencia, setProcedencia] = useState('');
    const [jsonDataDespacho, setJsonDataDespacho] = useState([]);
    const [jsonDataDespachoDetalle, setJsonDataDespachoDetalle] = useState([]);


    const handleClick = () => {

        if (pedidoProveedor !== '' && procedencia !== ''){

            console.log(`${pedidoProveedor} ${procedencia}`);

            const url = `${API_URL}/api/wms/reporte_despacho_pedido_proveedor?n_pedido=${pedidoProveedor}&procedencia=${procedencia}`;

            fetch(url)
                .then(response => response.json())
                .then(data => setJsonDataDespacho(data.data));

            const url_detalle = `${API_URL}/api/wms/reporte_despacho_detalle_pedido_proveedor?n_pedido=${pedidoProveedor}&procedencia=${procedencia}`;

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
            <Container maxWidth={themeStretch ? false : 'xl'}>


                <Masonry columns={{xs: 1, md: 2}} spacing={3}>
                    <Block title="General" sx={style}>

                        <Typography variant="h3" component="h1" paragraph>
                            Despacho
                        </Typography>

                        <TextField type="text" className="form-control email" name="email" id="email2"
                                   placeholder="PEDIDO" required
                                   value={pedidoProveedor}
                                   onChange={e => {
                                       setPedidoProveedor(e.currentTarget.value);
                                   }}
                        />

                        <TextField type="text" className="form-control email" name="email" id="email2"
                                   placeholder="PROCEDENCIA" required
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
                                {jsonDataDespacho.map((row, indexdos) => (
                                    <TableRow key={indexdos}>
                                        <TableCell>{row.NUM_PEDIDO}</TableCell>
                                        <TableCell align="right">{row.PROCEDENCIA}</TableCell>
                                        <TableCell align="right">{row.FECHA}</TableCell>
                                        <TableCell align="right">{row.CONTACTO}</TableCell>
                                        <TableCell align="right">{row.TEL_CONTACTO}</TableCell>
                                        <TableCell align="right">{row.CANTIDAD}</TableCell>
                                        <TableCell align="right">{row.TOTAL}</TableCell>
                                        <TableCell align="right">{row.DESCRIPCION}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </TableContainer>

                <Typography variant="h3" component="h1" paragraph>
                    Detalle del pedido.
                </Typography>

                <Button variant="contained">Exportar a EXCEL</Button>

                <TableContainer sx={{mt: 3, overflow: 'unset'}}>
                    <Scrollbar>
                        <Table sx={{minWidth: 800}}>
                            <TableHeadCustom headLabel={TABLE_HEAD_DETALLE}/>

                            <TableBody>
                                {jsonDataDespachoDetalle.map((row, indexuno) => (
                                    <TableRow key={indexuno}>
                                        <TableCell>{row.NUM_PEDIDO}</TableCell>
                                        <TableCell align="right">{row.PROCEDENCIA}</TableCell>
                                        <TableCell align="right">{row.ARTICULO}</TableCell>
                                        <TableCell align="right">{row.CANTIDAD}</TableCell>
                                        <TableCell align="right">{row.DESCRIPCION}</TableCell>
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