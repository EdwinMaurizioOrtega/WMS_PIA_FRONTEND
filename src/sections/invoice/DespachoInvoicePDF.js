/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import {Page, View, Text, Image, Document} from '@react-pdf/renderer';
// utils
import {fDate} from '../../utils/formatTime';
import {fCurrency} from '../../utils/formatNumber';
//
import styles from './InvoiceStyle';
import {Divider, Link} from "@mui/material";

import React from 'react';
import {fontWeight} from "@mui/system";

// Resto de tu código


// ----------------------------------------------------------------------

DespachoInvoicePDF.propTypes = {
    //invoice: PropTypes.object,
};

export default function DespachoInvoicePDF({invoice, invoice_detail}) {
    // console.log("invoice: "+ JSON.stringify(invoice));
    // console.log("invoice: "+ JSON.stringify(invoice[0]));
    // console.log("invoice: "+ invoice.PEDIDO_PROV);

    console.log("invoice: " + invoice[0].NUM_PEDIDO);
    const {
        NUM_PEDIDO,
        PROCEDENCIA,
        FECHA,
        CONTACTO,
        TEL_CONTACTO,
        CANTIDAD,
        TOTAL,
        CANTON,
        PROVINCIA,
        DESCRIPCION,
        CONTRATO,
        BULTOS
    } = invoice[0];

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={[styles.gridContainer, styles.mb40]}>
                    <Image source="/logo/ht_bit.png" style={{height: 32}}/>
                    <View style={{alignItems: 'flex-end', flexDirection: 'column'}}>
                        <Text style={styles.h3}>{status}</Text>
                        <Text> {`NUM_PEDIDO-${NUM_PEDIDO}`} </Text>
                    </View>
                </View>
                <View style={[styles.gridContainer, styles.mb8, {justifyContent: 'center', alignItems: 'center'}]}>
                    <Text style={styles.h4}>ALBARÁN</Text>
                </View>
                <View style={[styles.gridContainer, styles.mb40]}>
                    <View style={styles.col6}>
                        {/*<Text style={[styles.overline, styles.mb8]}>Invoice from</Text>*/}
                        {/*<Text style={styles.body1}>{PROCEDENCIA}</Text>*/}
                        <Text style={styles.body1}>
                            <Text style={{fontWeight: 'bold'}}>FECHA: </Text>
                            {FECHA}</Text>
                        <Text style={styles.body1}>

                            <Text style={{fontWeight: 'bold'}}>CLIENTE: </Text>
                            {CONTACTO}</Text>
                        <Text style={styles.body1}>
                            <Text style={{fontWeight: 'bold'}}>TEL_CONTACTO: </Text>
                            {TEL_CONTACTO}</Text>
                        <Text style={styles.body1}>
                            <Text style={{fontWeight: 'bold'}}>DIRECCIÓN: </Text>
                            {CANTON} {PROVINCIA}</Text>
                        {/*<Text style={styles.body1}>CANTIDAD: {CANTIDAD}</Text>*/}
                        {/*<Text style={styles.body1}>TOTAL: {TOTAL}</Text>*/}
                    </View>

                    <View style={styles.col6}>
                        {/*<Text style={[styles.overline, styles.mb8]}>Invoice to</Text>*/}

                        {/*<Text style={styles.body1}>DESCRIPCION: {DESCRIPCION}</Text>*/}
                        {/*<Text style={styles.body1}>USUARIO: {USUARIO}</Text>*/}
                        <Text style={styles.body1}>
                            <Text style={{fontWeight: 'bold'}}>PESO Y DIMENSIÓN: </Text>
                            {CONTRATO}</Text>
                        {/*<Text style={styles.body1}>DIMENSIONES: {DATO4}</Text>*/}
                    </View>
                </View>

                {/*<View style={[styles.gridContainer, styles.mb40]}>*/}
                {/*  <View style={styles.col6}>*/}
                {/*    <Text style={[styles.overline, styles.mb8]}>Date create</Text>*/}
                {/*    <Text style={styles.body1}>{fDate(FEC_INGRESO)}</Text>*/}
                {/*  </View>*/}
                {/*  <View style={styles.col6}>*/}
                {/*    <Text style={[styles.overline, styles.mb8]}>Due date</Text>*/}
                {/*    <Text style={styles.body1}>{fDate(FEC_INGRESO)}</Text>*/}
                {/*  </View>*/}
                {/*</View>*/}

                <Text style={[styles.overline, styles.mb8]}>DETALLES</Text>

                <View style={[styles.table, styles.mb40]}>
                    <View style={styles.tableHeader}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCell_1}>
                                <Text style={styles.subtitle2}>#</Text>
                            </View>

                            {/*<View style={styles.tableCell_3}>*/}
                            {/*  <Text style={styles.subtitle2}>PEDIDO_PROV</Text>*/}
                            {/*</View>*/}

                            <View style={styles.tableCell_2}>
                                <Text style={styles.subtitle2}>DESCRIPCION</Text>
                            </View>

                            <View style={styles.tableCell_3}>
                                <Text style={styles.subtitle2}>COD. ARTÍCULO</Text>
                            </View>

                            <View style={styles.tableCell_3}>
                                <Text style={styles.subtitle2}>CANTIDAD</Text>
                            </View>
                            <View style={styles.tableCell_3}>
                                <Text style={styles.subtitle2}>MONTO TOTAL</Text>
                            </View>

                            <View style={styles.tableCell_3}>
                                <Text style={styles.subtitle2}>TIPO ARTICULO</Text>
                            </View>

                            {/*<View style={[styles.tableCell_3, styles.alignRight]}>*/}
                            {/*  <Text style={styles.subtitle2}>Total</Text>*/}
                            {/*</View>*/}
                        </View>
                    </View>

                    <View style={styles.tableBody}>
                        {invoice_detail.map((item, index) => (
                            <View style={styles.tableRow} key={index + 1}>
                                <View style={styles.tableCell_1}>
                                    <Text>{index + 1}</Text>
                                </View>

                                {/*<View style={styles.tableCell_3}>*/}
                                {/*  <Text>{item.PEDIDO_PROV}</Text>*/}
                                {/*</View>*/}

                                <View style={styles.tableCell_2}>
                                    <Text style={styles.subtitle2}>{item.DESCRIPCION}</Text>
                                    {/*<Text>{item.ARTICULO}</Text>*/}
                                </View>

                                <View style={styles.tableCell_3}>
                                    <Text>{item.ARTICULO}</Text>
                                </View>
                                <View style={styles.tableCell_3}>
                                    <Text>{item.CANTIDAD}</Text>
                                </View>

                                <View style={styles.tableCell_3}>
                                    <Text>{fCurrency(item.TOTAL)}</Text>
                                </View>
                                <View style={styles.tableCell_3}>
                                    <Text>{item.DESCRIPCION_2}</Text>
                                </View>

                                {/*<View style={[styles.tableCell_3, styles.alignRight]}>*/}
                                {/*  <Text>{fCurrency(item.price * item.quantity)}</Text>*/}
                                {/*</View>*/}
                            </View>
                        ))}


                        <View style={[styles.tableRow, styles.noBorder]}>
                            <View style={styles.tableCell_1}/>
                            <View style={styles.tableCell_2}/>
                            <View style={styles.tableCell_3}/>

                        </View>

                        <View style={[styles.tableRow, styles.noBorder]}>
                            <View style={{width: '20%'}}>
                                <Text style={{fontWeight: 'bold'}}>TOTAL UNIDADES:</Text>

                            </View>
                            <View style={[styles.tableCell_3, styles.alignRight]}>
                                <Text >{CANTIDAD}</Text>
                            </View>
                            <View style={styles.tableCell_1}/>
                            <View style={styles.tableCell_2}/>
                            <View style={styles.tableCell_3}/>

                        </View>

                        <View style={[styles.tableRow, styles.noBorder]}>
                            <View style={{width: '20%'}}>
                                <Text style={{fontWeight: 'bold'}}>TOTAL VALORADO:</Text>
                            </View>
                            <View style={[styles.tableCell_3, styles.alignRight]}>
                                <Text>{fCurrency(TOTAL)}</Text>
                            </View>
                            <View style={styles.tableCell_1}/>
                            <View style={styles.tableCell_2}/>
                            <View style={styles.tableCell_3}/>

                        </View>

                        <View style={[styles.tableRow, styles.noBorder]}>
                            <View style={{width: '20%'}}>
                                <Text style={{fontWeight: 'bold'}}>NÚM. CAJAS/BULTOS:</Text>
                            </View>
                            <View style={[styles.tableCell_3, styles.alignRight]}>
                                <Text>{BULTOS}</Text>
                            </View>
                            <View style={styles.tableCell_1}/>
                            <View style={styles.tableCell_2}/>
                            <View style={styles.tableCell_3}/>

                        </View>

                        {/*<View style={[styles.tableRow, styles.noBorder]}>*/}
                        {/*    <View style={styles.tableCell_3}>*/}
                        {/*        <Text style={styles.h4}>NÚM. CAJAS/BULTOS</Text>*/}
                        {/*    </View>*/}
                        {/*    <View style={[styles.tableCell_3, styles.alignRight]}>*/}
                        {/*        <Text style={styles.h4}>{fCurrency(100)}</Text>*/}
                        {/*    </View>*/}
                        {/*  <View style={styles.tableCell_1} />*/}
                        {/*  <View style={styles.tableCell_2} />*/}
                        {/*  <View style={styles.tableCell_3} />*/}

                        {/*</View>*/}
                    </View>


                </View>

                <View style={[styles.gridContainer, styles.mb8]}>
                    <Text style={[styles.overline, styles.mb8]}>FAVOR DE REVISAR QUE EL PEDIDO SEA ENTREGADO CONFORME A LAS
                        ESPECIFICACIONES ABAJO MENCIONADAS, ASI COMO LLENAR LA INFORMACION SOLICITADA.</Text>
                </View>

                <View style={[styles.gridContainer, styles.mb40]}>
                    <View style={styles.col6}>
                        {/*<Text style={[styles.overline, styles.mb8]}>Invoice from</Text>*/}
                        {/*<Text style={styles.body1}>{PROCEDENCIA}</Text>*/}
                        <Text style={styles.body1}>NÚMERO DE CAJAS RECIBIDAS: ___________________________</Text>
                        <Text style={styles.body1}>FECHA DE RECIBIDO: ______________________________________</Text>
                        <Text style={styles.body1}>NOMBRE DE QUIEN RECIBE: _______________________________</Text>
                        <Text style={styles.body1}>FIRMA: ___________________________________________________</Text>
                        <Text style={styles.body1}>OBSERVACIONES: _________________________________________</Text>
                        {/*<Text style={styles.body1}>TOTAL: {TOTAL}</Text>*/}
                    </View>

                    <View style={styles.col6}>
                        {/*<Text style={[styles.overline, styles.mb8]}>Invoice to</Text>*/}

                        {/*<Text style={styles.body1}>DESCRIPCION: {DESCRIPCION}</Text>*/}
                        {/*<Text style={styles.body1}>USUARIO: {USUARIO}</Text>*/}
                        <Text style={styles.body1}>CANTIDAD DE TERMINALES: _______________________________</Text>
                        <Text style={styles.body1}>HORA DE RECIBIDO: _______________________________________</Text>
                        <Text style={styles.body1}>CARGO: ___________________________________________________</Text>
                    </View>
                </View>

                <View style={[styles.gridContainer, styles.footer]}>

                    <View style={styles.col8}>
                        <Text style={styles.subtitle2}>NOTAS: </Text>
                        {/*<Text>*/}
                        {/*  We appreciate your business. Should you need us to add VAT or extra notes let us know!*/}
                        {/*</Text>*/}
                    </View>
                    <View style={[styles.col4, styles.alignRight]}>
                        <Text style={styles.subtitle2}>USUARIO: </Text>
                        {/*<Text style={styles.body1}>USUARIO: {USUARIO}</Text>*/}
                        {/*<Text>{USUARIO}</Text>*/}
                    </View>
                </View>
            </Page>
        </Document>
    );
}
