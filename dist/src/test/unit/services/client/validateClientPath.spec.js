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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var supertest_1 = __importDefault(require("supertest"));
var faker_1 = require("@faker-js/faker");
var __1 = __importDefault(require("../../../.."));
var data_source_1 = require("../../../../data-source");
var jsonwebtoken_1 = require("jsonwebtoken");
var uuid_1 = require("uuid");
(0, dotenv_1.config)();
describe("User update test", function () {
    var connection;
    var token = function (isAdm) {
        return (0, jsonwebtoken_1.sign)({ email: "test@mail.com", isAdmin: isAdm }, process.env.SECRET_KEY, {
            expiresIn: process.env.EXPIRES_IN,
        });
    };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, data_source_1.AppDataSource.initialize()
                        .then(function (res) { return (connection = res); })
                        .catch(function (err) {
                        console.error("Error during Data Source initialization", err);
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.destroy()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    var email = faker_1.faker.internet.email().toLocaleLowerCase();
    var password = faker_1.faker.internet.password();
    var avatar = faker_1.faker.image.avatar();
    var userData = {
        name: faker_1.faker.name.firstName(),
        email: email,
        password: password,
        avatar: avatar,
        contact: faker_1.faker.phone.number(),
    };
    var establishmentData = {
        name: "Via c",
        cnpj: "30.0155138.77/0008-24",
        address: {
            street: "Rua c",
            number: 14011,
            zipCode: "25090-29",
            district: "Gova",
        },
        contact: "02299999999",
        urlLogo: "https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_960_7230.png",
        userId: "",
    };
    var clientData = {
        name: "robson",
        avatar: "url",
        contact: "40028922",
        payDay: 7,
        isDeptor: false,
        isLate: false,
        isActivate: true,
        establishmentId: "",
    };
    test("Should be able to update the specified client", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, establishment, client, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                        .post("/api/signup")
                        .send(userData)
                        .set("Authorization", "Bearer " + token(true))];
                case 1:
                    user = _a.sent();
                    establishmentData.userId = user.body.id;
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .post("/api/establishment")
                            .send(establishmentData)
                            .set("Authorization", "Bearer " + token(true))];
                case 2:
                    establishment = _a.sent();
                    clientData.establishmentId = establishment.body.id;
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .post("/api/client")
                            .send(clientData)
                            .set("Authorization", "Bearer " + token(true))];
                case 3:
                    client = _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                            .patch("/api/client/".concat(client.body.id))
                            .send({ name: "Varíola" })
                            .set("Authorization", "Bearer " + token(true))];
                case 4:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.name).toBe("Varíola");
                    return [2 /*return*/];
            }
        });
    }); });
    test("Should not be able to find the specified client", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(__1.default)
                        .patch("/api/client/".concat((0, uuid_1.v4)()))
                        .set("Authorization", "Bearer " + token(true))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    expect(response.body.error).toBe("Client not found");
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=validateClientPath.spec.js.map