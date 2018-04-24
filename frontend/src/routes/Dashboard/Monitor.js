import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tooltip } from 'antd';
import numeral from 'numeral';
import { Pie, WaterWave, Gauge, TagCloud } from 'components/Charts';
import NumberInfo from 'components/NumberInfo';
import CountDown from 'components/CountDown';
import ActiveChart from 'components/ActiveChart';
import Authorized from '../../utils/Authorized';
import styles from './Monitor.less';

const { Secured } = Authorized;

const targetTime = new Date().getTime() + 3900000;

// use permission as a parameter
const havePermissionAsync = new Promise(resolve => {
  // Call resolve on behalf of passed
  setTimeout(() => resolve(), 1000);
});
@Secured(havePermissionAsync)
@connect(({ monitor, loading }) => ({
  monitor,
  loading: loading.models.monitor,
}))
export default class Monitor extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'monitor/fetchTags',
    });
  }

  render() {
    const { monitor, loading } = this.props;
    const { tags } = monitor;

    return (
      <Fragment>
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="本年度售前统计情况" bordered={false}>
              <Row>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle="POC总次数"
                    suffix="次"
                    total={numeral(7).format('0,0')}
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo subTitle="售前目标完成情况" total="70%" />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo subTitle="剩余任务" total="30%" />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle="本月支持人次"
                    suffix="人/次"
                    total={numeral(7).format('0,0')}
                  />
                </Col>
              </Row>
              <div className={styles.mapChart}>
                <Tooltip title="等待后期实现">
                  <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/HBWnDEUXCnGnGrRfrpKa.png"
                    alt="map"
                  />
                </Tooltip>
              </div>
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card title="POC情况预测" style={{ marginBottom: 24 }} bordered={false}>
              <ActiveChart />
            </Card>
            <Card
              title="本年任务完成效率"
              style={{ marginBottom: 24 }}
              bodyStyle={{ textAlign: 'center' }}
              bordered={false}
            >
              <Gauge title="完成率" height={180} percent={47} />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={18} lg={24} sm={24} xs={24}>
            <Card title="各区域任务完成占比" bordered={false} className={styles.pieCard}>
              <Row style={{ padding: '16px 0' }}>
                <Col span={8}>
                  <Pie
                    animate={false}
                    percent={28}
                    subTitle="东区事业部"
                    total="28%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#5DDECF"
                    percent={22}
                    subTitle="西部事业部"
                    total="22%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#2FC25B"
                    percent={32}
                    subTitle="南区事业部"
                    total="32%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>

                  <Col span={8}>
                      <Pie
                          animate={false}
                          percent={32}
                          subTitle="北区事业部"
                          total="32%"
                          height={128}
                          lineWidth={2}
                      />
                  </Col>
                  <Col span={8}>
                      <Pie
                          animate={false}
                          color="#5DDECF"
                          percent={78}
                          subTitle="开行事业部"
                          total="78%"
                          height={128}
                          lineWidth={2}
                      />
                  </Col>
                  <Col span={8}>
                      <Pie
                          animate={false}
                          color="#2FC25B"
                          percent={12}
                          subTitle="华夏事业部"
                          total="12"
                          height={128}
                          lineWidth={2}
                      />
                  </Col>

              </Row>
            </Card>
          </Col>

          <Col xl={6} lg={12} sm={24} xs={24}>
            <Card
              title="可支持人员资源"
              bodyStyle={{ textAlign: 'center', fontSize: 0 }}
              bordered={false}
            >
              <WaterWave height={161} title="人员剩余" percent={69} />
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
