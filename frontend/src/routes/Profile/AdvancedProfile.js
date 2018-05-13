import React, {Component, Fragment} from 'react';
import Debounce from 'lodash-decorators/debounce';
import moment from 'moment';
import Bind from 'lodash-decorators/bind';
import {connect} from 'dva';
import {
  Button,
  Menu,
  Dropdown,
  Icon,
  Row,
  Col,
  Steps,
  Card,
  Popover,
  Badge,
  Table,
  Tooltip,
  Divider,
} from 'antd';
import classNames from 'classnames';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './AdvancedProfile.less';
import staticParam from '../../../mock/param';


const {Step} = Steps;
const {Description} = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;

const menu = (
  <Menu>
    <Menu.Item key="1">选项一</Menu.Item>
    <Menu.Item key="2">选项二</Menu.Item>
    <Menu.Item key="3">选项三</Menu.Item>
  </Menu>
);

// const action = (
//   <Fragment>
//     <Button type="primary">通过</Button>
//     <Button>驳回</Button>
//   </Fragment>
// );


const tabList = [
  {
    key: 'detail',
    tab: '详情',
  },
];


const desc2 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      周毛毛
      <Icon type="dingding-o" style={{marginLeft: 8}}/>
    </Fragment>
    <div>2017-10-04 10:24</div>
  </div>
);

const desc3 = (
  <div className={styles.stepDescription}>
    <Fragment>
      林东东
      <Icon type="dingding-o" style={{color: '#00A0E9', marginLeft: 8}}/>
    </Fragment>
    <div>
      <a href="">催一下</a>
    </div>
  </div>
);

const popoverContent = '';
// const popoverContent = (
//   <div style={{width: 160}}>
//     吴加号
//     <span className={styles.textSecondary} style={{float: 'right'}}>
//       <Badge status="default" text={<span style={{color: 'rgba(0, 0, 0, 0.45)'}}>未响应</span>}/>
//     </span>
//     <div className={styles.textSecondary} style={{marginTop: 4}}>
//       耗时：2小时25分钟
//     </div>
//   </div>
// );

const customDot = (dot, {status}) =>
  status === 'process' ? (
      <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
        {dot}
      </Popover>
    ) : (
      dot
    );

const operationTabList = [
  {
    key: 'tab1',
    tab: '操作日志',
  },
];


const operationTabList1 = [
  {
    key: 'tab1',
    tab: '申请支持人员',
  },
];

const columns = [
  {
    title: '操作类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '操作人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '执行结果',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      text === 'agree' ? (
          <Badge status="success" text="成功"/>
        ) : (
          <Badge status="error" text="驳回"/>
        ),
  },
  {
    title: '操作时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo',
  },
];


const columns1 = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '级别',
    dataIndex: 'jobTitle',
    key: 'jobTitle',
  },
  {
    title: '所属部门',
    dataIndex: 'departmentName',
    key: 'departmentName',
  },
];

@connect(({profile, loading}) => ({
  profile,
  loading: loading.effects['profile/fetchAdvanced'],
}))
export default class AdvancedProfile extends Component {
  state = {
    operationkey: 'tab1',
    stepDirection: 'horizontal',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'profile/fetchAdvanced',
      payload: {
        id: this.props.location.state ? this.props.location.state.id : '-1',
      },
    });

    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
    this.setStepDirection.cancel();
  }

  onOperationTabChange = key => {
    this.setState({operationkey: key});
  };

  @Bind()
  @Debounce(200)
  setStepDirection() {
    const {stepDirection} = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  };

  getProjectName(project) {
    let name = '';
    if (null != project && undefined != project) {
      if (null != project.baseProject && undefined != project.baseProject) {
        name = project.baseProject.name;
      }
    }
    return name;
  };

  getValue(key, array) {
    let value;

    for (let i in array) {
      if (array[i].key == key) {
        value = array[i].name;
        break;
      }
    }

    return value;
  }

  render() {
    const {stepDirection} = this.state;
    const {profile, loading} = this.props;
    const {advancedOperation1, advancedOperation2, advancedOperation3, project, supporters} = profile;

    // console.log('project: '+project);
    // console.log('supporters: '+supporters);
    // console.log(project.baseProject);

    // const projectName = this.getProjectName(project);

    const extra = (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>落单情况</div>
          <div className={styles.heading}>{this.getValue(project.state, staticParam.getParam.state)}</div>
        </Col>
      </Row>
    );

    const description = (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="创建人">{ project.createBy ? project.createBy.zhName : ''}</Description>
        <Description term="事业部">{project.department ? project.department.name : ''}</Description>
        <Description
          term="创建时间">{moment(project.createDate ? project.createDate : 0).format('YYYY-MM-DD HH:mm')}</Description>
        <Description term="生效日期">{project.startDate} ~ {project.endDate}</Description>
        <Description term="项目信息">{project.projectDesc}</Description>
        <Description term="备注">{project.remarks}</Description>
      </DescriptionList>
    );


    const desc1 = (
      <div className={classNames(styles.textSecondary, styles.stepDescription)}>
        <Fragment>
          { project.createBy ? project.createBy.zhName : ''}
          <Icon type="dingding-o" style={{marginLeft: 8}}/>
        </Fragment>
        <div>{moment(project.createDate ? project.createDate : 0).format('YYYY-MM-DD HH:mm')}</div>
      </div>
    );

    const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      tab2: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation2}
          columns={columns}
        />
      ),
      tab3: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation3}
          columns={columns}
        />
      ),
    };

    const contentList1 = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={supporters}
          columns={columns1}
        />
      ),
    };

    return (
      <PageHeaderLayout
        title={project.projectName}
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"/>
        }
        content={description}
        extraContent={extra}
        tabList={tabList}
      >
        <Card title="流程进度" style={{marginBottom: 24}} bordered={false}>
          <Steps direction={stepDirection} progressDot={customDot} current={project.state ? 0 : project.state}>
            <Step title="创建项目" description={desc1}/>
            <Step title="POC进行中"/>
            <Step title="完成"/>
          </Steps>
        </Card>


        <Card
          className={styles.tabsCard}
          bordered={false}
          tabList={operationTabList1}
          onTabChange={this.onOperationTabChange}
        >
          {contentList1[this.state.operationkey]}
        </Card>

        <Card
          className={styles.tabsCard}
          bordered={false}
          tabList={operationTabList}
          onTabChange={this.onOperationTabChange}
        >
          {contentList[this.state.operationkey]}
        </Card>

      </PageHeaderLayout>
    );
  }
}
