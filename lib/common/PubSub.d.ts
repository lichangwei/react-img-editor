export default class PubSub {
    id: string;
    constructor(id: string);
    pub: (name: string, param?: any) => void;
    sub: (name: string, callback: any) => void;
}
