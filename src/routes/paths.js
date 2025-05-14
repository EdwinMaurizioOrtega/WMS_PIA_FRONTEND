// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  blank: path(ROOTS_DASHBOARD, '/blank'),
  one: path(ROOTS_DASHBOARD, '/one'),
  two: path(ROOTS_DASHBOARD, '/two'),
  three: path(ROOTS_DASHBOARD, '/three'),
  four: path(ROOTS_DASHBOARD,'/cuatro'),
  five: path(ROOTS_DASHBOARD,'/cinco'),
  six: path(ROOTS_DASHBOARD,'/seis'),
  cli_cnt: path(ROOTS_DASHBOARD,'/cli_cnt'),
  templates: path(ROOTS_DASHBOARD,'/plantillas'),
  consolidado: path(ROOTS_DASHBOARD,'/consolidado'),
  fuxion_templates: path(ROOTS_DASHBOARD,'/template_fuxion'),
  update_guia: path(ROOTS_DASHBOARD,'/update_guia'),
  fuxion_reporte_inventarios: path(ROOTS_DASHBOARD,'/fuxion_reporte_inventarios'),
  fuxion_reporte_despachos: path(ROOTS_DASHBOARD,'/fuxion_reporte_despachos'),
  full_reporte_despachos_consolidados: path(ROOTS_DASHBOARD,'/full_reporte_despachos_consolidados'),
  full_reporte_despachos_sin_series: path(ROOTS_DASHBOARD,'/full_reporte_despachos_sin_series'),
  full_reporte_inventario_inicial_bodega: path(ROOTS_DASHBOARD,'/full_reporte_inventario_inicial_bodega'),
  full_reporte_inventario_inicial_interno: path(ROOTS_DASHBOARD,'/full_reporte_inventario_inicial_interno'),
  carga_masiva_guias_servientrega: path(ROOTS_DASHBOARD,'/carga_masiva_guias_servientrega'),
  orden_despacho_pdf: path(ROOTS_DASHBOARD,'/orden_despacho'),
  gestion_imagenes: path(ROOTS_DASHBOARD,'/gestion-imagenes'),
  parkenor_products: path(ROOTS_DASHBOARD,'/parkenor_products'),

  // user: {
  //   root: path(ROOTS_DASHBOARD, '/user'),
  //   four: path(ROOTS_DASHBOARD, '/user/four'),
  //   five: path(ROOTS_DASHBOARD, '/user/five'),
  //   six: path(ROOTS_DASHBOARD, '/user/six'),
  // },
};

// Para consumir la API
//export const API_URL = 'https://api.movilcelistic.com';
// export const API_URL = 'http://localhost';
