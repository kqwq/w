// TODO move
const SUPPORTED_LANGUAGES = ["en", "es", "fr"];

class LabelManager {
  constructor() {
    this.labelIdToEnglish = {
      "basic:engine": "Rocket Engine",
      "basic:block": "Basic Block",
      "basic:wires": "Wires",
    };
  }

  async fetchTranslation(labelId, lang, labelRef) {
    if (lang === "en") {
      let translation = this.labelIdToEnglish[labelId];
      if (translation !== undefined) {
        labelRef.name = translation;
        return;
      }
    }
    let data = await fetch(
      `/api/devo/label_translation?lang=${lang}&label_id=${encodeURIComponent(
        labelId
      )}`
    ).then((r) => r.json());
    labelRef.name = data;
  }
}
const labelManager = new LabelManager();

class Label {
  constructor(labelId, x, y) {
    this.labelId = labelId;
    this.x = x;
    this.y = y;
    this.name = "Loading...";
    LabelManager.fetchTranslation(this.labelId, "en", this);
  }
}

class BlockManager {
  constructor() {
    this.dirMap = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 0, y: -1 },
    ];
    // It's important for a block to only execute one event per game tick.
    // Recursive errors / stack overflows must be avoided
    this.eventsList = ["init", "update", "destroy", "take_damage", "collision"];

    this.actionSpecs = {
      CHANGE_FORWARD_INERTIA_BY: {
        allowedEvents: ["init", "destroy"],
        valueType: Number,
        allowedValue: (v) => v >= -1 && v <= 1,
        fun: (block, craft) => {
          let xyCh = this.dirMap[block.dir];
          craft.inertiaX += xyCh.x;
          craft.inertiaY += xyCh.y;
        },
      },
      SHOOT_PROJECTILE: {
        /* Shot is blocked if projectile still exists in game.
        Shoot another projectile as soon as the last one is destroyed */
        allowedEvents: ["init", "update", "destroy"],
      },
      SEND_SIGNAL_TO: {
        allowedEvents: ["init", "update", "destroy"],
      },
    };
    this.conditionSpecs = {
      IF_SIGNAL_GREATER_THAN: {
        valueType: Number,
        allowedValue: (v) => v === Math.floor(v),
      },
      IF_SIGNAL_LESS_THAN: {
        valueType: Number,
        allowedValue: (v) => v === Math.floor(v),
      },
      IF_SIGNAL_EQUAL_TO: {
        valueType: Number,
        allowedValue: (v) => v === Math.floor(v),
      },
      IF_AGE_EQUAL_TO: {
        valueType: Number,
        allowedValue: (v) => v === Math.floor(v),
      },
    };
    this.defaultBlocks = {
      basic: {
        engine: {
          off: {
            img: "engine:off.png",
          },
          thrust: {
            img: "engine:thrust.png",
            events: {
              init: {
                // "ACTION_CODE": value
                CHANGE_FORWARD_INERTIA_BY: 1,
              },
            },
          },
        },
      },
    };
  }

  static getDefaultBlock(blockId) {
    // faction -> block -> block state -> props
  }

  static async fetchProperties(blockId, callbackBlock) {
    let data = await fetch(
      `/api/devo/block_props?block_id=${encodeURIComponent(blockId)}`
    ).then((r) => r.json());
  }
}

class Block {
  constructor(parentCraft, blockId, dir, lx, ly) {
    // lx = local x in relation to craft
    this.parentCraft = parentCraft; // parent craft
    this.blockId = blockId;
    this.dir = dir;
    this.lx = lx;
    this.ly = ly;
    this.neighbors = [];
    this.actionPotential = 0;
    this.age = 0;
  }
}
