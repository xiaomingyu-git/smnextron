import React, {useState} from 'react';
import Head from 'next/head';
import * as electron from "electron";
import {Button, ConfigProvider, DatePicker, DatePickerProps, Form, message, Modal} from "antd";
import {PrimaryButton} from "../modules/styleButton";
const ipcRenderer = electron.ipcRenderer;
import {useBearStore} from '../store/bear'
import {CustomizedForm} from "../modules/CustomizedForm";
import {leftTableColumns, rightTableColumns, TableTransfer} from "../modules/TableTransfer";
import {useRequest} from "ahooks";
function Home() {
    const [state, setState] = useState('');
    const nextfields = useBearStore((state) => state.fields)
    const setnextfields = useBearStore((state) => state.setfieIds)
    const open = useBearStore((state) => state.modalstatus)
    const changemodalstatus  = useBearStore((state) => state.changemodalstatus)
    const [key,setkey] = useState('1')
    const onClickwithIpc = () =>{
        ipcRenderer.send('openfile','"D:\\show.txt"')
    }
    const [targetKeys, setTargetKeys] = useState<string[]>();
    const onChange = (nextTargetKeys: string[]) => {
        setTargetKeys(nextTargetKeys);
    };
    const ondateChange: DatePickerProps['onChange'] = (date, dateString) => {
        run(state)
    };
    const [nextdata,setnextdata] = useState( Array.from({ length: 20 }).map((_, i) => ({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 4 === 0,
    })))
    function editUsername(username: string): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    resolve();
                } else {
                    reject(new Error('Failed to modify username'));
                }
            }, 1000);
        });
    }
    const { loading, run } = useRequest(editUsername, {
        manual: true,
        onSuccess: (result, params) => {
            setnextdata( Array.from({ length: 50 }).map((_, i) => ({
                key: i.toString(),
                title: `content${i + 1}`,
                description: `description of content${i + 1}`,
                disabled: i % 4 === 0,
            })));
            message.success(`The username was changed to "${params[0]}" !`);
        },
        onError: (error) => {
            message.error(error.message);
        },
    });
  return (
      <ConfigProvider
          theme={{
              token: {
                  motionUnit:0
              },
          }}
      >
    <React.Fragment>
      <Head>
        <title>涉密文件内部管理</title>
      </Head>
        <Button onClick={onClickwithIpc}> 点击打开文件</Button>
        <Button onClick={()=>{
            setnextfields([{ name: ['username'], value: 'Ant Design' },{name: ['value'], value: '第二个值' }])
        }} >最后还是antd</Button>
        <PrimaryButton type={'default'} onClick={changemodalstatus}>Hello, World!</PrimaryButton>
        <input
            onChange={(e) => setState(e.target.value)}
            value={state}
            placeholder="Please enter username"
            style={{ width: 240, marginRight: 16 }}
        />
        <button disabled={loading} type="button" onClick={() => run(state)}>
            {loading ? 'Loading' : 'Edit'}
        </button>
        <Modal maskClosable={false} destroyOnClose={true}
            open={open}
            title="Create a new collection"
            okText="Create"
            cancelText="Cancel"
            onCancel={changemodalstatus}
            onOk={()=>{
                const result = {}
                nextfields.forEach(item => {
                    result[item.name[0]] = item.value;
                });
                console.log(result)
            }}
        >
            <CustomizedForm
                fields={nextfields}
                onChange={(newFields) => {
                    setnextfields(newFields)
                }}
            />
        </Modal>
    </React.Fragment>
          <Button onClick={()=>{setkey(key+1)}}>11111</Button>
          <Button onClick={()=>{run(state)}}>next</Button>
          <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              autoComplete="off"
          >
              <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
              >
                  <DatePicker onChange={ondateChange} />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                      Submit
                  </Button>
              </Form.Item>
          </Form>
          <TableTransfer key={key}
              dataSource={nextdata}
              targetKeys={targetKeys}
              disabled={false}
              showSearch={true}
              onChange={onChange}
              filterOption={(inputValue, item) =>
                  item.title!.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
              }
              leftColumns={leftTableColumns}
              rightColumns={rightTableColumns}
          />
      </ConfigProvider>
  );
}

export default Home;
