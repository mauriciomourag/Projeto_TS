import { Form } from '../models/form.entity';

export default class FormController{
    generatePagination(page: number, limit: number){
        const _limit = limit || 10;
        const _page = page || 1;

        return {
            limit: _limit,
            offset: (_page - 1) * _limit    
        }
    }

    async sendForm(message: string, name: string, email: string, user_sender: number, cpf: number, user_receptor: number){
        await this.insertForm(message, name, email, user_sender, user_receptor, cpf);
    }
    
    async loadForm(page:number=10, _limit:number=10, user_id:number, user_friend:number){
        const { offset, limit } = this.generatePagination(page, _limit);
        const form = await Form.find({
                $or: [
                    { $and: [{user_sender: user_id}, {user_receptor: user_friend}] },
                    { $and: [{user_sender: user_friend}, {user_receptor: user_id}] }
                ]
            }).skip(offset).limit(limit).sort({ created_at: 1 });
        const count = await Form.countDocuments();

        return {
            rows: form,
            status: 200
        }
    }
    async insertForm(message: string, name: string, email: string, user_sender: number, cpf: number, user_receptor: number){
        const form = new Form({
            message: message,
            user_sender: user_sender,
            user_receptor: user_receptor,
            name: name,
            cpf: cpf,
            email: email
        });
        await form.save();
    }
}