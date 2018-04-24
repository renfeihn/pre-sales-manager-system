import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {
    Row,
    Col,
    Icon,
    Card,
    Tabs,
    Table,
    Radio,
    DatePicker,
    Tooltip,
    Menu,
    Dropdown,
} from 'antd';
import numeral from 'numeral';
import {
    ChartCard,
    yuan,
    MiniArea,
    MiniBar,
    MiniProgress,
    Field,
    Bar,
    Pie,
    TimelineChart,
} from 'components/Charts';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import {getTimeDistance} from '../../utils/utils';

import styles from './Analysis.less';

const {TabPane} = Tabs;
const {RangePicker} = DatePicker;

const rankingListData = [];
// for (let i = 0; i < 7; i += 1) {
rankingListData.push({
    title: `北区事业部`,
    total: 15734,
});
rankingListData.push({
    title: `东区事业部`,
    total: 11764,
});
rankingListData.push({
    title: `南区事业部`,
    total: 9826,
});
rankingListData.push({
    title: `西区事业部`,
    total: 8790,
});
rankingListData.push({
    title: `东北事业部`,
    total: 2546,
});
rankingListData.push({
    title: `开行事业部`,
    total: 2014,
});
rankingListData.push({
    title: `华夏事业部`,
    total: 1086,
});
// }


const rankingListData1 = [];
// for (let i = 0; i < 7; i += 1) {
rankingListData1.push({
    title: `北区事业部`,
    total: 43,
});
rankingListData1.push({
    title: `东区事业部`,
    total: 65,
});
rankingListData1.push({
    title: `南区事业部`,
    total: 47,
});
rankingListData1.push({
    title: `西区事业部`,
    total: 23,
});
rankingListData1.push({
    title: `国开行事业部`,
    total: 8,
});
rankingListData1.push({
    title: `XX事业部`,
    total: 36,
});
rankingListData1.push({
    title: `XX事业部`,
    total: 16,
});
// }


@connect(({chart, loading}) => ({
    chart,
    loading: loading.effects['chart/fetch'],
}))
export default class Analysis extends Component {
    state = {
        salesType: 'all',
        currentTabKey: '',
        rangePickerValue: getTimeDistance('year'),
    };

    componentDidMount() {
        this.props.dispatch({
            type: 'chart/fetch',
        });
    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'chart/clear',
        });
    }

    handleChangeSalesType = e => {
        this.setState({
            salesType: e.target.value,
        });
    };

    handleTabChange = key => {
        this.setState({
            currentTabKey: key,
        });
    };

    handleRangePickerChange = rangePickerValue => {
        this.setState({
            rangePickerValue,
        });

        this.props.dispatch({
            type: 'chart/fetchSalesData',
        });
    };

    selectDate = type => {
        this.setState({
            rangePickerValue: getTimeDistance(type),
        });

        this.props.dispatch({
            type: 'chart/fetchSalesData',
        });
    };

    isActive(type) {
        const {rangePickerValue} = this.state;
        const value = getTimeDistance(type);
        if (!rangePickerValue[0] || !rangePickerValue[1]) {
            return;
        }
        if (
            rangePickerValue[0].isSame(value[0], 'day') &&
            rangePickerValue[1].isSame(value[1], 'day')
        ) {
            return styles.currentDate;
        }
    }

    render() {
        const {rangePickerValue, salesType, currentTabKey} = this.state;
        const {chart, loading} = this.props;
        const {
            visitData,
            visitData2,
            salesData,
            searchData,
            offlineData,
            offlineChartData,
            salesTypeData,
            salesTypeDataOnline,
            salesTypeDataOffline,
        } = chart;

        const salesPieData =
            salesType === 'all'
                ? salesTypeData
                : salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;

        const menu = (
            <Menu>
                <Menu.Item>操作一</Menu.Item>
                <Menu.Item>操作二</Menu.Item>
            </Menu>
        );

        const iconGroup = (
            <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis"/>
        </Dropdown>
      </span>
        );

        const salesExtra = (
            <div className={styles.salesExtraWrap}>
                <div className={styles.salesExtra}>
                    <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
                        今日
                    </a>
                    <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
                        本周
                    </a>
                    <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
                        本月
                    </a>
                    <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
                        全年
                    </a>
                </div>
                <RangePicker
                    value={rangePickerValue}
                    onChange={this.handleRangePickerChange}
                    style={{width: 256}}
                />
            </div>
        );

        const columns = [
            {
                title: '排名',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: '姓名',
                dataIndex: 'keyword',
                key: 'keyword',
                render: text => <a href="/">{text}</a>,
            },
            {
                title: '支持次数',
                dataIndex: 'count',
                key: 'count',
                sorter: (a, b) => a.count - b.count,
                className: styles.alignRight,
            },
            {
                title: '月涨幅',
                dataIndex: 'range',
                key: 'range',
                sorter: (a, b) => a.range - b.range,
                render: (text, record) => (
                    <Trend flag={record.status === 1 ? 'down' : 'up'}>
                        <span style={{marginRight: 4}}>{text}%</span>
                    </Trend>
                ),
                align: 'right',
            },
        ];

        const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);

        const CustomTab = ({data, currentTabKey: currentKey}) => (
            <Row gutter={8} style={{width: 138, margin: '8px 0'}}>
                <Col span={12}>
                    <NumberInfo
                        title={data.name}
                        subTitle="完成率"
                        gap={2}
                        total={`${data.cvr * 100}%`}
                        theme={currentKey !== data.name && 'light'}
                    />
                </Col>
                <Col span={12} style={{paddingTop: 36}}>
                    <Pie
                        animate={false}
                        color={currentKey !== data.name && '#BDE4FF'}
                        inner={0.55}
                        tooltip={false}
                        margin={[0, 0, 0, 0]}
                        percent={data.cvr * 100}
                        height={64}
                    />
                </Col>
            </Row>
        );

        const topColResponsiveProps = {
            xs: 24,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 6,
            style: {marginBottom: 24},
        };

        return (
            <Fragment>
                <Row gutter={24}>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="总销售额"
                            action={
                                <Tooltip title="指标说明">
                                    <Icon type="info-circle-o"/>
                                </Tooltip>
                            }
                            total={() => <span dangerouslySetInnerHTML={{__html: yuan(126560)}}/>}
                            footer={<Field label="月均销售额" value={`￥${numeral(12423).format('0,0')}`}/>}
                            contentHeight={46}
                        >
                            <Trend flag="up" style={{marginRight: 16}}>
                                月同比<span className={styles.trendText}>12%</span>
                            </Trend>
                            <Trend flag="down">
                                月环比<span className={styles.trendText}>11%</span>
                            </Trend>
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="POC项目总数"
                            action={
                                <Tooltip title="指标说明">
                                    <Icon type="info-circle-o"/>
                                </Tooltip>
                            }
                            total={numeral(103).format('0,0')}
                            footer={<Field label="本年度POC次数" value={numeral(6).format('0,0')}/>}
                            contentHeight={46}
                        >
                            <MiniArea color="#975FE4" data={visitData}/>
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="支持总人次数"
                            action={
                                <Tooltip title="指标说明">
                                    <Icon type="info-circle-o"/>
                                </Tooltip>
                            }
                            total={numeral(131).format('0,0')}
                            footer={<Field label="本年支持人次数" value="17"/>}
                            contentHeight={46}
                        >
                            <MiniBar data={visitData}/>
                        </ChartCard>
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="年度任务完成进度"
                            action={
                                <Tooltip title="指标说明">
                                    <Icon type="info-circle-o"/>
                                </Tooltip>
                            }
                            total="78%"
                            footer={
                                <div style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                    <Trend flag="up" style={{marginRight: 16}}>
                                        周同比<span className={styles.trendText}>12%</span>
                                    </Trend>
                                    <Trend flag="down">
                                        月环比<span className={styles.trendText}>7%</span>
                                    </Trend>
                                </div>
                            }
                            contentHeight={46}
                        >
                            <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2"/>
                        </ChartCard>
                    </Col>
                </Row>

                <Card loading={loading} bordered={false} bodyStyle={{padding: 0}}>
                    <div className={styles.salesCard}>
                        <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{marginBottom: 24}}>
                            <TabPane tab="销售额" key="sales">
                                <Row>
                                    <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                                        <div className={styles.salesBar}>
                                            <Bar height={295} title="销售额趋势" data={salesData}/>
                                        </div>
                                    </Col>
                                    <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                                        <div className={styles.salesRank}>
                                            <h4 className={styles.rankingTitle}>事业部销售额(万元)</h4>
                                            <ul className={styles.rankingList}>
                                                {rankingListData.map((item, i) => (
                                                    <li key={item.title}>
                                                        <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                                                        <span>{item.title}</span>
                                                        <span>{numeral(item.total).format('0,0')}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="人员支持数" key="views">
                                <Row>
                                    <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                                        <div className={styles.salesBar}>
                                            <Bar height={292} title="支持人次趋势" data={salesData}/>
                                        </div>
                                    </Col>
                                    <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                                        <div className={styles.salesRank}>
                                            <h4 className={styles.rankingTitle}>事业部POC人员支持总人次</h4>
                                            <ul className={styles.rankingList}>
                                                {rankingListData1.map((item, i) => (
                                                    <li key={item.title}>
                                                        <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                                                        <span>{item.title}</span>
                                                        <span>{numeral(item.total).format('0,0')}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </div>
                </Card>

                <Row gutter={24}>
                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            loading={loading}
                            bordered={false}
                            title="POC支持人次"
                            extra={iconGroup}
                            style={{marginTop: 24}}
                        >
                            <Row gutter={68}>
                                <Col sm={12} xs={24} style={{marginBottom: 24}}>
                                    <NumberInfo
                                        subTitle={
                                            <span>
                        POC累计支持总人次
                        <Tooltip title="指标文案">
                          <Icon style={{marginLeft: 8}} type="info-circle-o"/>
                        </Tooltip>
                      </span>
                                        }
                                        gap={8}
                                        total={numeral(231).format('0,0')}
                                    />
                                    <MiniArea line height={45} data={visitData2}/>
                                </Col>
                                <Col sm={12} xs={24} style={{marginBottom: 24}}>
                                    <NumberInfo
                                        subTitle="月平均次数"
                                        total={6}
                                        status="up"
                                        subTotal={10.2}
                                        gap={8}
                                    />
                                    <MiniArea line height={45} data={visitData2}/>
                                </Col>
                            </Row>
                            <Table
                                rowKey={record => record.index}
                                size="small"
                                columns={columns}
                                dataSource={searchData}
                                pagination={{
                                    style: {marginBottom: 0},
                                    pageSize: 5,
                                }}
                            />
                        </Card>
                    </Col>
                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            loading={loading}
                            className={styles.salesCard}
                            bordered={false}
                            title="事业部支持人次占比"
                            bodyStyle={{padding: 24}}
                            extra={
                                <div className={styles.salesCardExtra}>
                                    {iconGroup}
                                    <div className={styles.salesTypeRadio}>
                                        <Radio.Group value={salesType} onChange={this.handleChangeSalesType}>
                                            <Radio.Button value="all">累计占比</Radio.Button>
                                            <Radio.Button value="online">2018</Radio.Button>
                                            <Radio.Button value="offline">2017</Radio.Button>
                                        </Radio.Group>
                                    </div>
                                </div>
                            }
                            style={{marginTop: 24, minHeight: 509}}
                        >
                            <h4 style={{marginTop: 8, marginBottom: 32}}>人次占比</h4>
                            <Pie
                                hasLegend
                                subTitle="人次占比"
                                total={() => (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: yuan(salesPieData.reduce((pre, now) => now.y + pre, 0)),
                                        }}
                                    />
                                )}
                                data={salesPieData}
                                valueFormat={val => <span dangerouslySetInnerHTML={{__html: yuan(val)}}/>}
                                height={248}
                                lineWidth={4}
                            />
                        </Card>
                    </Col>
                </Row>


                <Card
                    loading={loading}
                    className={styles.offlineCard}
                    bordered={false}
                    bodyStyle={{ padding: '0 0 32px 0' }}
                    style={{ marginTop: 32 }}
                >
                    <Tabs activeKey={activeKey} onChange={this.handleTabChange}>
                        {offlineData.map(shop => (
                            <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey} />} key={shop.name}>
                                <div id="mountNode" style={{ padding: '0 24px' }}>
                                    <TimelineChart
                                        height={400}
                                        data={offlineChartData}
                                        titleMap={{ y1: '销售额', y2: '利润' }}
                                    />
                                </div>
                            </TabPane>
                        ))}
                    </Tabs>
                </Card>
            </Fragment>
        );
    }
}
