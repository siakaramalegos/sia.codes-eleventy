module.exports = {
  ci: {
    collect: {
      // startServerCommand: 'npm run start',
      staticDistDir: './_site',
      url: [
        'http://localhost:8081/',
        'http://localhost:8081/posts/making-google-fonts-faster/',
        'http://localhost:8081/posts/responsive-images-perf-matters-video/'
      ],
      numberOfRuns: 3,
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      // budgetsFile: "./budget.json",
      assertions: {
        'categories:performance': ['error', {minScore: 0.95}],
        'categories:accessibility': ['error', {minScore: 0.95}]
      }

    }
  },
};
