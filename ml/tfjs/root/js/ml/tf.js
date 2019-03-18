// import * as core from '@tensorflow/tfjs-core'
// import * as layers from '@tensorflow/tfjs-layers'
const core = require('@tensorflow/tfjs-core');
const layers = require('@tensorflow/tfjs-layers');

const tf = { ...core, ...layers }


module.exports.tf = tf;
