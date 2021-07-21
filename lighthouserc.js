module.exports = {
  ci: {
    collect: {
      staticDistDir: "./_site",
      url: [
        "http://localhost:8081/",
        // "http://localhost:8081/posts/making-google-fonts-faster/",
        "http://localhost:8081/posts/responsive-images-perf-matters-video/",
      ],
      numberOfRuns: 1,
    },
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      // budgetsFile: "./budget.json",
      preset: "lighthouse:no-pwa",
      assertions: {
        "categories:performance": ["error", { minScore: 0.95 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "unused-javascript": ["warn", { minScore: 0.95 }],
        // "unused-javascript": "off",
        "uses-http2": "off",
        "canonical": "off",
        "csp-xss": "off",
        "uses-optimized-images": ["warn", {"maxLength": 0}],
        "uses-responsive-images": ["warn", {"maxLength": 0}],
      },
    },
  },
};
