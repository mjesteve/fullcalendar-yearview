import moment from 'moment';
var DayTable = /** @class */ (function () {
    function DayTable(daySeries, breakOnWeeks) {
        this.daySeries = daySeries;
        this.cells = this.buildCells();
        this.headerDates = this.buildHeaderDates();
        this.rowCnt = 12;
    }
    DayTable.prototype.buildCells = function () {
        var rows = [];
        var cells = [];
        for (var i = 0; i < this.daySeries.dates.length; i++) {
            cells.push({ date: this.daySeries.dates[i] });
            if (this.daySeries.dates.length === (i + 1) || this.daySeries.dates[i + 1].getDate() === 1) {
                for (var padding = this.daySeries.dates[i].getDate(); padding < 31; padding++) {
                    cells.push({
                        date: null
                    });
                }
                rows.push(cells);
                cells = [];
            }
        }
        return rows;
    };
    DayTable.prototype.buildHeaderDates = function () {
        return [];
    };
    DayTable.prototype.sliceRange = function (range) {
        var segs = [];
        var firstMonthStart = moment(range.start).startOf('month');
        var currentMonthStart = moment(range.start).startOf('month');
        var currentMonthEnd = moment(range.start).endOf('month');
        var lastMonthStart = moment(range.end).startOf('month');
        if (lastMonthStart.year() > currentMonthStart.year()) {
            lastMonthStart = currentMonthStart.clone().month(11).startOf('month');
        }
        while (currentMonthStart.isSameOrBefore(lastMonthStart)) {
            segs.push({
                row: currentMonthStart.month(),
                firstCol: (currentMonthStart.isAfter(range.start)) ? 0 : range.start.getDate() - 1,
                lastCol: (currentMonthEnd.isBefore(range.end)) ? currentMonthEnd.date() - 1 : range.end.getDate() - 1,
                isStart: currentMonthStart.isSame(firstMonthStart),
                isEnd: currentMonthStart.isSame(lastMonthStart)
            });
            currentMonthStart.add(1, 'months');
            currentMonthEnd = currentMonthStart.clone().endOf('month');
        }
        return segs;
    };
    return DayTable;
}());
export default DayTable;
//# sourceMappingURL=DayTable.js.map