module.exports.response = (status,msg,res)=>{
    res.json({
        status:status,
        message:msg
    })
}

