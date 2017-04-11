exports.add = function(req, res, username, age) {
    res.end('add' + username + ' ' + age)
}
exports.del = function(req, res, id) {
    res.end('del' + id)
}