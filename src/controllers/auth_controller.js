import jwt from "jsonwebtoken"

class Person {

    constructor(name, password, id, age) {
        this.name = name;
        this.password = password;
        this.age = age;
        this.id = id;
    }
}

let users = [
    new Person("mohamed", "mohmoh", 26, 1),
    new Person("ali", "aliali", 22, 2),
    new Person("ahmed", "ahmedahmed", 30, 3),
    new Person("nassim", "nassimnassim", 33, 4),

];

let login = async (req, res) => {
    const { name, password } = req.query
    const user = users.find(person => person.name == name);
    if (!user) {
        res.send(400, "user not found");
    } else {
        if (user.password == password) {
            const token = jwt.sign({ userID: user.id }, "eXaMpl3jWTs3cr3t!@#2024$%^&*QWEasdZXC123456", { expiresIn: "2m" })
            console.log(token);

            res.send(200, { "token": token })
        } else {
            res.send(400, "password incorrect");
        }
    }
}


const authentication = (req, res, next) => {
    const { token } = req.headers;

    if (!token) return res.send(400, "token required");

    jwt.verify(token, "eXaMpl3jWTs3cr3t!@#2024$%^&*QWEasdZXC123456", async (error, decod) => {

        if (error) return res.send(403, "invalid token");

        console.log("valid token");
        const userID = decod.userID;
        req.userID = userID
        return next();
    });


}

let getUser = async (req, res) => {
    const userID = req.userID;
    const userData = users.find(person => person.id == userID);
    res.send(200, userData);
}


export { login, authentication, getUser }
