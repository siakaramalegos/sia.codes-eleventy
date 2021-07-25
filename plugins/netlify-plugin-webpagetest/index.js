module.exports = {
  onPreBuild: ({netlifyConfig}) => {
    console.log('Hello world from onPreBuild event!')
    console.log('token', process.env.WEBPAGETEST_API_TOKEN);
    console.log('netlifyConfig.build.environment', netlifyConfig.build.environment);
    console.log('url', netlifyConfig.build.environment.DEPLOY_PRIME_URL);
  },
}
