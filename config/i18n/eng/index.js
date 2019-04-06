const WEBSITE_NAME = 'Daily Jews';

module.exports = {
  website: {
    info: {
      name: WEBSITE_NAME,
      copyrights: `© 2019 ${WEBSITE_NAME}, LLC`,
    },

    titles: {
      search: 'Search',
      see_also: 'See also...',

      images: {
        figcaption: 'fig. - %{}',
      },

      links: {
        see_more: 'See more...',
        read_more: 'Read more...',
      },
    },

    article: {
      read_time: '%{} min.',
      comments_count: '%{} comments',
      bookmark: 'Save',
      likes: '%{} likes',
      views: '%{} views',
    },

    buttons: {
      create_article: 'Create article',
      report_hate_crime: 'Report hate crime',
    },

    sections: {
      articles: {
        title: 'Popular articles',
      },

      tags: {
        title: 'Popular tags',
      },
    },
  },
};
