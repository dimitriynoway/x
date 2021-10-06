export default interface SendMessage {
	(e: React.MouseEvent<HTMLElement>, msg: string): boolean | undefined
}