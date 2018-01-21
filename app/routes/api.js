/**
 * http://usejsdoc.org/
 */

var mysql = require("mysql");
var connection = require("./dbconnector");
var jwt = require("jsonwebtoken");
var userData = require("./userData");
var EmailSender = require("./sendEmail");
var TokenValidator = require("./tokenValidator");
var EmailValidator = require("email-validator");

exports.addQuestion = function(req, res) {
  var obj = req.body;

  if (obj[0].question == null || obj[0].question == "") {
    res.json({
      success: false,
      message:
        "One of the question fields was left blank. Please insert a question(s)"
    });
  } else {
    var query = "INSERT INTO ??(??) VALUES (?)";
    var table = ["interviewq", "question", obj[0].question];
    query = mysql.format(query, table);
    connection.query(query, (err, rows) => {
      if (err) {
        res.json({
          success: false,
          Message: "Error executing MySQL query"
        });
      } else {
        res.json({
          success: true,
          message: "we have added your question(s)."
        });
      }
    }); // end of connection.query
  }
};

exports.getQuestions = (req, res) => {
  var query = "SELECT * FROM ??";
  var table = ["interviewq"];
  query = mysql.format(query, table);
  connection.query(query, function(err, rows) {
    if (err) {
      res.json({
        success: false,
        Message: "Error executing MySQL query"
      });
    } else {
      res.json({
        success: true,
        Questions: rows
      });
    }
  }); // end of connection.query
};
exports.compileAnswers = function(req, res) {
  userData(req.params.refID, function(err, email) {
    if (err) {
      res.json({
        success: false,
        message:
          "Could not retrieve the proper e-mail assosiated to this interview!"
      });
    } else if (email) {
      var obj = req.body;
      var subject =
        "Interview conducted by " + req.params.fname + " " + req.params.lname;

      var msg = "";
      for (var i = 0; i < obj.length; i++) {
        msg += "Question " + (i + 1) + ": " + obj[i].question + "\n";
        msg += "Answer " + (i + 1) + ": " + obj[i].answer + "\n";
      }
      EmailSender(email, subject, msg, function(err) {
        if (err) {
          res.json({
            success: false,
            message: err
          });
        } else {
          res.json({
            success: true,
            message: "Successfully submitted interview!"
          });
        }
      });
    }
  });
};
exports.deleteQuestions = function(req, res) {
  if (req.params.id == null || req.params.id == "") {
    res.json({
      success: false,
      message: "No question selected for deletion"
    });
  } else {
    var query = "DELETE FROM ?? WHERE??=?";
    var table = ["interviewq", "id", req.params.id];
    query = mysql.format(query, table);
    connection.query(query, function(err, rows) {
      if (err) {
        res.json({
          success: false,
          message: "Error executing MySQL query"
        });
      } else {
        res.json({
          success: true,
          message: "Succesfully deleted question(s)"
        });
      }
    }); //end of connection.query
  }
}; //end of delete
exports.authUser = function(req, res) {
  var query = "SELECT * FROM ?? WHERE ?? = ?";
  var password = req.body.password;
  var table = ["users", "email", req.body.email];
  query = mysql.format(query, table);
  connection.query(query, function(err, results, fields) {
    if (err) {
      res.json({
        success: false,
        Mesage: "Error connecting to database"
      });
    } else {
      if (results.length > 0) {
        if (results[0].password == password) {
          var token = jwt.sign(
            {
              email: results[0].email
            },
            "ilikepie",
            {
              expiresIn: "1h"
            }
          );

          res.json({
            success: true,
            Message: "Logged in",
            token: token
          });
        } else {
          res.json({
            success: false,
            Message: "Invalid password"
          });
        }
      } else {
        res.json({
          success: false,
          Message: "Invalid username and password"
        });
      }
    }
  });
};

exports.getUserInfo = function(req, res) {
  var token = req.body.token || req.body.query || req.headers["x-access-token"];
  if (token) {
    TokenValidator(token, function(err, vToken) {
      if (err) {
        res.json({
          success: false,
          message: err.message
        });
      } else {
        res.json({
          success: true,
          message: "Token validated",
          username: vToken.username
        });
      }
    });
  } else {
    res.json({
      success: false,
      message: "no token was provided."
    });
  }
};

exports.createUser = function(req, res) {
  if (
    req.body.email == null ||
    req.body.email == "" ||
    req.body.password == null ||
    req.body.password == ""
  ) {
    res.json({
      success: false,
      message: "Email and/or password was left empty!"
    });
  } else if (!EmailValidator.validate(req.body.email)) {
    res.json({
      success: false,
      message: "Invalid email address. Please enter an actual email address"
    });
  } else {
    var query = "INSERT INTO ??(??,??) VALUES (?,?)";
    var table = [
      "users",
      "email",
      "password",
      req.body.email,
      req.body.password
    ];
    query = mysql.format(query, table);
    connection.query(query, function(err, rows) {
      if (err) {
        res.json({
          success: false,
          message: "SQL error" + err
        });
      } else {
        var tempToken = jwt.sign(
          {
            email: req.body.email
          },
          "ilikepie",
          {
            expiresIn: "1h"
          }
        );
        if (tempToken) {
          var subject =
            "Activation link for your QuestionApp account: " + req.body.email;
          var msg =
            "To activate your account, please click on the following link: https://radiant-lake-20483.herokuapp.com/activateUser/" +
            tempToken;
          EmailSender(req.body.email, subject, msg, function(err) {
            if (err) {
              res.json({
                success: false,
                message: "Problem encountered when sending email",
                token: tempToken
              });
            } else {
              res.json({
                success: true,
                message: "Activation link sent!"
              });
            }
          });
        }
      }
    });
  }
};

exports.validateUser = function(req, res) {
  var tempToken = req.params.token;
  if (tempToken) {
    TokenValidator(tempToken, function(err, vToken) {
      if (err) {
        res.json({
          success: false,
          message: "Invalid link or your activation link is expired"
        });
      } else {
        var query = "UPDATE ?? SET ??=? WHERE ?? = ?";
        var table = ["users", "activated", true, "email", vToken.email];
        query = mysql.format(query, table);
        connection.query(query, function(err, results, fields) {
          if (err) {
            res.json({
              success: false,
              message: "SQL error"
            });
          } else {
            res.json({
              success: true,
              message: "Your account has been validated"
            });
          }
        });
      }
    });
  } else {
    res.json({
      success: false,
      message: "No token received"
    });
  }
};
