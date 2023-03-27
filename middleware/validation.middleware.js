
const validation = (req,res,next) => {
    const {city} = req.query;
    if(typeof(city)==String){
        next();
    }else{
        res.send('Please insert only text....')
    }
}



module.exports = {validation};