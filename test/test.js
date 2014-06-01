var builder = require('../index.js');

builder.build('resources/**/*.js', console.log);
/*
 { Alpha: [],
 Beta: [ 'Alpha' ],
 Delta: [],
 Epsilon: [],
 Eta: [ 'Delta', 'Epsilon', 'Zeta' ],
 Gamma: [ 'Beta' ],
 Theta: [ 'Eta', 'Gamma' ],
 Zeta: [] }
 */