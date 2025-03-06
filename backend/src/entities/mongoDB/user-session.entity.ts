import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserSession {
  @Prop()
  userId: number;

  @Prop()
  secret: string;
}

export const UserSessionSchema = SchemaFactory.createForClass(UserSession);
