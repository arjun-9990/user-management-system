const express = require("express");

const path = require("path");

const mysql = require("mysql2");

const { faker } = require('@faker-js/faker');

const { v4: uuidv4 } = require('uuid');

const app = express();

const port = 3000;

const methodOverride = require('method-override');

// setting basic needs
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.set("views", path.join(__dirname, "/views"));

app.set("view engine", "ejs");

// creating connection to mysql 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta',
    password: "arjun9320sql"
});

// geting random user data
function getRandomUser() {
    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password(),
    ];
};



// home page
app.get("/", (req, res) => {
    let q = `select count(*) from user`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            console.log(result);
            let count = result[0]['count(*)'];
            console.log(count);
            res.render("home.ejs", { count });
        });
    } catch (error) {
        console.log(error);
        res.send("some error in db");
    };
});


// showing user in nontable format 

app.get("/user", (req, res) => {
    let q = `SELECT username , id, email from user`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.render("show", { datas: result });
        });
    } catch (error) {
        console.log(error);
        res.send("some thing went wrong");
    }
});

// show user list in table format

app.get("/users", (req, res) => {
    let q = `SELECT * FROM user`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.render("showuser", { result });
        });
    } catch (error) {
        console.log("error alay", error);
    }
});

//edit the user

app.get("/users/:id/edit", (req, res) => {
    let { id } = req.params;
    console.log(id);
    try {
        let q = `SELECT * FROM user WHERE id = '${id}'`;
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0]
            console.log(user);
            res.render("edit.ejs", { user });
        });
    } catch (error) {
        console.log("error alay bhava");
        res.render("error.ejs");
    }
});


// UPDATE ROUTE

// patch request handling 

app.patch("/users/:id", (req, res) => {
    console.log("patch req");
    let { id } = req.params;
    console.log(id);
    let { username: newUsername, password: formPass } = req.body;
    let q = `SELECT * FROM user WHERE id = '${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            console.log("formpass", formPass);
            console.log("dbpass", result[0].password);

            if (formPass != result[0].password) {
                console.log("Enter correct password");
                res.send("WRONG PASSWORD");
            } else {
                let q2 = `UPDATE user SET username = '${newUsername}' where id = '${id}'`;
                try {
                    connection.query(q2, (err, result) => {
                        if (err) throw err;
                        console.log(result);
                        res.redirect("/users");
                    });
                } catch (error) {
                    console.log("error");
                }
            }
        });
    } catch (error) {
        console.log("error");
    }
});


// adding the user

app.get("/users/add", (req, res) => {
    let userid = uuidv4();
    console.log(userid);
    res.render("add.ejs", { userid });
});

app.post("/users", (req, res) => {
    let { id, username, password, email } = req.body;
    // console.log(id);
    // console.log(email);
    // console.log(username);
    // console.log(password);
    let q = `INSERT INTO user (id,username,email,password) VALUES ('${id}','${username}','${email}','${password}')`;
    // console.log(q);
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.redirect("/users");
        });
    } catch (error) {
        console.log("error alay", error);
        res.render("error.ejs");
    }

})

// delete request cha from ptvtoy


app.get("/users/:id/deletepass", (req, res) => {
    console.log("del");
    let { id } = req.params;
    console.log(id);
    try {
        let q = `SELECT username,id FROM user WHERE id = '${id}'`;
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            console.log(user);
            res.render("deletePass.ejs", { user });
        });
    } catch (error) {
        console.log("error alay bhava", error);
    }
})

// deleting the user

app.delete("/users/:id", (req, res) => {
    console.log("del request");
    let { id } = req.params;
    console.log(id);
    let { email: userEnterEmail, password: userEnterPassword } = req.body;
    console.log(userEnterEmail, userEnterPassword);
    try {
        let q = `SELECT * FROM user where id = '${id}'`;
        connection.query(q, (err, result) => {
            if (err) throw err;
            console.log(result[0]);
            let { email: originalEmail, password: originalPassword } = result[0];
            console.log(originalEmail);
            console.log(originalPassword);
            if (originalEmail == userEnterEmail && originalPassword == userEnterPassword) {
                let q = `DELETE  FROM user WHERE id = '${id}'`;
                try {
                    connection.query(q, (err, result) => {
                        if (err) throw err;
                        console.log(result);
                        res.redirect("/users");
                    });
                } catch (error) {
                    console.log("error alay bhava", error);
                }
            }else{
                res.send("You enter wrong");
            }
        });
    } catch (error) {
        console.log("error alay bhava", error);
    }
});

app.listen(port, () => {
    console.log("Server was started");
});