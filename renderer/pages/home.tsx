import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import * as electron from "electron";
import {Button, Group, Modal, NumberInput} from "@mantine/core";
import {UserFormProvider, useUserForm} from "../modules/form-context";
import {Tablemodal} from "../modules/modal";
const ipcRenderer = electron.ipcRenderer;
import { useDisclosure } from '@mantine/hooks';
import {SearchTable} from "../modules/SearchTable";
import dayjs from "dayjs";

const utc =require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(timezone)
function Home() {

    const onClickwithIpc = () =>{
        ipcRenderer.send('openfile','"D:\\show.txt"')
    }
    const form = useUserForm({
        initialValues: {
            age: 0,
            name: '',
        },
    });
    const [opened, handleopen] = useDisclosure(false);
    const clickresult = () =>{
        form.setValues({
            age: 1,
            name: 'sdf'
        })
    }
  return (
    <React.Fragment>
      <Head>
        <title>涉密文件内部管理</title>
      </Head>
        <SearchTable />
        <UserFormProvider form={form} >
          <Tablemodal  opened={opened} handleopen={handleopen}/>
          <Button onClick={handleopen.open}>点击弹窗</Button>
        </UserFormProvider>
        <Button onClick={clickresult} >测试功能是否正常</Button>
    </React.Fragment>
  );
}

export default Home;
