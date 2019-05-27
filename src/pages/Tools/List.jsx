import React, { Component } from 'react';
import { Tabs,Icon } from 'antd';
import Age from '@/pages/Tools/components/Age';
import Bmi from '@/pages/Tools/components/Bmi';
import House from '@/pages/Tools/components/House';
import Salary from '@/pages/Tools/components/Salary';
import "./List.less";
const TabPane = Tabs.TabPane;
export default class ToolsList extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="toolsbox">
                <Tabs defaultActiveKey="2">
                    <TabPane tab={<span><Icon type="apple" />age</span>} key="1">
                        <Age />
                    </TabPane>
                    <TabPane tab={<span><Icon type="android"/>Bmi</span>} key="2">
                        <Bmi />
                    </TabPane>
                    <TabPane tab={<span><Icon type="apple" />House</span>} key="3">
                        <House />
                    </TabPane>
                    <TabPane tab={<span><Icon type="android"/>Salary</span>} key="4">
                        <Salary />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}