const WEBSITE_NAME = 'Daily Jews';

module.exports = {
  website: {
    placeholders: {
      enter_tag: 'Type tag...',
    },

    toasts: {
      website_has_been_added: 'Article has been added!',
    },

    markdown_editor: {
      write: 'Edit',
      preview: 'Preview',
    },

    info: {
      name: WEBSITE_NAME,
      copyrights: `© 2019 ${WEBSITE_NAME}, LLC`,
    },

    titles: {
      loading: 'Loading...',
      error: 'Error during request parse!',

      search: 'Loading',
      see_also: 'See also »',

      images: {
        figcaption: 'pic. %{}',
      },

      links: {
        see_more: 'See more »',
        read_more: 'Read more »',
      },
    },

    article: {
      read_time: '%{} min.',
      comments_count: '%{} comments',
      bookmark: 'Bookmark',
      edit: 'Edit',
      likes: '%{} like',
      views: '%{} views',
    },

    buttons: {
      create_article: 'Add article',
      edit_article: 'Edit article',

      report_hate_crime: 'Report crime',
    },

    sections: {
      recent: {
        title: 'Recently added',
      },

      articles: {
        title: 'Popular articles',
      },

      tags: {
        title: 'Popular tags',
      },

      editor: {
        title: 'Edit article',
      },

      tag_articles: {
        title: 'Articles with tag %{}:',
      },
    },

    routes: {
      create_article: {
        submit: 'Publish article!',
        saving: 'Saving article',
        editing: 'Save changes in article!',

        add_link: 'Add link',
        add_article: 'Write article',

        page_url_label: 'Website URL:',
        paste_url_placeholder: 'Paste website URL',
        edit_article: 'Edit article:',

        delete: 'Delete article',
        deleting: 'Deleting article...',

        card_preview: 'Editing card preview:',
        card_lead: '* Card description:',
        modify_title: '* Article header:',
        modify_info: 'Article content (article card info will be used if empty):',
        cover_url: '* Article cover URL:',
        cover_title: 'Cover title:',
        article_tags: 'Article tags:',

        expand_preview: 'Expand full preview',
        collapse_preview: 'Collapse full preview',
        article_full_preview: 'Full article preview:',

        crawler_info: {
          website_box_title: 'Information about fetched article:',
          tags: 'Website tags:',
          title: 'Website title:',
          description: 'Website description:',
        },
      },
    },
  },
};
