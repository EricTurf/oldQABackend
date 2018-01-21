/**
 * http://usejsdoc.org/
 */

import mysql from 'mysql';
import express from 'express';
import {
  getQuestions,
  addQuestions,
  deleteQuestions,
  compileInterview,
  createUser,
  getUserInfo,
  validateUser,
  login
} from './api';
import { connection, userData, TokenValidator, EmailSender } from '../helpers';
import jwt from 'jsonwebtoken';
import EmailValidator from 'email-validator';

const router = express.Router();

router.route('/questions').get(getQuestions);

router.route('/questions/add').post(addQuestions);

router.route('/questions/delete/:id').delete(deleteQuestions);

router.route('/interview/compile/:firstName/:lastName').post(compileInterview);

router.route('/users/create').post(createUser);

router.route('users/info').get(getUserInfo);

router.route('/users/validate').post(validateUser);

router.route('/login').post(login);

export default router;
