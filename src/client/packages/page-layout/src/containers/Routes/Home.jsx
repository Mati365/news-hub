import React from 'react';

import styled from '@jss';
import {
  Container,
  Margin,
  Header,
} from '@utils/components';

import ArticleCard from '@client/core/components/Cards/ArticleCard';

const FAKE_ARTICLE = {
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
};

const LeadArticleContainer = styled.div(
  {
    display: 'grid',
    gridTemplateColumns: '30% 40% 30%',
    gridTemplateRows: '150px 150px 150px',
    gridTemplateAreas: `
      "big medium medium"
      "big small  tiny"
      "big small  tiny"
    `,
  },
);

const HomeRoute = () => (
  <Container>
    <Margin
      top={3}
      block
    >
      <Header.H1>
        Daily News
      </Header.H1>

      <LeadArticleContainer>
        <ArticleCard
          article={FAKE_ARTICLE}
          style={{
            gridArea: 'big',
          }}
        />
      </LeadArticleContainer>
    </Margin>
  </Container>
);

HomeRoute.displayName = 'HomeRoute';

export default HomeRoute;
