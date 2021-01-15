import React from "react";

interface TabPanelProps {
  dir?: string;
  index: any;
  value: any;
}

const TabPanel: React.FC<TabPanelProps> = ({
  index,
  value,
  children,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};
export { TabPanel };
