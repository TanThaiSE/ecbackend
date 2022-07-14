const e = require('express');
const contestService = require('./contests.service');
const { v4: uuid4 } = require('uuid');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const saltRounds = 10;
const APIFRONTEND = 'http://localhost:3000';

exports.listAllContests = async (req, res) => {
    // let language = ['', '', '', '', '', ''];
    try {
        let dataSending = req.body.dataSend;
        let language = JSON.parse(dataSending);
        let contests;
        let resultContest = [];
        try {
            contests = await contestService.getContestLanguage();
        } catch (error) {
            console.log(error);
        }
        // console.log('so luong la', contests.length);
        try {
            for (let i = 0; i < contests.length; i++) {
                if ((language[0] == 'Active' && language[1] == 'Achieved') || (language[0] == '' && language[1] == '')) {
                    const test_end = `${new Date(contests[i].test_end)}`;
                    const test_start = `${new Date(contests[i].test_start)}`;
                    contests[i].test_end = test_end;
                    contests[i].test_start = test_start;
                    resultContest.push(contests[i]);
                }
                else if (language[0] == 'Active' && language[1] == '') {
                    //xử lý select * và > ngày hiện tại
                    if (new Date(contests[i].test_end) > new Date()) {
                        const test_end = `${new Date(contests[i].test_end)}`;
                        const test_start = `${new Date(contests[i].test_start)}`;
                        contests[i].test_end = test_end;
                        contests[i].test_start = test_start;
                        resultContest.push(contests[i]);
    
                    }
                }
                else if (language[0] == '' && language[1] == 'Achieved') {
                    //xử lý select * và < ngày hiện tại
                    if (new Date(contests[i].test_end) < new Date()) {
                        const test_end = `${new Date(contests[i].test_end)}`;
                        const test_start = `${new Date(contests[i].test_start)}`;
                        contests[i].test_end = test_end;
                        contests[i].test_start = test_start;
                        resultContest.push(contests[i]);
    
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
        return res.status(200).json(resultContest);
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.getDetailContests = async (req, res) => {
    try {
        const id = req.params.id;
        let resultContest = [];
        try {
            let contests = await contestService.getDetailContests(id);
            for (let i = 0; i < contests.length; i++) {
                const register_end = `${new Date(contests[i].register_end)}`;
                const register_start = `${new Date(contests[i].register_start)}`;
                const test_end = `${new Date(contests[i].test_end)}`;
                const test_start = `${new Date(contests[i].test_start)}`;
    
                contests[i].register_end = register_end;
                contests[i].register_start = register_start;
                contests[i].test_end = test_end;
                contests[i].test_start = test_start;
    
                resultContest.push(contests[i]);
            }
        } catch (error) {
            console.log('getDetailContests', error);
        }
    
        if (resultContest)
            return res.status(200).json(resultContest);
    
        else return res.status(400).json({ msg: 'Cannot find any contests' });
    } catch (error) {
        return res.status(400).json(error);
    }

}

exports.getQuizInContest = async (req, res) => {
    try {
        const id = req.params.id;
        let inputDate = new Date().toString();
        let currentTime = new Date(inputDate).getFullYear() + '-' + (new Date(inputDate).getMonth() + 1) + '-' + new Date(inputDate).getDate() + ' ' + inputDate.split(' ')[4];
        let resultContest = [];
        try {
            let contests = await contestService.getQuizInContest(`"${id}"`, `"${currentTime}"`);
            for (let i = 0; i < contests.length; i++) {
                const opening_time = `${new Date(contests[i].opening_time)}`;
                const closing_time = `${new Date(contests[i].closing_time)}`;
                const created_date = `${new Date(contests[i].created_date)}`;
                contests[i].opening_time = opening_time;
                contests[i].closing_time = closing_time;
                contests[i].created_date = created_date;
                resultContest.push(contests[i]);
            }
        } catch (error) {
            console.log('getQuizInContest', error);
        }

        if (resultContest)
            return res.status(200).json(resultContest);

        else return res.status(400).json({ msg: 'Cannot find any contests' });
    } catch (error) {
        return res.status(400).json(error);
    }

    
}

exports.getMemberLeaderBoard = async (req, res) => {
    try {
        const id = req.params.id;
        let memberLeaderBoard = await contestService.getMemberLeaderBoard(id);
        if (memberLeaderBoard)
            return res.status(200).json(memberLeaderBoard);
    
        else return res.status(400).json({ msg: 'Cannot find any Member LeaderBoard' });
    } catch (error) {
        return res.status(400).json(error);
    }


}

exports.addMemberRegisterContest = async (req, res) => {
    try {
        let registerContest = req.body.dataSend;
        let addMemberRegisterContest = await contestService.addMemberRegisterContest(registerContest);
        return res.status(200).json({ msg: ' add registerContest success' });
    } catch (error) {
        return res.status(400).json(error);
    }

}

exports.getStatusRegisterContest = async (req, res) => {
    try {
        let statusContest = req.body.dataSend;
        let statusResult = await contestService.getStatusRegisterContest(statusContest);
        if (statusResult.length > 0)
            return res.status(200).json({ msg: "Yes" });
        else if (statusResult.length == 0) return res.status(200).json({ msg: "No" });
        else return res.status(400).json({ msg: "Cannot find getStatusRegisterContest status" });
    } catch (error) {
        return res.status(400).json(error);
    }


}

exports.getDefaultInfoRegisterForm = async (req, res) => {
    try {
        let inforRegisterForm = req.body.dataSend;
        let statusResult = await contestService.getDefaultInfoRegisterForm(inforRegisterForm);
        if (statusResult)
            return res.status(200).json(statusResult);
    
        else return res.status(400).json({ msg: 'Cannot find getDefaultInfoRegisterForm' });
    } catch (error) {
        return res.status(400).json(error);
    }



}


exports.createQuizSubmission = async (req, res) => {
    try {
        let quizSubmission = req.body.data;
        let createQuizSubmission = await contestService.createQuizSubmission(quizSubmission);
        return res.status(200).json({ msg: ' createQuizSubmission success' });
    } catch (error) {
        return res.status(400).json(error);
    }


}

exports.testpassport= async (req, res) => {
    try {
        return res.status(200).json({ message: req.user });
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}

exports.getProfile= async (req, res) => {
    try {
        let idAccount=req.user.id;

        let getInfoProfile = await contestService.getProfile(idAccount);
        if(getInfoProfile.length>0){
            return res.status(200).json(getInfoProfile);
        }
        else{
            return res.status(400).json({ msg: 'Not found user' });
        }
        
        // return res.status(200).json({ msg: ' createQuizSubmission success' });
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.editProfile= async (req, res) => {
    try {
        let idAccount=req.user.id;
        const {bio}=req.body;

        let editProfile = await contestService.editProfile(idAccount,bio);
        if(editProfile.affectedRows!==0){
            return res.status(200).json({ msg: "editProfile success",flag:'1' });
        }
        else{
            return res.status(400).json({ msg: "editProfile failed",flag:'-1' });
        }
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.updateEmail= async (req, res) => {
    try {
        let idAccount=req.user.id;
        const {email}=req.body;

        let editEmail = await contestService.updateEmail(idAccount,email);
        if(editEmail.affectedRows!==0){
            return res.status(200).json({ msg: "updateEmail success",flag:'1' });
        }
        else{
            return res.status(400).json({ msg: "updateEmail failed",flag:'-1' });
        }
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.changePassword= async (req, res) => {
    try {
        let idAccount=req.user.id;
        const {currentPassword,newPassword}=req.body;
        let account=await contestService.getCurrentPassword(idAccount); 
        if(account.length) {
            const isMatch = await bcrypt.compare(currentPassword, account[0].password);
            if (isMatch) {

                let passwordHash = await bcrypt.hash(newPassword, saltRounds);
                let updatePass = await contestService.updatePassword(passwordHash, idAccount);
                if (updatePass.affectedRows == 0) {
                    return res.status(200).json({ msg: 'Change password failed', flag: '-1' });
                }
                else {
                    return res.status(200).json({ msg: 'Change password success', flag: '1' });
                }
            }
            else {
                return res.status(200).json({ message: 'Current password is not correct',flag:'0' });
            }
        }
        else {
            return res.status(200).json({ message: 'Username is not exit',flag:'-1' });
        }
    } catch (error) {
        return res.status(400).json(error);
    }
}


