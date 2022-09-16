
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

const orders = [
    {
        orders:[
            {
                customer:"Saif Marwan",
                address:{
                    latitude:33.3266,
                    longitude:44.3761
                },
                items:[
                    {
                        name:"Milk",
                        count:1,
                        price:1.5,
                        total:1.5
                    }
                ],
                total:1.5,
                discount:0,
                totalAfterDiscount:1.5
            },
            {
                customer:"Adel Ahmed",
                address:{
                    latitude:33.3266,
                    longitude:44.3761
                },
                items:[
                    {
                        name:"Eggs",
                        count:30,
                        price:0.20,
                        total:6
                    }
                ],
                total:6,
                discount:20,
                totalAfterDiscount:4.8
            }
        ],
        total:6.3
        }
];

app.use(express.json());

app.use(cors());

// to enable HTTP log requests
app.use(morgan('combined'));

app.get(
    '/orders',(req,res)=>{

        var totalPriceAfterDiscount  =  0 ; 

        for (let index = 0; index < orders.length; index++) {
         
            const orderedItems = orders[index].orders;

            for (let i = 0; i < orderedItems.length; i++) {
                const element = orderedItems[i];
                totalPriceAfterDiscount += element.totalAfterDiscount;
            }
           
        }
     
        
        orders[orders.length] = totalPriceAfterDiscount.toString();
        res.send(orders);
    
 
        
    }
);

// start server
app.listen(20022,()=>{
    console.log('listening on port 20022');
});