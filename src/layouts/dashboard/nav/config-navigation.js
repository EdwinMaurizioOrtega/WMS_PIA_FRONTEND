// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Operación Miami',
    items: [
      { title: 'Número pedido proveedor.', path: PATH_DASHBOARD.one, icon: ICONS.dashboard },
      { title: 'Fecha de creación (Fecha Alta)', path: PATH_DASHBOARD.two, icon: ICONS.ecommerce },
      { title: 'Fecha de llegada (Fecha Ingreso)', path: PATH_DASHBOARD.three, icon: ICONS.analytics },
      { title: 'DESPACHO | Número pedido proveedor.', path: PATH_DASHBOARD.five, icon: ICONS.dashboard },
      { title: 'Pedidos proveedor (Fechas)', path: PATH_DASHBOARD.six, icon: ICONS.analytics },
      { title: 'Cargar Imágenes Pedido Proveedor', path: PATH_DASHBOARD.four, icon: ICONS.analytics },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'CNT',
    items: [
      { title: 'Clientes CNT.', path: PATH_DASHBOARD.cli_cnt, icon: ICONS.user },
      { title: 'Plantillas.', path: PATH_DASHBOARD.templates, icon: ICONS.user },
      { title: 'Consolidado.', path: PATH_DASHBOARD.consolidado, icon: ICONS.user },

      // {
      //   title: 'user',
      //   path: PATH_DASHBOARD.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'Four', path: PATH_DASHBOARD.user.four },
      //     { title: 'Five', path: PATH_DASHBOARD.user.five },
      //     { title: 'Six', path: PATH_DASHBOARD.user.six },
      //   ],
      // },
    ],
  },
  // FUXION
  // ----------------------------------------------------------------------
  {
    subheader: 'FUXION',
    items: [
      { title: 'Gestión de Pedidos', path: PATH_DASHBOARD.fuxion_templates, icon: ICONS.user },
      { title: 'Reporte Inventarios', path: PATH_DASHBOARD.six, icon: ICONS.user },
      { title: 'Reporte Despachos', path: PATH_DASHBOARD.five, icon: ICONS.user },

      // {
      //   title: 'user',
      //   path: PATH_DASHBOARD.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'Four', path: PATH_DASHBOARD.user.four },
      //     { title: 'Five', path: PATH_DASHBOARD.user.five },
      //     { title: 'Six', path: PATH_DASHBOARD.user.six },
      //   ],
      // },
    ],
  },
];

export default navConfig;
