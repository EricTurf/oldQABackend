import { knex } from './dbconnector';

export const addQuestions = (questions, tableName) => {
    return new Promise((resolve, reject) => {
        if (questions && tableName) {
            knex
                .insert(questions)
                .into(tableName)
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    reject(Error());
                });
        } else {
            reject(Error());
        }
    });
};

export const deleteTable = interviewId => {
    return new Promise(function(resolve, reject) {
        knex.schema
            .dropTable(interviewId)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(Error);
            });
    });
};

export const createTable = ({ interviewId, tableName }) => {
    return new Promise(function(resolve, reject) {
        if (interviewId || table) {
            knex.schema
                .createTable(interviewId || tableName, table => {
                    table.increments();
                    table.string('question', 1000);
                })
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    reject(Error());
                });
        } else {
            reject(Error());
        }
    });
};
