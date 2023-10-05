import { model, Schema } from 'mongoose';

export interface IForm {
    user_sender: number;
    user_receptor: number;
    message: string;
    name: string;
    cpf: number;
    email: string;
    created_at: Date;
}

export const FormSchema = new Schema<IForm>(
    {
        user_sender: { type: 'number', required: true },
        user_receptor: { type: 'number', required: true},
        cpf: { type: 'number', required: true },
        email: { type: String, required: true },
        name: { type: String, required: true },
        message: { type: String, required: true },
        created_at: { type: Date, default: Date.now }
    },
    { timestamps: true}
);

export const Form = model<IForm>('form', FormSchema, 'form')