"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_body_1 = __importDefault(require("koa-body"));
const koa_static_1 = __importDefault(require("koa-static"));
const koa_session_1 = __importDefault(require("koa-session"));
const path_1 = __importDefault(require("path"));
const promises_1 = require("node:fs/promises");
const app = new koa_1.default();
const router = new koa_router_1.default();
const staticPath = path_1.default.resolve(__dirname, "static");
app.use((0, koa_static_1.default)(staticPath));
app.keys = ["i love hust"];
//配置session
const SessionStore = {};
const CONFIG = {
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
        get: (key) => {
            return SessionStore[key];
        },
        set: (key, value, maxAge) => {
            console.log("set", key, value, maxAge);
            SessionStore[key] = value;
        },
        destroy: (key) => {
            SessionStore[key] = null;
            console.log("destroy");
        },
    },
};
app.use((0, koa_session_1.default)(CONFIG, app));
const LoginVerification = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(ctx.request.body);
    if (ctx.request.body !== undefined) {
        const userInfo = ctx.request.body;
        if ((userInfo.username === "admin", userInfo.password === "1234")) {
            //ctx.cookies.set("user", "admin", {signed: true})
            ctx.session.isNew = false;
            yield ctx.session.save();
            ctx.body = { code: 0, message: "登录成功" };
        }
        else {
            ctx.body = { code: -1, message: "用户名或密码错误" };
        }
    }
});
const Logout = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(ctx);
    ctx.session = null;
    ctx.body = { code: 0, message: "成功退出登录" };
});
const sendData = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(ctx);
    if (ctx.session.isNew) {
        ctx.body = { code: -2, message: "没有登录" };
        return;
    }
    else {
        ctx.body = {
            code: 0,
            total: tempData.length,
            list: tempData,
        };
    }
    yield next();
});
const addInfo = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(ctx);
    if (ctx.session.isNew) {
        ctx.body = { code: -2, message: "没有登录" };
        return;
    }
    else {
        if (ctx.request.body !== undefined) {
            const newData = ctx.request.body;
            if (tempData.find((e) => e.uid === newData.uid) ===
                undefined) {
                tempData.push(newData);
                ctx.body = { code: 0, message: "添加成功" };
            }
            else
                ctx.body = { code: -1, message: "项目已存在" };
        }
    }
    yield next();
});
const updateInfo = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(ctx);
    if (ctx.session.isNew) {
        ctx.body = { code: -2, message: "没有登录" };
        return;
    }
    else {
        if (ctx.request.body !== undefined) {
            const newData = ctx.request.body;
            const oldData = tempData.find((e) => e.uid === newData.uid);
            if (oldData !== undefined) {
                tempData.splice(tempData.indexOf(oldData), 1, newData);
                ctx.body = { code: 0, message: "修改成功" };
            }
            else
                ctx.body = { code: -1, message: "该条目不存在" };
        }
        yield next();
    }
});
const deleteInfo = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(ctx);
    if (ctx.session.isNew) {
        ctx.body = { code: -2, message: "没有登录" };
        return;
    }
    else {
        if (ctx.request.body !== undefined) {
            const uid = ctx.request.body.uid;
            const oldData = tempData.find((e) => e.uid === uid);
            if (oldData !== undefined) {
                tempData.splice(tempData.indexOf(oldData), 1);
                ctx.body = { code: 0, message: "删除成功" };
            }
            else
                ctx.body = { code: -1, message: "该条目不存在" };
        }
        yield next();
    }
});
const getAbout = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const md = yield (0, promises_1.open)(path_1.default.resolve(__dirname, "about.md"));
    const content = yield md.readFile("utf-8");
    md.close();
    ctx.body = {
        about: content,
    };
    yield next();
});
router.post("/api/user/login", LoginVerification);
router.get("/api/stu/list", sendData);
router.post("/api/user/logout", Logout);
router.post("/api/stu/create", addInfo);
router.post("/api/stu/update", updateInfo);
router.post("/api/stu/delete", deleteInfo);
router.get("/api/about", getAbout);
app.use((0, koa_body_1.default)({ multipart: true }));
app.use(router.routes()).use(router.allowedMethods());
app.listen(3001);
let tempData = [
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
];
