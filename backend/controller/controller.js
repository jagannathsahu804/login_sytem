const db = require("../dbconnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.home = (req,res) => {
    res.send("api working here...");
}

//signup
module.exports.signup = async(req,res) => {
    console.log(req.body, "data###");
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    //first check whether the email id already exists 
    let emailchkqry = `select email from users where email = '${email}'`;
    db.query(emailchkqry,async(err, result) => {
        if(err) throw err;
        //check emaild id already exists
        if(result.length > 0){
            res.send({status: false, msg: "email id already exists"});
        }else{
            //password decrypt
            decryptpwd = await bcrypt.hash(password, 10);
            //insert data
            let insertqry = `insert into users(name,email,password) values('${name}','${email}','${decryptpwd}')`;
            db.query(insertqry,(err,result)=>{
                if(err) throw err;
                res.send({status: true, msg: "user register successfull"});
            });
        }
    });
};

//login

module.exports.login = (req,res) => {
    console.log(req.body, "login");
    let email = req.body.email;
    let password = req.body.password;

    //checkemail
    let chkemailid = `select * from users where email = '${email}'`;
    db.query(chkemailid, async(err, result) => {
        if(err) throw err;

        if(result.length > 0){
            let data = {
                name: result[0].name,
                email: result[0].emaildata
            };
            //check password
            let chkpwd = await bcrypt.compare(password, result[0].password);
            console.log(chkpwd, "chkpwd##");
            if(chkpwd === true){
                const token = jwt.sign({data},"privatekey",{expiresIn:'24h'});
                console.log(token, "token##");
                res.send({
                    status: true,
                    token: token,
                    result: data,
                    msg: "user login successfull"
                });
            }else{
                res.send({status: false, msg: "invalid user"});
            }
        }else{
            res.send({status: false, msg: "invalid email id"});
        }
    });
};

//transactions
module.exports.transactions = (req,res) => {
    //check verifytoken
    let chkToken = verifyToken(req.token);

    if(chkToken.status == true){
        let transactionsqry = `select * from transactions`;
        db.query(transactionsqry,(err, result) => {
            if(err) throw err;
            if(result.length > 0){
                res.send({status: true, data: result});
            }else{
                res.send({status: false, msg: "data not found"});
            }
        });
    }else{
        res.send({status: false, msg: "token invalid"});
    }
};

function verifyToken(token) {
    return jwt.verify(token, "privatekey", (err,result) => {
        if(err){
            let a = {status: false};
            return a;
        }else{
            let b = {status: true};
            return b;
        }
    });
}