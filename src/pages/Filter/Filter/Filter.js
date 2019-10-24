import React, { Fragment,PureComponent } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import Link from 'umi/link';
import router from 'umi/router';
import { Button,Card, Row, Col, Icon, Avatar, Tag, Divider, Spin, Input, List, Select, Radio , Checkbox, message,Alert} from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Filter.less';
// import logo from '../../../assets/Filter/headerIcon.png';
import logo from '../../../assets/headerIcon.png';
 const { Option } = Select;
const styless = {
  customWidth: {
    width: 150,
  },
};
const { Search } = Input;


@connect(({ loading, filters }) => ({
  filters,
  loading: loading.models.filters,
}))
class Filter extends PureComponent {
  state = {
    newTags: [],
    inputVisible: false,
    inputValue: '',
    RadioValue: 1,
    RadioValueK: 1,
    RadioValueB: 1,
    RadioValueBH:1,
    data: [],
    originData: [],
    loading: false,
    hasMore: true,
    selectedRows: [],
    dataR:[],
    originDataR:[],
    chooseKeyAccountList: [],
    chooseOffsetAccountList: [],
    isShowLeftAllChoose: true,
    isShowLeftAllClear: false,
    isShowRightAllChoose: true,
    isShowRightAllClear: false,
    selectCurrencyList: [],
    selectCompanyList: [],
    dataset:'',
    currency: '',
    company_code: '',
    key_amount: '',
    debt_or_credit: '',
    inclusion: ''
  };

  componentDidMount() {

    // 请求基本信息
    this.loadBaseData();



    // this.loadLeftList('offset_account');
    // this.loadLeftList('key_account');


  }

  // shouldComponentUpdate(nextProps: IProps) {
  //   const props = this.props;
  //   return props.value !== nextProps.value || props.checked !== nextProps.checked
  // }


  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      inclusion: e.target.value,
    });
  };


  onChangeK = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      debt_or_credit: e.target.value,
    });
  };

  onChangeI = e => {
    this.setState({
      key_amount: e.target.value
    });


  };

  onChangeB = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      RadioValueB: e.target.value,
    });
  };

  onChangeH= e => {
    console.log('radio checked', e.target.value);
    this.setState({
      RadioValueBH: e.target.value,
    });
  };


  // 点击右边的checkbox
  onChangeCC(itemO) {
    const self = this;
    let index = self.state.dataR.indexOf(itemO);
    self.state.dataR[index].selectedItem = !(itemO.selectedItem);
    self.setState({
      dataR: [...self.state.dataR]
    }, ()=>{
      let indexO = self.state.originDataR.indexOf(itemO);
      self.state.originDataR.splice(indexO, 1, self.state.dataR[index]);
      console.error('左边单个选择以后原始数据更改以后')
      console.error(self.state.originDataR)

    })




  }


  // 点击左边checkbox
  onChangeC(itemO) {
    const self = this;
    let index = self.state.data.indexOf(itemO);
     self.state.data[index].selectedItem = !(itemO.selectedItem);
    self.setState({
      data: [...self.state.data]
     }, ()=>{
      let indexO = self.state.originData.indexOf(itemO);
      self.state.originData.splice(indexO, 1, self.state.data[index]);
      console.error('左边单个选择以后原始数据更改以后')
      console.error(self.state.originData)

    })

  }







  loadBaseData(){
    const { dispatch } = this.props;
    dispatch({
      type: 'filters/getBaseData',
      payload: {type: 'unusual_amount'},
      callback: (response) => {
        console.error('提交数据得到的response');
        console.error(response);
        this.setState({
          dataset: response.data.required_field.dataset,
          selectCurrencyList: response.data.required_field.currency,
          selectCompanyList: response.data.required_field.company_code,
          currency: response.data.required_field.currency[0],
          company_code: response.data.required_field.company_code[0],
        },()=>{

          this.loadLeftList('key_account');
          this.loadLeftList('offset_account');

          // this.loadRightList('offset_account');

        })

      }
    });
  }

  SearchLeftView(value){
    if(!value){
      this.setState({
        data: this.state.originData
      })
    }else {
      let tempArr = []
      this.state.originData.forEach((item, index)=>{
        if(item.code.search(value) != -1){
          tempArr.push(item);
        }

      })

      this.setState({
        data: tempArr
      })


    }
  }

  SearchRightView(value){
    if(!value){
      this.setState({
        dataR: this.state.originDataR
      })
    }else {
      let tempArr = []
      this.state.originDataR.forEach((item, index)=>{
        if(item.code.search(value) != -1){
          tempArr.push(item);
        }

      })

      this.setState({
        dataR: tempArr
      })


    }
  }



  // 左边的全选按钮
  chooseAllLeftClick(){
    this.state.data.forEach((item, index)=>{
      item.selectedItem = true;
      let indexO = this.state.originData.indexOf(item);
      this.state.originData.splice(indexO, 1, item);
    })

    this.setState({
      data: [...this.state.data],
      isShowLeftAllChoose: false,
      isShowLeftAllClear: true
    })


    console.error('左边点击全选以后的原始数据');
    console.error(this.state.originData);

  }

  // 左边的清空按钮
  cleanAllLeftClick(){
    this.state.data.forEach((item, index)=>{
      item.selectedItem = false;
      let indexO = this.state.originData.indexOf(item);
      this.state.originData.splice(indexO, 1, item);
    })

    this.setState({
      data: [...this.state.data],
      isShowLeftAllChoose: true,
      isShowLeftAllClear: false
    })

    console.error('左边点击全取消以后的原始数据取消取消取消取消');
    console.error(this.state.originData);


  }



  chooseAllRightClick(){
    this.state.dataR.forEach((item, index)=>{
      item.selectedItem = true;
      let indexO = this.state.originDataR.indexOf(item);
      this.state.originDataR.splice(indexO, 1, item);
    })

    this.setState({
      dataR: [...this.state.dataR],
      isShowRightAllChoose: false,
      isShowRightAllClear: true
    })


    console.error('右边点击全选以后的原始数据');
    console.error(this.state.originDataR);

  }



  cleanAllRightClick() {
    this.state.dataR.forEach((item, index)=>{
      item.selectedItem = false;
      let indexO = this.state.originDataR.indexOf(item);
      this.state.originDataR.splice(indexO, 1, item);
    })

    this.setState({
      dataR: [...this.state.dataR],
      isShowRightAllChoose: true,
      isShowRightAllClear: false
    })

    console.error('左边点击全取消以后的原始数据取消取消取消取消');
    console.error(this.state.originDataR);

  }




  // select currency
  onchangeChooseCurrency = (e) => {
    this.setState(prevState => ({
      currency: e,
    }),()=>{
      this.loadLeftList('key_account');
      this.loadLeftList('offset_account');
    });
  };



  // select company
  onchangeChooseCompanyCode = (e) => {
    this.setState(prevState => ({
      company_code: e,
    }),()=>{
      this.loadLeftList('key_account');
      this.loadLeftList('offset_account');
    });
  };


  loadLeftList(type){
    const { dispatch } = this.props;
    dispatch({
      type: 'filters/GetSearchList',
      payload: {
        type: type,
        dataset: this.state.dataset,
        currency: this.state.currency,
        company_code: this.state.company_code
      },
      callback: (response) => {
        let tempArr = [];
        response.data.data.forEach((item,index)=>{
          item.id = index;
          item.selectedItem = false;
          tempArr.push(item)
        })
        if(type === 'key_account'){
          this.setState({
            data: tempArr,
            originData:tempArr
          })
        }else if(type === 'offset_account') {
          this.setState({
            dataR: tempArr,
            originDataR:tempArr
          })

        }else {
          this.setState({
            data: [],
            dataR: [],
            originDataR:[],
            originData:[],

          })
        }


      }
    });
  }


  runClick(){
    let tempDataArr = [];
    this.state.dataR.forEach((item, index)=>{
      if(item.selectedItem){
        tempDataArr.push(item.code);
      }

    })

    let tempDataRArr = [];
    this.state.data.forEach((item, index)=>{
      if(item.selectedItem){
        tempDataRArr.push(item.code);
      }
    })

    this.setState({
      chooseKeyAccountList: tempDataRArr,
      chooseOffsetAccountList: tempDataArr
    })


    const { dispatch } = this.props;
    dispatch({
      type: 'filters/resultDataList',
      payload: {
        key_code: JSON.stringify(tempDataRArr),
        offset_code: JSON.stringify(tempDataArr),

        inclusion: this.state.inclusion,
        debt_or_credit: this.state.debt_or_credit,
        key_amount: this.state.key_amount,
        dataset: this.state.dataset,
        currency: this.state.currency,
        company_code: this.state.company_code
      },
      callback: (response) => {
        console.error('得到的参数++++++++');
        console.error(response)
      }
    });






  }



  render() {
    const self = this;
    const { newTags, inputVisible, inputValue,selectedRows,originData } = this.state;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    return (
      <GridContent className={styles.userCenter}>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24, paddingLeft: '0', paddingRight: '0', minHeight: 800 }}>
              <div className={styles.leftTopView}>
                <img alt="logo" className={styles.headerIcon} src={logo}/>
                <div className={styles.titleDes}>Clarity</div>
              </div>

              <div className={styles.searchType}>
                Journals
              </div>


              <div className={styles.testV}>
                <div className={styles.leftDes}>
                  Test variable
                </div>

                <div onClick={this.runClick.bind(this)} className={styles.leftDes} style={{ color: 'red' }}>
                  <Button type="primary" size={'small'}>run</Button>
                </div>

              </div>


              <div className={styles.testVR}>
                <Radio.Group onChange={this.onChange} value={this.state.RadioValue}>
                  <span>
                    <Radio value={'inclusive'}>Inclusive</Radio>
                  </span>
                  <span className={styles.leftR}>
                    <Radio value={'exclusive'}>Exclusive</Radio>
                  </span>
                </Radio.Group>

              </div>


              <div className={styles.testVRNB}>
                <Radio.Group onChange={this.onChangeK} value={this.state.RadioValueK}>
                  <Radio value={'debit'}>Key account debit</Radio>
                  <Radio value={'credit'}>Key account credit</Radio>
                </Radio.Group>
              </div>


              <div className={styles.testInput}>
                <div>
                  Key account minimum amount:
                </div>


                <div className={styles.testInputS}>
                  <Input placeholder="input with clear icon" allowClear onChange={this.onChangeI}/>
                </div>
              </div>


              {/*<div className={styles.testVRB}>*/}
                {/*<Radio.Group onChange={this.onChangeB} value={this.state.RadioValueB}>*/}
                  {/*<span>*/}
                    {/*<Radio value={1}>FSLI</Radio>*/}
                  {/*</span>*/}
                  {/*<span className={styles.leftRB}>*/}
                    {/*<Radio value={2}>GL account</Radio>*/}
                  {/*</span>*/}
                {/*</Radio.Group>*/}

              {/*</div>*/}



              <div className={styles.showSearchList}>

                <div className={styles.leftSearchList}>
                  <List
                    header={<div style={{ fontSize: '16px', color: 'red'}}>Key account</div>}
                    size="small"
                    dataSource={this.state.chooseKeyAccountList}
                    renderItem={item => <List.Item>{item}</List.Item>}
                  />

                </div>

                <div className={styles.rightSearchList}>
                  <List
                    header={<div style={{ fontSize: '16px', color: 'red'}}>Offset account</div>}
                    size="small"
                    dataSource={this.state.chooseOffsetAccountList}
                    renderItem={item => <List.Item>{item}</List.Item>}
                  />

                </div>

              </div>





            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card bordered={false} style={{ paddingLeft: '0', paddingRight: '0', minHeight: 800 }}>

              <div className={styles.contentRight}>

                <div className={styles.headerRight}>

                  <div className={styles.topView}>

                    <div className={styles.leftTitle}>
                      <div className={styles.headerTitle}>
                        {this.state.dataset}
                      </div>
                    </div>



                    {/*<div className={styles.leftTitle}>*/}
                      {/*<Radio.Group onChange={this.onChangeH} value={this.state.RadioValueBH}>*/}
                        {/*<Radio style={radioStyle} value={1}>*/}
                          {/*Common rate*/}
                        {/*</Radio>*/}
                        {/*<Radio style={radioStyle} value={2}>*/}
                          {/*Local*/}
                        {/*</Radio>*/}
                      {/*</Radio.Group>*/}

                    {/*</div>*/}




                    <div className={styles.rightTopAllView}>
                      <div className={styles.rightTopView}>
                        <div className={styles.selectP}>
                          <Select
                            placeholder='currency'
                            className={styles.selectStyle}
                            size={'small'}
                            defaultActiveFirstOption={false}
                            // onChange={handleChange}
                            value= {this.state.currency}
                            onChange={v => {
                              this.onchangeChooseCurrency(v);
                            }}
                          >
                            {this.state.selectCurrencyList &&
                            this.state.selectCurrencyList.map((item, index) => (
                              <Select.Option key={item} value={item}>
                                {item}
                              </Select.Option>
                            ))}
                          </Select>




                        </div>

                        <div className={styles.selectP}>
                            <Select
                              className={styles.selectStyle}
                              size={'small'}
                              placeholder='company_code'
                              defaultActiveFirstOption={false}
                              value= {this.state.company_code}

                              // onChange={handleChange}
                              onChange={v => {
                                this.onchangeChooseCompanyCode(v);
                              }}
                            >
                              {this.state.selectCompanyList &&
                              this.state.selectCompanyList.map((item, index) => (
                                <Select.Option key={item} value={item}>
                                  {item}
                                </Select.Option>
                              ))}
                          </Select>
                        </div>
                      </div>

                      <div className={styles.rightBottomView}>
                        <div className={styles.desSelectTitle}>
                          Selection: {this.state.currency}
                        </div>

                        <div className={styles.desSelectTitle}>
                          Selection:{this.state.company_code}
                        </div>

                      </div>


                    </div>



                  </div>


                </div>


                <div className={styles.midRight}>

                  <div className={styles.leftView}>

                    <div className={styles.topInput}>
                       <Search placeholder="input search text" onSearch={value => this.SearchLeftView(value)} enterButton />
                    </div>

                    <div className={styles.selectBtn}>
                      <div className={styles.leftAccountTitle}>
                        Key account
                      </div>
                      <div>

                      </div>
                    </div>


                    <div className={styles.demoinfinitecontainer}>

                      <Alert
                        message={
                          <Fragment>
                            已查询 <a style={{ fontWeight: 600 }}>{this.state.data.length}</a> 项&nbsp;&nbsp;
                            {this.state.isShowLeftAllChoose&& <a onClick={this.chooseAllLeftClick.bind(this)} style={{ marginLeft: 24 }}>
                              全选
                            </a>}
                            {this.state.isShowLeftAllClear&& <a onClick={this.cleanAllLeftClick.bind(this)} style={{ marginLeft: 24 }}>
                              清空
                            </a>}

                          </Fragment>
                        }
                        type="info"
                        showIcon
                      />

                      <List
                        className={styles.demoloadmorelist}
                        dataSource={this.state.data}
                        renderItem={item => (
                          <List.Item key={item.id}>
                            <div className={styles.listItem}>
                              <div className={styles.listItemCheck}>
                                {/*<Checkbox checked={item.selectedItem} onChange={()=>this.onChangeC(item)}>{item.name}</Checkbox>*/}


                                <Checkbox checked={item.selectedItem} onChange={()=>this.onChangeC(item)}>{item.name}</Checkbox>


                              </div>
                              <div className={styles.listItemCode}>{item.code}</div>
                            </div>
                          </List.Item>
                        )}>
                        {this.state.loading && this.state.hasMore && (
                          <div className={styles.demoloadingcontainer}>
                            <Spin />
                          </div>
                        )}
                      </List>

                    </div>

                  </div>




                  <div className={styles.rightView}>
                    <div className={styles.topInputR}>
                      <Search placeholder="input search text" onSearch={value => this.SearchRightView(value)} enterButton />
                    </div>

                    <div className={styles.selectBtn}>
                      <div className={styles.leftAccountTitle}>
                        Offset account
                      </div>

                      <div>

                      </div>
                    </div>

                    <div className={styles.demoinfinitecontainer}>

                      <Alert
                        message={
                          <Fragment>
                            已查询 <a style={{ fontWeight: 600 }}>{this.state.dataR.length}</a> 项&nbsp;&nbsp;
                            {this.state.isShowRightAllChoose&& <a onClick={this.chooseAllRightClick.bind(this)} style={{ marginLeft: 24 }}>
                              全选
                            </a>}
                            {this.state.isShowRightAllClear&& <a onClick={this.cleanAllRightClick.bind(this)} style={{ marginLeft: 24 }}>
                              清空
                            </a>}

                          </Fragment>
                        }
                        type="info"
                        showIcon
                      />
                      <List
                        className={styles.demoloadmorelist}
                        dataSource={this.state.dataR}
                        renderItem={item => (
                          <List.Item key={item.id}>
                            <div className={styles.listItem}>
                              <div className={styles.listItemCheck}>
                            <Checkbox checked={item.selectedItem} onChange={()=>this.onChangeCC(item)}>{item.name}</Checkbox>
                              </div>
                            <div className={styles.listItemCode}>{item.code}</div>
                            </div>
                          </List.Item>
                        )}>
                        {this.state.loading && this.state.hasMore && (
                          <div className={styles.demoloadingcontainer}>
                            <Spin />
                          </div>
                        )}
                      </List>

                    </div>


                  </div>



                </div>


                <div className={styles.bottomRight}>

                </div>

              </div>


            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Filter;
