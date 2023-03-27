const jwt = require('jsonwebtoken');


// const {createClient} = require('redis')
// const client = createClient({
//     url : "redis://default:hB8nlxlUr0BfAPWbyA3m5eallHA5X3cy@redis-17239.c305.ap-south-1-1.ec2.cloud.redislabs.com:17239"
// })

// client.connect();

const authentication = async(req,res,next) => {
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,process.env.secret_key,(err,decode)=>{
            if(decode){
                console.log(decode);
                next();
            }else{
                res.send('Login Required')
            }
        })
    }else{
        res.send('Protected Route')
    }
}


module.exports = {authentication};