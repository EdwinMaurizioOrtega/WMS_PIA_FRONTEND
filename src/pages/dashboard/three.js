// next
import Head from 'next/head';
import {
  Button,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material';
// layouts
import {useState} from "react";
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
import DateRangePicker, {useDateRangePicker} from "../../components/date-range-picker";
import {fDate, fDatePersonalized_1} from "../../utils/formatTime";
import {API_URL} from "../../routes/paths";
import {Block} from "../../sections/_examples/Block";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import {TableHeadCustom} from "../../components/table";

// ----------------------------------------------------------------------

PageThree.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  {id: 'PEDIDO_PROV', label: 'PEDIDO_PROV'},
  {id: 'FEC_INGRESO', label: 'FEC_INGRESO', align: 'right'},
  {id: 'FEC_ALTA', label: 'FEC_ALTA', align: 'right'},
  {id: 'USUARIO', label: 'USUARIO', align: 'right'},
  {id: 'ESTATUS', label: 'ESTATUS', align: 'right'},
  {id: 'CLIENTE', label: 'CLIENTE', align: 'right'},
  {id: 'PROVEEDOR', label: 'PROVEEDOR', align: 'right'},
  {id: 'DESCRIPCION', label: 'DESCRIPCION', align: 'right'},
  {id: 'DATO1', label: 'EMBARCADOR', align: 'right'},
  {id: 'DATO2', label: 'NOMBRE CONDUCTOR', align: 'right'},
  {id: 'DATO3', label: 'DN', align: 'right'},
  {id: 'DATO4', label: 'DATO4', align: 'right'},
  {id: 'DATO5', label: 'DATO5', align: 'right'},
  {id: 'FACTURA', label: 'FACTURA', align: 'right'},
  {id: 'FACTURA_FAB', label: 'FACTURA_FAB', align: 'right'},
  {id: 'VAL1', label: 'NUM_BULTOS', align: 'right'},
  {id: 'VAL2', label: 'VOLUMEN', align: 'right'},
  {id: 'PESO', label: 'PESO TOTAL', align: 'right'},
];

export default function PageThree() {
  const { themeStretch } = useSettingsContext();

  const pickerCalendar = useDateRangePicker(new Date(), null);

  // console.log(`Inicio: ${pickerCalendar.startDate}`);
  // console.log(`Final: ${pickerCalendar.endDate}`);

  const [jsonData, setJsonData] = useState([]);


  const handleClick = () => {

    if (pickerCalendar.endDate !== null){

      console.log(`Inicio: ${fDatePersonalized_1(pickerCalendar.startDate)}`);
      console.log(`Final: ${fDatePersonalized_1(pickerCalendar.endDate)}`);

      const fec_inicio = fDatePersonalized_1(pickerCalendar.startDate);
      const fec_fin = fDatePersonalized_1(pickerCalendar.endDate);

      const url = `${API_URL}/api/wms/rango_fecha_llegada_pedido_proveedor_bodega?fec_inicio=${fec_inicio}&fec_fin=${fec_fin}`;

      fetch(url)
          .then(response => response.json())
          .then(data => setJsonData(data.data));
    }

  };


  return (
      <>
        <Head>
          <title> Page Two | Minimal UI</title>
        </Head>

        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Typography variant="h3" component="h1" paragraph>
            FECHA DE LLEGADA (FEC_INGRESO) A BODEGA
          </Typography>


          <Block title="Rango Fechas Calendario">
            <Button variant="contained" onClick={pickerCalendar.onOpen}>
              Click me!
            </Button>

            <Stack sx={{ typography: 'body2', mt: 3 }}>
              <div>
                <strong>Inicio:</strong> {fDate(pickerCalendar.startDate)}
              </div>
              <div>
                <strong>Fin:</strong> {fDate(pickerCalendar.endDate)}
              </div>
            </Stack>

            <DateRangePicker
                variant="calendar"
                open={pickerCalendar.open}
                startDate={pickerCalendar.startDate}
                endDate={pickerCalendar.endDate}
                onChangeStartDate={pickerCalendar.onChangeStartDate}
                onChangeEndDate={pickerCalendar.onChangeEndDate}
                onClose={pickerCalendar.onClose}
                isError={pickerCalendar.isError}
            />

            <Button variant="contained"

                    onClick={() => {
                      handleClick()
                    }}
            >BUSCAR</Button>
          </Block>


          <Typography variant="h3" component="h1" paragraph>
            Pedido Despacho.
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
                        <TableCell align="right">{row.FEC_ALTA}</TableCell>
                        <TableCell align="right">{row.USUARIO}</TableCell>
                        <TableCell align="right">{row.ESTATUS ==='N' ? 'NUEVO' : 'FINALIZADO'}</TableCell>
                        <TableCell align="right">{row.CLIENTE}</TableCell>
                        <TableCell align="right">{row.PROVEEDOR}</TableCell>
                        <TableCell align="right">{row.DESCRIPCION}</TableCell>
                        <TableCell align="right">{row.DATO1}</TableCell>
                        <TableCell align="right">{row.DATO2}</TableCell>
                        <TableCell align="right">{row.DATO3}</TableCell>
                        <TableCell align="right">{row.DATO4}</TableCell>
                        <TableCell align="right">{row.DATO5}</TableCell>
                        <TableCell align="right">{row.FACTURA}</TableCell>
                        <TableCell align="right">{row.FACTURA_FAB}</TableCell>
                        <TableCell align="right">{row.VAL1}</TableCell>
                        <TableCell align="right">{row.VAL2}</TableCell>
                        <TableCell align="right">{row.PESO}</TableCell>
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
