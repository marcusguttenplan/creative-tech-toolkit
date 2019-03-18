// import Model from './base'
// const Model = new (require('./base.js'))();
const Model = require('./base.js');
const classes = require('./classes.js')
// import * as classes from './classes'

class EmotionNet extends Model {
  constructor() {
    super({
      path: `${process.env.PUBLIC_URL}/models/emotion/model.json`,
      imageSize: 48,
      classes: classes.EMOTION,
      isGrayscale: true
    })
  }
}

class GenderNet extends Model {
  constructor() {
    super({
      path: `${process.env.PUBLIC_URL}/models/gender/model.json`,
      imageSize: 48,
      classes: classes.GENDER
    })
  }
}

class MobileNet extends Model {
  constructor() {
    super({
      path:
        'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json',
      imageSize: 224,
      classes: classes.IMAGENET
    })
  }
}


module.exports = {
    EmotionNet: EmotionNet,
    GenderNet: GenderNet,
    MobileNet: MobileNet
}
