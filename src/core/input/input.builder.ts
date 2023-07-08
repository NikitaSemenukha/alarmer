import { DataUpdater } from '../json/createTempAndHumObj.service';
import { ITempHumJson } from './ITempHumJson.interface';

export class DataInputBuilder {
    private intervalId: NodeJS.Timeout | null; // ID of the interval for data updates
    private data: ITempHumJson[] = []; // Array to store temperature and humidity data
    private dataUpdater: DataUpdater; // Instance of the data updater service

    constructor() {
        this.intervalId = null;
        this.dataUpdater = new DataUpdater();
    }

    /**
     * Starts the interval for data updates
     * @returns The DataInputBuilder instance
     */
    start(): DataInputBuilder {
        if (!this.intervalId) {
            // Start the interval and add updated data to the array
            this.intervalId = setInterval(() => {
                this.data.push(this.dataUpdater.updateData());
            }, 5000);
        }
        return this;
    }

    /**
     * Stops the interval for data updates
     * @returns The DataInputBuilder instance
     */
    stop(): DataInputBuilder {
        if (this.intervalId) {
            // Stop the interval
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        return this;
    }

    /**
     * Get the latest temperature and humidity data
     * @returns The latest data object or null if no data is available
     */
    getLatestData(): ITempHumJson | null {
        if (this.data.length > 0) {
            return this.data[this.data.length - 1];
        }
        return null;
    }

    /**
     * Get the history of temperature and humidity data
     * @returns An array of data objects
     */
    getHistoryData(): ITempHumJson[] {
        return this.data;
    }

    /**
     * Resets the temperature and humidity data array
     * @returns The DataInputBuilder instance
     */
    reset(): DataInputBuilder {
        this.data = [];
        return this;
    }

    /**
     * Builds the final object with methods and returns it
     * @returns The object with methods
     */
    build(): {
        getLatestData: () => ITempHumJson | null,
        getHistoryData: () => ITempHumJson[],
        start: () => DataInputBuilder,
        stop: () => DataInputBuilder,
        reset: () => DataInputBuilder
    } {
        return {
            getLatestData: this.getLatestData.bind(this),
            getHistoryData: this.getHistoryData.bind(this),
            start: this.start.bind(this),
            stop: this.stop.bind(this),
            reset: this.reset.bind(this)
        };
    }
}
