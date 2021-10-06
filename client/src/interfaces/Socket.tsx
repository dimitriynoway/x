export default interface Socket {
	on(event: string, callback: (data: any) => void);
	emit(event: string, data: any);
	removeAllListeners(event: string);
	once(event: string, callback: (data: any) => void);
	disconnect(disconnect: boolean);
}