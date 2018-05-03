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
            <FormItem {...formItemLayout} label="项目名称">
              {getFieldDecorator('projectName', {
                rules: [
                  {
                    required: true,
                    message: '请选择项目名称',
                  },
                ],
              })(<Select placeholder="请选择项目">
                  {projectOption}
                </Select>
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
            <FormItem {...formItemLayout} label="起止日期">
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: '请选择起止日期',
                  },
                ],
              })(<RangePicker style={{width: '100%'}} placeholder={['开始日期', '结束日期']}/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="目标描述">
              {getFieldDecorator('projectDesc', {
                rules: [
                  {
                    required: true,
                    message: '请输入项目描述',
                  },
                ],
              })(
                <TextArea
                  style={{minHeight: 32}}
                  placeholder="请输入你的项目的基本描述"
                  rows={4}
                />
              )}
            </FormItem>


            <FormItem
              {...formItemLayout}
              label={
                <span>
                        中标率<em className={styles.optional}></em>
                        </span>
              }
            >
              {/*getFieldDecorator('weight')(<InputNumber placeholder="请输入" min={0} max={100}/>)*/} {/*<span>%</span>*/}
              {getFieldDecorator('rate')(<Rate allowHalf defaultValue={2.5}/>)}

            </FormItem>

          </Card>

          <Card title="人员申请" bordered={false}>
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
