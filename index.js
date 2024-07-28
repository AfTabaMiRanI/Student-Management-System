#! /usr/bin/env node
import { input, select } from "@inquirer/prompts";
import chalk from "chalk";
const randomNumber = Math.floor(10000 + Math.random() * 90000);
let myBalance = 15000;
let students = await input({
    message: chalk.yellow `Enter Student Name:`,
    validate: function (value) {
        if (value.trim() !== "") {
            return true;
        }
        return "Please enter a non-empty value.";
    },
});
let courses = await select({
    message: chalk.yellow `Select the course to enrolled`,
    choices: [
        {
            name: "MS.Office",
            value: "MS.Office",
        },
        {
            name: "HTML",
            value: "HTML",
        },
        {
            name: "Javascript",
            value: "Javascript",
        },
        {
            name: "Typescript",
            value: "Typescript",
        },
        {
            name: "Python",
            value: "Python"
        }
    ],
});
const tutionFee = {
    "MS.Office": 2000,
    "HTML": 3000,
    "Javascript": 4000,
    "Typescript": 5000,
    "Python": 6000
};
console.log(chalk.blue `\nTution Fees: ${tutionFee[courses]}/-\n`);
console.log(chalk.green `Balance: ${myBalance}\n`);
let paymentType = await select({
    message: chalk.yellow `Select payment Method:`,
    choices: [
        {
            name: "Bank Transfer",
            value: "Bank Transfer",
        },
        {
            name: "Easypaisa",
            value: "Easypaisa",
        },
        {
            name: "Jazzcash",
            value: "Jazzcash",
        },
    ],
});
let amount = await input({
    message: chalk.green `Transfer Money:`,
    validate: function (value) {
        if (value.trim() !== "") {
            return true;
        }
        return "Please enter a non-empty value.";
    },
});
console.log(chalk.yellow `\nYou select payment method ${paymentType} \n`, amount);
const tutionFees = tutionFee[courses];
const paymentAmount = parseFloat(amount);
if (tutionFees === paymentAmount) {
    console.log(chalk.green `Congratulations, you have successfully enrolled in ${courses}.\n`);
    let ans = await select({
        message: chalk.blue `What would you like to do next?`,
        choices: [
            {
                name: "View Status",
                value: "View Status",
            },
            {
                name: "Exit",
                value: "Exit",
            }
        ]
    });
    if (ans === "View Status") {
        console.log("\n********Status********\n");
        console.log(chalk.yellow `Student Name: ${students}`);
        console.log(chalk.green `Student ID: ${randomNumber}`);
        console.log(chalk.bold `Course: ${courses}`);
        console.log(chalk.green `Tution Fees Paid: ${paymentAmount}`);
        console.log(chalk.italic `Balance: ${myBalance -= paymentAmount}`);
    }
    else {
        console.log("\nExiting Student Management System\n");
    }
}
else {
    console.log("Invalid amount due to course\n");
}
