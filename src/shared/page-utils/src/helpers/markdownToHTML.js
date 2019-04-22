import * as Showdown from 'showdown';

export const converter = new Showdown.Converter(
  {
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  },
);

const markdownToHTML = html => converter.makeHtml(html);

export default markdownToHTML;
