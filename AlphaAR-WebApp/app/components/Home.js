var React = require('react');
var Link = require('react-router-dom').Link;


class Home extends React.Component{
    render() {
        return (
            <div className='home-container'>
                <h1>AR, for everyone.</h1>
                <Link className='button' to='/battle'>
                </Link>
            </div>
        )
    }
}

module.exports = Home;