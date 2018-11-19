/**
 * @author Lnden
 * @date 2018/11/12
 * @desc 文件描述
 * @param {Object} [title]  - 参数说明
 * @example 调用示例
 */

import React, { Component } from 'react'
import Button from '../Buttons/demo'
import { sortBy } from 'lodash'
import classNames from 'classnames'

const SORTS = {
    NONE: list=> list,
    TITLE: list=> sortBy(list,'title'),
    AUTHOR: list=> sortBy(list,'author'),
    COMMENTS: list=> sortBy(list,'num_comments').reverse(),
    POINTS: list=> sortBy(list,'points').reverse()
};

const Sort = ({ sortKey,onSort,children,activeSortKey }) =>{
    const sortClass = classNames( 'button-inline', { 'button-active': sortKey === activeSortKey } );
    return (
        <Button
            onClick={()=>onSort(sortKey)}
            className={sortClass}
        >
            { children }
        </Button>
    )
};
const smallColumn = {
    width:'10%'
};

//表格ES6组件
export default class Table extends Component {
    constructor(props){
        super(props);
        this.state = {
            sortKey:'NONE',
            isSortReverse:false
        };
        this.onSort = this.onSort.bind(this);
    }
    onSort(sortKey) {
        const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
        this.setState({
            sortKey,
            isSortReverse
        });
    }

    render(){
        const { list,onDismiss } = this.props;
        const { sortKey,isSortReverse } = this.state;
        const sortedList = SORTS[sortKey](list);
        const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;
        return (
            <div className="table">
                <div className="table-header">
                    <span style={{ width: '40%' }}>
                        <Sort sortKey={'TITLE'} onSort={this.onSort} activeSortKey={sortKey}
                        > Title </Sort>
                    </span>
                    <span style={{ width: '30%' }}>
                        <Sort sortKey={'AUTHOR'} onSort={this.onSort} activeSortKey={sortKey}
                        > Author </Sort>
                    </span>
                    <span style={{ width: '10%' }}>
                        <Sort sortKey={'COMMENTS'} onSort={this.onSort} activeSortKey={sortKey}
                        > Comments </Sort>
                    </span>
                    <span style={{ width: '10%' }}>
                        <Sort sortKey={'POINTS'} onSort={this.onSort} activeSortKey={sortKey}
                        > Points </Sort>
                    </span>
                    <span style={{ width: '10%' }}> Archive </span>
                </div>
                {reverseSortedList.map(item =>
                    <div key={item.objectID} className="table-row">
                      <span style={{width:'40%'}}>
                        <a href={item.url}>{item.title}</a>
                      </span>
                        <span style={{width:'30%'}}>{item.author}</span>
                        <span style={smallColumn}>{item.num_comments}</span>
                        <span style={smallColumn}>{item.points}</span>
                        <span style={smallColumn}>
                            <Button
                                onClick={()=>onDismiss(item.objectID)}
                                className="button-inline"

                            >Dismiss</Button>
                      </span>
                    </div>
                )}
            </div>
        )
    }
}