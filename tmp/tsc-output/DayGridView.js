import { __extends } from "tslib";
import { DayHeader, memoize, DaySeries } from '@fullcalendar/core';
import AbstractDayGridView from './AbstractDayGridView';
import SimpleDayGrid from './SimpleDayGrid';
import DayTable from "./DayTable";
var DayGridView = /** @class */ (function (_super) {
    __extends(DayGridView, _super);
    function DayGridView(_context, viewSpec, dateProfileGenerator, parentEl) {
        var _this = _super.call(this, _context, viewSpec, dateProfileGenerator, parentEl) || this;
        _this.buildDayTable = memoize(buildDayTable);
        if (_this.opt('columnHeader')) {
            _this.header = new DayHeader(_this.context, _this.el.querySelector('.fc-head-container'));
        }
        _this.simpleDayGrid = new SimpleDayGrid(_this.context, _this.dayGrid);
        return _this;
    }
    DayGridView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.header) {
            this.header.destroy();
        }
        this.simpleDayGrid.destroy();
    };
    DayGridView.prototype.render = function (props) {
        _super.prototype.render.call(this, props);
        var dateProfile = this.props.dateProfile;
        var dayTable = this.dayTable =
            this.buildDayTable(dateProfile, this.dateProfileGenerator);
        if (this.header) {
            this.header.receiveProps({
                dateProfile: dateProfile,
                dates: dayTable.headerDates,
                datesRepDistinctDays: dayTable.rowCnt === 1,
                renderIntroHtml: this.renderHeadIntroHtml
            });
        }
        this.simpleDayGrid.receiveProps({
            dateProfile: dateProfile,
            dayTable: dayTable,
            businessHours: props.businessHours,
            dateSelection: props.dateSelection,
            eventStore: props.eventStore,
            eventUiBases: props.eventUiBases,
            eventSelection: props.eventSelection,
            eventDrag: props.eventDrag,
            eventResize: props.eventResize,
            isRigid: this.hasRigidRows(),
            nextDayThreshold: this.nextDayThreshold
        });
    };
    return DayGridView;
}(AbstractDayGridView));
export default DayGridView;
export function buildDayTable(dateProfile, dateProfileGenerator) {
    var daySeries = new DaySeries(dateProfile.renderRange, dateProfileGenerator);
    return new DayTable(daySeries, /year|month|week/.test(dateProfile.currentRangeUnit));
}
//# sourceMappingURL=DayGridView.js.map