import { Question } from "./question";

export class Quiz {
    id?: number;
    uid: string;
    title: string;
    description: string;
    code: string;
    countQuestions: number;
    createdAt: Date;
    questions: Array<Question>;

    constructor(uid: string, title: string, description: string, code: string, questions: Array<Question>) {
        this.uid = uid;
        this.title = title,
        this.description = description;
        this.code = code,
        this.countQuestions = questions.length;
        this.createdAt = new Date();
        this.questions = questions;
    }
}