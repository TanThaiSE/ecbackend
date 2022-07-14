const db = require('../../executeDatabase');

exports.getDetailContests = (id) => db.execute(
    "SELECT *"
    + " FROM contest_item C "
    + "Inner Join contest J "
    + "On C.contest_id = J.id "
    + `WHERE J.id ='${id}' `
)

exports.getContestLanguage = () => db.execute(
    // `SELECT A.contest_id as id,A.test_start,max(A.test_end) as test_end,B.name FROM contest_item A inner join contest B on A.contest_id=B.id WHERE B.id in (
    // SELECT contest_id FROM contest_key WHERE language_index=${id[2]} or language_index=${id[3]} or language_index=${id[4]} or language_index=${id[5]} ) group by A.contest_id`
    // `SELECT A.contest_id as id,A.test_start,max(A.test_end) as test_end,B.name 
    // FROM contest_item A 
    // inner join contest B on A.contest_id=B.id 
    // group by A.contest_id
    // order by test_end desc
    // `
    `
    SELECT A.contest_id as id,min(A.test_start) as test_start,max(A.test_end) as test_end,B.name 
    FROM contest_item A 
    inner join contest B on A.contest_id=B.id 
    group by A.contest_id
    order by test_end desc
    `
)

exports.getQuizInContest = (id, currentTime) => db.execute(
    `
    SELECT A.id,A.name,A.opening_time,A.closing_time,A.duration,A.created_date,A.creator_id FROM quiz A
    inner join contest_item B on B.quiz_id=A.id
    inner join contest C on C.id =B.contest_id
    where C.id=${id}
    AND (${currentTime} between B.test_start and B.test_end)
    `
)
exports.getMemberLeaderBoard = (id) => db.execute(
    `
    SELECT QS.score,U.official_id,U.name,U.country,U.bio
    FROM contest C INNER JOIN 
    contest_leaderboard CL ON C.id = CL.contest_id INNER JOIN
    quiz_submission QS ON QS.id = CL.quiz_submission_id INNER JOIN
    account AC ON AC.id = QS.creator_id INNER JOIN
    user U on U.account_id = AC.id
    WHERE C.id='${id}'
    `
)

exports.addMemberRegisterContest = (registerContest) => db.execute(
    `
    INSERT INTO contest_register (account_id, contest_id, country, city, education, created_date)
    VALUES ('${registerContest.account_id}', '${registerContest.contest_id}', 
    '${registerContest.country}', '${registerContest.city}', '${registerContest.education}', '${registerContest.created_date}');
    `
)

exports.getStatusRegisterContest = (statusContest) => db.execute(
    `
     SELECT *
     FROM contest_register C
     WHERE C.account_id = '${statusContest.account_id}' AND C.contest_id = '${statusContest.contest_id}'
    `
)


exports.getDefaultInfoRegisterForm = (inforRegisterForm) => db.execute(
    // `
    //     SELECT u.name as fullName,u.official_id as id,u.country
    //     FROM user u
    //     WHERE u.account_id= '${inforRegisterForm.account_id}'
    // `
    `
    SELECT u.name as fullName,u.official_id as id,u.country,(select username from account acc1 where u.school_id=acc1.id ) as school
    FROM account ac
    INNER JOIN user u ON (ac.id=u.account_id)
    WHERE ac.id= '${inforRegisterForm.account_id}'
    `
)

exports.createQuizSubmission = (quizSubmission) => db.execute(

    `
    INSERT INTO quiz_submission (id,creator_id, quiz_id, score, test_start, test_end)
     VALUES ('${quizSubmission.id}' , '${quizSubmission.creator_id}','${quizSubmission.quiz_id}','${quizSubmission.score}','${quizSubmission.test_start}','${quizSubmission.test_end}');
    `
)

exports.getProfile = (idAccount) => db.execute(

    // `
    // SELECT ac.username,ac.email,u.official_id,u.name,u.country,u.bio,u.phone_number as phoneNumber,u.school_id as school
    // FROM account ac
    // INNER JOIN user u ON (ac.id=u.account_id)
    // WHERE ac.id='${idAccount}'
    // `

    `
    SELECT ac.username,ac.email,u.official_id,u.name,u.country,u.bio,(select username from account acc1 where u.school_id=acc1.id ) as school
    FROM account ac
    INNER JOIN user u ON (ac.id=u.account_id)
    WHERE ac.id='${idAccount}'
    `

)
exports.editProfile = (idAccount, bio) => db.execute(

    `
    UPDATE user SET bio='${bio}'
    WHERE account_id='${idAccount}'
    `
)
exports.updateEmail= (idAccount, email)=> db.execute(

    `
    UPDATE account SET email='${email}'
    WHERE id='${idAccount}'
    `
)

exports.getCurrentPassword=(idAccount)=> db.execute(
    `
    SELECT password
    FROM account 
    WHERE id='${idAccount}'
    `
)

exports.updatePassword=(passwordHash, idAccount)=> db.execute(
    `
    UPDATE account SET password ='${passwordHash}' WHERE id='${idAccount}'
    `
)