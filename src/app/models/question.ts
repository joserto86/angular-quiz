import { Response } from './response';

export class Question {
    title: string;
    points: number;
    seconds: number;
    responses: Array<Response>
    
    constructor (title: string, points: number, seconds: number, responses:Array<Response>) {
        this.title = title;
        this.points = points;
        this.seconds = seconds;
        this.responses = responses;
    }
    
}