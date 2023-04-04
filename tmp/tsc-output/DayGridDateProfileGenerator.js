import { __extends } from "tslib";
import { DateProfileGenerator } from '@fullcalendar/core';
var DayGridDateProfileGenerator = /** @class */ (function (_super) {
    __extends(DayGridDateProfileGenerator, _super);
    function DayGridDateProfileGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Computes the date range that will be rendered.
    DayGridDateProfileGenerator.prototype.buildRenderRange = function (currentRange, currentRangeUnit, isRangeAllDay) {
        var renderRange = _super.prototype.buildRenderRange.call(this, currentRange, currentRangeUnit, isRangeAllDay);
        var start = renderRange.start;
        var end = renderRange.end;
        return { start: start, end: end };
    };
    return DayGridDateProfileGenerator;
}(DateProfileGenerator));
export default DayGridDateProfileGenerator;
//# sourceMappingURL=DayGridDateProfileGenerator.js.map