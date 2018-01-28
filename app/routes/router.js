/**
 * http://usejsdoc.org/
 */

import express from 'express';
import {
    getQuestions,
    addQuestions,
    deleteQuestions,
    compileInterview,
    createInterview,
    createUser,
    getUserInfo,
    validateUser,
    login,
} from './api';

const router = express.Router();

router.route('/questions').get(getQuestions);

router.route('/questions/add').post(addQuestions);

router.route('/questions/delete/:id').delete(deleteQuestions);

router.route('/interview/create').post(createInterview);

router.route('/interview/compile/:interviewId').post(compileInterview);

router.route('/users/create').post(createUser);

router.route('users/info/:token').get(getUserInfo);

router.route('/users/validate/:token').patch(validateUser);

router.route('/login').post(login);

export default router;
