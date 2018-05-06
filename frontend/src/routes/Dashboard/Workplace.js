import React, {PureComponent} from 'react';
import moment from 'moment';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {Row, Col, Card, List, Avatar} from 'antd';

import {Radar} from 'components/Charts';
import EditableLinkGroup from 'components/EditableLinkGroup';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import * as paramService from '../../services/param';
import * as apiService from '../../services/api';

import styles from './Workplace.less';

const links = [
  {
    title: '建立项目',
    href: '',
  },
  {
    title: '人员申请',
    href: '',
  },

];

const departments = [];

@connect(({project, activities, chart, loading}) => ({
  project,
  activities,
  chart,
  projectLoading: loading.effects['project/fetchNotice'],
  activitiesLoading: loading.effects['activities/fetchList'],
}))
export default class Workplace extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      departments: [],
      workInfos: {},
    };

  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'project/fetchNotice',
    });
    dispatch({
      type: 'activities/fetchList',
    });
    dispatch({
      type: 'chart/fetch',
    });


    paramService.getParamDtl().then((res) => {
      let department = res.department;
      // console.log(department);
      this.setState({
        departments: department,
      });
    });


    apiService.getWorkInfo().then((res) => {
      let workInfo = res;
      // console.log(workInfo);
      this.setState({
        workInfos: workInfo,
      });
    });
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  renderActivities() {
    const {activities: {list}} = this.props;
    return list.map(item => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
        // if (item[key]) {
        //   return (
        //     <a href={item[key].link} key={item[key].name}>
        //       {item[key].name}
        //     </a>
        //   );
        // }
        if (item[key]) {
          if ('project' == key) {
            return (
              <a href={item[key].link} key={(item[key].baseProject).name}>
                {(item[key].baseProject).name}
              </a>
            );
          } else {
            return (
              <a href={item[key].link} key={item[key].name}>
                {item[key].name}
              </a>
            );
          }
        }
        return key;
      });
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar}/>}
            title={
              <span>
                <a className={styles.username}>{item.user.zhName}</a>
                &nbsp;
                <span className={styles.event}>{events}</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.project.updateDate}>
                {moment(item.project.updateDate).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const {
      project: {notice},
      projectLoading,
      activitiesLoading,
      // departments : {departments},
      chart: {radarData},
    } = this.props;

    // console.log(this.state.workInfos.user);

    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar
            size="large"
            src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
          />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>Hi~，{this.state.workInfos.user ? this.state.workInfos.user.zhName : ''}，祝你开心每一天！</div>
          <div>{this.state.workInfos.user ? this.state.workInfos.user.jobTitle : ''} |
            金融SBU－{this.state.workInfos.user ? this.state.workInfos.user.department.name : ''}</div>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>项目总数</p>
          <p>{this.state.workInfos.projectCount}</p>
        </div>
        <div className={styles.statItem}>
          <p>本年项目比例</p>
          <p>
            {this.state.workInfos.projectCurrCount}<span> / {this.state.workInfos.projectCount}</span>
          </p>
        </div>
        <div className={styles.statItem}>
          <p>累计支持人次</p>
          <p>{this.state.workInfos.supporterCount}</p>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout content={pageHeaderContent} extraContent={extraContent}>
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{marginBottom: 24}}
              title="进行中的项目"
              bordered={false}
              extra={<Link to="/">全部项目</Link>}
              loading={projectLoading}
              bodyStyle={{padding: 0}}
            >
              {notice.map(item => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card bodyStyle={{padding: 0}} bordered={false}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={item.logo}/>
                          <Link to={item.href}>{item.projectName}</Link>
                        </div>
                      }
                      description={item.projectDesc}
                    />
                    <div className={styles.projectItemContent}>
                      <Link to={item.memberLink}>{item.departmentName || ''}</Link>
                      {item.updateDate && (
                        <span className={styles.datetime} title={item.updateDate}>
                          {moment(item.updateDate).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
            <Card
              bodyStyle={{padding: 0}}
              bordered={false}
              className={styles.activeCard}
              title="动态"
              loading={activitiesLoading}
            >
              <List loading={activitiesLoading} size="large">
                <div className={styles.activitiesList}>{this.renderActivities()}</div>
              </List>
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{marginBottom: 24}}
              title="快速开始 / 便捷导航"
              bordered={false}
              bodyStyle={{padding: 0}}
            >
              <EditableLinkGroup onAdd={() => {
              }} links={links} linkElement={Link}/>
            </Card>
            <Card
              style={{marginBottom: 24}}
              bordered={false}
              title="项目指数"
              loading={radarData.length === 0}
            >
              <div className={styles.chart}>
                <Radar hasLegend height={343} data={radarData}/>
              </div>
            </Card>
            <Card bodyStyle={{paddingTop: 12, paddingBottom: 12}} bordered={false} title="事业部">
              <div className={styles.members}>
                <Row gutter={48}>
                  {departments.map(item => (
                    <Col span={12} key={`members-item-${item.id}`}>
                      <Link to={item.link}>
                        <Avatar src={item.logo} size="small"/>
                        <span className={styles.member}>{item.title}</span>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
