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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceController = void 0;
const price_service_1 = require("./price.service");
class PriceController {
    static getPrice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const symbol = req.params;
                const price = yield price_service_1.PriceService.getPrice(symbol);
                if (!price) {
                    res.status(404).json({ message: 'Symbol not found' });
                }
                else {
                    res.status(200).json(price);
                }
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.PriceController = PriceController;
//# sourceMappingURL=price.controller.js.map