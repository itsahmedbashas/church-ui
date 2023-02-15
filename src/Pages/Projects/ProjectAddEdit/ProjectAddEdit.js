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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAPI } from "../../../apis/AdminAPI";
import { AdminMenus } from "../../../shared/AdminMenus";

export default function ProjectAddEdit() {
  const navigate = useNavigate();

  /** variables creation */
  const [projectTypes, setProjectTypes] = useState([]);
  const [projectStatus, setProjectStatus] = useState([]);
  const [applyingEntity, setApplyingEntity] = useState([]);
  const [applicantCommunity, setApplicantCommunity] = useState([]);
  const [completionStatus, setCompletionStatus] = useState([]);

  /** functionality to handle at page loads */
  useEffect(() => {
    getProjectTypes();
    getProjectStatus();
    getApplyingEntity();
    getApplicantCommunity();
    getCompletionStatus();
  }, []);

  /** Getting Project Types */
  const getProjectTypes = () => {
    AdminAPI.getAdminLookup(AdminMenus.ProjectTypes)
      .then((res) => {
        setProjectTypes(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /** Getting Project Status */
  const getProjectStatus = () => {
    AdminAPI.getAdminLookup(AdminMenus.ProjectStatus)
      .then((res) => {
        setProjectStatus(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /** Getting Applying Entity */
  const getApplyingEntity = () => {
    AdminAPI.getAdminLookup(AdminMenus.ApplyingEntity)
      .then((res) => {
        setApplyingEntity(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /** Getting Applying Entity */
  const getApplicantCommunity = () => {
    AdminAPI.getAdminLookup(AdminMenus.ApplicantCommunity)
      .then((res) => {
        setApplicantCommunity(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /** Getting Applying Entity */
  const getCompletionStatus = () => {
    AdminAPI.getAdminLookup(AdminMenus.CompletionStatus)
      .then((res) => {
        setCompletionStatus(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /** form object */
  const [form] = Form.useForm();

  /** save click function */
  const onSubmit = (formValues) => {
    //const appDate = formValues.applicationDate.format("DD/MM/YYYY");
    console.log(formValues);
  };

  /** when form failed to get mandatory values */
  const onSubmitFailed = (errorInfo) => {
    console.log(errorInfo);
  };

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
        <Form
          name="projectsAddEdit"
          form={form}
          layout="vertical"
          onFinish={onSubmit}
          onFinishFailed={onSubmitFailed}
        >
          <legend>Project Details</legend>
          <Row gutter={24}>
            <Col className="gutter-row" span={8}>
              <div>
                <Form.Item
                  label="Project Title"
                  name="projectTitle"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Project Title",
                    },
                  ]}
                >
                  <Input allowClear />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Application Date"
                  name="applicationDate"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Application Date",
                    },
                  ]}
                >
                  <DatePicker format={"DD/MM/YYYY"} />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item label="Desired Date" name="desiredDate">
                  <DatePicker format={"DD/MM/YYYY"} />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Estimated End of Project"
                  name="estimatedEndOfProject"
                >
                  <DatePicker format={"DD/MM/YYYY"} />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Project Type"
                  name="projectType"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Project Type",
                    },
                  ]}
                >
                  <Select
                    fieldNames={{
                      label: "projectTypeName",
                      value: "projectTypeId",
                    }}
                    //   onChange={handleChange}
                    options={projectTypes}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Project Status"
                  name="projectStatus"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Project Status",
                    },
                  ]}
                >
                  <Select
                    fieldNames={{
                      label: "projectStatusName",
                      value: "projectStatusId",
                    }}
                    //   onChange={handleChange}
                    options={projectStatus}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Applying Entity"
                  name="applyingEntity"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Applying Entity",
                    },
                  ]}
                >
                  <Select
                    fieldNames={{
                      label: "applyingEntityName",
                      value: "applyingEntityId",
                    }}
                    //   onChange={handleChange}
                    options={applyingEntity}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <legend>Applicant Details</legend>
          <Row gutter={24}>
            <Col className="gutter-row" span={8}>
              <div>
                <Form.Item
                  label="Applicant Name"
                  name="applicantName"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Applicant Name",
                    },
                  ]}
                >
                  <Input allowClear />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Applicant Community"
                  name="applicantCommunity"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Applicant Community",
                    },
                  ]}
                >
                  <Select
                    fieldNames={{
                      label: "applicantCommunityName",
                      value: "applicantCommunityId",
                    }}
                    //   onChange={handleChange}
                    options={applicantCommunity}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Applicant Institution"
                  name="applicantInstitution"
                >
                  <Input allowClear />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Applicant Email-Id"
                  name="applicantEmailId"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Applicant Email Id",
                    },
                  ]}
                >
                  <Input allowClear />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <legend>Financial Details</legend>
          <Row gutter={24}>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Total Project Cost"
                  name="totalProjectCost"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Project Total Cost",
                    },
                  ]}
                >
                  <Input allowClear prefix="&#8377;" suffix="/-" />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item label="Local Contribution" name="localContribution">
                  <Input allowClear prefix="&#8377;" suffix="/-" />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Amount to be Applied for Agencies"
                  name="amountToBeAppliedForAgencies"
                >
                  <Input allowClear prefix="&#8377;" suffix="/-" />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <legend>Project Status</legend>
          <Row gutter={24}>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Project Completion Date"
                  name="projectCompletionDate"
                >
                  <DatePicker format={"DD/MM/YYYY"} />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Completion Status"
                  name="projectCompletionStatus"
                >
                  <Select
                    fieldNames={{
                      label: "completionStatusName",
                      value: "completionStatusId",
                    }}
                    //   onChange={handleChange}
                    options={completionStatus}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col className="gutter-row" span={8}>
              <Form.Item label="Remarks" name="remarks">
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
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                  >
                    Save
                  </Button>
                  <Button
                    type="default"
                    onClick={() => {
                      form.resetFields();
                    }}
                    size="large"
                    icon={<ClearOutlined />}
                  >
                    Clear
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
