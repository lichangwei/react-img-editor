import Plugin from './Plugin';
import { DrawEventParams } from '../common/type';
export default class Repeal extends Plugin {
    constructor();
    name: string;
    iconfont: string;
    title: string;
    onEnter: (drawEventParams: DrawEventParams) => void;
}
