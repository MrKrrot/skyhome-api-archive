import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

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
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
        delete ret.isActive
    },
})
