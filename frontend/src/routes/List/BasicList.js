import React, {PureComponent} from 'react';
import moment from 'moment';
import {Link, Route, routerRedux} from 'dva/router';
import AdvancedProfile from '../Profile/AdvancedProfile';

import {connect} from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './BasicList.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const {Search} = Input;

@connect(({list, loading}) => ({
  list,
  loading: loading.models.list,
}))
export default class BasicList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
  };

  /**
   * 详情页面
   * @param {项目编号} id 
   */
  handleDispatchDtl(e,id) {
    this.props.dispatch(
      routerRedux.push({
        pathname: '/profile/advanced/',
        state: {
          id: id,
        },
      })
    );
  };

  render() {
    const {list: {list}, loading} = this.props;


    const Info = ({title, value, bordered}) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">进行中</RadioButton>
          <RadioButton value="waiting">等待中</RadioButton>
        </RadioGroup>
        <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})}/>
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const ListContent = ({data: {createBy, startDate, percent, status}}) => (

      // console.log(createBy),

      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Owner</span>
          <p>{createBy.zhName}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>开始时间</span>
          <p>{moment(startDate).format('YYYY-MM-DD HH:mm')}</p>
        </div>
        <div className={styles.listContentItem}>
          <Progress percent={percent} status={status} strokeWidth={6} style={{width: 180}}/>
        </div>
      </div>
    );

    // const menu = (
    //   <Menu>
    //     <Menu.Item>
    //       <a>编辑</a>
    //     </Menu.Item>
    //     <Menu.Item>
    //       <a>删除</a>
    //     </Menu.Item>
    //   </Menu>
    // );
    //
    // const MoreBtn = () => (
    //   <Dropdown overlay={menu}>
    //     <a>
    //       更多 <Icon type="down" />
    //     </a>
    //   </Dropdown>
    // );

    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="我的待办" value="0个任务" bordered/>
              </Col>
              <Col sm={8} xs={24}>
                <Info title="进行中的任务" value="0个任务" bordered/>
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周完成任务数" value="0个任务"/>
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="项目列表"
            style={{marginTop: 24}}
            bodyStyle={{padding: '0 32px 40px 32px'}}
            extra={extraContent}
          >
            <Link to='/form/basic-form'>
              <Button type="dashed" style={{width: '100%', marginBottom: 8}} icon="plus">
                添加
              </Button>
            </Link>
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={item => (
                <List.Item actions={[<a>编辑</a>, <a>删除</a>]}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.logo} shape="square" size="large" />}
                    title={<a onClick={e => this.handleDispatchDtl(e,item.id)}>{item.baseProject.name}</a>}
                    description={item.projectDesc}
                  />
                  <ListContent data={item}/>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
