
const FAKE_ARTICLE = [
  {
    id: 123,

    coverUrl: '//media.gettyimages.com/photos/lots-of-bad-news-picture-id185209990?s=612x612',
    coverTitle: 'Random leaflets',

    title: 'José Mujica Was Every Liberals Dream President. He Was Too Good to Be True.',
    lead: 'The disappointing tenure of Uruguay’s great lefty hope.',

    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum varius diam et fringilla. Praesent vel euismod massa. Quisque lacus ante, fringilla vel luctus nec, bibendum id lectus. Duis mattis lacus id egestas cursus. Nunc maximus, neque ac aliquam sollicitudin, tortor mi molestie est, et accumsan dolor ante ac ipsum. Etiam quis turpis placerat, semper velit in, elementum metus. Etiam tempor tortor nec dolor placerat, at tincidunt sapien elementum. Sed imperdiet felis et quam porttitor, id fringilla ante pulvinar. Curabitur imperdiet, nisl quis ullamcorper porttitor, neque urna...',
    commentsCount: 100,
    readTime: 10,

    bookmarked: true,
    tags: [
      {id: 1, name: 'animals'},
      {id: 2, name: 'monkeys'},
      {id: 3, name: 'humans'},
    ],
  },
  {
    id: 124,

    coverUrl: '//cdn-images-1.medium.com/max/2400/1*t-S4nACiwitCW5zZOckc4Q.jpeg',
    coverTitle: 'Random something',

    title: 'Three useful ways to die',
    lead: 'The disappointing tenure of Uruguay’s great lefty hope.',

    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum varius diam et fringilla. Praesent vel euismod massa. Quisque lacus ante, fringilla vel luctus nec, bibendum id lectus. Duis mattis lacus id egestas cursus. Nunc maximus, neque ac aliquam sollicitudin, tortor mi molestie est, et accumsan dolor ante ac ipsum. Etiam quis turpis placerat, semper velit in, elementum metus. Etiam tempor tortor nec dolor placerat, at tincidunt sapien elementum. Sed imperdiet felis et quam porttitor, id fringilla ante pulvinar. Curabitur imperdiet, nisl quis ullamcorper porttitor, neque urna...',
    commentsCount: 20,
    readTime: 15,

    bookmarked: true,
    tags: [
      {id: 1, name: 'tech'},
      {id: 2, name: 'shit'},
      {id: 3, name: 'facebook'},
    ],
  },
  {
    id: 125,

    coverUrl: '//cdn-images-1.medium.com/max/2560/1*ia6lYNABPwl5FmvBTz0qgA.jpeg',
    coverTitle: 'Random something',

    title: 'The Lost Battalion',
    lead: 'The disappointing tenure of Uruguay’s great lefty hope.',

    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum varius diam et fringilla. Praesent vel euismod massa. Quisque lacus ante, fringilla vel luctus nec, bibendum id lectus. Duis mattis lacus id egestas cursus. Nunc maximus, neque ac aliquam sollicitudin, tortor mi molestie est, et accumsan dolor ante ac ipsum. Etiam quis turpis placerat, semper velit in, elementum metus. Etiam tempor tortor nec dolor placerat, at tincidunt sapien elementum. Sed imperdiet felis et quam porttitor, id fringilla ante pulvinar. Curabitur imperdiet, nisl quis ullamcorper porttitor, neque urna...',
    commentsCount: 20,
    readTime: 5,

    bookmarked: true,
    tags: [
      {id: 1, name: 'tech'},
      {id: 2, name: 'shit'},
      {id: 3, name: 'facebook'},
    ],
  },
  {
    id: 126,

    coverUrl: '//assets.change.org/photos/7/qr/qz/DmQrqZSBflpDgLP-800x450-noPad.jpg?1548335223',
    coverTitle: 'MILOS',

    title: 'Some weird stuff',
    lead: 'The disappointing tenure of Uruguay’s great lefty hope.',

    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum varius diam et fringilla. Praesent vel euismod massa. Quisque lacus ante, fringilla vel luctus nec, bibendum id lectus. Duis mattis lacus id egestas cursus. Nunc maximus, neque ac aliquam sollicitudin, tortor mi molestie est, et accumsan dolor ante ac ipsum. Etiam quis turpis placerat, semper velit in, elementum metus. Etiam tempor tortor nec dolor placerat, at tincidunt sapien elementum. Sed imperdiet felis et quam porttitor, id fringilla ante pulvinar. Curabitur imperdiet, nisl quis ullamcorper porttitor, neque urna...',
    commentsCount: 20,
    readTime: 5,

    bookmarked: true,
    tags: [
      {id: 1, name: 'tech'},
      {id: 2, name: 'shit'},
      {id: 3, name: 'facebook'},
    ],
  },
  {
    id: 127,

    coverUrl: '//b2b-salesprospects.com/wp-content/uploads/2016/04/5-Weird-Habits-of-Successful-People.jpg',
    coverTitle: 'Wtf is this',

    title: 'How to eat snails',
    lead: 'The disappointing tenure of Uruguay’s great lefty hope.',

    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum varius diam et fringilla. Praesent vel euismod massa. Quisque lacus ante, fringilla vel luctus nec, bibendum id lectus. Duis mattis lacus id egestas cursus. Nunc maximus, neque ac aliquam sollicitudin, tortor mi molestie est, et accumsan dolor ante ac ipsum. Etiam quis turpis placerat, semper velit in, elementum metus. Etiam tempor tortor nec dolor placerat, at tincidunt sapien elementum. Sed imperdiet felis et quam porttitor, id fringilla ante pulvinar. Curabitur imperdiet, nisl quis ullamcorper porttitor, neque urna...',
    commentsCount: 20,
    readTime: 5,

    bookmarked: true,
    tags: [
      {id: 1, name: 'tech'},
      {id: 2, name: 'shit'},
      {id: 3, name: 'facebook'},
    ],
  },

  {
    id: 128,

    coverUrl: '//i.kym-cdn.com/entries/icons/original/000/001/420/977.jpg',
    coverTitle: 'Funny men',

    title: 'Billy Herrington / Gachimuchi | Know Your Meme',
    lead: 'The disappointing tenure of Uruguay’s great lefty hope.',

    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum varius diam et fringilla. Praesent vel euismod massa. Quisque lacus ante, fringilla vel luctus nec, bibendum id lectus. Duis mattis lacus id egestas cursus. Nunc maximus, neque ac aliquam sollicitudin, tortor mi molestie est, et accumsan dolor ante ac ipsum. Etiam quis turpis placerat, semper velit in, elementum metus. Etiam tempor tortor nec dolor placerat, at tincidunt sapien elementum. Sed imperdiet felis et quam porttitor, id fringilla ante pulvinar. Curabitur imperdiet, nisl quis ullamcorper porttitor, neque urna...',
    commentsCount: 20,
    readTime: 35,

    bookmarked: true,
    tags: [
      {id: 1, name: 'gachimuchi'},
      {id: 2, name: 'shit'},
      {id: 3, name: 'facebook'},
    ],
  },
];

export default FAKE_ARTICLE;
