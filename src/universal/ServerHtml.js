// @flow

import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';

export default class ServerHtml extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    assets: PropTypes.object.isRequired,
    component: PropTypes.node.isRequired,
    store: PropTypes.object.isRequired,
  };

  render() {
    const {assets, component, store, language} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();
    const data = `window.__data=${serialize(store.getState())};`;
    const init = `${data}`;
    const css = require('universal/common/components/AppContainer/AppContainer.scss');

    return (
      <html lang={language}>

        <body>
          <div className={css.MainContentWrapper} id="content" dangerouslySetInnerHTML={{__html: content}} />
        </body>
      </html>
    );
  }
}
