import {
  ClearOutlined,
  FundProjectionScreenOutlined,
  PlusOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectAddEdit() {
  const navigate = useNavigate();
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  return (
    <div className="projectsAddEdit mainWindow">
      <div className="windowBreadCrumb">
        <Breadcrumb>
          <Breadcrumb.Item
            className="breadCrumbItem"
            onClick={() => {
              navigate("/mainHome/proj");
            }}
          >
            <FundProjectionScreenOutlined /> Projects
          </Breadcrumb.Item>
          <Breadcrumb.Item>Add Project</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="mainWindowHeading">
        <div className="space-up-down">
          <h3>
            <PlusOutlined /> Add New Project
          </h3>
        </div>
      </div>
      <div className="projectForm">
        <Form name="form_item_path" layout="vertical">
          <legend>Project Details</legend>
          <Row gutter={24}>
            <Col className="gutter-row" span={8}>
              <div>
                <Form.Item label="Project Title" required>
                  <Input allowClear />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item label="Application Date">
                  <DatePicker format={"DD/MM/YYYY"} />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item label="Desired Date">
                  <DatePicker format={"DD/MM/YYYY"} />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item label="Estimated End of Project">
                  <DatePicker format={"DD/MM/YYYY"} />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item label="Project Type">
                  <Select
                    defaultValue="a1"
                    //   onChange={handleChange}
                    options={options}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item label="Project Status">
                  <Select
                    defaultValue="a1"
                    //   onChange={handleChange}
                    options={options}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item label="Applying Entity">
                  <Select
                    defaultValue="a1"
                    //   onChange={handleChange}
                    options={options}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <legend>Applicant Details</legend>
          <Row gutter={24}>
            <Col className="gutter-row" span={8}>
              <div>
                <Form.Item label="Applicant Name" required>
                  <Input allowClear />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item label="Applicant Community">
                  <Select
                    defaultValue="a1"
                    //   onChange={handleChange}
                    options={options}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item label="Applicant Institution">
                  <Input allowClear />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item label="Applicant Email-Id">
                  <Input allowClear />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <legend>Financial Details</legend>
          <Row gutter={24}>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item label="Total Project Cost">
                  <Input allowClear prefix="&#8377;" suffix="/-" />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item label="Local Contribution">
                  <Input allowClear prefix="&#8377;" suffix="/-" />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item label="Amount to be Applied for Agencies">
                  <Input allowClear prefix="&#8377;" suffix="/-" />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <legend>Project Status</legend>
          <Row gutter={24}>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item label="Project Completion Date">
                  <DatePicker format={"DD/MM/YYYY"} />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item label="Completion Status">
                  <Select
                    defaultValue="a1"
                    //   onChange={handleChange}
                    options={options}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col className="gutter-row" span={8}>
              <Form.Item label="Remarks">
                <TextArea rows={2} />
              </Form.Item>
            </Col>
          </Row>
          <legend>Upload Documents</legend>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item>
                <Upload name="logo" multiple="true">
                  <Button size="large" icon={<UploadOutlined />}>
                    Click to Upload
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item style={{ textAlign: "center" }}>
                <Space>
                  <Button type="primary" size="large" icon={<SaveOutlined />}>
                    Save
                  </Button>
                  <Button type="default" size="large" icon={<ClearOutlined />}>
                    Clear
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
          <div className="submitSection"></div>
        </Form>
      </div>
    </div>
  );
}
