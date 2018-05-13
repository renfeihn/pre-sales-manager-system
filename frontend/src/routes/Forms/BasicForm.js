import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Tooltip,
  Icon,
  Col,
  Row,
  TimePicker,
  Popover,
  Rate,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';
import FooterToolbar from 'components/FooterToolbar';
import TableForm from './TableForm';
import staticParam from '../../../mock/param';

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;


//const tableData = [];

@Form.create()
@connect(({param, user, loading}) => ({
  param,
  user,
  loading: loading.effects['param/fectchParam'],
  userloading: loading.effects['user/fetchList'],
}))
export default class BasicForms extends PureComponent {
  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar);
    this.props.dispatch({
      type: 'param/fectchParam',
    });
    this.props.dispatch({
      type: 'user/fetchList',
    });
  }

  state = {
    width: '100%',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('接收的值：', values);
        this.props.dispatch({
          type: 'form/submitProjectForm',
          payload: values,
        });


        // const response = yield call(fakeAccountLogin, payload);
        // yield put({
        //   type: 'changeLoginStatus',
        //   payload: response,
        // });
        // // Login successfully
        // if (response.status === 'ok') {
        //   reloadAuthorized();
        //   yield put(routerRedux.push('/'));
        // }
      }
    });
  };


  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  resizeFooterToolbar = () => {
    const sider = document.querySelectorAll('.ant-layout-sider')[0];
    const width = `calc(100% - ${sider.style.width})`;
    if (this.state.width !== width) {
      this.setState({width});
    }
  };

  render() {
    const {param, user, submitting} = this.props;
    const {getFieldDecorator, getFieldValue} = this.props.form;

    const {department, product, project} = param;
    const tableData = [];
    const listData = user.list;

    const productOption = product.map(d => <Option key={d.id}>{d.name}</Option>);
    const projectOption = project.map(d => <Option key={d.id}>{d.name}</Option>);
    const departmentOption = department.map(d => <Option key={d.id}>{d.name}</Option>);

    const isPocOption = staticParam.getParam.isPoc.map(d => <Option key={d.key}>{d.name}</Option>);
    const stateOption = staticParam.getParam.state.map(d => <Option key={d.key}>{d.name}</Option>);
    const solutionOption = staticParam.getParam.solution.map(d => <Option key={d.key}>{d.name}</Option>);
    const importanceOption = staticParam.getParam.importance.map(d => <Option key={d.key}>{d.name}</Option>);

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 10},
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 10, offset: 7},
      },
    };

    return (
      <PageHeaderLayout
        //title="项目申请"
        //content="请填写项目基本信息"
      >
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{marginTop: 8}}>

          <Card bordered={false} className={styles.card}>

            <FormItem {...formItemLayout} label="客户名称">
              {getFieldDecorator('clientName')
              (<Input placeholder="请填写客户名称" />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="项目名称">
              {getFieldDecorator('projectName', {
                rules: [
                  {
                    required: true,
                    message: '请填写项目名称',
                  },
                ],
              })(<Input placeholder="请填写项目名称" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="重要程度">
              {getFieldDecorator('importance', {
                rules: [
                  {
                    required: true,
                    message: '请选择重要程度',
                  },
                ],
              })(<Select placeholder="请选择重要程度">
                  {importanceOption}
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="所属事业部">
              {getFieldDecorator('departmentId', {
                rules: [
                  {
                    required: true,
                    message: '请输事业部名称',
                  },
                ],
              })(<Select placeholder="请选择事业部">
                  {departmentOption}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="客户经理">
              {getFieldDecorator('clientDirector')
              (<Input placeholder="请填写客户经理" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="产品线">
              {getFieldDecorator('productId', {
                rules: [
                  {
                    required: true,
                    message: '请选择产品线',
                  },
                ],
              })(<Select placeholder="请选择产品线">
                  {productOption}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="解决方案">
              {getFieldDecorator('solution', {
                rules: [
                  {
                    required: true,
                    message: '请输选择解决方案',
                  },
                ],
              })(<Select placeholder="请选择事业部">
                  {solutionOption}
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="模块">
              {getFieldDecorator('module')
              (<Input placeholder="请填写所属模块" />
              )}
            </FormItem>

            {/*
            <FormItem {...formItemLayout} label="模块">
              {getFieldDecorator('module', {
                rules: [
                  {
                    required: true,
                    message: '请选择模块',
                  },
                ],
              })(<Select placeholder="请选择所属模块">
                  {departmentOption}
                </Select>
              )}
            </FormItem>
            */}

            <FormItem {...formItemLayout} label="落单情况">
              {getFieldDecorator('state', {
                rules: [
                  {
                    required: true,
                    message: '请选择落单情况',
                  },
                ],
              })(<Select placeholder="请选择落单情况">
                  {stateOption}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="当前状态">
              {getFieldDecorator('stateDesc', {
                rules: [
                  {
                    required: true,
                    message: '请输入当前状态',
                  },
                ],
              })(
                <TextArea
                  style={{minHeight: 32}}
                  placeholder="请输入当前状态情况"
                  rows={4}
                />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="交流时间">
              {getFieldDecorator('swapDate')
              (<DatePicker style={{width: '100%'}} placeholder={'交流时间'}/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="交流人员">
              {getFieldDecorator('projectDesc')(
                <TextArea
                  style={{minHeight: 32}}
                  placeholder="请输入你交流人员"
                  rows={4}
                />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="初步预算（万元）">
              {getFieldDecorator('budget')
              (<Input placeholder="请填写初步预算" />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="是否POC">
              {getFieldDecorator('isPoc', {
                rules: [
                  {
                    required: true,
                    message: '请选择是否POC',
                  },
                ],
              })(<Select placeholder="请选择是否POC">
                  {isPocOption}
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="工作量初估（人月）">
              {getFieldDecorator('workload')
              (<Input placeholder="请填写工作量" />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="说明">
              {getFieldDecorator('remarks')(
                <TextArea
                  style={{minHeight: 32}}
                  placeholder="请填写项目说明"
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="提交资料情况">
              {getFieldDecorator('projectDesc')(
                <TextArea
                  style={{minHeight: 32}}
                  placeholder="请填写提交资料情况"
                  rows={4}
                />
              )}
            </FormItem>

            {/*
            <FormItem
              {...formItemLayout}
              label={
                <span>
                        中标率<em className={styles.optional}></em>
                        </span>
              }
            >
              {getFieldDecorator('bidRatio')(<Rate allowHalf defaultValue={2.5}/>)}

            </FormItem>
            */}

          </Card>

          <Card title="支持人员" bordered={false}>
            {getFieldDecorator('supporters', {
              initialValue: tableData,
            })(<TableForm />)}
          </Card>

          <FooterToolbar style={{width: this.state.width}}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              提交
            </Button>
          </FooterToolbar>

        </Form>
      </PageHeaderLayout>
    );
  }
}
