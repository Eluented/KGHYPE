exports.signIn = async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    if( username === "goldstardev2002@gmail.com" && password === "44444444") {
        res.status(200).send("Success");
    }
}