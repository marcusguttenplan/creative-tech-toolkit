const getImg = src =>
  new Promise(resolve => {
    const img = new Image()
    img.src = src
    img.crossOrigin = '*'
    img.onload = () => resolve(img)
  })

const imgLoaded = img =>
  new Promise(resolve => {
    if (img && img.complete) resolve()
    img.onload = () => resolve()
  })

const readFile = file =>
  new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = () => resolve({ file, url: reader.result })
    reader.readAsDataURL(file)
  })

const nextFrame = () =>
    // console.log("next frame");
  new Promise(resolve => {

    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  })

  // console.log("next frame");

const nameToEmoji = {
  Angry: '😠',
  Disgust: '🤢',
  Fear: '😨',
  Happy: '😄',
  Sad: '🙁',
  Surprise: '😲',
  Neutral: '😐',
}

const drawBox = ({ ctx, x, y, width, height }) => {
  ctx.strokeStyle = '#feda31'
  ctx.lineWidth = '3'
  ctx.strokeRect(x, y, width, height)
}

const drawText = ({ ctx, x, y, text }) => {
  const pad = 4
  ctx.fillStyle = '#feda31'
  ctx.font = '16px Arial'
  ctx.textBaseline = 'top'
  ctx.fillText(text, x + pad, y + pad)
}
