'use strict';
const Pool = require('pg-pool');
const config = require('../config.json');
const { table, host, database, user, password, port } = config;
const pool = new Pool({
    host,
    database,
    user,
    password,
    port,
    idleTimeoutMillis: 1000
});

module.exports.putStudent = (event, context, callback) => {
    console.log('event', event);
    const { student_name, grade_level } = event.body;
    const student_id = Number(event.body.student_id);
    const putStudent = "UPDATE " + table + " SET student_name = $1 , grade_level = $2 WHERE student_id = $3;";
    console.log('typeof(student_id)', typeof(student_id));

    pool.connect()
        .then(client => {
            client.release()
            return client.query(putStudent, [student_name, grade_level, student_id]);
        })
        .then(res => {

            const response = {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
                    'Access-Control-Allow-Credentials': true
                },
                body: JSON.stringify({
                    message: res,
                })
            };

            callback(null, response)
        })
        .catch(err => {
            console.log('err', err);
        });


    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};