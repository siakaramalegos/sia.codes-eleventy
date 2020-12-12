const CLOUDNAME = "siacodes"
const FOLDER = "v1607719366/sia.codes/"
const BASE_URL = `https://res.cloudinary.com/${CLOUDNAME}/image/upload/`;
const FALLBACK_WIDTHS = [ 300, 600, 680, 1360 ];
const FALLBACK_WIDTH = 680;

function getSrcset(file, widths) {
  const widthSet = widths ? widths : FALLBACK_WIDTHS
  return widthSet.map(width => {
    return `${BASE_URL}q_auto,f_auto,w_${width}/${FOLDER}${file} ${width}w`;
  }).join(", ")
}

function getSrc(file, width) {
  return `${BASE_URL}q_auto,f_auto,w_${width ? width : FALLBACK_WIDTH}/${FOLDER}${file}`
}

module.exports = {
  respimg: ({file, alt="", sizes="100vw", width, height, classList="", loading="lazy"}) => {
    const src = getSrc(file)
    const srcset = getSrcset(file)

    return `<img src="${src}" srcset="${srcset}" sizes="${sizes}" alt="${alt}" class=${classList} loading="${loading}" height="${height}" width="${width}"}>`;
  },
  srcset: (file, widths) => getSrcset(file, widths),
  src: (file, width) => getSrc(file, width),
}
