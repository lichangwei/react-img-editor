import Arrow from './Arrow';
import Circle from './Circle';
import Crop from './Crop';
import Download from './Download';
import Eraser from './Eraser';
import Mosaic from './Mosaic';
import Pen from './Pen';
import Rect from './Rect';
import Repeal from './Repeal';
import Text from './Text';
export default class PluginFactory {
    plugins: (Arrow | Circle | Crop | Download | Eraser | Mosaic | Pen | Rect | Repeal | Text)[];
}
