module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      // staticDistDir: './_site',
      url: [
        'http://localhost:8081/',
        'http://localhost:8081/posts/making-google-fonts-faster/',
        'http://localhost:8081/posts/responsive-images-perf-matters-video/'
      ]
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
