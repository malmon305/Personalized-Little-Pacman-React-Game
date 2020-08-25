import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'

export default function TopBar( { ...props }) {

  const { $t, score } = props;

    return (
        <div className="raspberrypacman-topbar">
            <span className="running-score">
                { $t.scores }{score}
                <span className="gradient"/>
                <span className="spotlight"/>
            </span>
        </div>
    );
}

TopBar.propTypes = {
    lost: PropTypes.bool.isRequired,
    score: PropTypes.number.isRequired
};
