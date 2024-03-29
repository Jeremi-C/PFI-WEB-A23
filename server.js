/////////////////////////////////////////////////////////////////////
// This module is the starting point of the http server
/////////////////////////////////////////////////////////////////////
// Author : Nicolas Chourot
// Lionel-Groulx College
/////////////////////////////////////////////////////////////////////

import APIServer from "./APIServer.js";
import RouteRegister from './routeRegister.js';

RouteRegister.add('GET', 'accounts');
RouteRegister.add('POST', 'accounts', 'register');
RouteRegister.add('GET', 'accounts', 'verify');
RouteRegister.add('GET', 'accounts', 'logout');
RouteRegister.add('PUT', 'accounts', 'modify');
RouteRegister.add('PUT', 'accounts', 'update');
RouteRegister.add('GET', 'accounts', 'remove');
RouteRegister.add('GET', 'accounts', 'conflict');
RouteRegister.add('PUT', 'accounts', 'update');

let server = new APIServer();
server.start();
