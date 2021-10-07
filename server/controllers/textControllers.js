module.exports = {
    text: (req, res) => {
        let content = req.body.text
        res.send(`${content} success!`)
    }
}