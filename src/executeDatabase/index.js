const db=require('../../connectDB/index');
exports.execute = (sql) => {
    return new Promise((resolve, reject) => {
        db.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }            
            resolve(result);
        });
    });
}