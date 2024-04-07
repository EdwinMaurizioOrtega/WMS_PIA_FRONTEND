import {Page, View, Text, Image, Document} from '@react-pdf/renderer';
import styles from './InvoiceStyle';
import React from 'react';

// ----------------------------------------------------------------------

export default function EtiquetasPDF({invoice}) {

    console.log("DATA ETIQUETA: " + JSON.stringify(invoice));

    const {
        id,
        FECHA_FORMATEADA,
        COURIER,
        DESCRIPCION,
        NUM_PEDIDO,
        GUIA,
        PESO,
        RESPONSABLE,
        ESTATUS
    } = invoice;

    return (
        <Document>
            <Page size="A4" style={styles.page}>


                <View style={[styles.table, styles.mb40]}>

                    <View style={styles.tableBody}>

                        <View style={styles.tableRow}>
                            <View style={{width: '100%'}}>
                                <Text>Fecha: {FECHA_FORMATEADA}</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={{width: '100%'}}>
                                <Text style={styles.subtitle2}>Courier: {COURIER}</Text>
                            </View>

                        </View>

                        <View style={styles.tableRow}>

                            <View style={{width: '100%'}}>
                                <Text>Tipo: {DESCRIPCION}</Text>
                            </View>

                        </View>

                        <View style={styles.tableRow}>
                            <View style={{width: '100%'}}>
                                <Text>Orden: {NUM_PEDIDO}</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={{width: '100%'}}>
                                <Text>Guia: {GUIA}</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={{width: '100%'}}>
                                <Text>Peso (KG): {PESO}</Text>
                            </View>
                        </View>

                    </View>


                </View>

            </Page>
        </Document>
    );

}
