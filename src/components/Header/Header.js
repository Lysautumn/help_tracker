import React from 'react';
import './Header.css';
import Avatar from '@material-ui/core/Avatar';
import Face from '@material-ui/icons/Face';
import teal from '@material-ui/core/colors/teal';

const styles = {
  tealAvatar: {
    backgroundColor: teal[400],
  }
}

const Header = ({ title }) => (
  <div className="headerText">
    <div>
      <h1 className="lead">{ title }</h1>
      <Avatar className="faceIcon" style={styles.tealAvatar}>
        <Face />
      </Avatar>
    </div>
  </div>
);

export default Header;
