import fs from 'fs';
import ioctl from 'ioctl';

/**
Reades temperature and humidity values from AM2320.
@returns values readed from AM2320
*/

export function getTempAndHum(): Promise<Array<number>> {
    const I2C_ADDR = 0x5c
    const I2C_SLAVE = 0x0703
    const I2C_BUS = '0'

    const path: string = '/dev/i2c-%d'.replace('%d', I2C_BUS);

    return new Promise((resolve, reject) => {
        fs.open(path, 'r+', async function(err, fd) {
            if (err) {
                    return console.error(err)
            }

            if (ioctl(fd, I2C_SLAVE, I2C_ADDR)) {
                    return console.log('Error occurred during ioctl call')
            }

            let buf = Buffer.from([0x00])
            fs.write(fd, buf, (err, bytesWritten, buffer) => {})
            await sleep(1)

            buf = Buffer.from([0x03, 0x00, 0x04])
            fs.write(fd, buf, fsCB)
            await sleep(16)
            
            let data = Buffer.alloc(8, 0)

            fs.read(fd, data, 0, 8, 0, fsCB)

            const humAndTemp = [data.readUInt16BE(2)/10.0, data.readInt16BE(4)/10.0]
            resolve(humAndTemp)
        })
    })

    function sleep(ms: number) {
            return new Promise((resolve) => {
                    setTimeout(resolve, ms)
            })
    }

    function fsCB(err: any, bytes: any, buffer: any) {
            if (err) {
                    console.error(err)
            }
    }
}