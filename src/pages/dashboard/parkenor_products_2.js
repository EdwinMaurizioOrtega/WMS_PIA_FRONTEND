import React, { useState, useEffect } from 'react';
// next
import Head from 'next/head';
// @mui
import {
  Card,
  Container,
  Stack, Box, Dialog, DialogTitle, DialogContent, CircularProgress, Button,
} from '@mui/material';

import { HOST_API_KEY } from '../../config-global';
import { useSettingsContext } from '../../components/settings';
import * as PropTypes from 'prop-types';
import DashboardLayout from '../../layouts/dashboard';
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import EmptyContent from '../../components/empty-content';
import axios from '../../utils/axios';
import { useAuthContext } from '../../auth/useAuthContext';

// ----------------------------------------------------------------------

EcommerceProductListPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

function ProductTableRow(props) {
  return null;
}

ProductTableRow.propTypes = {
  row: PropTypes.any,
  selected: PropTypes.any,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
};

export default function EcommerceProductListPage() {

  const { themeStretch } = useSettingsContext();

  const { user } = useAuthContext();

  const [products, setProducts] = useState([]);

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      //console.log("User: " + JSON.stringify(user));
      try {
        const networkResponse = await fetch(`${HOST_API_KEY}/api/parkenor/products`);
        const response = await networkResponse.json();

        console.log('Data1: ' + JSON.stringify(response));

        const businessPartnersWithId = response.data.map((partner, index) => ({
          ...partner,
          id: index + 1, // Puedes ajustar la lógica según tus necesidades
        }));

        console.log('Data: ' + JSON.stringify(businessPartnersWithId));

        // Filtramos los productos con PUBLICIDAD > 0
        const filteredProducts = businessPartnersWithId.filter(
          (product) => product.PUBLICIDAD > 0
        );

        setProducts(filteredProducts);

      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const baseColumns = [

    {
      field: 'IMAGEN',
      headerName: 'IMAGEN',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        //console.log("params.value: " + params.value),
        <img
          src={params.value}
          alt="Image"
          style={{
            width: '100px',
            height: 'auto',
            objectFit: 'contain',
          }} // Ajusta el estilo según tus necesidades
        />
      ),
    },
    {
      field: 'COD_ANTIGUO',
      headerName: 'COD_ANTIGUO',
      width: 130,
    },
    {
      field: 'ARTICULO',
      headerName: 'ARTICULO',
      flex: 1,
      maxWidth: 100,
    },
    {
      field: 'DESCRIPCION',
      headerName: 'DESCRIPCION',
      flex: 1,
      maxWidth: 800,
    },
    {
      field: 'PUBLICIDAD',
      headerName: 'Materiales de Marca',
      flex: 1,
      maxWidth: 300,
    },

    user.id === 1 && {
      field: '',
      headerName: 'Acción',
      width: 200,
      renderCell: (params) => {

        return (
          <>
            <Button
              variant="contained"
              onClick={() => handleDetalles(params.row)}
            >
              DETALLES
            </Button>
          </>

        );
      },
    },

  ];

  const handleDetalles = async (data) => {
    //Enviar a la páguina de creación de la nota de credito
    if (data) {
      console.log('Fila seleccionada:', data);
      setLoading(true);
      try {

        // Actualizar una orden.
        const response = await axios.get(`/api/parkenor/detalle_product?cod_articulo=${data.ARTICULO}`,
        );
        console.log('Data:', response.data.data);
        setRows(response.data.data);
        setOpen(true); // Mostrar el diálogo

      } catch (error) {
        console.error('Error al obtener los detalles:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('No se ha seleccionado ningún marcador.');
    }
  };

  // Suponiendo que conoces las columnas que devuelve tu API
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 50,
    },
    {
      field: 'DESCRIPCION',
      headerName: 'DESCRIPCION',
      width: 300,
    },
    {
      field: 'COD_PIA',
      headerName: 'COD_PIA',
      width: 100,
    },
    {
      field: 'COD_ANTIGUO',
      headerName: 'COD_ANTIGUO',
      width: 130,
    },
    {
      field: 'PRE_PAGO_MERCH',
      headerName: 'PRE_PAGO_MERCH',
      width: 150,
    },

    {
      field: 'BTL_MERCH',
      headerName: 'BTL_MERCH',
      width: 130,
    },

    {
      field: 'PUBLICIDAD',
      headerName: 'PUBLICIDAD',
      width: 130,
    },

    {
      field: 'UBICACION',
      headerName: 'UBICACION',
      width: 130,
    },

    ]

  return (
    <>
      <Head>
        <title> Ecommerce: Product List | HT</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>

        <Card>
          <Stack spacing={3}>
            <DataGrid
              rows={products}
              columns={baseColumns}
              pagination
              rowHeight={150}
              slots={{
                toolbar: CustomToolbar,
                noRowsOverlay: () => <EmptyContent title="No Data" />,
                noResultsOverlay: () => <EmptyContent title="No results found" />,
              }}
            />


            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
              <DialogTitle>Detalle del Producto</DialogTitle>
              <DialogContent>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                      rows={rows.map((row, index) => ({ id: index, ...row }))}
                      columns={columns}
                      pageSize={5}
                    />
                  </div>
                )}
              </DialogContent>
            </Dialog>

          </Stack>
        </Card>
      </Container>

    </>
  );
}

// ----------------------------------------------------------------------

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}