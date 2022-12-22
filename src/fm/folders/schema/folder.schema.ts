import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type FolderDocument = HydratedDocument<Folder>

@Schema()
export class Folder {
    @Prop({ required: true })
        name: string
    @Prop({default: '#FFFFFF'})
        color: string
    @Prop()
        path: string
    @Prop()
        parentPath: string
    @Prop({ type: Types.ObjectId, ref: 'User' })
        owner: Types.ObjectId
    @Prop()
        children: string[]
}

export const FolderSchema = SchemaFactory.createForClass(Folder)

FolderSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    },
})
