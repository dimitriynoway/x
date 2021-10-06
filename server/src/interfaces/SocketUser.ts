import { Socket } from "socket.io";

export default interface IClientSocket {
	client: {
		id: number,
		userColor: number,
		username: string,
		mutted: boolean,
		banned: boolean
	},
	socket: Socket
}