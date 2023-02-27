import React from 'react';
import { Form, Input } from 'antd';
import {CustomizedFormProps} from "../store/type";



export const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields }) => (
    <Form preserve={false}
        name="global_state"
        layout="inline"
        fields={fields}
        onFieldsChange={(_, allFields) => {
            onChange(allFields);
        }}
    >
        <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Username is required!' }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="value"
            label="value"
            rules={[{ required: true, message: 'value is required!' }]}
        >
            <Input />
        </Form.Item>
    </Form>
);