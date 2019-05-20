import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>This info is: {props.info}</p>
    </div>
);


const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAdmin && <p>This is private info. Please do not share.</p>}
            <WrappedComponent {...props}/>
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return(props) => (
        <div>
            { props.isAuthenticated ? <p>{props.info}</p> : <p>Please Login to see Info</p>}

        </div>
    );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={false} info="Some Info" />, document.getElementById('root'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="Some Authentication Info" />, document.getElementById('root'));