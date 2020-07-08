import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { FaMedal } from 'react-icons/fa';

function MedalCard({ title = '', text = '', type = '' }) {
  return (
    <div className="medal-card">
      <Card raised>
        <CardHeader
          component="header"
          avatar={
            <Avatar>
              <FaMedal />
            </Avatar>
          }
          title={title}
          subheader={type}
          className="medal-card__header"
        />
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className="medal-card__text"
          >
            {text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default MedalCard;
