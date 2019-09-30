// import {} from '../events';
import { tallGrass } from './tiles'

const map = {
  width: 18,
  height: 36,
  spritesheet: '../spritesheets/overworld.png',
  name: 'Route 1',
  connections: {
    'south': {
      name: 'Pallet Town',
      offset: { x: -4, y: 36 }
    },
    'north': {
      name: 'Viridian City',
      offset: { x: -13, y: -36 }
    }
  },
  encounterParams: {
    density: 25 // out of 256
  },
  type: 'field',
  npcs: [
    { x: 7, y: 27 },
    {
      actor: true,
      x: 13,
      y: 13,
      skin: 'youngster',
      facing: 'west',
      ai: {
        type: 'wanderAI',
        timing: {
          type: 'uniformInterval',
          args: [2000, 6000]
        },
        args: [12, 12, 15, 15]
      },
      speed: 1.5
    },
    {
      actor: true,
      x: 8,
      y: 31,
      skin: 'link lady',
      facing: 'north',
      speed: 1
    },
    {
      actor: true,
      x: 9,
      y: 31,
      skin: 'chansey',
      facing: 'north',
      speed: 1,
      ai: {
        type: 'spinAI',
        timing: {
          type: 'uniformInterval',
          args: [1000, 5000]
        },
        args: []
      }
    }
  ],
  tiles: [
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 117,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 117,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 117,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 117,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 73,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 78,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 123,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 78,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 123,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 117,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 117,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 117,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 117,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 73,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 1,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 0,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 117,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 117,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 117,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 117,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 73,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 94,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 78,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 123,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 73,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 94,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 117,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 117,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 117,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 117,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 117,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 117,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 117,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 117,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    {
      id: 78,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 123,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 78,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 123,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 4,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 78,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 123,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 78,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 123,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 78,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 123,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 78,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 123,
      frames: 1,
      collision: 'south',
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 10,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 2,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    tallGrass,
    tallGrass,
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 34,
      frames: 3,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },

    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    tallGrass,
    tallGrass,
    {
      id: 6,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
    {
      id: 29,
      frames: 1,
      collision: true,
      events: [],
      flags: {}
    },
    {
      id: 23,
      frames: 1,
      collision: false,
      events: [],
      flags: {}
    },
  ]
};
export default map;