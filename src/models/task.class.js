import { LEVELS } from "./levels.enum";


export class Task {
	name = '';
	description = '';
	done = false;
	level = LEVELS.NORMAL;

	constructor(name1, description1, done1, level1){
		this.name = name1;
		this.description = description1;
		this.done = done1;
		this.level = level1
	}
}