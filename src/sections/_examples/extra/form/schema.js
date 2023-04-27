import * as Yup from 'yup';

// ----------------------------------------------------------------------

export const FormSchema = Yup.object().shape({
  pedidoProveedorX: Yup.string()
    .required('Numero de pedido es requerido.'),
  singleUpload: Yup.mixed().required('Single upload is required'),

});
