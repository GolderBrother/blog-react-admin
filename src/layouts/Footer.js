import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'Pro 首页',
          title: 'Pro 首页',
          href: 'https://github.com/GolderBrother/blog-react',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/GolderBrother/blog-react-admin',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Ant Design',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2017-{new Date().getFullYear()} GolderBrother. ICP证：闽ICP备19021195号
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
