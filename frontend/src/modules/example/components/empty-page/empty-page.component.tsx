import { Typography } from '@mui/material';
import { useTranslation } from 'modules/common/hooks';
import { useEmptyPageStyles } from 'modules/example/components/empty-page/empty-page.styles';
import React from 'react';

interface IProps {
  title: string;
}

export const EmptyPage: React.FC<IProps> = ({ title }) => {
  const classes = useEmptyPageStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.container}>
      <Typography variant="h3">{t('dont-see-any')} {title.toLocaleLowerCase()}?</Typography>
      <Typography variant="subtitle1">{t('start-adding-one-from-top-right')}</Typography>
    </div>
  );
};
