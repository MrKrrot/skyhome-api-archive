import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type FolderDocument = HydratedDocument<Folder>

@Schema()
export class Folder {
    @Prop({ required: true })
        name: string
    @Prop()
        path: string
    @Prop()
        parentPath: string
    @Prop()
        owner: string
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
