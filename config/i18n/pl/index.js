const WEBSITE_NAME = 'Codzienni Żydzi';

module.exports = {
  website: {
    markdown_editor: {
      write: 'Edytuj',
      preview: 'Podgląd',
    },

    info: {
      name: WEBSITE_NAME,
      copyrights: `© 2019 ${WEBSITE_NAME}, LLC`,
    },

    titles: {
      loading: 'Wczytywanie...',
      error: 'Nastąpił błąd podczas parsowania zapytania!',

      search: 'Wyszukaj',
      see_also: 'Zobacz też...',

      images: {
        figcaption: 'rys. %{}',
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

    routes: {
      create_article: {
        submit: 'Dodaj artykuł!',

        add_link: 'Dodaj link',
        add_article: 'Napisz artykuł',

        page_url_label: 'Link do strony:',
        paste_url_placeholder: 'Wklej dodawany adres URL',
        edit_article: 'Edytuj artykuł:',

        card_preview: 'Podgląd edytowanej karty:',
        card_lead: '* Opis karty:',
        modify_title: '* Nagłówek artykułu:',
        modify_info: 'Treść artykułu (jeśli pusta to użyta będzie treść nagłówka karty):',
        cover_url: '* URL okładki artykułu:',
        cover_title: 'Tytuł okładki:',
        article_tags: 'Tagi artykułu:',

        crawler_info: {
          website_box_title: 'Informacje o pobranej stronie:',
          tags: 'Tagi strony:',
          title: 'Tytuł strony:',
          description: 'Opis strony:',
        },
      },
    },
  },
};
