"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonInfo = exports.LoginInfo = void 0;
class LoginInfo {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    toJSON() {
        return {
            username: this.username,
            password: this.password,
        };
    }
}
exports.LoginInfo = LoginInfo;
class PersonInfo {
    constructor(uid, avatar, name, major, grade, gender, phone, mail) {
        this.uid = uid;
        this.avatar = avatar;
        this.name = name;
        this.major = major;
        this.grade = grade;
        this.gender = gender;
        this.phone = phone;
        this.mail = mail;
    }
    toJSON() {
        return {
            uid: this.uid,
            avatar: this.avatar,
            name: this.name,
            major: this.major,
            grade: this.grade,
            gender: this.gender,
            phone: this.phone,
            mail: this.mail,
        };
    }
}
exports.PersonInfo = PersonInfo;
