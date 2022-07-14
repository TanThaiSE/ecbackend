const e = require('express');
const loginService = require('./login.service');
const { v4: uuid4 } = require('uuid');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const saltRounds = 10;

const APIFRONTEND = 'http://localhost:3000';

exports.signInLocal = async (req, res) => {
    try {
        const { username, password } = req.body.dataSend;
        console.log('signInLocal ',req.body.dataSend);
        const account = await loginService.signInLocal(username, password);

        if (account.length) {
            const isMatch = await bcrypt.compare(password, account[0].password);
            if (isMatch) {
                const info = { id: account[0].id, type: account[0].type };
                const token = jwt.sign(info, process.env.JWT_SECRET, { expiresIn: '24h' });
                return res.status(200).json({ token: token, userId: account[0].id, type: account[0].type, blocked: account[0].is_blocked,flag:'1' });
            }
            else {
                return res.status(200).json({ message: 'Password is not correct',flag:'0' });
            }
        } else {
            return res.status(200).json({ message: 'Username is not exit',flag:'-1' });
        }
    } catch (error) {
        return res.status(401).json({ message: error.message,flag:'-2' });
    }



}

exports.forgotPassword = async (req, res) => {
    let infoForgotPass = req.body.dataSend;
    let checkExitAccount = await loginService.findAccount(infoForgotPass);
    if (checkExitAccount.length > 0) {
        let contentSend = `
        <p>Hi ${infoForgotPass.email}</p>
        <p>Please click link: ${APIFRONTEND}/getpassword/${checkExitAccount[0].id} to create new password</p>
        <p>Please not share with anyone!</p>
        <p>Thank you!</p>`;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `tanthai172k@gmail.com`,
                pass: `manchester666A`
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        let mailOptions = {
            from: `tanthai172k@gmail.com`, // sender address
            to: `${infoForgotPass.email}`,
            subject: "Reset password",
            html: contentSend
        }
        transporter.sendMail(mailOptions, function (error, infor) {
            if (error) {
                console.log('loi sent forgot password roi', error);
                return;
            }
            console.log('sent forgot password', infor.response);
        });
        return res.status(200).json({ msg: 'YES', colorMess: '#36e00b' });
    }
    else if (checkExitAccount.length === 0) {
        return res.status(200).json({ msg: 'NO', colorMess: 'error' });
    }
    else {
        return res.status(400).json({ msg: 'forgotPassword failed' });
    }
}

exports.getNewPassword = async (req, res) => {
    let { password, idAcc } = req.body.dataSend;
    let checkExitAccount = await loginService.findExistAccount(idAcc);
    if (checkExitAccount.length > 0) {
        let passwordHash = await bcrypt.hash(password, saltRounds);
        let updatePass = await loginService.updatePassword(passwordHash, idAcc);
        if (updatePass.affectedRows == 0) {
            return res.status(200).json({ msg: 'NO', colorMess: 'error' });
        }
        else {
            return res.status(200).json({ msg: 'YES', colorMess: '#36e00b' });
        }
    }
    else if (checkExitAccount.length === 0) {
        return res.status(200).json({ msg: 'NO', colorMess: 'error' });
    }
    else {
        return res.status(400).json({ msg: 'getNewpassword failed' });
    }
}