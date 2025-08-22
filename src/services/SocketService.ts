import { Socket, io } from "socket.io-client";

class SocketService {
  public static socket: Socket;
  /**
   * Initialize
   *
   */
  public static init(socketURL: string, token: string) {
    const socket = io(socketURL, {
      query: { token },
      withCredentials: true,
    });

    SocketService.socket = socket;
  }
}

export default SocketService;
