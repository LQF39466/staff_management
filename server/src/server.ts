import Koa from "koa"
import Router from "koa-router"
import KoaBody from "koa-body"
import KoaStatic from "koa-static"
import Session from "koa-session"
import path from "path"
import { open, FileHandle } from "node:fs/promises"
import { LoginInfo, PersonalInfo } from "./types"

const app = new Koa()
const router = new Router()
const staticPath = path.resolve(__dirname, "static")

app.use(KoaStatic(staticPath))
app.keys = ["i love hust"]

//配置session
const SessionStore: Partial<Session.Session> = {}
const CONFIG: Partial<Session.opts> = {
    key: "koa.sess",
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
    secure: false,
    sameSite: undefined,
    store: {
        get: (key: string) => {
            return SessionStore[key]
        },
        set: (key: string, value: Partial<Session.Session>, maxAge: number) => {
            console.log("set", key, value, maxAge)
            SessionStore[key] = value
        },
        destroy: (key: string) => {
            SessionStore[key] = null
            console.log("destroy")
        },
    },
}
app.use(Session(CONFIG, app))

const LoginVerification = async (ctx: Koa.DefaultContext) => {
    console.log(ctx.request.body)
    if (ctx.request.body !== undefined) {
        const userInfo: LoginInfo = ctx.request.body
        if ((userInfo.username === "admin", userInfo.password === "1234")) {
            //ctx.cookies.set("user", "admin", {signed: true})
            ctx.session.isNew = false
            await ctx.session.save()
            ctx.body = { code: 0, message: "登录成功" }
        } else {
            ctx.body = { code: -1, message: "用户名或密码错误" }
        }
    }
}

const Logout = async (ctx: Koa.DefaultContext) => {
    console.log(ctx)
    ctx.session = null
    ctx.body = { code: 0, message: "成功退出登录" }
}

const sendData = async (ctx: Koa.DefaultContext, next: () => Promise<any>) => {
    console.log(ctx)
    if (ctx.session.isNew) {
        ctx.body = { code: -2, message: "没有登录" }
        return
    } else {
        ctx.body = {
            code: 0,
            total: tempData.length,
            list: tempData,
        }
    }
    await next()
}

const addInfo = async (ctx: Koa.DefaultContext, next: () => Promise<any>) => {
    console.log(ctx)
    if (ctx.session.isNew) {
        ctx.body = { code: -2, message: "没有登录" }
        return
    } else {
        if (ctx.request.body !== undefined) {
            const newData: PersonalInfo = ctx.request.body
            if (
                tempData.find((e: PersonalInfo) => e.uid === newData.uid) ===
                undefined
            ) {
                tempData.push(newData)
                ctx.body = { code: 0, message: "添加成功" }
            } else ctx.body = { code: -1, message: "项目已存在" }
        }
    }
    await next()
}

const updateInfo = async (
    ctx: Koa.DefaultContext,
    next: () => Promise<any>
) => {
    console.log(ctx)
    if (ctx.session.isNew) {
        ctx.body = { code: -2, message: "没有登录" }
        return
    } else {
        if (ctx.request.body !== undefined) {
            const newData: PersonalInfo = ctx.request.body
            const oldData = tempData.find(
                (e: PersonalInfo) => e.uid === newData.uid
            )
            if (oldData !== undefined) {
                tempData.splice(tempData.indexOf(oldData), 1, newData)
                ctx.body = { code: 0, message: "修改成功" }
            } else ctx.body = { code: -1, message: "该条目不存在" }
        }
        await next()
    }
}

const deleteInfo = async (
    ctx: Koa.DefaultContext,
    next: () => Promise<any>
) => {
    console.log(ctx)
    if (ctx.session.isNew) {
        ctx.body = { code: -2, message: "没有登录" }
        return
    } else {
        if (ctx.request.body !== undefined) {
            const uid: string = ctx.request.body.uid
            const oldData = tempData.find((e: PersonalInfo) => e.uid === uid)
            if (oldData !== undefined) {
                tempData.splice(tempData.indexOf(oldData), 1)
                ctx.body = { code: 0, message: "删除成功" }
            } else ctx.body = { code: -1, message: "该条目不存在" }
        }
        await next()
    }
}

const getAbout = async (ctx: Koa.DefaultContext, next: () => Promise<any>) => {
    const md: FileHandle = await open(path.resolve(__dirname, "about.md"))
    const content: string = await md.readFile("utf-8")
    md.close()
    ctx.body = {
        about: content,
    }
    await next()
}

router.post("/api/user/login", LoginVerification)
router.get("/api/stu/list", sendData)
router.post("/api/user/logout", Logout)
router.post("/api/stu/create", addInfo)
router.post("/api/stu/update", updateInfo)
router.post("/api/stu/delete", deleteInfo)
router.get("/api/about", getAbout)

app.use(KoaBody({ multipart: true }))
app.use(router.routes()).use(router.allowedMethods())
app.listen(3001)

let tempData: PersonalInfo[] = [
    {
        uid: "1",
        avatar: "https://joeschmoe.io/api/v1/a",
        name: "示例1",
        major: "计算机",
        grade: "2020",
        gender: "男",
        phone: "12344445555",
        mail: "123@gmail.com",
    },
    {
        uid: "2",
        avatar: "https://joeschmoe.io/api/v1/b",
        name: "示例2",
        major: "计算机",
        grade: "2021",
        gender: "女",
        phone: "12355556666",
        mail: "321@gmail.com",
    },
    {
        uid: "3",
        avatar: "https://joeschmoe.io/api/v1/c",
        name: "示例3",
        major: "计算机",
        grade: "2019",
        gender: "男",
        phone: "12344445555",
        mail: "123@gmail.com",
    },
    {
        uid: "4",
        avatar: "https://joeschmoe.io/api/v1/d",
        name: "示例4",
        major: "计算机",
        grade: "2016",
        gender: "女",
        phone: "12355556666",
        mail: "321@gmail.com",
    },
    {
        uid: "5",
        avatar: "https://joeschmoe.io/api/v1/e",
        name: "示例5",
        major: "计算机",
        grade: "2020",
        gender: "男",
        phone: "12344445555",
        mail: "123@gmail.com",
    },
    {
        uid: "6",
        avatar: "https://joeschmoe.io/api/v1/f",
        name: "示例6",
        major: "计算机",
        grade: "2021",
        gender: "女",
        phone: "12355556666",
        mail: "321@gmail.com",
    },
    {
        uid: "7",
        avatar: "https://joeschmoe.io/api/v1/g",
        name: "示例7",
        major: "计算机",
        grade: "2020",
        gender: "男",
        phone: "12344445555",
        mail: "123@gmail.com",
    },
    {
        uid: "8",
        avatar: "https://joeschmoe.io/api/v1/h",
        name: "示例8",
        major: "计算机",
        grade: "2019",
        gender: "女",
        phone: "12355556666",
        mail: "321@gmail.com",
    },
    {
        uid: "9",
        avatar: "https://joeschmoe.io/api/v1/i",
        name: "示例9",
        major: "计算机",
        grade: "2018",
        gender: "男",
        phone: "12344445555",
        mail: "123@gmail.com",
    },
    {
        uid: "10",
        avatar: "https://joeschmoe.io/api/v1/j",
        name: "示例10",
        major: "计算机",
        grade: "2021",
        gender: "女",
        phone: "12355556666",
        mail: "321@gmail.com",
    },
]
