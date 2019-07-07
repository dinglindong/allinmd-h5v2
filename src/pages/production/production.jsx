import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PublicHeader from '@/components/header/index.jsx'
import { getProData, togSelectPro, editPro } from '@/store/production/action'
import './production.less'

class Production extends Component {
    static propTypes = {
        proData: PropTypes.object.isRequired,
        getProData: PropTypes.func.isRequired,
        togSelectPro: PropTypes.func.isRequired,
        editPro: PropTypes.func.isRequired
    }

    handleEdit = (index, num) => {
        let currentNum = this.props.proData.dataList[index].selectNum + num;
        if(currentNum < 0){
            return
        }
        this.props.editPro(index, currentNum)
    }
    togSelect = (index) => {
        this.props.togSelectPro(index)
    }

    componentDidMount(){
        if(!this.props.proData.dataList.length){
            this.props.getProData();
        }
    }

    render() {
        return (
            <main className="comm-con-top">
                <PublicHeader title="产品列表" record />
                <section className="pro-list-con">
                    <ul className="pro-list-ul">
                        {
                            this.props.proData.dataList.map((item,index)=>{
                                return (
                                    <li className="pro-item" key={index}>
                                        <div className="pro-item-select" onClick={this.togSelect.bind(this,index)} >
                                            <span className={`icon-xuanze1 pro-select-status ${item.selectStatus ? 'pro-selected': ''}`}></span>
                                            <span className="pro-name">{item.product_name}</span>
                                        </div>
                                        <div className="pro-item-edit">
                                            <span className={`icon-jian ${item.selectNum > 0 ? 'edit-active': ''}`} onClick={this.handleEdit.bind(this,index,-1)}></span>
                                            <span className="pro-num">{item.selectNum}</span>
                                            <span className={`icon-jia`} onClick={this.handleEdit.bind(this,index,1)}></span>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </section>
            </main>
        )
    }
}


export default connect(state => ({
    proData: state.proData,
  }), {
    getProData, 
    togSelectPro, 
    editPro
  })(Production);