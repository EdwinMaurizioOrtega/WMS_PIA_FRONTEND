import { paramCase } from 'change-case';
import React, { useState, useEffect } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import {
  Card,
  Table,
  Button,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer, Stack, Box,
} from '@mui/material';

import { HOST_API_KEY } from '../../config-global';
import ConfirmDialog from '../../components/confirm-dialog';
import {
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction, TableSkeleton, useTable,
} from '../../components/table';
import Scrollbar from '../../components/scrollbar';
import Iconify from '../../components/iconify';
import { useAuthContext } from '../../auth/useAuthContext';
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

  const { user } = useAuthContext();

  const { themeStretch } = useSettingsContext();

  const [products, setProducts] = useState([]);

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
        setProducts(businessPartnersWithId);

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
            objectFit: 'contain'
          }} // Ajusta el estilo según tus necesidades
        />
      ),
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
      field: 'PRE_PAGO_MERCH',
      headerName: 'PRE_PAGO_MERCH',
      flex: 1,
      maxWidth: 100,
    },
    {
      field: 'BTL_MERCH',
      headerName: 'BTL_MERCH',
      flex: 1,
      maxWidth: 100,
    },
    {
      field: 'PUBLICIDAD',
      headerName: 'PUBLICIDAD',
      flex: 1,
      maxWidth: 100,
    },


  ];


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