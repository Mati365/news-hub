import React from 'react';

import {
  Container,
  Margin,
  Grid,
  Header,
} from '@utils/components';

import ArticleCard from '@client/core/components/Cards/ArticleCard';

const FAKE_ARTICLE = {
  id: 123,

  coverUrl: '//media.gettyimages.com/photos/lots-of-bad-news-picture-id185209990?s=612x612',
  coverTitle: 'rys. randomowych gazet',

  title: 'José Mujica Was Every Liberals Dream President. He Was Too Good to Be True.',
  lead: 'The disappointing tenure of Uruguay’s great lefty hope.',

  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum varius diam et fringilla. Praesent vel euismod massa. Quisque lacus ante, fringilla vel luctus nec, bibendum id lectus. Duis mattis lacus id egestas cursus. Nunc maximus, neque ac aliquam sollicitudin, tortor mi molestie est, et accumsan dolor ante ac ipsum. Etiam quis turpis placerat, semper velit in, elementum metus. Etiam tempor tortor nec dolor placerat, at tincidunt sapien elementum. Sed imperdiet felis et quam porttitor, id fringilla ante pulvinar. Curabitur imperdiet, nisl quis ullamcorper porttitor, neque urna...',
  commentsCount: 100,
  readTime: 10,

  tags: [
    {id: 1, name: 'polityka'},
    {id: 2, name: 'ludzie'},
    {id: 3, name: 'zwierzęta'},
  ],
};

const HomeRoute = () => (
  <Container>
    <Margin
      top={3}
      block
    >
      <Header.H3>
        Daily News
      </Header.H3>

      <Grid>
        <Grid.Column xs={4}>
          <ArticleCard article={FAKE_ARTICLE} />
        </Grid.Column>
      </Grid>
    </Margin>
  </Container>
);

HomeRoute.displayName = 'HomeRoute';

export default HomeRoute;
