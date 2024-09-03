import { Scene } from 'phaser';

//entidades
import {Pelota} from "../entities/pelota"
import {Jugador} from "../entities/jugador"
import {Ladrillo} from "../entities/ladrillo"
import {Pared} from "../entities/pared"

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    init(data){
        this.vidas = data.vidas || 3
        this.puntos = data.puntos || 0;
        this.velocidad = data.velocidad || 100;
    }

    create ()
    {
        this.pelota = new Pelota(this, 100, 100, 4, 0xffffff, 1);
        this.jugador = new Jugador(this, 216/ 2, 200, 50, 8, 0xffffff, 1)
        this.pared = new Pared(this)

        //coliciones
        this.physics.add.collider(this.pelota, this.jugador);

        this.physics.add.collider(
            this.pelota,
            this.pared,
            (ball, brick) => {
                brick.hit(this);
                console.log(this.puntos)
            },
            null,
            this
        );

        //colision de la pelota con el limite inferior
        this.physics.world.on("worldbounds", (body, up, down, left, right) => {
            if (down) {
                this.vidas --;
                if (this.vidas > 0){
                    this.cameras.main.shake(100, 0.03); // temblor de la camara
                }
                else{
                    this.scene.start("GameOver");
                }
            }
        });

    }

    update () {
        this.jugador.update();
    }
}
