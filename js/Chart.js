export default class MarkLine {

    constructor(
        seriesData,
        xAxisData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        nameOfMarkLine = 'markLine',
        colorOfMarkline = 'red',
        fontWeight = 'bold',
        boundaryGap = 'false',
        typeOfMarkLine = 'dashed',
    ) {
        this.seriesData = seriesData;
        this.xAxisData = xAxisData;
        this.nameOfMarkLine = nameOfMarkLine;
        this.colorOfMarkline = colorOfMarkline;
        this.fontWeight = fontWeight;
        this.boundaryGap = boundaryGap;
        this.typeOfMarkLine = typeOfMarkLine;
    }

    getMinValue() {
        return Math.min.apply(Math, this.seriesData);
    }
    getMaxValue() {
        return Math.max.apply(Math, this.seriesData);
    }

    getIndexOfMin() {
        return this.seriesData.indexOf(this.getMinValue());
    }
    getIndexOfMax() {
        return this.seriesData.indexOf(this.getMaxValue());
    }

    getCurve() {
        let min_value = this.getMinValue();
        let max_value = this.getMaxValue();
        var index_of_min = this.getIndexOfMin();
        var index_of_max = this.getIndexOfMax();
        const curve = (max_value - min_value) / (index_of_max - index_of_min)
        return curve;
    }

    getStartY() {
        if (this.getCurve() < 0) {
            return this.getMaxValue() - (this.getCurve() * this.getIndexOfMax());
        } else {
            return this.getMinValue() - (this.getCurve() * this.getIndexOfMin());
        }
    }

    getEndY() {
        return this.getCurve() * (this.seriesData.length - 1) + this.getStartY()
    }

    getMinPointOfMarkLine(){
        return Math.min(this.getStartY(), this.getEndY());
    }

    filledMarkLine() {
        const markline = [];
        const positions = ['start', 'middle', 'end'];
        for (var i = 0; i < positions.length; ++i) {
            var name = positions[i];
            if (name == 'middle') {
                name = this.nameOfMarkLine;
            }
            markline.push([{
                    coord: [0, this.getStartY()],
                    label: {
                        fontWeight: this.fontWeight,
                        formatter: name,
                        position: positions[i]
                    }
                },
                {
                    coord: [this.seriesData.length - 1, this.getEndY()],
                }
            ]);
        }
        return markline;
    }

    getMarklineOption() {
        var option = {
            title: {
                text: "Sources",
                left: "center"
            },
            xAxis: {
                type: 'category',
                boundaryGap: this.boundaryGap,
                data: this.xAxisData
            },
            yAxis: {
                type: 'value',
                max: this.getCurve() < 0 ? this.getStartY() : this.getEndY(),
                min: this.getMinPointOfMarkLine() >= 0 ? 0 : this.getMinPointOfMarkLine()
            },
            series: [{
                data: this.seriesData,
                type: 'line',
                markLine: {
                    data: this.filledMarkLine(),
                    lineStyle: {
                        color: this.colorOfMarkline,
                        type: this.typeOfMarkLine,
                    }
                },
                areaStyle: {}
            }, ]
        };
        return option;
    }
}