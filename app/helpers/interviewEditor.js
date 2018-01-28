import { knex } from './dbconnector';

export const addQuestions = (questions, tableName) => {
    return new Promise((resolve, reject) => {
        questions &&
            tableName &&
            knex
                .insert(questions)
                .into(tableName)
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    reject(Error());
                });
    });
};

export const deleteQuestions = () => {};
