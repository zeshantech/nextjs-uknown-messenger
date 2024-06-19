import { IMessage } from "@/model/message.model";

export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptMessages?: boolean;
  messages?: IMessageForClient[];
  users?: IUserForClient[];
}

export interface IPagination {
  page: number;
  limit: number;
}

export interface IUserForClient {
  username: string;
  _id: string;
  email: string;
  isAcceptMessages: boolean;
}

export interface IMessageForClient {
  content: string;
  _id: string;
}
