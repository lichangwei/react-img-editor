import { DrawEventParams } from '../common/type';
import Plugin from './Plugin';
export default class Download extends Plugin {
    constructor();
    name: string;
    iconfont: string;
    title: string;
    onEnter: (drawEventParams: DrawEventParams) => void;
}
