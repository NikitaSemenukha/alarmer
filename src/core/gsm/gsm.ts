import SerialPort from 'serialport';

export function sendAlarmMessage(msg: string): void {
    const phoneNumber: string = '+48571308705'
    const port = new SerialPort({
        path: 'COM6',
        baudRate: 9600,
        autoOpen: false
    });
    
    port.setEncoding('utf8')
    
    port.on('close', () => {console.log('COM port is closed\n')})
    
    port.on('open', async () => {
        console.log('COM port was openned\n')
        port.pause()

        await sendMsg(port, `${phoneNumber}`, `${msg}`, true) 
        port.close()   
    })
    
    port.open((err: any) => {
        if(err)
            console.log(`Error: ${err.message}`)
    })
    
    async function sendMsg(port: any, number: string, msg: string, prepareGSMFlag: boolean = false) {
        var EOF = 26
    
        let resCode = false
        
        if (prepareGSMFlag !== false) {
            resCode = await prepareGSM(port)
            if (resCode !== true) {
                return
            }
        }
    
        resCode = await logCommunication(port, `AT+CMGS="${number}"`, '\r', ['>', 'ERROR'])
        if (resCode === true) {
            resCode = await logCommunication(port, `${msg}`, String.fromCharCode(EOF), ['OK', 'ERROR'])
        }
    }
    
    async function prepareGSM(port: any) {
        const SIM = 0 //0 - SIM in TOP slot, SIM in BOTTOM slot
        let resCode = false
    
        resCode = await logCommunication(port, 'ATE1')
        if (resCode !== true) {
            console.log('Error occured')
            return resCode
        }
    
        resCode = await logCommunication(port, 'ATV1')
        if (resCode !== true) {
            console.log('Error occured')
            return resCode
        }
    
        resCode = await logCommunication(port, 'AT+CFUN=0')
        if (resCode !== true) {
            console.log('Error occured: Can\'t turn off modem')
            return resCode
        }
    
        resCode = await logCommunication(port, `AT+QDSIM=${SIM},1`)
        if (resCode !== true) {
            console.log('Error occured: Can\'t set SIM as active')
            return resCode
        }
    
        resCode = await logCommunication(port, 'AT+CFUN=1')
        if (resCode !== true) {
            console.log('Error occured: Can\'t turn on modem (Try to insert SIM)')
            return resCode
        }
    
        resCode = await logCommunication(port, 'AT+CPIN?')
        if (resCode !== true) {
            console.log('Error occured: remove the PIN verification')
            return resCode
        }
    
        await sleep(1000)
    
        resCode = await logCommunication(port, 'AT+CPBS="SM"')
        if (resCode !== true) {
            console.log('Error occured: can\'t select SIM storage')
            return resCode
        }
    
        resCode = await logCommunication(port, 'AT+CMGF=1')
        if (resCode !== true) {
            console.log('Error occured: Can\'t set SMS mode TEXT')
            return resCode
        }
    
        resCode = await logCommunication(port, 'AT+CNMI=2,0,0,0,0')
        if (resCode !== true) {
            console.log('Error occured: Can\'t turn off SMS notifications')
            return resCode
        }
    
        resCode = await logCommunication(port, 'AT+CSCS="GSM"')
        if (resCode !== true) {
            console.log('Error occured: Can\'t set character set to "GSM"')
            return resCode
        }
    
        return resCode
    }
    
    async function logCommunication(port: any, cmd: string, cmdEnding = '\r\n', cmdResponses = ['OK', 'ERROR'], delay = 0) {
        if (delay !== 0) {
            await sleep(delay)
        }
        console.log(`Sent:\n${cmd}\n`)
        await sendCmd(port, cmd, cmdEnding)
    
        const response = await getResponse(port, cmdResponses, delay + 300, delay + 600)
        console.log(`Received:\n${response[0]}`)
        if (response[1] === 0)
            return true
        else
            return false
    }
    
    function sendCmd(port: any, cmd: string, cmdEnding = '\r\n') {
        cmd += cmdEnding
        port.write(cmd)
        port.drain()
    }
    
    async function getResponse(port: any, cmdResponses = ['OK', 'ERROR'], delay = 300, timeout = 600) {
        let response = ''
        let readed = ''
        let result = ['No respose received', -1]
    
        timeout -= delay - 1
        await sleep(delay)
    
        while (timeout > 0) {
            readed += port.read()
            if(readed !== 'null') {
                response += readed
                for (let i = 0; i < cmdResponses.length; i++) {
                    if (response.includes(cmdResponses[i])) {
                        result[0] = response
                        result[1] = i
                        return result
                    }
                }
            }
    
            readed = ''
    
            timeout -= 150
            await sleep(150)
        }
    
        return result
    }
    
    function sleep(ms = 300) {
        return new Promise((resolve) => {
                setTimeout(resolve, ms)
        })
    }
}