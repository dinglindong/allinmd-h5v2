import React from 'react'
import { BrowserRouter as Router,Route,Link } from 'react-router-dom'

const BasicExample = () => {
    return (
        <Router>
            <section>
                <ul>
                    <li><Link to="/">主页</Link></li>
                    <li><Link to="/about">关于我们</Link></li>
                    <li><Link to="topics">讨论</Link></li>
                </ul>

                <hr/>

                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/topics" component={Topics}/>
            </section>
        </Router>
    )
};

const Home = () =>
    <section>
        <h3>我是Home页面</h3>
        <main>我是主体内容部分</main>
    </section>

const About = () =>
    <section>
        <h3>我是About页面</h3>
        <main>我是主体内容部分</main>
    </section>

const Topics = () =>
    <section>
        <h3>我是讨论页面</h3>
        <main>我是主体内容部分</main>
    </section>

export default BasicExample