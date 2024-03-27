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
  fuxion_reporte_despachos: path(ROOTS_DASHBOARD,'/fuxion_reporte_despachos'),

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
