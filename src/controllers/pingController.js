class PingController {
    static async ping(req, res) {
        try {
            res.type('application/json');
            res.send('ОК');
            return;
        } catch (e) {
            res.send(e.message)
        }
    }
}

module.exports = PingController;
