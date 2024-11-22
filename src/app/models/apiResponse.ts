
import { Torneo } from "./torneo";

export class ApiResponse {
  message: string;
  data: {
    rts: Torneo[];
    pelea: Torneo[];
  };

  constructor(message: string, data: { rts: Torneo[], pelea: Torneo[] }) {
    this.message = message;
    this.data = data;
  }
}
