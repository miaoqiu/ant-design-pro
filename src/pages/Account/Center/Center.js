import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import Link from 'umi/link';
import router from 'umi/router';
import { Card, Row, Col, Icon, Avatar, Tag, Divider, Spin, Input,List, Select, Radio } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Center.less';
// import logo from '../../../assets/Filter/headerIcon.png';
import logo from '../../../assets/headerIcon.png';

const { Option } = Select;
const styless = {
  customWidth: {
    width: 150,
  },
};
@connect(({ loading, center }) => ({
  center,
  loading: loading.models.center,
}))
class Center extends PureComponent {
  state = {
    newTags: [],
    inputVisible: false,
    inputValue: '',
    data:[
      'Racing car sprays burning fuel into crowd.',
      'Japanese princess to wed commoner.',
      'Australian walks 100km after outback crash.Australian walks 100km after outback crash.Australian walks 100km after outback crash.',
      'Man charged over missing wedding girl.',
      'Los Angeles battles huge wildfires.',
    ],
    children: ['Apples', 'Nails', 'Bananas', 'Helicopters'],
    value: 1,


  };



  componentDidMount() {
    console.error('开始请求数据')
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'center/GetTempList',
    //   payload: {},
    //   callback: (response) => {
    //     console.error('提交数据得到的response');
    //     console.error(response);
    //   }
    // });
  }




  render() {
    const { newTags, inputVisible, inputValue } = this.state;
    return (
      <GridContent className={styles.userCenter}>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24,paddingLeft:'0',paddingRight: '0',minHeight:800 }}>
              <div className={styles.leftTopView}>
                <img alt="logo" className={styles.headerIcon} src={logo} />
                <div className={styles.titleDes}>Clarity</div>
              </div>

              <div className={styles.searchType}>
                Journals
              </div>


              <div>
                <List
                  header={<div style={{ fontSize: '16px', color: 'red'}}>Test variable</div>}
                  size="small"
                  dataSource={this.state.data}
                  renderItem={item => <List.Item>{item}</List.Item>}
                />

              </div>



            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card bordered={false} style={{paddingLeft:'0',paddingRight: '0',minHeight:800}}>

              <div className={styles.contentRight}>

                <div className={styles.headerRight}>

                  <div className={styles.headerTop}>
                    <div className={styles.headerTitle}>
                      Filters
                    </div>
                    <div className={styles.selectDiv}>


                      <div className={styles.selectP} >
                        <Select placeholder='Templates' className={styles.selectStyle} size={'small'}>
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                        </Select>
                      </div>


                      <div className={styles.selectP} >
                      <Select placeholder='Templates' className={styles.selectStyle} size={'small'}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                      </Select>
                      </div>

                      <div className={styles.selectP} >
                      <Select className={styles.selectStyle} size={'small'}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                      </Select>
                      </div>
                    </div>

                  </div>


                  <div className={styles.headerBottom}>

                    <div className={styles.desSelectTitle}>
                      Selection: GBD
                    </div>

                    <div className={styles.desSelectTitle}>
                      Selection: 3 of 10
                    </div>


                  </div>

                </div>


                <div className={styles.midRight}>

                  <div className={styles.headView}>

                  </div>

                  <div className={styles.filters}>
                    <div className={styles.firstItem}>

                    </div>


                    <div className={styles.midItem}>

                    </div>



                    <div className={styles.midItem}>

                    </div>


                    <div className={styles.midItem}>

                    </div>


                    <div className={styles.midItem}>

                    </div>

                    <div className={styles.midItem}>

                    </div>

                    <div className={styles.midItem}>

                    </div>
                    <div className={styles.midItem}>

                    </div>
                    <div className={styles.midItem}>

                    </div>
                    <div className={styles.midItem}>

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

export default Center;
