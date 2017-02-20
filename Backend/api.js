/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');
var LIQPAY_PUBLIC_KEY="i25910224081";
var LIQPAY_PRIVATE_KEY="QxGumi9hgZmRCMZoZ0Oedy1NUZ8qyC20TkRoIJWE";

exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};

exports.createOrder = function(req, res) {
    var order_info = req.body;
    console.log("Creating Order", order_info);

    res.send({
        success: true,
    });
};

exports.LiqPay = function(req, res) {
    var crypto	=	require('crypto');
    
    function	base64(str)	 {
        return	new	Buffer(str).toString('base64');
    }
    
    function	sha1(string)	{
        var sha1	=	crypto.createHash('sha1');
        sha1.update(string);
        return	sha1.digest('base64');
    }
    
    var order	=	cnb_form({
        'version':	'3',
        'action':	'pay',
        'amount':	'568.00',
        'currency':	'UAH',
        'description':	'Опис транзакції',
        'order_id':	'order_id_1',
        //!!!Важливо щоб було 1,	бо інакше візьме гроші!!!
        'sandbox':	1
    });
    
    function cnb_form(){
    
        var data	=	base64(JSON.stringify(order));
        var signature	=	sha1(LIQPAY_PRIVATE_KEY	+	data	+	LIQPAY_PRIVATE_KEY);

        return '<form method="POST" action="https://www.liqpay.com/api/3/checkout" accept-charset="utf-8">' +
               '<input type="hidden" name="data" value="'+data+'" />' +
               '<input type="hidden" name="signature" value="'+signature+'" />' +
               '</form>';
    }
};  