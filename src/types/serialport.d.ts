declare module 'serialport' {
    export default class SerialPort {
        constructor ({})
        setEncoding(encoding: string)
        on(event: string, callback: any)
        pause()
        close()
        open(callback: any)
    }
}