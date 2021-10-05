import { Socket } from "socket.io";

export default interface IClientSocket {
	client: {
		id: string,
		userColor: number,
		username: string
	},
	socket: Socket
}