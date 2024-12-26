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
const database_1 = __importDefault(require("../util/database"));
const Player_1 = require("../model/Player");
const addPlayer = ({ firstName, lastName }) => __awaiter(void 0, void 0, void 0, function* () {
    const player = yield database_1.default.player.create({
        data: {
            firstName,
            lastName
        },
        include: {
            tables: true
        }
    });
    return player ? Player_1.Player.from(player) : null;
});
const getAllPlayers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const players = yield database_1.default.player.findMany({ include: { tables: true } });
        return Promise.all(players.map((player) => __awaiter(void 0, void 0, void 0, function* () { return yield (Player_1.Player.from(player)); })));
    }
    catch (error) {
        console.error(error);
        throw new Error("database error. panikeer");
    }
});
const getPlayerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const player = yield database_1.default.player.findUnique({
        where: {
            id: id
        },
        include: {
            tables: true
        }
    });
    return Player_1.Player.from(player);
});
const incrementPlayerWinsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Player_1.Player.from(yield database_1.default.player.update({
        where: { id: id },
        data: {
            wins: {
                increment: 1
            }
        },
        include: {
            tables: true
        }
    }));
});
const decrementPlayerWinsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Player_1.Player.from(yield database_1.default.player.update({
        where: { id: id },
        data: {
            wins: {
                decrement: 1
            }
        },
        include: {
            tables: true
        }
    }));
});
const incrementPlayerLossesById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Player_1.Player.from(yield database_1.default.player.update({
        where: { id: id },
        data: {
            losses: {
                increment: 1
            }
        },
        include: {
            tables: true
        }
    }));
});
const decrementPlayerLossesById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Player_1.Player.from(yield database_1.default.player.update({
        where: { id: id },
        data: {
            losses: {
                decrement: 1
            }
        },
        include: {
            tables: true
        }
    }));
});
const incrementPlayerByesById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Player_1.Player.from(yield database_1.default.player.update({
        where: { id: id },
        data: {
            byes: {
                increment: 1
            }
        },
        include: {
            tables: true
        }
    }));
});
const decrementPlayerByesById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Player_1.Player.from(yield database_1.default.player.update({
        where: { id: id },
        data: {
            byes: {
                decrement: 1
            }
        },
        include: {
            tables: true
        }
    }));
});
const incrementPlayerDrawsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Player_1.Player.from(yield database_1.default.player.update({
        where: { id: id },
        data: {
            draws: {
                increment: 1
            }
        },
        include: {
            tables: true
        }
    }));
});
const decrementPlayerDrawsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Player_1.Player.from(yield database_1.default.player.update({
        where: { id: id },
        data: {
            draws: {
                decrement: 1
            }
        },
        include: {
            tables: true
        }
    }));
});
const getAllUnDroppedPlayers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const players = yield database_1.default.player.findMany({
            where: {
                dropped: false
            },
            include: {
                tables: true
            }
        });
        return Promise.all(players.map((player) => __awaiter(void 0, void 0, void 0, function* () { return yield (Player_1.Player.from(player)); })));
    }
    catch (error) {
        console.error(error);
        throw new Error("database error. panikeer");
    }
});
const dropPlayer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const player = yield database_1.default.player.update({
            where: {
                id
            },
            data: {
                dropped: true
            },
            include: {
                tables: true
            }
        });
        return yield Player_1.Player.from(player);
    }
    catch (error) {
        console.error(error);
        throw new Error("database error. panikeer");
    }
});
exports.default = {
    getAllPlayers,
    addPlayer,
    getPlayerById,
    incrementPlayerWinsById,
    decrementPlayerWinsById,
    incrementPlayerDrawsById,
    decrementPlayerDrawsById,
    incrementPlayerLossesById,
    decrementPlayerLossesById,
    incrementPlayerByesById,
    decrementPlayerByesById,
    getAllUnDroppedPlayers,
    dropPlayer,
};
