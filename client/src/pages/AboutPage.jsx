import React from "react";
import { PageHeader } from "antd";
import { Layout } from "antd";

const { Content } = Layout;

const AboutPage = () => {
  return (
    <div>
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <PageHeader
            className="site-page-header"
            title="About"
            style={styles.header}
          />
        </div>
      </Content>
    </div>
  );
};

const styles = {
  input: {
    margin: "10px 0"
  },
  submit: {
    margin: "10px 0",
    marginBottom: "20px"
  },
  header: {
    paddingLeft: "0px"
  }
};

export default AboutPage;
