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
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';
import FooterToolbar from 'components/FooterToolbar';
import TableForm from './TableForm';

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;


const tableData = [
    {
        key: '1',
        workId: '01010279',
        name: '任飞',
        department: '业务解决方案部',
    },
    {
        key: '2',
        workId: '01010798',
        name: '袁靖鹏',
        department: '产品中心',
    },
    {
        key: '3',
        workId: '01008765',
        name: '加鑫',
        department: '产品中心',
    },
];

@connect(({loading}) => ({
    submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
    state = {
        width: '100%',
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'form/submitRegularForm',
                    payload: values,
                });
            }
        });
    };

    componentDidMount() {
        window.addEventListener('resize', this.resizeFooterToolbar);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeFooterToolbar);
    }
    resizeFooterToolbar = () => {
        const sider = document.querySelectorAll('.ant-layout-sider')[0];
        const width = `calc(100% - ${sider.style.width})`;
        if (this.state.width !== width) {
            this.setState({ width });
        }
    };

    render() {
        const {submitting} = this.props;
        const {getFieldDecorator, getFieldValue} = this.props.form;

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
                title="项目申请"
                content="请填写项目基本信息"
            >
                <Card bordered={false} className={styles.card}>
                    <Form onSubmit={this.handleSubmit} hideRequiredMark style={{marginTop: 8}}>
                        <FormItem {...formItemLayout} label="项目名称">
                            {getFieldDecorator('title', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入项目名称',
                                    },
                                ],
                            })(<Select placeholder="请选择项目">
                                <Option value="xiao">上海银行售前项目</Option>
                                <Option value="mao">厦门银行售前项目</Option>
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
                            {getFieldDecorator('goal', {
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
                  客户
                  <em className={styles.optional}>
                    （选填）
                    <Tooltip title="目标的服务对象">
                      <Icon type="info-circle-o" style={{marginRight: 4}}/>
                    </Tooltip>
                  </em>
                </span>
                            }
                        >
                            {getFieldDecorator('client')(
                                <Input placeholder="请描述客户的基本信息"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={
                                <span>
                  审批人<em className={styles.optional}></em>
                </span>
                            }
                        >
                            {getFieldDecorator('invites')(
                                <Input placeholder="请直接 @姓名／工号，最多可邀请 3 人"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={
                                <span>
                  意向占比<em className={styles.optional}>（选填）</em>
                </span>
                            }
                        >
                            {getFieldDecorator('weight')(<InputNumber placeholder="请输入" min={0} max={100}/>)}
                            <span>%</span>
                        </FormItem>


                    </Form>
                </Card>

                <Card title="人员申请" bordered={false}>
                    {getFieldDecorator('mem所属部门bers', {
                        initialValue: tableData,
                    })(<TableForm />)}
                </Card>

                <FooterToolbar style={{width: this.state.width}}>
                    <Button type="primary" loading={submitting}>
                        提交
                    </Button>
                </FooterToolbar>
            </PageHeaderLayout>
        );
    }
}
