export class LoginInfo {
    username: string
    password: string

    toJSON() {
        return {
            username: this.username,
            password: this.password,
        }
    }

    constructor(username: string, password: string) {
        this.username = username
        this.password = password
    }
}

export interface PersonalInfo {
    uid: string
    avatar: string
    name: string
    major: string
    grade: string
    gender: string
    phone: string
    mail: string
}

export class PersonInfo implements PersonalInfo {
    uid: string
    avatar: string
    name: string
    major: string
    grade: string
    gender: string
    phone: string
    mail: string

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
        }
    }

    constructor(
        uid: string,
        avatar: string,
        name: string,
        major: string,
        grade: string,
        gender: string,
        phone: string,
        mail: string
    ) {
        this.uid = uid
        this.avatar = avatar
        this.name = name
        this.major = major
        this.grade = grade
        this.gender = gender
        this.phone = phone
        this.mail = mail
    }
}
