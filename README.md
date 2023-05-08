# Bank Management System - Bank Hamara 🗿

## Overview
This is a web application project developed for the *Database Management course (CS262)* by our group during the 4th semester of B.Tech. The application is designed to manage the operations of a bank, providing account creation, user dashboard for customers, and admin ui. The application is built using HTML, CSS, and JavaScript for the front-end and MySQL for the back-end. 

## Technologies Used

***Front-End:*** 
  - HTML
  - CSS
  - Javascript 
  
***Backend:***
  - MySQL
  - NodeJS
  - ExpressJS
  - Express Handle Bar
  
## How to Run the website
To run the application, you need to follow these steps:
1. Install NodeJS on your local machine.
2. Copy the project files (excluding: `package.json` , `Node_Modules` and `package-lock.json` files) in a folder named `bank`.
<!-- 3. Note: Don't copy `package.json` , `Node_Modules` and `package-lock.json` files -->
4. Create a database called `project` in MySQL and import the `database.sql` file included in the project repository else you can rename the database and update the same in extracted project files Connection code.
5. Open the folder in VS Code or any other IDE.
6. Open a new terminal and type the below line
```
npm init
```
Press `Enter` until you get to the root path as attached in image, Additonally you will get a `package.json` file in your folder.

<img width="356" alt="image" src="https://user-images.githubusercontent.com/98680299/235350215-430734e7-4242-439c-8998-7e6aaa489976.png">

6. Now install Express and other stack by typing below line in terminal.
```
npm install express dotenv express-handlebars body-parser mysql
```
The `Node modules` and `package-lock.json` would be created in your folder.

7. Now install nodemon by typing below line in terminal.
```
npm install --save-dev nodemon
```

Your `Bank` folder would be consiting the files :

<img width="102" alt="image" src="https://user-images.githubusercontent.com/98680299/235350493-c4f57d23-05ed-4923-8356-0a819e643123.png">

8. Now in your `package.json` file add the below code lines in `scripts`
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start" : "nodemon app.js"
  },
  ```
 9. To run the project, enter the below line in terminal
 ```
 npm start 
 ```

## Screenshots
- **HomePage**
<img width="930" alt="HomePage" src="https://user-images.githubusercontent.com/97979413/233956623-5cc50ef1-7fb7-4f0f-9cea-54ade5d5b9d5.png">

- **Login/Sign-Up**
<img width="935" alt="Login" src="https://user-images.githubusercontent.com/97979413/233957140-fce00a06-e031-4b8d-94fb-84c148bee7e8.png">

- **Account Dashboard**
<img width="935" alt="Dashboard" src="https://user-images.githubusercontent.com/97979413/233957477-b37ff5f1-bcc0-40d0-bd0d-9cb117d9e4df.png">



## Contributors
- *1. Ved Vekhande*
- *2. Gunal Gupta*
- *3. Anubhav Dubey*
- *4. Navin Kumar*

