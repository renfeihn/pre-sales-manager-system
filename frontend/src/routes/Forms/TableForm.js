import React, {PureComponent, Fragment} from 'react';
import {Table, Button, Input, AutoComplete, message, Popconfirm, Divider} from 'antd';
import styles from './style.less';
import {connect} from 'dva';
import * as userService from '../../services/user';

export default class TableForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
      loading: false,
      dataSource: [],
      listSource: [],
    };

  }

  componentDidMount() {
    const listData = [];
    userService.queryList().then((res) => {
      res.forEach((item, index) => {
        listData.push(item.name);
      });
      this.setState({
        dataSource: listData,
        listSource: res,
      });
    });


//    const { user, submitting } = this.props;

  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        data: nextProps.value,
      });
    }
  }

  getRowByKey(key, newData) {
    return (newData || this.state.data).filter(item => item.key === key)[0];
  }

  index = 0;
  cacheOriginData = {};
  toggleEditable = (e, key) => {
    e.preventDefault();
    const newData = this.state.data.map(item => ({...item}));
    const target = this.getRowByKey(key, newData);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = {...target};
      }
      target.editable = !target.editable;
      this.setState({data: newData});
    }
  };

  remove(key) {
    const newData = this.state.data.filter(item => item.key !== key);
    this.setState({data: newData});
    this.props.onChange(newData);
  }

  newMember = () => {
    const newData = this.state.data.map(item => ({...item}));
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      jobTitle: '',
      name: '',
      departmentName: '',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({data: newData});
  };

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }

  handleFieldChange(e, fieldName, key) {
    const newData = this.state.data.map(item => ({...item}));
    const target = this.getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({data: newData});
    }
  }

  saveRow(e, key) {
    e.persist();
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      // console.log(target);
      if (!target.jobTitle || !target.name || !target.departmentName) {
        message.error('请填写完整成员信息。');
        e.target.focus();
        this.setState({
          loading: false,
        });
        return;
      }
      delete target.isNew;
      this.toggleEditable(e, key);
      this.props.onChange(this.state.data);
      this.setState({
        loading: false,
      });
    }, 500);
  }

  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const newData = this.state.data.map(item => ({...item}));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      target.editable = false;
      delete this.cacheOriginData[key];
    }
    this.setState({data: newData});
    this.clickedCancel = false;
  }

  /**
   * 选中触发事件
   * @param {索引} key
   * @param {值} value
   */
  handleSelect(key, value) {
    const newData = this.state.listSource;
    const target = newData.filter(item => item.name === value)[0];
    //更改相同索引数据
    this.state.data.forEach(
      function selectData(item) {
        if (item.key == key) {
          item.name = target.name
          item.jobTitle = target.jobTitle
          item.departmentName = target.departmentName
        }
      }
    )
    //刷新父组件数据
    this.props.onChange(this.state.data);
  }

  render() {

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        render: (text, record) => {
          if (record.editable) {
            /*
             return (
             <Input
             value={text}
             autoFocus
             onChange={e => this.handleFieldChange(e, 'name', record.key)}
             onKeyPress={e => this.handleKeyPress(e, record.key)}
             placeholder="姓名"
             />
             );
             */
            return (
              <AutoComplete
                dataSource={this.state.dataSource}
                placeholder="请选择姓名"
                onSelect={this.handleSelect.bind(this, record.key)}
                filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
              />
            )
          }
          return text;
        },
      },
      {
        title: '级别',
        dataIndex: 'jobTitle',
        key: 'jobTitle',
        width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'jobTitle', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="级别"
              />
            );
          }
          return text;
        },
      },
      {
        title: '所属部门',
        dataIndex: 'departmentName',
        key: 'departmentName',
        width: '40%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'departmentName', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="所属部门"
              />
            );
          }
          return text;
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          if (!!record.editable && this.state.loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                  <Divider type="vertical"/>
                  <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                <Divider type="vertical"/>
                <a onClick={e => this.cancel(e, record.key)}>取消</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
              <Divider type="vertical"/>
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    return (
      <Fragment>
        <Table
          loading={this.state.loading}
          columns={columns}
          dataSource={this.state.data}
          pagination={false}
          rowClassName={record => {
            return record.editable ? styles.editable : '';
          }}
        />
        <Button
          style={{width: '100%', marginTop: 16, marginBottom: 8}}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          新增成员
        </Button>
      </Fragment>
    );
  }
}
