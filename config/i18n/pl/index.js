const WEBSITE_NAME = 'Codzienni Żydzi';

module.exports = {
  website: {
    info: {
      name: WEBSITE_NAME,
      copyrights: `© 2019 ${WEBSITE_NAME}, LLC`,
    },

    titles: {
      search: 'Wyszukaj',
      see_also: 'Zobacz też...',

      images: {
        figcaption: 'obrazek - %{}',
      },

      links: {
        see_more: 'Zobacz więcej...',
        read_more: 'Czytaj więcej...',
      },
    },

    article: {
      read_time: '%{} min.',
      comments_count: '%{} opinii',
      bookmark: 'Zapisz',
      likes: '%{} polubień',
      views: '%{} wyświetleń',
    },

    buttons: {
      create_article: 'Dodaj artykuł',
      report_hate_crime: 'Zgłoś mowę nienawiści',
    },

    sections: {
      articles: {
        title: 'Popularne artykuły',
      },

      tags: {
        title: 'Popularne tagi',
      },
    },
  },
};
