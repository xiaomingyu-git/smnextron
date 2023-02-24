import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import * as electron from "electron";
import {Button} from "antd";
const ipcRenderer = electron.ipcRenderer;

function Home() {

    const onClickwithIpc = () =>{
        ipcRenderer.send('openfile','"D:\\show.txt"')
    }

  return (
    <React.Fragment>
      <Head>
        <title>涉密文件内部管理</title>
      </Head>
        <Button onClick={onClickwithIpc}> 点击打开文件</Button>
        <Button >最后还是antd</Button>
    </React.Fragment>
  );
}

export default Home;
