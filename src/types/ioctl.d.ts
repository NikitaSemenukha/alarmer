declare module 'ioctl' {
    function ioctl(fileDescriptor: number, request: number, data: number | Buffer): number;
    export = ioctl;
}