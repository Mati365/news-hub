const WEBSITE_NAME = 'Codzienni Żydzi';

module.exports = {
  website: {
    placeholders: {
      enter_tag: 'Wpisz tag...',
    },

    toasts: {
      website_has_been_added: 'Artykuł został dodany. Wkrótce pojawi się na stronie!',
    },

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
      see_also: 'Zobacz też »',

      images: {
        figcaption: 'rys. %{}',
      },

      links: {
        see_more: 'Zobacz więcej »',
        read_more: 'Czytaj więcej»',
      },
    },

    article: {
      read_time: '%{} min.',
      comments_count: '%{} opinii',
      bookmark: 'Zakładka',
      edit: 'Edytuj',
      likes: '%{} like',
      views: '%{} wizyt',
    },

    buttons: {
      create_article: 'Dodaj artykuł',
      edit_article: 'Edytuj artykuł',

      report_hate_crime: 'Zgłoś incydent',
    },

    sections: {
      recent: {
        title: 'Ostatnio dodane',
      },

      articles: {
        title: 'Popularne artykuły',
      },

      tags: {
        title: 'Popularne tagi',
      },

      editor: {
        title: 'Edycja artykułu',
      },

      tag_articles: {
        title: 'Artykuły z tagiem %{}:',
      },
    },

    routes: {
      create_article: {
        submit: 'Dodaj artykuł!',
        saving: 'Zapisywanie artykułu',
        editing: 'Zapisz zmiany w artykule!',

        add_link: 'Dodaj link',
        add_article: 'Napisz artykuł',

        page_url_label: 'Link do strony:',
        paste_url_placeholder: 'Wklej dodawany adres URL',
        edit_article: 'Edytuj artykuł:',

        delete: 'Usuń artykuł',
        deleting: 'Usuwanie artykułu...',

        card_preview: 'Podgląd edytowanej karty:',
        card_lead: '* Opis karty:',
        modify_title: '* Nagłówek artykułu:',
        modify_info: 'Treść artykułu (jeśli pusta to użyta będzie treść nagłówka karty):',
        cover_url: '* URL okładki artykułu:',
        cover_title: 'Tytuł okładki:',
        article_tags: 'Tagi artykułu:',

        expand_preview: 'Rozwiń pełen podgląd',
        collapse_preview: 'Zwiń pełen podgląd',
        article_full_preview: 'Pełen podgląd artykułu:',

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
