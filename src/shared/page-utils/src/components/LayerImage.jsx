import styled from '@jss';

import fullLayerStyle from '../styles/fullLayer';

const LayerImage = styled.img(
  {
    extend: fullLayerStyle,
    objectFit: 'cover',
  },
);

LayerImage.displayName = 'LayerImage';

export default LayerImage;
