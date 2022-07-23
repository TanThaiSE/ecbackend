const db=require('../../connectDB/index');
exports.execute = (sql) => {
    return new Promise((resolve, reject) => {
        db.query(sql, function (err, result) {
            if (err) {
                console.log("hello");
                console.log(sql);
                reject(err);
            }            
            resolve(result);
        });
    });
}