/**
 * http://usejsdoc.org/
 */

import express from 'express';
import {
    getQuestions,
    compileInterview,
    createInterview,
    editInterview,
    createUser,
    getUserInfo,
    validateUser,
    login,
} from './api';

const router = express.Router();

router.route('/questions/:interviewId').get(getQuestions);

router.route('/interview/create/:interviewName').post(createInterview);

router.route('/interview/compile/:interviewId').post(compileInterview);

router.route('/interview/edit/:interviewId').post(editInterview);

router.route('/users/create').post(createUser);

router.route('users/info/:token').get(getUserInfo);

router.route('/users/validate/:token').patch(validateUser);

router.route('/login').post(login);

export default router;
