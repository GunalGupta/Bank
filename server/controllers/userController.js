const mysql = require('mysql');
const { use } = require('../routes/user');


//Connection Pool
const pool=mysql.createPool({
    //env file me hai
    connectionLimit:100,
    host: 'localhost',
    user : 'root',
    password : 'Ved@1357',
    database: 'project'

});

exports.view = (req, res) => {
    res.render('home',{ layout: 'main' });
}
exports.loginpage = (req, res) => {
    res.render('login',{ layout: 'loginlayout' });
}

exports.editpage = (req, res) => {
  res.render('editprofile',{ layout: 'editprofilelayout' });
}

// exports.supportpage = (req, res) => {
//   res.render('support',{ layout: 'supportlayout' });
// }

exports.adminloginpage = (req, res) => {
  res.render('adminlogin',{ layout: 'employeelayout' });
}

exports.cardspage = (req, res) => {
    res.render('cards',{ layout: 'cardslayout' });
}
// exports.dashboardpage = (req, res) => {
//     // res.render('dashboard',{ layout: 'dashboardlayout' });
//     if (req.session.user) {
//         const username = req.query.username;

//         // render the dashboard page with the user's details
//         // res.render('dashboard', { layout: 'dashboardlayout' });
//         res.render('dashboard', { layout: 'dashboardlayout', user: req.session.user });
//       } else {
//         // redirect to login page if not logged in
//         res.redirect('/');
//      }
// }

exports.dashboardpage = (req, res) => {
    pool.getConnection((err, Connection) => {
        if (err) throw err; // not connected
        console.log('Connected as ID ' + Connection.threadId);

        if (req.session.user) {
            const username = req.query.username;

            // fetch user details from the database based on username
            Connection.query('SELECT * FROM account, account_holder WHERE account.username = account_holder.username and account_holder.username = ?', [username], (error, results) => {
                if (error) throw error;

                const user = results[0];
                
                // calculate net worth by adding balance, credit utilized and investments
                const balance = user.balance;
                const creditUtilized = Math.floor(balance * (5) + 10000); // generate a random number between 10000 and 100000
                const investments = Math.floor(Math.random() * (5000 - 1000 + 1) + 300000); // generate a random number between 1000000 and 5000000
                const netWorth = balance + investments;
                user.netWorth = netWorth;
                user.investments = investments;
                user.creditUtilized = creditUtilized;

                // render the dashboard page with the user's details
                res.render('dashboard', { layout: 'dashboardlayout', user });
            });

        } else {
            // redirect to login page if not logged in
            res.redirect('/');
        }

        Connection.release(); // release connection back to pool
    });
};


  

exports.loanspage = (req, res) => {
    res.render('loans',{ layout: 'loanslayout' });
}
exports.profilepage = (req, res) => {
    res.render('profile',{ layout: 'profilelayout' });
}
exports.subscriptionspage = (req, res) => {
    res.render('subscriptions',{ layout: 'subscriptionslayout' });
}
exports.supportpage = (req, res) => {
    res.render('support',{ layout: 'supportlayout' });
}
exports.transactionspage = (req, res) => {
    res.render('transactions',{ layout: 'transactionslayout' });
}

exports.adminedituser = (req, res) => {
  // res.render('editalluser',{ layout: 'editadminuserlayout' });
  const { name, pincode, state, city, governmentID, contact_no, balance , account_no , password} = req.body;
    
        pool.getConnection((err, Connection) =>{
            if(err) throw err; //not connected
            console.log('Connected as ID' + Connection.threadId);
    
            // let searchTerm = req.body.search; //search is the actual input from user
            
            Connection.query('SELECT * FROM account, account_holder, holder_address, holderid  WHERE account_holder.username = ?  AND account.username = account_holder.username AND account_holder.pincode = holder_address.pincode   AND account.username = holderid.username;', [ req.params.username],(err, rows) =>{
                Connection.release();
                const user = rows[0];
                if(!err){
                    res.redirect('/editalluser', {rows, user, layout: 'editadminuserlayout'});
                } else{
                    console.log(err);
                }

                console.log('The data from user table: \n', rows);
            });
        });
}

// exports.create = (req,res) => {
//     const { name, username, contact_no, password, pincode} = req.body;
    
//         pool.getConnection((err, Connection) =>{
//             if(err) throw err; //not connected
//             console.log('Connected as ID' + Connection.threadId);
    
//             let searchTerm = req.body.search; //search is the actual input from user
            
//             Connection.query('INSERT INTO account_holder SET name = ?, username = ?, contact_no = ?, password = ?, pincode = ?  ',[ name, username, contact_no, password, username, username, pincode, pincode] ,(err, rows) =>{
//                 Connection.release();
                
    
//                 if(!err){
//                     res.render('home', {
//                     });
//                 } else{
//                     console.log(err);
//                 }
    
//                 // console.log('The data from user table: \n', rows);
//             });
//         });
//     }

// exports.create = (req, res) => {
//   const { name, username, contact_no, password, pincode } = req.body;

//   pool.getConnection((err, Connection) => {
//     if (err) throw err; // not connected
//     console.log('Connected as ID ' + Connection.threadId);

//     Connection.beginTransaction((err) => {
//       if (err) throw err;

//       // Insert into account_holder table
//       Connection.query('INSERT INTO account_holder SET name = ?, username = ?, contact_no = ?, password = ?, pincode = ?', [name, username, contact_no, password, pincode], (error, results, fields) => {
//         if (error) {
//           return Connection.rollback(() => {
//             throw error;
//           });
//         }

//         // Get the ID of the newly inserted account_holder record
//         const holderId = results.insertId;

//         // Insert into account table
//         Connection.query('INSERT INTO account SET username = ?', [username], (error, results, fields) => {
//           if (error) {
//             return Connection.rollback(() => {
//               throw error;
//             });
//           }

//           // Get the ID of the newly inserted account record
//           const accountId = results.insertId;

//           // Insert into holder_address table
//           Connection.query('INSERT INTO holder_address SET pincode = ?', [pincode], (error, results, fields) => {
//             if (error) {
//               return Connection.rollback(() => {
//                 throw error;
//               });
//             }

//             // Get the ID of the newly inserted holder_address record
//             const holderAddressId = results.insertId;

//             // Insert into holder_contact table
//             Connection.query('INSERT INTO holderid SET username = ?', [username], (error, results, fields) => {
//               if (error) {
//                 return Connection.rollback(() => {
//                   throw error;
//                 });
//               }

//               // Commit the transaction
//               Connection.commit((err) => {
//                 if (err) {
//                   return Connection.rollback(() => {
//                     throw err;
//                   });
//                 }

//                 console.log('Data inserted into all tables successfully!');
//                 res.render('home');
//               });
//             });
//           });
//         });
//       });
//     });
//   });
// };

exports.register = (req, res) => {
  const { name, username, contact_no, password, pincode } = req.body;

  pool.getConnection((err, Connection) => {
    if (err) {
      throw err; // not connected
    }

    console.log('Connected as ID ' + Connection.threadId);

    Connection.beginTransaction((err) => {
      if (err) {
        throw err;
      }

      // Insert into account_holder table
      Connection.query(
        'INSERT INTO account_holder (name, username, contact_no, password, pincode) VALUES (?, ?, ?, ?, ?)',
        [name, username, contact_no, password, pincode],
        (error, results, fields) => {
          if (error) {
            return Connection.rollback(() => {
              throw error;
            });
          }

          // Get the ID of the newly inserted account_holder record
          const holderId = results.insertId;

          // Insert into account table
          Connection.query(
            'INSERT INTO account (username) VALUES (?)',
            [username],
            (error, results, fields) => {
              if (error) {
                return Connection.rollback(() => {
                  throw error;
                });
              }

              // Get the ID of the newly inserted account record
              const accountId = results.insertId;

              // Insert into holder_address table
              Connection.query(
                'INSERT INTO holder_address (pincode) VALUES (?)',
                [pincode],
                (error, results, fields) => {
                  if (error) {
                    return Connection.rollback(() => {
                      throw error;
                    });
                  }

                  // Get the ID of the newly inserted holder_address record
                  const holderAddressId = results.insertId;

                  // Insert into holder_contact table
                  Connection.query(
                    'INSERT INTO holderid (username) VALUES (?)',
                    [username],
                    (error, results, fields) => {
                      if (error) {
                        return Connection.rollback(() => {
                          throw error;
                        });
                      }

                      // Commit the transaction
                      Connection.commit((err) => {
                        if (err) {
                          return Connection.rollback(() => {
                            throw err;
                          });
                        }

                        console.log('Data inserted into all tables successfully!');
                        res.render('home');
                      });
                    }
                  );
                }
              );
            }
          );
        }
      );
    });
  });
};





    exports.login = (req, res) => {
        const { username, password } = req.body;
      
        // get a connection from the pool
        pool.getConnection((err, connection) => { 
          if (err) throw err; // not connected
      
          connection.query('SELECT * FROM account_holder WHERE username = ? AND password = ?', [username, password], (err, rows) => {
            connection.release();
      
            if (!err) {
              if (rows.length > 0) {
                // user found, set session and redirect to dashboard
                req.session.user = rows[0];
                res.redirect('/dashboard?username=' + username);
                // res.render('login', {layout: 'loginlayout'})
              } else {
                // user not found or password didn't match
                res.render('login', { layout: 'loginlayout', error: 'Invalid username or password', alert: 'Invalid username or password!' });
              }
            } else {
              console.log(err);
              res.render('login', { layout: 'loginlayout', error: 'Something went wrong. Please try again later.' });
            }
          });
        });
      };

   
      
      
    exports.create = (req,res) => {
        const { name, username, contact_no, password} = req.body;
        
            pool.getConnection((err, Connection) =>{
                if(err) throw err; //not connected
                console.log('Connected as ID' + Connection.threadId);
        
                let searchTerm = req.body.search; //search is the actual input from user
                
                Connection.query('INSERT INTO account_holder SET name = ?, username = ?, contact_no = ?, password = ?',[ name, username, contact_no, password] ,(err, rows) =>{
                    Connection.release();
        
                    if(!err){
                        res.render('login', { layout: 'loginlayout'
                        });
                    } else{
                        console.log(err);
                    }
        
                    // console.log('The data from user table: \n', rows);
                });
            });
        }

        exports.cardspage = (req, res) => {
            const username = req.query.username;
          
            pool.getConnection((err, Connection) => {
              if (err) throw err; // not connected
              console.log('Connected as ID ' + Connection.threadId);
          
              // fetch user details from the database based on username
              Connection.query(
                'SELECT * FROM account, account_holder WHERE account.username = account_holder.username and account_holder.username = ?',
                [username],
                (error, results) => {
                  if (error) throw error;
          
                  const user = results[0];
          
                  // calculate net worth by adding balance, credit utilized and investments
                //   const balance = user.Balance;
                //   const creditUtilized = Math.floor(Math.random() * (100000 - 10000 + 1) + 10000); // generate a random number between 10000 and 100000
                //   const investments = Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000); // generate a random number between 1000000 and 5000000
                //   const netWorth = balance + investments + creditUtilized;
                //   user.netWorth = netWorth;
                //   user.investments = investments;
                //   user.creditUtilized = creditUtilized;
          
                  // render the cards page with the user's details
                  res.render('cards', { layout: 'cardslayout', user });
                }
              );
          
              Connection.release(); // release connection back to pool
            });
          };

          exports.loanspage = (req, res) => {
            const username = req.query.username;
          
            pool.getConnection((err, Connection) => {
              if (err) throw err; // not connected
              console.log('Connected as ID ' + Connection.threadId);
          
              // fetch user details from the database based on username
              Connection.query(
                'SELECT * FROM account join loan WHERE account.username = ? and account.loanID1 = loan.loan_id',
                [username],
                (error, results) => {
                  if (error) throw error;
          
                  const user = results[0];
          
                  // calculate net worth by adding balance, credit utilized and investments
                //   const balance = user.Balance;
                //   const creditUtilized = Math.floor(Math.random() * (100000 - 10000 + 1) + 10000); // generate a random number between 10000 and 100000
                //   const investments = Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000); // generate a random number between 1000000 and 5000000
                //   const netWorth = balance + investments + creditUtilized;
                //   user.netWorth = netWorth;
                //   user.investments = investments;
                //   user.creditUtilized = creditUtilized;
          
                  // render the cards page with the user's details
                  res.render('loans', { layout: 'loanslayout', user });
                }
              );
          
              Connection.release(); // release connection back to pool
            });
          };

          exports.subscriptionspage = (req, res) => {
            const username = req.query.username;
          
            pool.getConnection((err, Connection) => {
              if (err) throw err; // not connected
              console.log('Connected as ID ' + Connection.threadId);
          
              // fetch user details from the database based on username
              Connection.query(
                'SELECT * FROM account, account_holder WHERE account.username = account_holder.username and account_holder.username = ?',
                [username],
                (error, results) => {
                  if (error) throw error;
          
                  const user = results[0];
          
                  // calculate net worth by adding balance, credit utilized and investments
                //   const balance = user.Balance;
                //   const creditUtilized = Math.floor(Math.random() * (100000 - 10000 + 1) + 10000); // generate a random number between 10000 and 100000
                //   const investments = Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000); // generate a random number between 1000000 and 5000000
                //   const netWorth = balance + investments + creditUtilized;
                //   user.netWorth = netWorth;
                //   user.investments = investments;
                //   user.creditUtilized = creditUtilized;
          
                  // render the cards page with the user's details
                  res.render('subscriptions', { layout: 'subscriptionslayout', user });
                }
              );
          
              Connection.release(); // release connection back to pool
            });
          };

          exports.supportpage = (req, res) => {
            const username = req.query.username;
          
            pool.getConnection((err, Connection) => {
              if (err) throw err; // not connected
              console.log('Connected as ID ' + Connection.threadId);
          
              // fetch user details from the database based on username
              Connection.query(
                'SELECT * FROM account, account_holder WHERE account.username = account_holder.username and account_holder.username = ?',
                [username],
                (error, results) => {
                  if (error) throw error;
          
                  const user = results[0];
          
                  // calculate net worth by adding balance, credit utilized and investments
                //   const balance = user.Balance;
                //   const creditUtilized = Math.floor(Math.random() * (100000 - 10000 + 1) + 10000); // generate a random number between 10000 and 100000
                //   const investments = Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000); // generate a random number between 1000000 and 5000000
                //   const netWorth = balance + investments + creditUtilized;
                //   user.netWorth = netWorth;
                //   user.investments = investments;
                //   user.creditUtilized = creditUtilized;
          
                  // render the cards page with the user's details
                  res.render('support', { layout: 'supportlayout', user });
                }
              );
          
              Connection.release(); // release connection back to pool
            });
          };

          exports.transactionspage = (req, res) => {
            const username = req.query.username;
          
            pool.getConnection((err, Connection) => {
              if (err) throw err; // not connected
              console.log('Connected as ID ' + Connection.threadId);
          
              // fetch user details from the database based on username
              Connection.query(
                'SELECT * FROM account, account_holder WHERE account.username = account_holder.username and account_holder.username = ?',
                [username],
                (error, results) => {
                  if (error) throw error;
          
                  const user = results[0];
          
                  // calculate net worth by adding balance, credit utilized and investments
                //   const balance = user.Balance;
                //   const creditUtilized = Math.floor(Math.random() * (100000 - 10000 + 1) + 10000); // generate a random number between 10000 and 100000
                //   const investments = Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000); // generate a random number between 1000000 and 5000000
                //   const netWorth = balance + investments + creditUtilized;
                //   user.netWorth = netWorth;
                //   user.investments = investments;
                //   user.creditUtilized = creditUtilized;
          
                  // render the cards page with the user's details
                  res.render('transactions', { layout: 'transactionslayout', user });
                }
              );
          
              Connection.release(); // release connection back to pool
            });
          };

          exports.editpage = (req, res) => {
            const username = req.query.username;
          
            pool.getConnection((err, Connection) => {
              if (err) throw err; // not connected
              console.log('Connected as ID ' + Connection.threadId);
          
              // fetch user details from the database based on username
              Connection.query(
                'SELECT * FROM account JOIN account_holder ON account.username = account_holder.username JOIN holder_address ON account_holder.pincode = holder_address.pincode JOIN holderid ON account.username = holderid.username WHERE account_holder.username = ?',
                [username],
                (error, results) => {
                  if (error) throw error;
          
                  const user = results[0];
          
                  // calculate net worth by adding balance, credit utilized and investments
                //   const balance = user.Balance;
                //   const creditUtilized = Math.floor(Math.random() * (100000 - 10000 + 1) + 10000); // generate a random number between 10000 and 100000
                //   const investments = Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000); // generate a random number between 1000000 and 5000000
                //   const netWorth = balance + investments + creditUtilized;
                //   user.netWorth = netWorth;
                //   user.investments = investments;
                //   user.creditUtilized = creditUtilized;
          
                  // render the cards page with the user's details
                  res.render('editprofile', { layout: 'editprofilelayout', user });
                }
              );
          
              Connection.release(); // release connection back to pool
            });
          };

          exports.profilepage = (req, res) => {
            const username = req.query.username;
            console.log("HH")
          
            pool.getConnection((err, Connection) => {
              if (err) throw err; // not connected
              console.log('Connected as ID ' + Connection.threadId);
          
              // fetch user details from the database based on username
              Connection.query(
                'SELECT * FROM account JOIN account_holder ON account.username = account_holder.username JOIN holder_address ON account_holder.pincode = holder_address.pincode JOIN holderid ON account.username = holderid.username WHERE account_holder.username = ?',
                [username],
                (error, results) => {
                  if (error) throw error;
          
                  const user = results[0];
          
                  // calculate net worth by adding balance, credit utilized and investments
                //   const balance = user.Balance;
                //   const creditUtilized = Math.floor(Math.random() * (100000 - 10000 + 1) + 10000); // generate a random number between 10000 and 100000
                //   const investments = Math.floor(Math.random() * (5000000 - 1000000 + 1) + 1000000); // generate a random number between 1000000 and 5000000
                //   const netWorth = balance + investments + creditUtilized;
                //   user.netWorth = netWorth;
                //   user.investments = investments;
                //   user.creditUtilized = creditUtilized;
          
                  // render the cards page with the user's details
                  res.render('profile', { layout: 'profilelayout', user });
                }
              );
          
              Connection.release(); // release connection back to pool
            });
          };



        // exports.viewallusers = (req, res) => {
        //     // const username = req.query.username;
        //     // console.log("h")
        
        //     pool.getConnection((err, Connection) => {
        //       if (err) throw err; // not connected
        //       console.log('Connected as ID- ' + Connection.threadId);
        //       Connection.query('SELECT account_holder.name, account.Account_No, account.Balance, holder_address.city, holder_address.state, holderid.GovernmentID FROM account JOIN account_holder ON account.username = account_holder.username JOIN holder_address ON account_holder.pincode = holder_address.pincode JOIN holderid ON account.username = holderid.username;',
        //         (error, results) => {
        //           if (error) throw error;
        //         console.log(results);
        //           res.render('admin', { layout: 'adminlayout', results }); // changed rows to results
        //         }
        //       );
        //       Connection.release(); // release connection back to pool
        //     });
        //   };

          // exports.viewallusers = (req, res) => {
          //   const { eid, password } = req.body;
          
          //   // get a connection from the pool
          //   pool.getConnection((err, connection) => { 
          //     if (err) throw err; // not connected
          
          //     connection.query('SELECT * FROM employee WHERE E_ID = ? AND password = ?', [eid, password], (err, rows) => {
          //       connection.release();
          
          //       if (!err) {
          //         if (rows.length > 0) {
          //           // user found, set session and redirect to dashboard
          //           req.session.user = rows[0];
          //           res.redirect('/admin?employeeid=' + eid);
          //           // res.render('login', {layout: 'loginlayout'})
          //         } else {
          //           // user not found or password didn't match
          //           res.render('adminlogin', { layout: 'employeelayout', error: 'Invalid username or password', alert: 'Invalid username or password' });
          //         }
          //       } else {
          //         console.log(err);
          //         res.render('adminlogin', { layout: 'employeelayout', error: 'Something went wrong. Please try again later.' });
          //       }
          //     });
          //   });
          // };
          
        //   exports.adminloginverify = (req, res) => {
        //     const { eid, password } = req.body;
          
        //     // get a connection from the pool
        //     pool.getConnection((err, connection) => { 
        //       if (err) throw err; // not connected
          
        //       connection.query('SELECT * FROM employee WHERE E_ID = ? AND password = ?', [eid, password], (err, rows) => {
        //         connection.release();
          
        //         if (!err) {
        //           if (rows.length > 0) {
        //             // user found, set session and redirect to dashboard
        //             req.session.user = rows[0];
        //             res.redirect('/admin?username=' + eid);
        //             // res.render('login', {layout: 'loginlayout'})
        //           } else {
        //             // user not found or password didn't match
        //             res.render('adminlogin', { layout: 'employeelayout', error: 'Invalid username or password', alert: 'Invalid username or password' });
        //           }
        //         } else {
        //           console.log(err);
        //           res.render('adminlogin', { layout: 'employeelayout', error: 'Something went wrong. Please try again later.' });
        //         }
        //       });
        //     });
        //   };


        //   exports.viewalluser = (req, res) => {
        //     pool.getConnection((err, Connection) => {
        //       if (err) throw err; // not connected
        //       console.log('Connected as ID- ' + Connection.threadId);
        //       Connection.query('SELECT account_holder.name, account.Account_No, account.Balance, holder_address.city, holder_address.state, holderid.GovernmentID FROM account JOIN account_holder ON account.username = account_holder.username JOIN holder_address ON account_holder.pincode = holder_address.pincode JOIN holderid ON account.username = holderid.username;',
        //         (error, results) => {
        //           if (error) throw error;
        //         console.log(results);
        //           res.render('admin', { layout: 'adminlayout', results }); // changed rows to results
        //         }
        //       );
        //       Connection.release(); // release connection back to pool
        //     });
        // };



        //****************************************************************************************************** */
        
        exports.adminlogin = (req, res) => {
          const { empid, password } = req.body;
        
          // get a connection from the pool
          pool.getConnection((err, Connection) => { 
            if (err) throw err; // not connected
        
            Connection.query('SELECT * FROM employee WHERE E_ID = ? AND password = ?', [empid, password], (err, rows) => {
              Connection.release();
        
              if (!err) {
                if (rows.length > 0) {
                  // user found, set session and redirect to dashboard
                  req.session.user = rows[0];
                  // const user = results[0];
                  res.redirect('/admin?empid=' + empid);
                  // res.render('login', {layout: 'loginlayout'})
                } else {
                  // user not found or password didn't match
                  res.render('adminlogin', { layout: 'employeelayout', error: 'Invalid username or password', alert: 'Invalid username or password' });
                }
              } else {
                console.log(err);
                res.render('adminlogin', { layout: 'employeelayout', error: 'Something went wrong. Please try again later.' });
              }
            });
          });
        };


      //   exports.adminpage = (req, res) => {
      //     pool.getConnection((err, Connection) => {
      //         if (err) throw err; // not connected
      //         console.log('Connected as ID ' + Connection.threadId);
      
      //         if (req.session.user) {
      //             const empid = req.query.empid;
                  
                  
      //             // fetch user details from the database based on username
      //             Connection.query('SELECT account_holder.name, account.Account_No, account.Balance, holder_address.city, holder_address.state, holderid.GovernmentID FROM account JOIN account_holder ON account.username = account_holder.username JOIN holder_address ON account_holder.pincode = holder_address.pincode JOIN holderid ON account.username = holderid.username;',
      //           (error, results) => {
      //             if (error) throw error;
      //           console.log(results);
      //             res.render('admin', { layout: 'adminlayout', results }); // changed rows to results
      //           });
      
      //         } else {
      //             // redirect to login page if not logged in
      //             res.redirect('/adminlogin');
      //         }
      
      //         Connection.release(); // release connection back to pool
      //     });
      // };

      // exports.adminpage = (req, res) => {
      //   pool.getConnection((err, connection) => {
      //     if (err) throw err; // not connected
      //     console.log('Connected as ID ' + connection.threadId);
      
      //     if (req.session.user) {
      //       const empid = req.query.empid;
      
      //       // fetch user details from the database based on username
      //       connection.query(
      //         'SELECT account_holder.name, account.Account_No, account.Balance, holder_address.city, holder_address.state, holderid.GovernmentID FROM account JOIN account_holder ON account.username = account_holder.username JOIN holder_address ON account_holder.pincode = holder_address.pincode JOIN holderid ON account.username = holderid.username;',
      //         (error, results) => {
      //           if (error) throw error;
      //           console.log(results);
      
      //           // fetch admin name from the database based on admin username
      //           const adminID = req.session.user;
      //           let adminName = '';
      //           connection.query(
      //             `SELECT * FROM employee WHERE E_ID ='${adminID}'`,
      //             (err, admin) => {
      //               if (err) throw err;
      //               console.log(admin);
      //               adminName = admin[0].E_Name; // set the value of adminName
      //               res.render('admin', {
      //                 layout: 'adminlayout',
      //                 results,
      //                 adminName, // pass admin name to the view
      //               });
      //             }
      //           );
      //         }
      //       );
      //     } else {
      //       // redirect to login page if not logged in
      //       res.redirect('/adminlogin');
      //     }
      
      //     connection.release(); // release connection back to pool
      //   });
      // };
      

      exports.adminpage = (req, res) => {
        pool.getConnection((err, connection) => {
          if (err) throw err; // not connected
          console.log('Connected as ID ' + connection.threadId);
      
          if (req.session.user) {
            const empid = req.query.empid;
      
            connection.query(
              'SELECT * FROM employee where E_ID = ?',
              [empid],
              (error, results1) => {
                if (error) throw error;
      
                const user = results1[0];
                user.empid = empid;
      
                // fetch the name of the employee from the employee table
                connection.query(
                  'SELECT E_Name FROM employee where E_ID = ?',
                  [empid],
                  (error, results2) => {
                    if (error) throw error;
      
                    user.E_Name = results2[0].E_Name; // add the name of the employee to the user object
      
                    // fetch user details from the database based on username
                    connection.query(
                      'SELECT account_holder.name, account.Account_No, account.Balance, holder_address.city, holder_address.state, holderid.GovernmentID FROM account JOIN account_holder ON account.username = account_holder.username JOIN holder_address ON account_holder.pincode = holder_address.pincode JOIN holderid ON account.username = holderid.username;',
                      (error, results) => {
                        if (error) throw error;
      
                        console.log('Results:', results);
                        console.log(empid);
                        res.render('admin', {
                          layout: 'adminlayout',
                          results: results,
                          user: user,
                          results1: results1,
                        });
                      }
                    );
                  }
                );
              }
            );
          } else {
            // redirect to login page if not logged in
            res.redirect('/adminlogin');
          }
      
          connection.release(); // release connection back to pool
        });
      };
      
      // exports.update = (req, res) => {
      //   const username = req.query.username;
      //   const { pincode, state, city, governmentID, contact_no } = req.body;
      
      //   console.log("HHH")
      
      //   pool.getConnection((err, Connection) => {
      //     if (err) throw err; // not connected
      //     console.log('Connected as ID ' + Connection.threadId);
      
      //     // fetch user details from the database based on username
      //     Connection.query(
      //       'UPDATE account, account_holder, holder_address, holderid SET account_holder.pincode = ?, holder_address.pincode = ?, holder_address.state = ?, holder_address.city = ?, holderid.governmentID = ?, account_holder.contact_no = ? WHERE account.username = ? AND account.username = account_holder.username AND account_holder.pincode = holder_address.pincode AND account.username = holderid.username',
      //       [pincode, pincode, state, city, governmentID, contact_no, username], (error, results) => {
      //         if (error) throw error;
      
      //         const user = results[0];
      
      //         res.render('/editprofile?username=' + username, { layout: 'profilelayout' });

      //       }
      //     );
      
      //     Connection.release(); // release connection back to pool
      //   });
      // };

      // exports.update = (req, res) => {
      //   const username = req.query.username;
      //   const { pincode, state, city, governmentID, contact_no } = req.body;
      
      //   console.log("HHH")
      
      //   pool.getConnection((err, Connection) => {
      //     if (err) throw err; // not connected
      //     console.log('Connected as ID ' + Connection.threadId);
      
      //     // fetch user details from the database based on username
      //     Connection.query(
      //       'UPDATE account, account_holder, holder_address, holderid SET account_holder.pincode = ?, holder_address.pincode = ?, holder_address.state = ?, holder_address.city = ?, holderid.governmentID = ?, account_holder.contact_no = ? WHERE account.username = ? AND account.username = account_holder.username AND account_holder.pincode = holder_address.pincode AND account.username = holderid.username',
      //       [pincode, pincode, state, city, governmentID, contact_no, username], (error, results) => {
      //         if (error) throw error;

      //         const user = results[0];
      
      //         res.redirect(`/editprofile?username=${user.username}`);
      //       }
      //     );
      
      //     Connection.release(); 
      //   });
      // };
      exports.update = (req, res) => {
        const username = req.query.username;
        const { name, pincode, state, city, GovernmentID, contact_no } = req.body;
      
        console.log("HHH")
      
        pool.getConnection((err, Connection) => {
          if (err) throw err; // not connected
          console.log('Connected as ID ' + Connection.threadId);
      
          Connection.query(
            'UPDATE account, account_holder, holder_address, holderid  SET account_holder.name = ? , account_holder.pincode = ?,  holder_address.pincode = ?,  holder_address.state = ?,  holder_address.city = ?,  holderid.GovernmentID = ?,   account_holder.contact_no = ?  WHERE account_holder.username = ?  AND account.username = account_holder.username AND account_holder.pincode = holder_address.pincode   AND account.username = holderid.username;',
            [name, pincode, pincode, state, city, GovernmentID, contact_no, username], (error, results) => {
              if (error) throw error;
      
              res.redirect(`/editprofile?username=${username}`);
            }
          );
      
          Connection.release(); 
        });
      };

//       exports.adminedit = (req, res) => {
//         const username = req.query.username;
//         exports.update = (req,res) => {
//     const { first_name, last_name, email, Phone, comments} = req.body;

//     pool.getConnection((err, Connection) =>{
//         if(err) throw err; //not connected
//         console.log('Connected as ID' + Connection.threadId);

//         // let searchTerm = req.body.search; //search is the actual input from user
        
//         Connection.query('UPDATE user SET first_name = ?, last_name = ?, Phone = ?, email = ?, comments = ? WHERE id = ?', [first_name, last_name, Phone, email, comments , req.params.id],(err, rows) =>{
//             Connection.release();

//             if(!err){
//                 pool.getConnection((err, Connection) =>{
//                     if(err) throw err; //not connected
//                     console.log('Connected as ID' + Connection.threadId);
            
//                     // let searchTerm = req.body.search; //search is the actual input from user
                    
//                     Connection.query('SELECT * FROM user WHERE id = ? ',[req.params.id],(err, rows) =>{
//                         Connection.release();
            
//                         if(!err){
//                             res.render('edit-user', {rows,alert: `${first_name} has been updated`});
//                         } else{
//                             console.log(err);
//                         }
            
//                         console.log('The data from user table: \n', rows);
//                     });
//                 });




//             } else{
//                 console.log(err);
//             }

//             console.log('The data from user table: \n', rows);
//         });
//     });
// }
      
        // console.log("HHH")
      
//         pool.getConnection((err, Connection) => {
//           if (err) throw err; // not connected
//           console.log('Connected as ID ' + Connection.threadId);
      
//           Connection.query(
//             'UPDATE account, account_holder, holder_address, holderid  SET account_holder.name = ? , account_holder.pincode = ?,  holder_address.pincode = ?,  holder_address.state = ?,  holder_address.city = ?,  holderid.GovernmentID = ?,   account_holder.contact_no = ?  WHERE account_holder.username = ?  AND account.username = account_holder.username AND account_holder.pincode = holder_address.pincode   AND account.username = holderid.username;',
//             [name, pincode, pincode, state, city, GovernmentID, contact_no, username], (error, results) => {
//               if (error) throw error;
      
//               res.redirect(`/editprofile?username=${username}`);
//             }
//           );
      
          // Connection.release(); 
//         });
//       };

      exports.adminedit = (req,res) => {
        const { name, pincode, state, city, governmentID, contact_no, balance ,account_no , password} = req.body;
    
        pool.getConnection((err, Connection) =>{
            if(err) throw err; //not connected
            console.log('Connected as ID' + Connection.threadId);
    
            // let searchTerm = req.body.search; //search is the actual input from user
            
            Connection.query('UPDATE account, account_holder, holder_address, holderid  SET account_holder.name = ? , account_holder.pincode = ?,  holder_address.pincode = ?,  holder_address.state = ?,  holder_address.city = ?,  holderid.GovernmentID = ?,   account_holder.contact_no = ?, account.balance = ? , account.account_no = ?, account_holder.password = ?  WHERE account_holder.username = ?  AND account.username = account_holder.username AND account_holder.pincode = holder_address.pincode   AND account.username = holderid.username;', [name, pincode,pincode, state, city, governmentID, contact_no, balance ,account_no , password , req.params.username],(err, rows) =>{
                Connection.release();
    
                if(!err){
                    pool.getConnection((err, Connection) =>{
                        if(err) throw err; //not connected
                        console.log('Connected as ID' + Connection.threadId);
                
                        // let searchTerm = req.body.search; //search is the actual input from user
                        
                        Connection.query('SELECT * FROM account, account_holder, holderid, holder_address WHERE username = ? ',[req.params.username],(err, rows) =>{
                            Connection.release();
                            const user = rows[0];
                
                            if(!err){
                                res.render('editalluser', {rows, user, layout:'editadminuserlayout'});
                            } else{
                                console.log(err);
                            }
                
                            console.log('The data from user table: \n', rows);
                        });
                    });
    
    
                } else{
                    console.log(err);
                }
    
                console.log('The data from user table: \n', rows);
            });
        });
    }
      


      
      
      

