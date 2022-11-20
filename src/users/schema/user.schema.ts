import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop({ required: true, unique: true })
        username: string
    @Prop({ unique: true })
        email: string
    @Prop({ required: true })
        password: string
    @Prop({ default: true })
        isActive: boolean
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password
        delete ret.__v
        delete ret.isActive
    },
})
