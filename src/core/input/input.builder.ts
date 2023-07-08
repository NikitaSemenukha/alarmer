import { DataUpdater } from '../json/createTempAndHumObj.service';
import { ITempHumJson } from './ITempHumJson.interface';

export class DataInputBuilder {

    private intervalId: NodeJS.Timeout | null;
    private data: ITempHumJson[] = [];
    private dataUpdater: DataUpdater;

    constructor() {
        this.intervalId = null;
        this.dataUpdater = new DataUpdater();
    }

    start() {
        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.data.push(this.dataUpdater.updateData());
            }, 5000);
        }
        return this;
    }
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        return this;
    }

    getLatestData() {
        if (this.data.length > 0) {
            return this.data[this.data.length - 1];
        }
        return {};
    }

    getHistoryData() {
        return this.data;
    }

    reset() {
        this.data = [];
        return this;
    }

    build() {
        return {
            getLatestData: this.getLatestData.bind(this),
            getHistoryData: this.getHistoryData.bind(this),
            start: this.start.bind(this),
            stop: this.stop.bind(this),
            reset: this.reset.bind(this)
        };
    }
}
