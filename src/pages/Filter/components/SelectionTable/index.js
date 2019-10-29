import React, { Fragment, PureComponent } from 'react';
import { Alert, Table } from 'antd';
import styles from './index.less';

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

class SelectionTable extends PureComponent {
  constructor(props) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      return {
        selectedRowKeys: [],
        needTotalList,
      };
    }
    return null;
  }

  /**
   * 清空选择
   */
  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  /**
   * 点击选择条目
   * @param selectedRowKeys
   * @param selectedRows
   */
  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, needTotalList });
  };

  /**
   * table onchange
   * @param pagination
   * @param filters
   * @param sorter
   */
  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  render() {
    const { selectedRowKeys } = this.state;
    const { data = {}, rowKey, ...rest } = this.props;
    const { columns } = this.props;
    // const { list = [], pagination } = data;

    console.log('data:' + data);

    const paginationProps = {
      showSizeChanger: false,
      showQuickJumper: true,
      // ...pagination,
      defaultCurrent: 1,
      total: data.total,
      showTotal: () => {
        return '共 ' + data.total + ' 条数据';
      },
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={
              <Fragment>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                  清空
                </a>
              </Fragment>
            }
            type="info"
            showIcon
          />
        </div>
        <Table
          // bordered
          columns={columns}
          fixed={false}
          // scroll={{ x:2100 ,y: 600}}
          rowKey={rowKey || 'id'}
          rowSelection={rowSelection}
          dataSource={data}
          // onChange={this.handleTableChange}
          pagination={false}
          {...rest}
        />
      </div>
    );
  }
}

export default SelectionTable;
