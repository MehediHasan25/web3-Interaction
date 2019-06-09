const ethSerializer = require('./eth-serialize');

const voterCard ={
    id:"0123456", 
    name:"Md. Mehedi Hasan",
    address:"Mohakhali"
     };


     let mystring= ethSerializer.ethStringify(voterCard);

     console.log(mystring);