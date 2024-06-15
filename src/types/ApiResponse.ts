import { IMessage } from "@/model/message.model";

export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessage?: boolean;
  messages?: IMessage[];
}
