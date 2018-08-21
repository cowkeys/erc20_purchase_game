import React from 'react';
import { Tabs } from 'antd';
import {connect} from "dva/index";
import MainPanel from './MainPanel';
import GameContract from './GameContract';
import TokenContract from './TokenContract';

const TabPane = Tabs.TabPane;


function callback(key) {
  console.log(key);
}

const Example = () => {
  return (
    <div>
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="main" key="1">
        <MainPanel/>
      </TabPane>
      <TabPane tab="游戏测试合约" key="2" style={{ textAlign: 'left'}}>
        <GameContract/>
      </TabPane>
      <TabPane tab="代币测试合约" key="3" style={{ textAlign: 'left'}}>
        <TokenContract/>
      </TabPane>
    </Tabs>
    </div>
  );
};

Example.propTypes = {
};

export default connect()(Example);
