import React, { useState } from 'react';
import { v4 } from 'uuid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../TabPanel';
import { createKey } from '../../utils/StorageKey';

export default function PaperMenu({
  tabs = [],
  panels = [],
  initialTabIndex = 0,
}) {
  const key = createKey('currentTab');
  const cachedIndex = localStorage.getItem(key);
  const [value, setValue] = useState(
    cachedIndex ? JSON.parse(cachedIndex) : initialTabIndex
  );

  const handleTabsChange = (event, newValue) => {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  };

  return (
    <Container maxWidth="md">
      <Paper variant="outlined">
        <Paper square elevation={2}>
          <Tabs
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="menu de opções para projetos"
            selectionFollowsFocus
            value={value}
            onChange={handleTabsChange}
          >
            {tabs.map((tab) => (
              <Tab key={v4()} icon={tab.icon} label={tab.label} />
            ))}
          </Tabs>
        </Paper>
        {panels.map(({ content }, index) => (
          <TabPanel key={v4()} value={value} index={index}>
            {content}
          </TabPanel>
        ))}
      </Paper>
    </Container>
  );
}
