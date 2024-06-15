import { Model, Schema, model, models } from "mongoose";

export interface IMessage extends Document {
  content: string;
  user: Schema.Types.ObjectId;
}

export const messageSchema: Schema<IMessage> = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Message =
  (models.Message as Model<IMessage>) ||
  model<IMessage>("Message", messageSchema);
