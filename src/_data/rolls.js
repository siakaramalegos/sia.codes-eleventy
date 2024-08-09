const BLOGS = [
  // {
  //   name: "",
  //   url: "",
  //   rss: "",
  //   newsletter: {
  //     url: "",
  //     rss: "",
  //   },
  //   types: [""],
  //   topics: [""],
  // },
  {
    name: "{{ 11tybundle.dev }}",
    url: "https://11tybundle.dev/",
    rss: "https://11tybundle.dev/feed.xml",
    types: ["blog", "aggregator", "newsletter"],
    topics: ["11ty"],
  },
  {
    name: "Ahmad Shadeed",
    url: "https://ishadeed.com/",
    rss: "https://ishadeed.com/feed.xml",
    types: ["blog"],
    topics: ["CSS"],
  },
  {
    name: "Aleksandr Hovhannisyan",
    url: "https://www.aleksandrhovhannisyan.com/",
    rss: "https://www.aleksandrhovhannisyan.com/feed.xml",
    types: ["blog"],
    topics: ["web dev", "11ty", "accessibility"],
  },
  {
    name: "Andy Davies",
    url: "https://andydavies.me/",
    rss: "https://feeds.feedburner.com/andydavies",
    types: ["blog"],
    topics: ["web perf"],
  },
  {
    name: "Ben Myers",
    url: "https://benmyers.dev/",
    rss: "https://benmyers.dev/feed.xml",
    types: [""],
    topics: ["accessibility", "web dev", "11ty"],
  },
  {
    name: "Bob Monsour",
    url: "https://www.bobmonsour.com/",
    rss: "https://www.bobmonsour.com/feed.xml",
    types: ["blog"],
    topics: ["11ty", "web dev"],
  },
  {
    name: "Calibre",
    url: "https://calibreapp.com/blog",
    rss: "https://calibreapp.com/blog/rss.xml",
    newsletter: {
      url: "https://calibreapp.com/newsletter",
    },
    types: ["blog", "newsletter"],
    topics: ["web perf"],
  },
  {
    name: "Cassidy Williams",
    url: "https://cassidoo.co/",
    rss: "https://cassidoo.co/rss.xml",
    newsletter: {
      url: "https://buttondown.com/cassidoo/archive",
      rss: "https://buttondown.email/cassidoo/rss",
    },
    types: ["blog", "newsletter"],
    topics: ["web dev", "keyboards"],
  },
  {
    name: "Cloud Four",
    url: "https://cloudfour.com/thinks/",
    rss: "https://cloudfour.com/feed/",
    types: ["blog"],
    topics: ["web dev"],
  },
  {
    name: "Cory Dransfeldt",
    url: "https://coryd.dev/",
    rss: "https://feedpress.me/coryd",
    types: ["blog"],
    topics: ["11ty", "web dev"],
  },
  {
    name: "CSS { In Real Life }",
    url: "https://css-irl.info/",
    rss: "https://css-irl.info/rss.xml",
    types: ["blog"],
    topics: ["CSS", "web"],
  },
  {
    name: "Eric Portis",
    url: "https://ericportis.com/",
    rss: "https://ericportis.com/feed/",
    types: ["blog"],
    topics: ["web dev", "media"],
  },
  {
    name: "Harry Roberts",
    url: "https://csswizardry.com/",
    rss: "https://feeds.feedburner.com/csswizardry",
    newsletter: {
      url: "https://csswizardry.com/newsletter/"
    },
    types: ["blog", "newsletter"],
    topics: ["web perf"],
  },
  {
    name: "Helen Chong",
    url: "https://helenchong.dev/",
    rss: "https://helenchong.dev/blog/feed.xml",
    types: ["blog"],
    topics: ["11ty", "web dev"],
  },
  {
    name: "Jake Archibald",
    url: "https://jakearchibald.com/",
    rss: "https://jakearchibald.com/posts.rss",
    types: ["blog"],
    topics: ["web dev"],
  },
  {
    name: "Jim Nielsen’s Blog",
    url: "https://blog.jim-nielsen.com/",
    rss: "https://blog.jim-nielsen.com/feed.xml",
    types: ["blog"],
    topics: ["web dev"],
  },
  {
    name: "Lene Saile",
    url: "https://www.lenesaile.com/en/",
    rss: "https://www.lenesaile.com/en/feed.xml",
    types: ["blog"],
    topics: ["web dev", "11ty"],
  },
  {
    name: "Lynn Fisher Web Designer",
    url: "https://lynnandtonic.com/",
    rss: "https://lynnandtonic.com/feed.xml",
    types: ["blog"],
    topics: ["web design", "web dev"],
  },
  {
    name: "Melanie Richards",
    url: "https://melanie-richards.com/",
    rss: "https://melanie-richards.com/feed.xml",
    types: ["blog"],
    topics: ["web dev", "web design", "creativity"],
  },
  {
    name: "Modern CSS Solutions",
    url: "https://moderncss.dev/",
    rss: "",
    types: ["blog"],
    topics: ["CSS", "web dev"],
  },
  {
    name: "Ryan Trimble",
    url: "https://ryantrimble.com/",
    rss: "https://ryantrimble.com/rss.xml",
    types: ["blog"],
    topics: ["web dev", "web design"],
  },
  {
    name: "Speedcurve",
    url: "https://www.speedcurve.com/blog/",
    rss: "https://www.speedcurve.com/blog/rss/",
    newsletter: {
      url: "https://www.speedcurve.com/newsletter/",
    },
    types: ["blog", "newsletter"],
    topics: ["web perf"],
  },
  {
    name: "THE Eleventy Meetup",
    url: "https://11tymeetup.dev/",
    rss: "https://11tymeetup.dev/feed.xml",
    types: ["events"],
    topics: ["11ty"],
  },
  {
    name: "Tim Kadlec",
    url: "https://timkadlec.com/",
    rss: "https://timkadlec.com/remembers/atom.xml",
    newsletter: {
      url: "https://newsletter.timkadlec.com/archive",
    },
    types: ["blog", "newsletter"],
    topics: ["web perf", "books"],
  },
  {
    name: "Una Kravets",
    url: "https://una.im/",
    rss: "https://una.im/rss.xml",
    types: ["blog"],
    topics: ["CSS", "web platform"],
  },
  {
    name: "wizard zines",
    url: "https://wizardzines.com/",
    rss: "",
    types: ["zines"],
    topics: ["programming"],
  },
  {
    name: "Zach Leatherman",
    url: "https://www.zachleat.com/",
    rss: "https://www.zachleat.com/web/feed/",
    types: ["blog"],
    topics: ["11ty", "web dev"],
  },
]

const {AssetCache} = require('@11ty/eleventy-fetch');
const RssParser = require('rss-parser');
const rssParser = new RssParser({timeout: 5000});
const normalizeUrl = require('normalize-url');

/** Sorter function for an array of feed items with dates */
function sortByDateDescending(feedItemA, feedItemB) {
	const itemADate = new Date(feedItemA.isoDate);
	const itemBDate = new Date(feedItemB.isoDate);
	return itemBDate - itemADate;
}

/** Fetch RSS feed at a given URL and return its latest post (or get it from cache, if possible) */
async function getLatestPost(feedUrl) {
	const asset = new AssetCache(feedUrl);
	// If cache exists, happy day! Use that.
	if (asset.isCacheValid('1d')) {
		const cachedValue = await asset.getCachedValue();
		return cachedValue;
	}
	const rssPost = await rssParser
		.parseURL(feedUrl)
		.catch((err) => {
			console.error(feedUrl, err);
			return null;
		})
		.then((feed) => {
			if (!feed || !feed.items || !feed.items.length) {
				return null;
			}
			const [latest] = [...feed.items].sort(sortByDateDescending);
			if (!latest.title || !latest.link) {
				return null;
			}
			return {title: latest.title, url: latest.link};
		});
	await asset.save(rssPost, 'json');
	return rssPost;
}

// name: 'Andy Davies',
// url: 'https://andydavies.me/',
// rss: 'https://feeds.feedburner.com/andydavies',
// types: [ 'blog' ],
// topics: [ 'web perf', 'personal' ],
// about: '',
// favicon: 'https://v1.indieweb-avatar.11ty.dev/https%3A%2F%2Fandydavies.me%2F/',
// latestPost: {
//   title: 'Bypassing Cookie Consent Banners in Lighthouse and WebPageTest',
//   url: 'https://andydavies.me/blog/2021/03/25/bypassing-cookie-consent-banners-in-lighthouse-and-webpagetest/'
// }
module.exports = async function() {
  console.log(">>> Fetching latest posts for blogroll...");
  const augmentedBlogInfo = await Promise.all(BLOGS.map(async (rawBlogInfo) => {
    const encodedBlogUrl = encodeURIComponent(rawBlogInfo.url);
    const favicon = `https://v1.indieweb-avatar.11ty.dev/${encodedBlogUrl}/`;
    const cleanUrl = normalizeUrl(rawBlogInfo.url, {stripProtocol: true})
    return {
      ...rawBlogInfo,
      cleanUrl,
      favicon,
      latestPost: rawBlogInfo.rss ?
        await getLatestPost(rawBlogInfo.rss) :
        null
    };
  }));
  return augmentedBlogInfo;
}
