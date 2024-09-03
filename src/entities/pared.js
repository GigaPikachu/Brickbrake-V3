// grpup of brick
import { Ladrillo } from "./ladrillo";
export class Pared extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene);

    this.createWall();

  }

  createWall(scene) {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 3; j++) {
        let ladrillo = new Ladrillo(
          this.scene,
          46 + i * 31,
          16 + j * 9,
          30,
          8,
          0xffffff,
          1
        );
        this.add(ladrillo);
      }
    }
  }
}