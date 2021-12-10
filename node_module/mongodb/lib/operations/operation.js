"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineAspects = exports.AbstractOperation = exports.Aspect = void 0;
const read_preference_1 = require("../read_preference");
const bson_1 = require("../bson");
exports.Aspect = {
    READ_OPERATION: Symbol('READ_OPERATION'),
    WRITE_OPERATION: Symbol('WRITE_OPERATION'),
    RETRYABLE: Symbol('RETRYABLE'),
    EXPLAINABLE: Symbol('EXPLAINABLE'),
    SKIP_COLLATION: Symbol('SKIP_COLLATION'),
    CURSOR_CREATING: Symbol('CURSOR_CREATING')
};
/** @internal */
const kSession = Symbol('session');
/**
 * This class acts as a parent class for any operation and is responsible for setting this.options,
 * as well as setting and getting a session.
 * Additionally, this class implements `hasAspect`, which determines whether an operation has
 * a specific aspect.
 * @internal
 */
class AbstractOperation {
    constructor(options = {}) {
        var _a;
        this.readPreference = this.hasAspect(exports.Aspect.WRITE_OPERATION)
            ? read_preference_1.ReadPreference.primary
            : (_a = read_preference_1.ReadPreference.fromOptions(options)) !== null && _a !== void 0 ? _a : read_preference_1.ReadPreference.primary;
        // Pull the BSON serialize options from the already-resolved options
        this.bsonOptions = (0, bson_1.resolveBSONOptions)(options);
        if (options.session) {
            this[kSession] = options.session;
        }
        this.options = options;
        this.bypassPinningCheck = !!options.bypassPinningCheck;
    }
    hasAspect(aspect) {
        const ctor = this.constructor;
        if (ctor.aspects == null) {
            return false;
        }
        return ctor.aspects.has(aspect);
    }
    get session() {
        return this[kSession];
    }
    get canRetryRead() {
        return true;
    }
    get canRetryWrite() {
        return true;
    }
}
exports.AbstractOperation = AbstractOperation;
function defineAspects(operation, aspects) {
    if (!Array.isArray(aspects) && !(aspects instanceof Set)) {
        aspects = [aspects];
    }
    aspects = new Set(aspects);
    Object.defineProperty(operation, 'aspects', {
        value: aspects,
        writable: false
    });
    return aspects;
}
exports.defineAspects = defineAspects;
//# sourceMappingURL=operation.js.map