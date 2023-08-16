/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import { Page, View, Text, Image, Document } from '@react-pdf/renderer';
// utils
import { fDate } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';
//
import styles from './InvoiceStyle';
import {Link} from "@mui/material";

import React from 'react';

// Resto de tu código


// ----------------------------------------------------------------------

InvoicePDF.propTypes = {
  //invoice: PropTypes.object,
};

export default function InvoicePDF({ invoice, invoice_detail, invoice_imagen}) {
  // console.log("invoice: "+ JSON.stringify(invoice));
  // console.log("invoice: "+ JSON.stringify(invoice[0]));
  // console.log("invoice: "+ invoice.PEDIDO_PROV);

  console.log("invoice: " + invoice[0].PEDIDO_PROV);
  const {
    PEDIDO_PROV,
    FEC_INGRESO,
    ESTATUS,
    CLIENTE,
    PROVEEDOR,
    DATO1,
    DATO2,
    DATO3,
    DATO4,
    FACTURA_FAB,
    BULTOS,
    PESO,
    USUARIO
  } = invoice[0];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40]}>
          <Image source="/logo/ht_bit.png" style={{ height: 32 }} />
          <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
            <Text style={styles.h3}>{status}</Text>
            <Text> {`PEDIDO PROVEEDOR-${PEDIDO_PROV}`} </Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            {/*<Text style={[styles.overline, styles.mb8]}>Invoice from</Text>*/}
            <Text style={styles.body1}>{PROVEEDOR}</Text>
            <Text style={styles.body1}>FECHA INGRESO: {FEC_INGRESO}</Text>
            <Text style={styles.body1}>ESTADO: {ESTATUS}</Text>
            <Text style={styles.body1}>CLIENTE: {CLIENTE}</Text>
            <Text style={styles.body1}>FAC. FABRICANTE: {FACTURA_FAB}</Text>
            <Text style={styles.body1}>DN: {DATO3}</Text>
          </View>

          <View style={styles.col6}>
            {/*<Text style={[styles.overline, styles.mb8]}>Invoice to</Text>*/}
            <Text style={styles.body1}>TRANSPORTISTA: {DATO1}</Text>
            <Text style={styles.body1}>CONDUCTOR: {DATO2}</Text>
            <Text style={styles.body1}>PESO: {PESO}</Text>
            {/*<Text style={styles.body1}>USUARIO: {USUARIO}</Text>*/}
            <Text style={styles.body1}>BULTOS: {BULTOS}</Text>
            <Text style={styles.body1}>DIMENSIONES: {DATO4}</Text>
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

        <View style={styles.table}>
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
                <Text style={styles.subtitle2}>CANTIDAD</Text>
              </View>

              {/*<View style={styles.tableCell_3}>*/}
              {/*  <Text style={styles.subtitle2}>ARTICULO</Text>*/}
              {/*</View>*/}

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
                  <Text>{item.CANTIDAD}</Text>
                </View>

                {/*<View style={styles.tableCell_3}>*/}
                {/*  <Text>{item.ARTICULO}</Text>*/}
                {/*</View>*/}

                {/*<View style={[styles.tableCell_3, styles.alignRight]}>*/}
                {/*  <Text>{fCurrency(item.price * item.quantity)}</Text>*/}
                {/*</View>*/}
              </View>
            ))}





            <View>
              {invoice_imagen.map((row, index) => (
                  <View key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {row.selected_file.map((imageData, index) => (
                        <React.Fragment key={index}>
                          {['.png', 'jpeg', '.jpg'].includes(imageData.file_url.slice(-4).toLowerCase()) ? (
                              <Image
                                  src={imageData.file_url}
                                  alt={`Image ${index}`}
                                  style={{width: 180}}
                              />
                          ) : (
                              <Text>{imageData.file_url}</Text>
                          )}
                        </React.Fragment>
                    ))}
                  </View>

              ))}
            </View>


                {/*<View style={[styles.tableRow, styles.noBorder]}>*/}
            {/*  <View style={styles.tableCell_1} />*/}
            {/*  <View style={styles.tableCell_2} />*/}
            {/*  <View style={styles.tableCell_3} />*/}

            {/*</View>*/}

            {/*<View style={[styles.tableRow, styles.noBorder]}>*/}
            {/*  <View style={styles.tableCell_1} />*/}
            {/*  <View style={styles.tableCell_2} />*/}
            {/*  <View style={styles.tableCell_3} />*/}
            {/*  <View style={styles.tableCell_3}>*/}
            {/*    <Text>Discount</Text>*/}
            {/*  </View>*/}
            {/*  <View style={[styles.tableCell_3, styles.alignRight]}>*/}
            {/*    <Text>{fCurrency(-discount)}</Text>*/}
            {/*  </View>*/}
            {/*</View>*/}

            {/*<View style={[styles.tableRow, styles.noBorder]}>*/}
            {/*  <View style={styles.tableCell_1} />*/}
            {/*  <View style={styles.tableCell_2} />*/}
            {/*  <View style={styles.tableCell_3} />*/}
            {/*  <View style={styles.tableCell_3}>*/}
            {/*    <Text>Taxes</Text>*/}
            {/*  </View>*/}
            {/*  <View style={[styles.tableCell_3, styles.alignRight]}>*/}
            {/*    <Text>{fCurrency(taxes)}</Text>*/}
            {/*  </View>*/}
            {/*</View>*/}

            {/*<View style={[styles.tableRow, styles.noBorder]}>*/}
            {/*  <View style={styles.tableCell_1} />*/}
            {/*  <View style={styles.tableCell_2} />*/}
            {/*  <View style={styles.tableCell_3} />*/}
            {/*  <View style={styles.tableCell_3}>*/}
            {/*    <Text style={styles.h4}>Total</Text>*/}
            {/*  </View>*/}
            {/*  <View style={[styles.tableCell_3, styles.alignRight]}>*/}
            {/*    <Text style={styles.h4}>{fCurrency(totalPrice)}</Text>*/}
            {/*  </View>*/}
            {/*</View>*/}
          </View>
        </View>

        <View style={[styles.gridContainer, styles.footer]}>
          <View style={styles.col8}>
            <Text style={styles.subtitle2}>NOTAS</Text>
            {/*<Text>*/}
            {/*  We appreciate your business. Should you need us to add VAT or extra notes let us know!*/}
            {/*</Text>*/}
          </View>
          <View style={[styles.col4, styles.alignRight]}>
            <Text style={styles.subtitle2}>USUARIO</Text>
            {/*<Text style={styles.body1}>USUARIO: {USUARIO}</Text>*/}
            <Text>{USUARIO}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
