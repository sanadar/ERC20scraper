const fs = require('fs');
const osmosis = require('osmosis');

let Tokens = [];

osmosis
    .get('https://etherscan.io/tokens')
    .paginate('#ContentPlaceHolder1_divpagingpanel > div:eq(1) > p > span > a:eq(2)', 13)
    .delay(3000)
    .find('td > h5 > a')
    .set('name')
    .delay(3000)
    .follow('@href')
    .delay(1000)
    .set({
        'name':     'name',
        'contract': '#ContentPlaceHolder1_trContract > td > a',
        'decimals': '#ContentPlaceHolder1_trDecimals > td:eq(1)',
        'site':     '#ContentPlaceHolder1_tr_officialsite_1 > td:eq(1)',
        'price':    '#ContentPlaceHolder1_tr_valuepertoken > td:eq(1)'
    })
    .data(function(token) {
        console.log(token);
        Tokens.push(token);
    })
    .done(function() {
        fs.writeFile('tokens.json', JSON.stringify(Tokens, null, 4), function(err) {
            if(err) console.error(err);
            else console.log('Data Saved to tokens.json file');
        })
    })
    .log(console.log)
    .error(console.log)
    .debug(console.log);