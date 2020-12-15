const CLOUDNAME = "siacodes"
const FOLDER = "v1607719366/sia.codes/"
const BASE_URL = `https://res.cloudinary.com/${CLOUDNAME}/image/upload/`;
const FALLBACK_WIDTHS = [ 300, 600, 680, 1360 ];
const FALLBACK_WIDTH = 680;
const SEO_ASPECT_RATIOS = ["1:1", "4:3", "16:9"]

// Social share image configuration
const SHARE_IMAGE_FILE = "share_tmpl.jpg"
const TWITTER_IMAGE_FILE = "twitter_tmpl.jpg"
// If font not in the root of your Cloudinary media library, need to prepend with `foldername:`
const TITLE_FONT = "RecursiveSansExtraBold.woff2"
const TITLE_FONT_SIZE = "60"
const TITLE_BOTTOM_OFFSET = 282
const TAGLINE_FONT = "RecursiveSansRegular.woff2"
const TAGLINE_FONT_SIZE = "36"
const TAGLINE_TOP_OFFSET = 380
const TAGLINE_LINE_HEIGHT = "10"
const TEXT_AREA_WIDTH = "705"
const TEXT_LEFT_OFFSET = 425
const TEXT_COLOR = "221f2c"

function getSrcset(file, widths) {
  const widthSet = widths ? widths : FALLBACK_WIDTHS
  return widthSet.map(width => {
    return `${getSrc(file, width)} ${width}w`;
  }).join(", ")
}

function getSrc(file, width) {
  return `${BASE_URL}q_auto,f_auto,w_${width ? width : FALLBACK_WIDTH}/${FOLDER}${file}`
}

function fullSizeCrop(file, aspectRatio) {
  return `${BASE_URL}q_auto,ar_${aspectRatio},c_crop/${FOLDER}${file}`
}

// https://support.cloudinary.com/hc/en-us/articles/202521512-How-to-add-a-slash-character-or-any-other-special-characters-in-text-overlays-
function cloudinarySafeText(text) {
  return encodeURIComponent(text).replace(/(%2C)/g, '%252C').replace(/(%2F)/g, '%252F')
}

function socialImageUrl(title, description, isTwitter = false) {
  const file = isTwitter ? TWITTER_IMAGE_FILE : SHARE_IMAGE_FILE
  const width = isTwitter ? "1280" : "1200"
  const height = isTwitter ? "640" : "630"
  const left_offset = isTwitter ? TEXT_LEFT_OFFSET + 30 : TEXT_LEFT_OFFSET
  const topOffset = isTwitter ? TAGLINE_TOP_OFFSET - 24 : TAGLINE_TOP_OFFSET
  const bottomOffset = isTwitter ? TITLE_BOTTOM_OFFSET + 24 : TITLE_BOTTOM_OFFSET

  const imageConfig = [
    `w_${width}`,
    `h_${height}`,
    "q_auto:best",
    "c_fill",
    "f_jpg",
  ].join(",")

  const titleConfig = [
    `w_${TEXT_AREA_WIDTH}`,
    'c_fit',
    `co_rgb:${TEXT_COLOR}`,
    'g_south_west',
    `x_${left_offset}`,
    `y_${bottomOffset}`,
    `l_text:${TITLE_FONT}_${TITLE_FONT_SIZE}:${cloudinarySafeText(title)}`,
  ].join(",")

  const taglineConfig = [
    `w_${TEXT_AREA_WIDTH}`,
    'c_fit',
    `co_rgb:${TEXT_COLOR}`,
    'g_north_west',
    `x_${left_offset}`,
    `y_${topOffset}`,
    `l_text:${TAGLINE_FONT}_${TAGLINE_FONT_SIZE}_line_spacing_${TAGLINE_LINE_HEIGHT}:${cloudinarySafeText(description)}`,
  ].join(',');

  return `${BASE_URL}${imageConfig}/${titleConfig}/${taglineConfig}/${FOLDER}${file}`
}

module.exports = {
  srcset: (file, widths) => getSrcset(file, widths),
  src: (file, width) => getSrc(file, width),
  seoImages: (file) => {
    const imageSet = SEO_ASPECT_RATIOS.map(aspectRatio => fullSizeCrop(file, aspectRatio))
    return JSON.stringify(imageSet)
  },
  socialImage: (title, description, isTwitter) => socialImageUrl(title, description, isTwitter),
}
