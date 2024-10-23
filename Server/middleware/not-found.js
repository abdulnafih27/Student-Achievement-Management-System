const notFound = (req, res, next) => {
     res.status(404).sendFile(__dirname + "/views/404.html");
}

module.exports = notFound;