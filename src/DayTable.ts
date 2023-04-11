import { Seg, DaySeries, DateRange, DateMarker } from '@fullcalendar/core'

export interface DayTableSeg extends Seg {
    row: number
    firstCol: number
    lastCol: number
}

export interface DayTableCell {
    date: DateMarker
    htmlAttrs?: string
}

export default class DayTable {

    rowCnt: number
    colCnt: number
    cells: DayTableCell[][]
    headerDates: DateMarker[]

    private invalidIndex: { idxini: number; idxfin: number }[]
    private daySeries: DaySeries

    constructor(daySeries: DaySeries, breakOnWeeks: boolean) {
        this.rowCnt = 12
        this.colCnt = 31
        this.daySeries = daySeries        
        this.cells = this.buildCells()
        this.headerDates = this.buildHeaderDates()
    }

    private buildCells() {
        let rows = []
        let cells = []
        let inrows = []

        let inrow: { idxini: number; idxfin: number }
        let tinvalid:number = 0
        for (let i = 0; i < this.daySeries.dates.length; i++) {
            cells.push(
                { date: this.daySeries.dates[i] }
            )
            if (this.daySeries.dates.length === (i + 1) || this.daySeries.dates[i + 1].getDate() === 1) {

                inrow = {idxini:-1,idxfin:-1}

                for (let padding = this.daySeries.dates[i].getDate(); padding < 31; padding++) {
                    cells.push({
                        date: null
                    })
                    if( inrow.idxini == -1 ){
                        inrow.idxini = tinvalid+i+1
                        inrow.idxfin = tinvalid+i+1
                    }else{
                        inrow.idxfin = inrow.idxfin+1
                    }
                    tinvalid++
                }
                if( inrow.idxini != -1 )
                    inrows.push(inrow)
                rows.push(cells)
                cells = []
            }
        }
        this.invalidIndex = inrows
        return rows
    }

    private buildHeaderDates() {
        return []
    }

    sliceRange(range: DateRange): DayTableSeg[] {
      
        let { colCnt } = this
        let seriesSeg = this.daySeries.sliceRange(range)
        let segs: DayTableSeg[] = []

        if (seriesSeg) {
            
            let { firstIndex, lastIndex } = seriesSeg
            //Hiedra: skip invalid dates                
            for ( let r=0; r<this.invalidIndex.length; r++)
            {
                if( this.invalidIndex[r].idxini!=-1 ){
                    let value:number = 0
                    if( firstIndex >= this.invalidIndex[r].idxini ){
                        if(firstIndex >= this.invalidIndex[r].idxfin )
                            value = this.invalidIndex[r].idxfin - this.invalidIndex[r].idxini + 1
                        else
                            value = firstIndex - this.invalidIndex[r].idxini + 1

                        firstIndex += value
                        lastIndex += value

                    }else if( lastIndex >= this.invalidIndex[r].idxini ){
                        if(lastIndex >= this.invalidIndex[r].idxfin )
                            value = this.invalidIndex[r].idxfin - this.invalidIndex[r].idxini + 1
                        else
                            value = firstIndex - this.invalidIndex[r].idxini + 1
                        lastIndex += value

                    }else{
                        break;
                    }                        
                }
            }

            let index = firstIndex

            while (index <= lastIndex) {
                let row = Math.floor(index / colCnt)
                let nextIndex = Math.min((row + 1) * colCnt, lastIndex + 1)
                //invalid date?
                segs.push({
                    row: row,
                    firstCol: index % colCnt,
                    lastCol: (nextIndex - 1) % colCnt,
                    isStart: seriesSeg.isStart && index === firstIndex,
                    isEnd: seriesSeg.isEnd && (nextIndex - 1) === lastIndex
                })

                index = nextIndex
            }
        }

        return segs
    }

}

