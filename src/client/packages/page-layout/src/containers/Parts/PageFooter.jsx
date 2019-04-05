import React from 'react';

import {useI18n} from '@i18n';
import {
  Margin,
  Divider,
  Flex,
} from '@utils/components';

const PageFooter = () => {
  const t = useI18n();

  return (
    <>
      <Divider spacing='big' />

      <footer>
        <Margin
          top={4}
          block
        >
          <Flex
            direction='row'
            align='center'
          >
            <Margin left='auto'>
              {t('website.info.copyrights')}
            </Margin>
          </Flex>
        </Margin>
      </footer>
    </>
  );
};

PageFooter.displayName = 'PageFooter';

export default React.memo(PageFooter);
