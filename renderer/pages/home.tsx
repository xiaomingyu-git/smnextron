import React from 'react';
import Head from 'next/head';
import * as electron from "electron";
import {Button, ConfigProvider, Modal} from "antd";
import {PrimaryButton} from "../modules/styleButton";
const ipcRenderer = electron.ipcRenderer;
import {useBearStore} from '../store/bear'
import {CustomizedForm} from "../modules/CustomizedForm";
function Home() {
    const nextfields = useBearStore((state) => state.fields)
    const setnextfields = useBearStore((state) => state.setfieIds)
    const open = useBearStore((state) => state.modalstatus)
    const changemodalstatus  = useBearStore((state) => state.changemodalstatus)
    const onClickwithIpc = () =>{
        ipcRenderer.send('openfile','"D:\\show.txt"')
    }
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
      </ConfigProvider>
  );
}

export default Home;
