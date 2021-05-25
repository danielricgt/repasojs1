import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/dashboard';
import Levantamiento from './pages/Levantamiento/levantamiento';
import ComprobanteSalida from './pages/IngresoBien/comprobanteSalida';
import ComprobanteEntrada from './pages/IngresoBien/comprobanteEntrada';
import TrasladoDependencia from './pages/Traslado/trasladoDependencia'
import TrasladoIndividual from './pages/Traslado/trasladoIndividual'
import Transacciones from './pages/Transacciones/transacciones';
import Profile from './pages/Profile/profile';
import Notifications from './pages/Notifications/notifications';
import AprobacionBajaBien from './pages/Aprobaciones/aprobacionesBaja'
import AprobacionIngresoEntrada from './pages/Aprobaciones/aprobacionesIngresoEntrada'
import AprobacionIngresoSalida from './pages/Aprobaciones/aprobacionesIngresoSalida'
import AprobacionLevantamiento from './pages/Aprobaciones/aprobacionesLevantamientos'
import BajaBien from './pages/Bienes/bajaBien'
import AltaBien from './pages/Bienes/altaBien'
import AprobacionTraslado from './pages/Aprobaciones/aprobacionesTraslado'
import AprobacionDependencia from './pages/Aprobaciones/aprobacionesDependencia'


// TODO
import MaterialDesign from './pages/Icons/icons-material';
import FontAwesome from './pages/Icons/icons-fontawesome';
import IonIcons from './pages/Icons/icons-ion';
import ThemifyIcons from './pages/Icons/icons-themify';
import Dripicons from './pages/Icons/icons-dripicons';
import TypIcons from './pages/Icons/icons-typicons';

import Logout from './pages/Auth/Logout';
import Register from './pages/Auth/Register';

const routes = [

    // public Routes
    { path: '/login', component: Login, ispublic: true },
    { path: '/logout', component: Logout, ispublic: true },
    { path: '/register', component: Register, ispublic: true },

    // TODO Icons
    { path: '/icons-material', component: MaterialDesign },
    { path: '/icons-fontawesome', componentgit: FontAwesome },
    { path: '/icons-ion', component: IonIcons },
    { path: '/icons-themify', component: ThemifyIcons },
    { path: '/icons-dripicons', component: Dripicons },
    { path: '/icons-typicons', component: TypIcons },
    
    // Dashboard
    // { path: '/principal', component: Dashboard },
    { path: '/levantamiento', component: Levantamiento },
    { path: '/comprobante-salida', component: ComprobanteSalida },
    { path: '/comprobante-entrada', component: ComprobanteEntrada },
    { path: '/traslado-dependencia', component: TrasladoDependencia },
    { path: '/traslado-individual', component: TrasladoIndividual },
    { path: '/transacciones', component: Transacciones },
    { path: '/configuracion', component: Profile },
    { path: '/notificaciones', component: Notifications },
    { path: '/aprobacion-baja-bien', component: AprobacionBajaBien },
    { path: '/aprobacion-levantamiento', component: AprobacionLevantamiento },
    { path: '/aprobacion-ingreso-entrada', component: AprobacionIngresoEntrada },
    { path: '/aprobacion-ingreso-salida', component: AprobacionIngresoSalida },
    { path: '/aprobacion-traslado-individual', component: AprobacionTraslado },
    { path: '/aprobacion-traslado-dependencia', component: AprobacionDependencia },
    { path: '/baja-bien', component: BajaBien },
    { path: '/alta-bien', component: AltaBien },

    // Auht
    { path: '/', component: Dashboard },
];

export default routes;


//   // Ui Elements
//   { path: '/ui-alerts', component: Uialerts },
//   { path: '/ui-buttons', component: Uibuttons },
//   { path: '/ui-cards', component: Uicards },
//   { path: '/ui-carousel', component: Uicarousel },
//   { path: '/ui-dropdowns', component: Uidropdowns },
//   { path: '/ui-grid', component: Uigrid },
//   { path: '/ui-images', component: Uiimages },
//   { path: '/ui-modals', component: Uimodals },
//   { path: '/ui-rangeslider', component: Uirangeslider },
//   { path: '/ui-session-timeout', component: UisessionTimeout },
//   { path: '/ui-progressbars', component: Uiprogressbars },
//   { path: '/ui-sweet-alert', component: Uisweetalert },
//   { path: '/ui-tabs-accordions', component: Uitabsaccordions },
//   { path: '/ui-typography', component: Uitypography },
//   { path: '/ui-video', component: Uivideo },
//   { path: '/ui-general', component: Uigeneral },
//   { path: '/ui-colors', component: Uicolors },
//   { path: '/ui-rating', component: Uirating },