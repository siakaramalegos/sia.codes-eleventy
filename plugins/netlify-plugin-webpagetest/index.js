const fetch = require('node-fetch');
const BASE_URL = 'https://www.webpagetest.org/runtest.php'

module.exports = {
  onSuccess: async ({netlifyConfig}) => {
    const deployUrl = netlifyConfig.build.environment.DEPLOY_PRIME_URL

    if (!deployUrl) {
      console.log('Skipping WebPageTest: no deploy URL')
      return
    }


    try {
      console.log('Beginning WebPageTest run...')
      const result = await fetch(`${BASE_URL}?url=${deployUrl}&k=${process.env.WEBPAGETEST_API_TOKEN}&f=json`)

      if (result.ok) {
        const json = await result.json()
        console.log('Success! Url is ', json.data.userUrl);
        console.log({json});

        const resultJson = await fetch(json.data.jsonUrl)
        if (resultJson.ok) {
          const data = resultJson.json()
          console.log({data});
        } else {
          return failPlugin(`WebPageTest test result request failed with error ${resultJson.status}: ${resultJson.statusText}`)
        }
      } else {
        return failPlugin(`WebPageTest request failed with error ${result.status}: ${result.statusText}`)
      }
    } catch (error) {
      return failPlugin(`WebPageTest plugin failed with error: ${error}`)
    }

  },
}
